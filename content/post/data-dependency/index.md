---
title: "构建数据依赖的实现"
authors: [szp]
tags: [静态分析]
categories: [静态分析]
date: 2021-09-28T17:20:26+08:00
featured: false
draft: false
---

这篇文章总结了DFST、支配、归约的各种性质和算法，并最终给出路径摘要的方案。上一篇文章的链接在这里：[从CFG直接构建GSA的算法]({{< relref "/post/build-gsa-from-cfg/index.md" >}})。

<!--more-->

<x-card>

**注意：未经许可，禁止转载**。通过[OpenTimestamps](https://opentimestamps.org/)，我已经获得了该文最早的区块链时间戳。有且只有我（[me@szp.io](mailto:me@szp.io)）持有其证明。因此如果你能伪造区块链，请你投计算机顶会；如果不能，不要未经我的许可，转载文章内容，否则我保留追究权利。

<x-warning comment="引用不当"></x-warning>这篇文章尚在编写中，因而还没给出完整的引用。如果你很迫切想知道前人的工作，可以看上一篇文章“[从CFG直接构建GSA的算法]({{< relref "/post/build-gsa-from-cfg/index.md" >}})”的底部。

</x-card>

## 数据依赖的定义

<x-card>
<x-theorem id="th:data-dependency-def" label="定义">数据依赖是定义在合并基本块<x-comment>（入边数目大于等于2的基本块）</x-comment>的入边上的，它表示的是：

- 如果该边**是循环回边**：以该边结束，从**该基本块**到其本身的**简单回路**成立的条件；
- 如果该边**不是循环回边**：以该边结束，从**该基本块的立即支配者**到其本身的**简单路径**成立的条件。

</x-theorem>
</x-card>

本文中的控制流图（CFG）是指**带入口节点$Entry$、可以有重边、可以有自环的有向图**；此外还需要满足**可达性**，即存在从$Entry$到任意节点的路径。<x-comment>（所有算法应当能容忍$Entry$有入边的情况，虽然这是次要的）</x-comment>

我们用$N$表示CFG的节点集合，$E$表示CFG的边集合。

<x-figure src="./example-cfg.svg" id="fig:example-cfg">示例CFG</x-figure>

<x-ref-figure ref="fig:example-cfg"></x-ref-figure>各个合并节点入边的数据依赖见<x-ref-table ref="tab:example-cfg-data-dependency"></x-ref-table>。

<x-table id="tab:example-cfg-data-dependency">

|边的ID|数据依赖条件|
|-:|:-|
|6|$(P\land\neg R)\lor(\neg P\land Q\land\neg R)$|
|7|$R$|
|9|$\neg P\land Q$|
|10|$\neg P\land\neg Q\land\neg T$|
|13|$\neg P\land\neg Q\land T$|
|17|$P$|

<x-ref-figure ref="fig:example-cfg"></x-ref-figure>中CFG的所有数据依赖条件

</x-table>

接下来，我将讲解可归约CFG上路径摘要算法的原理和实现。路径摘要算法可以用于快速地求解数据依赖条件，也可以用于求解某些<x-wip>前向数据流分析</x-wip>。

## 路径摘要算法的步骤

路径摘要算法是多步骤的。具体各个步骤的依赖关系见<x-ref-figure ref="fig:algo-steps"></x-ref-figure>。

<x-figure src="./algo-steps.svg" id="fig:algo-steps">数据依赖算法步骤</x-figure>

各步骤的输出及目的见<x-ref-table ref="tab:algo-steps"></x-ref-table>。

<x-table id="tab:algo-steps">

|编号|名称|输出|
|-:|:-:|:-|
|1|深度优先生成树|以入口基本块为根的生成树，识别出非循环边和回边|
|2|支配树|每个基本块的立即支配者|
|3|识别循环|每个基本块所属的最近循环头|
|4|归约序列|找到一个序列，序列的每个节点可以归约到后面的节点|
|5|路径摘要|按照归约序列，计算从立即支配者出发的路径条件|

算法的各个步骤

</x-table>

## 深度优先生成树（DFST）

### DFST边的类别

一个有向图的边可以按照其某个生成树分类：

1. **树边**：终点是起点的父亲
2. **前向边**：终点是起点的子孙，且不是自环边或树边
3. **回边**：终点是起点的祖父，且不是自环边
4. **自环边**：起始与终止节点相同
5. **交叉边**：终点既不是起点的子孙，也不是起点的祖父

<x-comment>注：本文中的祖父是指***包含节点自己***的集合：节点、节点的父亲、节点的父亲的父亲等等组成的集合；子孙的概念类似。如果需要强调不包含自己，我会使用***严格祖先***、***严格子孙***。</x-comment>

形象的分类见<x-ref-figure ref="fig:dfst-edge"></x-ref-figure>。特别地，对于有向图按DFST分类的重要性质被标注在了图片的右侧。

<x-figure src="./dfst-edge.svg" id="fig:dfst-edge">DFST边的分类及性质</x-figure>

例子见<x-ref-figure ref="fig:dfst-example"></x-ref-figure>，节点上的数字为逆后序遍历序号，要指出的一点是，**DFST的前序/后序/逆后序遍历特指一种遍历方式**，这是相对于生成树的发现顺序的。

<x-figure src="./dfst-example.svg" id="fig:dfst-example">示例DFST，标注了逆后序遍历序号及边的类型</x-figure>

自环边和回边我们统称为**循环边**，而树边、前向边和交叉边统称为**非循环边**。

### DFST边的性质

<x-ref-figure ref="fig:dfst-edge"></x-ref-figure>的第1个性质<x-comment>（自环边与DFST无关）</x-comment>显然。这里给出第2个性质<x-comment>（非循环边组成DAG）</x-comment>的证明。

<x-card>
<x-theorem id="th:dfst-pre-order">令DFST上节点$x$的先序遍历序号为$\mathrm{PreOrder}(x)$，那么原图的边$(u,v)$按照生成树分类，一定满足：

1. 树边：$\mathrm{PreOrder}(u)&lt;\mathrm{PreOrder}(v)$<x-comment>（指向还未搜索过的节点，构成生成树）</x-comment>
2. 自环：$\mathrm{PreOrder}(u)=\mathrm{PreOrder}(v)$
3. 其他边：$\mathrm{PreOrder}(u)&gt;\mathrm{PreOrder}(v)$<x-comment>（指向已经搜索过的节点，回溯）</x-comment>

逆命题同样成立：任何一棵生成树，如果有$\mathrm{PreOrder}$满足了上面的三个性质，它就可以是以$\mathrm{PreOrder}$为发现顺序的深度优先生成树。

</x-theorem>
</x-card>

<x-ref-theorem ref="th:dfst-pre-order"></x-ref-theorem>可以有两个重要的推论，如下：

<x-card>
<x-theorem id="th:non-cycle-dag">
有向的图边按DFST分类后，对任何非循环边$(u,v)$有：

$$\mathrm{RevPostOrder}(u)&gt;\mathrm{RevPostOrder}(v)$$

进一步，非循环边组成的子图是一个DAG，其拓扑排序的一种结果是$\mathrm{RevPostOrder}$。

</x-theorem>
</x-card>

<x-card>
<x-theorem id="th:cross-ancestor">
如果$\mathrm{PreOrder}(u)&lt;\mathrm{PreOrder}(v)$，那么任何路径$u\xrightarrow{*}v$一定包含$u$和$v$的公共祖先。
</x-theorem>

<x-proof for="th:cross-ancestor">
<x-wip>按树的高度进行归纳。</x-wip>
</x-proof>
</x-card>

最后，我们很关心的一个问题是：回边集合和非循环边集合会不会随DFST变化。遗憾的是，确实可能会发生变化。最小的例子见<x-ref-figure ref="fig:variant-cycle-set"></x-ref-figure>。

<x-figure src="./variant-cycle-set.svg" id="fig:variant-cycle-set">展示了回边集合和非循环边集合会随DFST变化</x-figure>

但如果CFG可归约，那么DFST对应的回边集合和非循环边集合是不会变的。这也就是<x-ref-figure ref="fig:dfst-edge"></x-ref-figure>的第3个性质，具体细节会<x-wip>在归约章节讨论</x-wip>。

## 支配树

### 支配的概念

CFG上，节点$x$**支配**节点$y$，是指从$Entry$到$y$的每条路径都经过了$x$。由于具有自反性<x-comment>（任何节点都支配自己）</x-comment>、反对称性<x-comment>（否则到$x$需要经过另一个节点$y$且到$y$需要经过$x$，结果到达$x$或$y$没有有穷的路径）</x-comment>、传递性，这是个偏序关系<x-comment>（由此支配关系可以对应到一个DAG）</x-comment>。为了方便，我们有时会说此时$x$小于$y$。节点$x$**严格支配**节点$y$就是$x$**支配**$y$且$x\neq y$。

非入口节点$x$的**立即支配者**$y$就是所有严格支配者中极大的<x-comment>（进一步是“最大的”，看下文“唯一”）</x-comment>，它是存在的<x-comment>（至少$Entry$是其严格支配者）</x-comment>，且唯一的<x-comment>（如果不同的$y$和$z$同时出现在所有$Entry$到$x$的路径上，那么一定有$y$严格支配$z$或$z$严格支配$y$。否则就会出现两条路径，一条$y$出现在了$z$之前，另一条$z$出现在了$y$之前，那么拼接一下就可以得到不经过$y$/不经过$z$的路径）</x-comment>。

**非入口节点的立即支配者存在且唯一**，和**支配的偏序关系**是支配的两条独立性质。通过这两条性质，就能知道支配关系组成了一棵带根树，根即为$Entry$。这颗树我们称为**支配树**。

### 支配算法

<x-card>
<x-theorem id="th:dom-rec">严格支配关系满足：

<x-formula id="eq:dom-rec">$$\begin{cases}\mathrm{StrictDoms}(x)=\varnothing,&\text{if}~x=Entry\\\\\mathrm{StrictDoms}(x)=\bigcap_{y\in\mathrm{Pred}(x)}y\cup\mathrm{StrictDoms}(y),&\text{if}~x\neq Entry\end{cases}$$</x-formula>

<x-comment>（集合交的单位元是全集，因而两个式子不能合并）</x-comment>

</x-theorem>
</x-card>

<x-ref-theorem ref="th:dom-rec"></x-ref-theorem>说明了严格支配关系的必要条件，但对于一般的CFG，这不是充分条件，详见<x-ref-heading ref="一般cfg的迭代支配算法"></x-ref-heading>。

#### DAG CFG的直接支配算法

<x-ref-formula ref="eq:dom-rec"></x-ref-formula>是否可以递归？对于DAG CFG，我们发现这个定义是个**结构递归**<x-comment>（可以找到一种顺序，在求$\mathrm{StrictDoms}(x)$时，对任意$y\in\mathrm{Pred}(x)$，$\mathrm{StrictDoms}(y)$已经求出）</x-comment>，因而对于任意基本块$x$，满足上式的$\mathrm{StrictDoms}(x)$是唯一确定的，并且按照拓扑排序即可在确定的时间内完成计算。在<x-wip>稍后的章节中</x-wip>，我们将看到这个递归算法在忽略回边的情况下，同样适用于可归约图。

实际计算中，如果用bit vector作为集合，其集合的交并运算非常复杂，并且没有完全利用支配的“树”的性质。注意到：

$$\mathrm{StrictDoms}(x)=\\{\mathrm{idom}(x),\mathrm{idom}(\mathrm{idom}(x)),\dots\\}$$

且该集合是全序的，立即支配者为最大元素：

$$\mathrm{idom}(x)=\max(\mathrm{StrictDoms}(x))$$

因此就可以得到一个时间、空间上更有效的计算方法：

<x-formula id="eq:idom-lca">$$\begin{align*}
\mathrm{idom}(x)&=\max(\mathrm{StrictDoms}(x))\\\\&=\max(\bigcap_{y\in\mathrm{Pred}(x)}y\cup\mathrm{StrictDoms}(y))\\\\&=\max(\bigcap_{y\in\mathrm{Pred}(x)}\\{y,\mathrm{idom}(y),\mathrm{idom}(\mathrm{idom}(y)),\dots\\})\\\\&=\mathrm{LCA}(\mathrm{Pred}(x)),~~~~\text{if}~x\neq Entry\end{align*}$$</x-formula>

这里$\mathrm{LCA}$是指支配者树上的最低公共祖先。总结一下，就得到了下面的算法：

<x-card>
<x-algorithm id="lst:dag-dom-tree">DAG形式CFG的支配树算法。</x-algorithm>
<x-pseudo-code for="lst:dag-dom-tree">

1. 将$Entry$节点构成一颗单节点树$DomTree$<x-comment>（初始化）</x-comment>
2. 循环：如果还存在一个基本块$x$，满足$x\notin DomTree\land\mathrm{Pred}(x)\subseteq DomTree$：
   1. 以$\mathrm{LCA}(\mathrm{Pred}(x))$为父亲，将$x$插入到$DomTree$上

</x-pseudo-code>
</x-card>

实际实现中，按拓扑序进行插入即可避免<x-ref-algorithm ref="lst:dag-dom-tree"></x-ref-algorithm>中循环的判断。而逆后序遍历恰好是DAG的一种拓扑排序。

#### $\mathrm{LCA}$的计算

未加说明的话，以下讨论是对于一般的CFG，不仅限于DAG形式的。

多元素集合上的$\mathrm{LCA}(S)$可以归结为两个变量的$\mathrm{LCA}(a, b)$<x-comment>（因为$\mathrm{LCA}$有结合律）</x-comment>。单元素集合上的$\mathrm{LCA}(\\{x\\})=x$。空集上的$\mathrm{LCA}(\varnothing)$是ill-defined<x-comment>（因为$\mathrm{LCA}$无单位元）</x-comment>。在所有基本块可达的情况下，如果$x\neq Entry$，则$\mathrm{Pred}(x)\neq\varnothing$，所以<x-ref-formula ref="eq:idom-lca"></x-ref-formula>定义良好。接下来就考虑如何快速地求解两个变量的$\mathrm{LCA}(a, b)$。

<x-card>
<x-theorem id="th:dfst-gt-dom">支配树上的祖父子孙关系，在DFST上得到了保留。精确地来说：

$$\begin{cases}\mathrm{Ancestors}\_{DomTree}(x)\equiv\mathrm{Doms}(x)\subseteq\mathrm{Ancestors}\_{DFST}(x)\\\\\mathrm{Descendants}\_{DomTree}(x)\equiv\mathrm{Doms}^{-1}(x)\subseteq\mathrm{Descendants}\_{DFST}(x)\end{cases}$$

<x-ref-theorem ref="th:dom-order"></x-ref-theorem>是更一般的情况。

</x-theorem>
<x-proof for="th:dfst-gt-dom">从支配的定义得到。</x-proof>
</x-card>

类似地，我们也有：

$$\mathrm{StrictAncestors}\_{DomTree}(x)\equiv\mathrm{StrictDoms}(x)\subseteq\mathrm{StrictAncestors}\_{DFST}(x)$$

注意：其实许多符号既有图论版本的表述，又有控制流版本的表述，它们是等价的，例如：

$$\begin{align*}\mathrm{Ancestors}\_{DomTree}&\equiv\mathrm{Doms}\\\\\mathrm{StrictAncestors}\_{DomTree}&\equiv\mathrm{StrictDoms}\\\\\mathrm{Parent}\_{DomTree}&\equiv\mathrm{idom}\end{align*}$$

形象地来说，支配者树比DFST更加扁。一个等价的描述是：如果将树的自上而下视作一个偏序关系，那么支配树的偏序关系是DFST偏序关系的子集；另一个更有趣的描述是：支配树的偏序关系是所有DFST偏序关系的交。个人最喜欢的描述是：**支配树是DFST中的某些支干重新接到了祖先上形成的新树**。而这个描述将很好地体现在<x-ref-algorithm ref="lst:dom-tree-iter"></x-ref-algorithm>。<x-ref-figure ref="fig:dom-dfst-relation"></x-ref-figure>是一个例子。

<x-figure src="./dom-dfst-relation.svg" id="fig:dom-dfst-relation">DFST与支配树之间的关系</x-figure>

基于此，可以下面的定理：

<x-card>
<x-theorem id="th:dom-post-order">若DFST上对基本块$x$的逆后序遍历编号$\mathrm{RevPostOrder}(x)$，则支配树上，其子孙的$\mathrm{RevPostOrder}$大于等于$\mathrm{RevPostOrder}(x)$

$$\forall y(y\in\mathrm{Descendants}\_{DomTree}(x)\rightarrow\mathrm{RevPostOrder}(y)\geq\mathrm{RevPostOrder}(x))$$

</x-theorem>
<x-proof for="th:dom-post-order">从<x-ref-theorem ref="th:dfst-gt-dom"></x-ref-theorem>和逆后序遍历的性质得到。</x-proof>
</x-card>

有些时候我们会想能不能得到更强的定理：支配树上也一定存在一种先序遍历<x-comment>（等价表述“逆后序遍历”）</x-comment>的结果和DFST的逆后序遍历一样？答案是否定的，见<x-ref-figure ref="fig:dom-dfst-relation"></x-ref-figure>。

基于<x-ref-theorem ref="th:dom-post-order"></x-ref-theorem>就有了下面的算法。

<x-card>
<x-algorithm id="lst:dom-lca">支配树上$\mathrm{LCA}(a, b)$的算法。</x-algorithm>
<x-pseudo-code for="lst:dom-lca">

1. 依据DFST上的逆后序遍历对基本块进行编号，记这个编号为$\mathrm{RevPostOrder}(x)$
2. 循环：如果$a\neq b$：
   1. 如果$\mathrm{RevPostOrder}(a)<\mathrm{RevPostOrder}(b)$：
      1. $b\leftarrow\mathrm{Parent}\_{DomTree}(b)$<x-comment>（分支1）</x-comment>
   2. 否则：<x-comment>（一定有$\mathrm{RevPostOrder}(a)>\mathrm{RevPostOrder}(b)$）</x-comment>
      1. $a\leftarrow\mathrm{Parent}\_{DomTree}(a)$<x-comment>（分支2）</x-comment>
3. 返回$a$

</x-pseudo-code>
</x-card>

这个算法不仅简单，而且性能不错，因为能使用连续的数组提高缓存命中率。注意，分支1和分支2可能会交替执行，这其实是前文中“不能得到更强的定理”导致的：例如<x-ref-figure ref="fig:dom-dfst-relation"></x-ref-figure>中，$N\_0,\dots,N\_4$插入到支配树后，计算$\mathrm{LCA}(\mathrm{Pred}(N\_5))$即$\mathrm{LCA}(N\_4,N\_3)$时，会：

1. 找到$N\_4$的父亲$N\_1$<x-comment>（分支2）</x-comment>
2. 找到$N\_3$的父亲$N\_0$<x-comment>（分支1）</x-comment>
3. 找到$N\_1$的父亲$N\_0$<x-comment>（分支2）</x-comment>
4. 得出：$\mathrm{LCA}(N\_4,N\_3) = N\_0$

#### 一般CFG的迭代支配算法

对于一般的CFG，<x-ref-formula ref="eq:dom-rec"></x-ref-formula>不是结构递归，甚至单单这个式子，作为方程都无法确定唯一解，<x-ref-figure ref="fig:non-dag-dom"></x-ref-figure>是个最小的例子。

<x-figure src="./non-dag-dom.svg" id="fig:non-dag-dom">一般CFG<x-ref-formula ref="eq:dom-rec"></x-ref-formula>无唯一解示例</x-figure>

<x-ref-figure ref="fig:non-dag-dom"></x-ref-figure>中的例子提醒我们，如果采用迭代算法，算法的最终不动点和初值有关，且某些不动点是错误的解<x-comment>（不完整的解）</x-comment>。那么什么解是正确的呢？其实观察上面的两个解，你就可以猜到是那个偏序关系最丰富，树最高的那个解。这里给出其形式化描述以及证明。

<x-card>
<x-theorem id="th:dom-solution-max">对一般的CFG，求解下面的式子：

$$\begin{cases}\mathrm{X}(x)=\varnothing,&\text{if}~x=Entry\\\\\mathrm{X}(x)=\bigcap_{y\in\mathrm{Pred}(x)}y\cup\mathrm{X}(y),&\text{if}~x\neq Entry\end{cases}$$

会得到若干解，那么对于任意基本块$x$，每个解一定满足：

$$\mathrm{X}(x)\subseteq\mathrm{StrictDoms}(x)$$

</x-theorem>
<x-proof for="th:dom-solution-max"><x-comment>注意：证明非结构递归时，不能采用数学归纳法，因为那很可能是循环论证。</x-comment>反证法，假设存在$y$，满足$y\in\mathrm{X}(x)\land y\neq\mathrm{StrictDoms}(x)$。由于$y\neq\mathrm{StrictDoms}(x)$，存在路径$Entry=w\\_0\rightarrow w\\_1\rightarrow\cdots\rightarrow w\\_k=x$，且除终点外路径不经过$y$，即$y\notin\{w\\_i\mid 0\leq i\leq k-1\}$。通过有限次<x-comment>（强调！）</x-comment>的交换律和结合律，可以得到下面的式子：

$$\mathrm{X}(x)=(w\_{k-1}\cup((w\_{k-2}\cup((\cdots)\cap\cdots))\cap\cdots$$

因此，我们可以得到：

$$\mathrm{X}(x)\subseteq\\{w\_i\mid 0\leq i\leq k-1\\}$$

故$y\notin\mathrm{X}(x)$，与假设矛盾。

</x-proof>
</x-card>

基于<x-ref-theorem ref="th:dom-solution-max"></x-ref-theorem>，我们可以给出一个迭代算法的思路。先用一个**偏大的集合**初始化所有$\mathrm{StrictDoms}$。而后不断迭代，不断缩小$\mathrm{StrictDoms}$，剔除其中肯定错误的元素<x-comment>（所有更小的合法解都不包含的元素）</x-comment>。那么，这个**偏大的集合**可以是什么呢？所有CFG节点自然是一个很粗暴且正确的想法。

考虑<x-ref-theorem ref="th:dfst-gt-dom"></x-ref-theorem>：支配树的偏序关系是DFST的子集。用DFST作为初始的支配树是完全可行的。于是我们就有了下面的算法：

<x-card>
<x-algorithm id="lst:dom-tree-iter">一般CFG的迭代支配树算法。</x-algorithm>
<x-pseudo-code for="lst:dom-tree-iter">

1. 用某个DFST初始化$DomTree$<x-comment>（初始化）</x-comment>
2. 循环：如果树上有一个节点$x$，满足$\mathrm{Parent}\_{DomTree}(x)\neq\mathrm{LCA}(\mathrm{Pred}(x))$：
   1. 更新$\mathrm{Parent}\_{DomTree}(x)$为$\mathrm{LCA}(\mathrm{Pred}(x))$<x-comment>（移动了一整棵子树到某个祖先上）</x-comment>

</x-pseudo-code>
</x-card>

实现上，由于循环体可能会触发很多节点重新计算，一般是多次逆后序遍历，直到一次更改也不发生。这个算法正是<x-warning comment="引用不当">K. Cooper的快速支配树算法</x-warning>。

#### 一般CFG的增量支配算法

已知某CFG的支配树，能否快速求出新增节点或边后新CFG的支配树吗？

先考虑新增一个节点$x$。为了保证CFG的可达性，在新增节点的同时还需要新增一条边$(s, x)$。此时，以$s$为父亲，插入$x$到$DomTree$上即可。

再考虑新增一条边的情况。需要下面的定理来导出算法。

<x-card>
<x-theorem id="th:dom-order">若原CFG的支配树为$DomTree$，添加若干边后的支配树为$DomTree'$，那么一定有：

$$\begin{cases}\mathrm{Ancestors}\_{DomTree'}(x)\subseteq\mathrm{Ancestors}\_{DomTree}(x)\\\\\mathrm{Descendants}\_{DomTree'}(x)\subseteq\mathrm{Descendants}\_{DomTree}(x)\end{cases}$$

<x-ref-theorem ref="th:dfst-gt-dom"></x-ref-theorem>是原CFG为树的一个特例。

</x-theorem>
</x-card>

依据<x-ref-theorem ref="th:dom-order"></x-ref-theorem>，修改<x-ref-algorithm ref="lst:dom-tree-iter"></x-ref-algorithm>的“初始化”为“用原CFG的支配树初始化$DomTree$”，就可以得到增量支配算法。但<x-ref-algorithm ref="lst:dom-tree-iter"></x-ref-algorithm>的循环如果还采用遍历所有节点、计算所有前驱的方式，就显得太盲目了。所以，我们有两个待解决问题：

1. 新增一条边后，如何快速地找出需要更新的节点？见<x-ref-heading ref="支配树上最小范围的更新传播"></x-ref-heading>。
2. 以什么顺序添加节点和边能较快地增量构造支配树？见<x-ref-heading ref="快速cfg增量顺序"></x-ref-heading>。

为了缩减篇幅，下文的$\mathrm{Ancestors}\_{DomTree}$、$\mathrm{Parent}\_{DomTree}$和$\mathrm{StrictAncestors}\_{DomTree}$不再加下标。

##### 支配树上最小范围的更新传播

新增一条边后$(s, x)$，只有$x$的前驱集可能发生了变化，即：

$$\mathrm{Pred}'(x)=\mathrm{Pred}(x)\cup\\{s\\}$$

所以我们只需要更新$x$的父亲为：

<x-formula id="eq:dom-update">$$\begin{align*}\mathrm{Parent}'(x)&=\mathrm{LCA}(\mathrm{Pred}'(x))\\\\&=\mathrm{LCA}(\mathrm{Pred}(x)\cup\\{s\\})\\\\&=\mathrm{LCA}(\mathrm{LCA}(\mathrm{Pred}(x)),s)\\\\&=\mathrm{LCA}(\mathrm{Parent}(x),s)\end{align*}$$</x-formula>

注意：<x-ref-formula ref="eq:dom-update"></x-ref-formula>使用了先前的计算结果，极大地减少了计算量。通过<x-ref-formula ref="eq:dom-update"></x-ref-formula>可以立刻知道什么情况下，不用更新：

<x-formula id="eq:dom-update-cond">$$\mathrm{Parent}(x)\in\mathrm{Ancestors}(s)\Leftrightarrow\mathrm{Parent}'(x)=\mathrm{Parent}(x)$$</x-formula>

实际实现时，<x-ref-formula ref="eq:dom-update-cond"></x-ref-formula>不是很有用，因为$\mathrm{Ancestors}$也需要沿着支配树上行，与$\mathrm{LCA}$计算量差不多。但<x-ref-formula ref="eq:dom-update-cond"></x-ref-formula>其实揭示了一个很重要的支配树性质，之后会被经常用于加速计算。

<x-card>
<x-theorem id="th:dom-edge">CFG的所有边$(s,x)$在支配树上有：

$$\mathrm{Parent}(x)\in\mathrm{Ancestors}(s)$$

等价的控制流表述为：

$$\mathrm{idom}(x)\in\mathrm{Doms}(s)$$

</x-theorem>
<x-proof for="th:dom-edge">这里给出两个证明思路：

- 向CFG添加重边不会使支配树发生变化，由<x-ref-formula ref="eq:dom-update-cond"></x-ref-formula>即证；
- 反证法：假设$\mathrm{idom}(x)\notin\mathrm{Doms}(s)$，那么存在不经过$\mathrm{\mathrm{idom}(x)}$的路径$Entry\xrightarrow{*}s\rightarrow x$，矛盾。

</x-proof>
</x-card>

形象地来说，<x-ref-theorem ref="th:dom-edge"></x-ref-theorem>指出，所有CFG上的边在支配树上，会指向起始节点的祖先或起始节点祖先的孩子。

随着$x$的父亲变更，CFG上所有从$x$出发可达的节点都可能需要更新父亲。这部分节点是哪些？它们的父亲又应当更新为哪个节点呢？

<x-card>
<x-theorem id="th:dom-update-spread">在（不完全的）支配树上，假设除节点$x$外的所有节点$y$都满足$\mathrm{LCA}(\mathrm{Pred}(y))=\mathrm{Parent}(y)$。现在节点$x$的父亲从节点$p$更新为了节点$p'$，且$p'\in\mathrm{StrictAncestors}(p)$。那么满足$\mathrm{LCA}'(\mathrm{Pred}(y))\neq\mathrm{Parent}(y)$<x-comment>（$\mathrm{LCA}$是$x$以$p$为父亲的，而$\mathrm{LCA}'$是$x$以$p'$为父亲的）</x-comment>且不为$x$的节点$y$的集合为：

$$\begin{align*}\mathrm{DomUpdate}(x,p'):=\\{y\mid{}&x\notin\mathrm{Ancestors}(y)\\\\&\land p'\in\mathrm{StrictAncestors}(\mathrm{Parent}(y))\\\\&\land\exists z(z\in\mathrm{Pred}(y)\land x\in\mathrm{Ancestors}(z))\\}\end{align*}$$

且$\mathrm{LCA'}(\mathrm{Pred}(y))=p'$。

</x-theorem>
<x-proof for="th:dom-update-spread">首先，先证明不在$\mathrm{DomUpdate}(x,p')$中且不为$x$的节点$y$，其$\mathrm{LCA}(\mathrm{Pred}(y))$不变。

1. $x\in\mathrm{Ancestors}(y)$：$\mathrm{Pred}(y)$都在$x$的子树上，所以$\mathrm{LCA}(\mathrm{Pred}(y))$不变。
2. $p'\notin\mathrm{StrictAncestors}(\mathrm{Parent}(y))$：$\mathrm{Pred}(y)$不可能都在$x$的子树上，否则$x\in\mathrm{Ancestors}(y)$，进而$p\in\mathrm{StrictAncestors}(y)$，在进而$p'\in\mathrm{StrictAncestors}(\mathrm{Parent}(y))$，矛盾。
   1. $\mathrm{Pred}(y)$都不在$x$的子树上：$\mathrm{LCA}(\mathrm{Pred}(y))$不变。
   2. $\mathrm{Pred}(y)$有部分在也有部分不在$x$的子树上：$\mathrm{LCA}(\mathrm{Pred}(y))\in\mathrm{Ancestors}(p)$，又由于题设$p'\in\mathrm{Ancestors}(p)$和$\mathrm{LCA}(\mathrm{Pred}(y))\in\mathrm{StrictAncestors}(y)$，结合分类讨论假设可得$\mathrm{LCA}(\mathrm{Pred}(y))\in\mathrm{Ancestors}(p')$。因此$\mathrm{LCA}(\mathrm{Pred}(y))$不变。
3. $\forall z(z\in\mathrm{Pred}(y)\rightarrow x\notin\mathrm{Ancestors}(z))$：$\mathrm{Pred}(y)$都不在$x$的子树上，$\mathrm{LCA}(\mathrm{Pred}(y))$不变。

接着证明，$\mathrm{DomUpdate}(x,p')$中的节点$y$满足$\mathrm{LCA'}(\mathrm{Pred}(y))=p'$。$y$有前导在$x$的子树中，而由$x\notin\mathrm{Ancestors}(y)$可以知道$y$也有前导不在$x$的子树中，这样$\mathrm{LCA}'(\mathrm{Pred}(y))=\mathrm{LCA}(\mathrm{Parent}(y),p')=p'$。

</x-proof>
</x-card>

<!--

在讨论这两个问题之前，先明确后文用的符号指代的是新对象还是旧对象。在插入边$e$后，我们会更新CFG和$\mathrm{Dst}(e)$在$DomTree$上的父亲。之后的一切符号，无需加单引号，都是指新的CFG和新的$DomTree$。为了避免歧义我们尽量使用图论语言描述支配树。之后算法会有多次迭代，每次迭代都会改变支配树。不加说明时，所有符号都是指最新的CFG和新的$DomTree$，即上次迭代而结果。<x-wip>要更改</x-wip>。

-->

<x-card>
<x-algorithm id="lst:dom-tree-iter-single-step">在计算完原CFG的支配树$DomTree$后，新增一条边$e$到CFG上，求新CFG的支配树算法。</x-algorithm>
<x-pseudo-code for="lst:dom-tree-iter-single-step">
</x-pseudo-code>
</x-card>

<!-- 操作次序 -->

<!-- 快速判断 -->

<!-- 检测归约？ -->

##### 快速CFG增量顺序

#### 算法比较

### 支配边界算法

<x-card>
<x-theorem id="th:dom-frontier-def" label="定义">节点$x$的<b>支配边界</b>是那些有前驱被支配，但本身不被严格支配的节点，记为$\mathrm{DF}(x)$：

$$\mathrm{DF}(x)=\\{y|x\notin\mathrm{StrictDoms}(y)\land\exists p(p\in\mathrm{Pred(y)}\land x\in\mathrm{Doms}(p))\\}$$

按定义，有可能$x\in\mathrm{DF}(x)$。直观理解支配边界就是支配从有到无的界线。接着对于节点$x$，我们引入序列：

$$\begin{cases}\mathrm{DF}^{(i)}(x)\equiv\mathrm{DF}(x),&i=0\\\\\mathrm{DF}^{(i)}(x)=\mathrm{DF}^{(i-1)}(x)\cup\bigcup_{y\in\mathrm{DF}^{(i-1)}(x)}\mathrm{DF}(y),&i=1,2,\dots\end{cases}$$

注意到：

- 序列单调递增：$\mathrm{DF}^{(i)}(x)\subseteq\mathrm{DF}^{(i+1)}(x),i=0,1,\dots$
- 序列有上界，且上界为有限集：$\mathrm{DF}^{(i)}(x)\subseteq N,i=0,1,\dots$

故存在最小上界，称作$x$的**支配边界闭包**，记作$\mathrm{DF}^+(x)$。

</x-theorem>
</x-card>
