---
title: "Tarjan的支配树算法"
authors: [szp]
tags: [静态分析]
categories: [静态分析]
date: 2021-10-22T12:37:03+08:00
featured: false
draft: false
---

这篇文章介绍了Tarjan的快速支配算法[^lengauer1979fast]。这个算法很有洞察力地利用了”半支配“的性质。

<!--more-->

流图$G=(V,E,r)$上进行深度优先搜索后，节点按照发现顺序编号<x-comment>（论文从1编号）</x-comment>。搜索产生了以$r$为根的搜索树$T$，编号正是前序遍历序号。本文假设所有节点以此序号标识。

<x-card>
<x-theorem id="th:dfs-common-ancestor" label="引理">如果$G$上的两节点$v,w$，满足$v\leq w$，那么任何$v$到$w$的路径一定经过$v,w$在$T$上的共同祖先。</x-theorem>
</x-card>

<x-card>
<x-theorem id="def:sdom" label="定义">半支配者$\mathrm{sdom}(w)$定义为：

$$\mathrm{sdom}(w)=\min\\{v\mid\text{存在路径}v=v_0,v_1,\dots,v_k=w~\text{满足}\forall i(1\leq i\leq k-1\rightarrow v_i>w)\\}$$

</x-theorem>
</x-card>

本文中的$x\xrightarrow{*}y$是指在$T$上，$x$是$y$的祖先。$x\xrightarrow{+}y$是指在$T$上，$x$是$y$的祖先且$x\neq y$。

<x-card>
<x-theorem id="th:idom-ancestor" label="引理">对任何$w\neq r$，$\mathrm{idom}(w)\xrightarrow{+}w$。</x-theorem>
</x-card>

<x-card>
<x-theorem id="th:sdom-ancestor" label="引理">对任何$w\neq r$，$\mathrm{sdom}(w)\xrightarrow{+}w$。</x-theorem>
<x-proof for="th:sdom-ancestor">由于$G$上存在路径$\mathrm{parent}(w)\rightarrow w$，由<x-ref-theorem ref="def:sdom"></x-ref-theorem>知$\mathrm{sdom}(w)\leq\mathrm{parent}(w)&lt;w$。由<x-ref-theorem ref="th:dfs-common-ancestor"></x-ref-theorem>，$\mathrm{sdom}(w)$到$w$的路径一定经过$\mathrm{sdom}(w),w$的共同祖先。共同祖先$\leq\mathrm{sdom}(w)$，故而共同祖先只能是$\mathrm{sdom}(w)$。</x-proof>
</x-card>

<x-card>
<x-theorem id="th:idom-sdom-ancestor" label="引理">对任何$w\neq r$，$\mathrm{idom}(w)\xrightarrow{*}\mathrm{sdom}(w)$。</x-theorem>
<x-proof for="th:idom-sdom-ancestor">$\mathrm{sdom}(w)$取到的路径上，除了$\mathrm{sdom}(w),w$没有$w$的祖先，故而都不是$\mathrm{idom}(w)$而路径$r\xrightarrow{*}\mathrm{sdom}(w)$拼接上$\mathrm{sdom}(w)$取到的路径组成的路径上一定有$\mathrm{idom}(w)$，故而$\mathrm{idom}(w)\xrightarrow{*}\mathrm{sdom}(w)$</x-proof>
</x-card>

<x-card>
<x-theorem id="th:dom-order" label="引理">节点$v,w$满足$v\xrightarrow{*}w$，那么$v\xrightarrow{*}\mathrm{idom}(w)$或$\mathrm{idom}(w)\xrightarrow{*}\mathrm{idom}(v)$。</x-theorem>
<x-proof for="th:dom-order">其实这条定理是说$\mathrm{idom}(w)$不可能位于$\mathrm{idom}(v)$与$v$之间。反之，$\mathrm{idom}(v)$到$v$存在不经过$\mathrm{sdom}(w)$的路径，将这个路径拼接上$r\xrightarrow{*}\mathrm{idom}(v)$和$v\xrightarrow{*}(w)$，就得到了不经过$\mathrm{sdom}(w)$到达$w$的路径，矛盾。</x-proof>
</x-card>

<x-card>
<x-theorem id="th:idom-eq-sdom-cond">对于$w\neq r$，如果对于所有满足$\mathrm{sdom}(w)\xrightarrow{+}u\xrightarrow{*}w$的$u$，都有$\mathrm{sdom}(u)\geq\mathrm{sdom}(w)$，那么$\mathrm{idom}(w)=\mathrm{sdom}(w)$。</x-theorem>
<x-proof for="th:idom-eq-sdom-cond">只需要证明$\mathrm{sdom}(w)$支配$w$。任取从$r$到$w$的路径，现在证明路径上一定有$\mathrm{sdom}(w)$。令$x$是这个路径上最后一个满足$x&lt;\mathrm{sdom}(w)$的节点，如果不存在，那么$\mathrm{sdom}(w)=r$，原命题成立。令$y$是这个路径上第一个满足$\mathrm{sdom}(w)\xrightarrow{*}y\xrightarrow{*}w$的节点。对于路径上$x$与$y$之间的节点$v$，一定有$v>y$。否则的话路径上有$v,y$且$\neq y$的共同祖先，且该祖先$\geq\mathrm{sdom}(w)$，那么这与$y$的选取矛盾。故而$\mathrm{sdom}(y)\leq x&lt;\mathrm{sdom}(w)$，所以只可能$y=\mathrm{sdom}(w)$，即路径一定包括$\mathrm{sdom}(w)$。</x-proof>
</x-card>

<x-card>
<x-theorem id="th:idom-eq-idom-cond">对于$w\neq r$，令$u$是满足$\mathrm{sdom}(w)\xrightarrow{+}u\xrightarrow{*}w$的节点中$\mathrm{sdom}(u)$最小的那个，那么$\mathrm{sdom}(u)\leq\mathrm{sdom}(w)$且$\mathrm{idom}(u)=\mathrm{idom}(w)$。</x-theorem>
<x-proof for="th:idom-eq-idom-cond">对于$\mathrm{sdom}(w)\rightarrow z\xrightarrow{*}w$，$\mathrm{sdom}(z)\leq\mathrm{sdom}(w)$，所以一定有$\mathrm{sdom}(u)\leq\mathrm{sdom}(w)$。接下来证明$\mathrm{idom}(u)=\mathrm{idom}(w)$。由<x-ref-theorem ref="th:dom-order"></x-ref-theorem>，一定有$\mathrm{idom}(w)\xrightarrow{*}\mathrm{idom}(u)$，接下来证明$\mathrm{idom}(u)$支配$w$。任取从$r$到$w$的路径，现在证明路径上一定有$\mathrm{idom}(u)$。令$x$是这个路径上最后一个满足$x&lt;\mathrm{idom}(u)$的节点，如果不存在，那么$\mathrm{idom}(u)=r$，原命题成立。令$y$是这个路径上第一个满足$\mathrm{idom}(u)\xrightarrow{*}y\xrightarrow{*}w$的节点。对于路径上$x$与$y$之间的节点$v$，一定有$v>y$，证明同<x-ref-theorem ref="th:idom-eq-sdom-cond"></x-ref-theorem>的相关证明。故而$\mathrm{sdom}(y)\leq x&lt;\mathrm{idom}(u)\leq\mathrm{sdom}(u)$。然而$u$是满足$\mathrm{sdom}(w)\xrightarrow{+}u\xrightarrow{*}w$，$\mathrm{sdom}(u)$最小的，故$\mathrm{idom}(u)\xrightarrow{*}y\xrightarrow{*}\mathrm{sdom}(w)\xrightarrow{+}u$。然而$y$不可能在$\mathrm{idom}(u)$和$u$的中间。否则$r\xrightarrow{*}\mathrm{sdom}(y)$拼接上$\mathrm{sdom}(y)$取的路径再拼接上$y\xrightarrow{+}u$形成的路径，避开了$\mathrm{idom}(u)$。所以只可能$y=\mathrm{idom}(u)$，即路径一定包括$\mathrm{idom}(u)$。</x-proof>
</x-card>

<x-card>
<x-theorem id="th:idom-sdom" label="推论">对于$w\neq r$，令$u$是满足$\mathrm{sdom}(w)\xrightarrow{+}u\xrightarrow{*}w$的节点中$\mathrm{sdom}(u)$最小的那个，那么：

$$\mathrm{idom}(w)=\begin{cases}\mathrm{sdom}(w)&\text{if}~\mathrm{sdom}(w)=\mathrm{sdom}(u)\\\\\mathrm{idom}(u)&\text{otherwise}\end{cases}$$

</x-theorem>
</x-card>

<x-card>
<x-theorem id="th:sdom-rec">对于$w\neq r$：

$$\mathrm{sdom}(w)=\min(\\{v\mid(v,w)\in E\land v&lt;w\\}\cup\\{\mathrm{sdom}(u)\mid u>w\land(v,w)\in E\land u\xrightarrow{*}v\\})$$

</x-theorem>
<x-proof for="th:sdom-rec">令$x$是上式右侧。先证明$\mathrm{sdom}(w)\leq x$。如果$x$满足$(x,w)\in E\land x&lt;w$，那么由<x-ref-theorem ref="def:sdom"></x-ref-theorem>，$\mathrm{sdom}(w)\leq x$。如果$x$满足$x=\mathrm{sdom}(u)\land u>w\land(v,w)\in E\land u\xrightarrow{*}v$，那么$\mathrm{sdom}(u)$选的路径中间的点$>u>w$，$u\xrightarrow{*}v$上的点$\geq u>w$，最后这两条路径拼接上$(v,w)$的到的路径满足$\mathrm{sdom}(w)$的候选路径，故而$\mathrm{sdom}(w)\leq x$。

接着证明$\mathrm{sdom}(w)\geq x$。如果$\mathrm{sdom}(w)$所选的路径$\mathrm{sdom}(w)=v_0,v_1,\dots,v_k=w$长度为1，那么$(\mathrm{sdom}(w),w)\in E\land\mathrm{sdom}(w)<w$，故而$\mathrm{sdom}(w)\geq x$。如果$\mathrm{sdom}(w)$所选的路径长度大于1。令$j\geq 1$是$v_j\xrightarrow{*}v_{k-1}$最小的，那么对于$1\leq i\leq j-1$，一定有$v_i>v_j$。否则，取$i$满足$1\leq i\leq j-1$且$v_i$最小。那么有$v_i$到$v_j$的路径经过了共同祖先，那么$v_i$由于最小，一定是共同祖先，那么$v_i\xrightarrow{+}v_j$，与$j$的选取矛盾。此时就有$\mathrm{sdom}(w)\geq\mathrm{sdom}(v_j)\geq x$。

</x-proof>
</x-card>

<x-ref-theorem ref="th:sdom-rec"></x-ref-theorem>其实是说，$\mathrm{sdom}(w)$所选的路径，一定是：

1. 树边、前向边开始
2. 接着若干（$n\geq 0$）：
   1. 若干树边（$n\geq 0$）
   2. 回边或者交叉边，到比上一步小的节点

[^lengauer1979fast]: Lengauer, Thomas, and Robert Endre Tarjan. "A fast algorithm for finding dominators in a flowgraph." *ACM Transactions on Programming Languages and Systems (TOPLAS)* 1.1 (1979): 121-141.
