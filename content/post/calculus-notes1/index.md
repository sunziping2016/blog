---
title: "微积分复习笔记（上）"
authors: [szp]
tags: [微积分, 数学]
categories: [数学]
date: 2018-11-01T04:16:52Z
featured: false
draft: false
---

这篇文章是我数学复习计划的一部分，内容参考清华大学出版社的《高等微积分教程》上册和姚家燕老师在微积分课上的讲义。

<!--more-->

## 实数系与实数列的极限

### 实数系

引入了**上界**、**下界**、**有界**和**无界**的概念。

还引入了**最大值**、**最小值**、**上确界**（最小上界）$\sup A$和**下确界**$\inf A$的概念。

**确界定理**：有上界的非空数集必有上确界，有下界的非空数集必有下确界。

**上确界的刻画**：$\xi=\sup A\Leftrightarrow\xi$是$A$的上界，且$\forall\epsilon>0,\exists x\in A, x>\xi-\epsilon$。同样也有下确界的刻画。

### 数列极限的基本概念

**数列极限**：$\forall\epsilon>0,\exists N\in\mathbb{N}, \forall n>N,|a\_n-A|<\epsilon$。则称数列$\\{a\_n\\}$有极限$A$，$\lim\limits\_{n\to\infty}a\_n=A$。

### 收敛数列的性质

收敛数列有以下性质：

1. 唯一性；
2. 有限韧性：添加、删除或改变有限项，不改变收敛性与极限值；
3. 均匀性：数列$\\{a\_n\\}$收敛于$A \Leftrightarrow$它的任意子列收敛于$A$；
4. 有界性；
5. 局部保序：$\lim\limits\_{n\to\infty}a\_n=A,\lim\limits\_{n\to\infty}b\_n=B$，则
    1. $A>B\Rightarrow\exists N>0,\forall n>N, a\_n>b\_n$；
    2. $\exists N>0, \forall n>N, a\_n\geq b\_n\Rightarrow A\geq B$。
6. 局部保号：上述数列$\\{b\_n\\}$取$0$常数列可得到的推论。

极限遵守四则运算法则。此外还有**夹逼原理**：$\exists n\_0>0,\forall n>n\_0, a\_n\leq x\_n\leq b\_n$且$\lim\limits\_{n\to\infty}a\_n=\lim\limits\_{n\to\infty}b\_n=A$，则$x\_n$收敛且$\lim\limits\_{n\to\infty}x\_n=A$。

增长速度：$1 < \log n < n^\alpha (\alpha>0) < a^n (a>1) < n! < n^n$。

平均性：$\lim\limits\_{n\to\infty}a\_n=A\Rightarrow\lim\limits\_{n\to\infty}\frac{a\_1+a\_2+\cdots+a\_n}{n}=A$。

### 单调数列

引入了**单调递增**（**单调递减**）、**严格单调递增**（**严格单调递减**）的概念。

**单调有界定理**：单调递增有上界的数列必收敛，单调递减有下界的数列必收敛。

由此可定义自然对数$\lim\limits\_{n\to\infty}(1+\frac{1}{n})^n=e$。且有$(1+\frac{1}{n})^n<e<(1+\frac{1}{n})^{n+1}$。

### Stolz定理

引入了趋向于$+\infty$、趋向于$-\infty$和趋向于$\infty$的概念。

**Stolz定理**：设数列$\\{b\_n\\}$严格递增趋于$+\infty$，$\lim\limits\_{n\to\infty}\frac{a\_n-a\_{n-1}}{b\_n-b\_{n-1}}=A\in R\cup\\{\pm\infty\\}\Rightarrow\lim\limits\_{n\to\infty}\frac{a\_n}{b\_n}=A$。

### 关于实数系的几个基本定理

下列结论等价：

1. 确界定理；
2. 单调有界定理；
3. **区间套定理**：$\\{[a\_n,b\_n]\\}$满足$[a\_1,b\_1]\supseteq[a\_2,b\_2]\supseteq\cdots\supseteq[a\_n,b\_n]\supseteq\cdots$且$\lim\limits\_{n\to\infty}(b\_n-a\_n)=0$，则$\lim\limits\_{n\to\infty}a\_n=\lim\limits\_{n\to\infty}b\_n=c$且$\bigcap\limits\_{n=1}^\infty[a\_n,b\_n]=\\{c\\}$；
4. 列紧性：有界数列必有收敛子列；
5. 称$\\{x\_n\\}$为**Cauchy数列**，若$\forall\epsilon>0,\exists N>0,\forall m,n>N,|x\_m-x\_n|<\epsilon$。数列收敛当且仅当它为Cauchy数列。

## 函数，函数的极限与连续

### 函数

引入了**映射**、**定义域**和**值域**的概念。定义域和值域均为数集的映射称为**函数**。

定义了函数的四则运算及**映射的复合**，**单射**、**满射**及**双射**的概念。对于双射还可以定义其**逆映射**。

函数的基本性质有：

1. 有界性；
2. 周期性；
3. 奇偶性；
4. 单调性。

严格单调函数为单射。严格单调函数的反函数与原来的函数有同样的单调性。

**基本初等函数**有：

1. 常数函数；
2. 幂指对函数；
3. 三角函数；
4. 反三角函数。

基本初等函数经过有限次四则运算和复合后得到的函数称为**初等函数**。

### 函数极限的概念

对于$x\_0\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，定义了$\epsilon$-**领域**$B\_X(x\_0,\epsilon)$和$\epsilon$-**去心领域**$\mathring{B}\_X(x\_0,\epsilon)$。

设$X$为非空数集，$x\_0\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，如果$\forall\epsilon>0,\mathring{B}\_X(x\_0,\epsilon)\neq\emptyset$，则称$x\_0$为$X$的**极限点**。

刻画：设$X$为非空数集，$a\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，则$a$为$X$的极限点$\Leftrightarrow X\setminus\\{a\\}$存在极限为$a$的数列。

**函数极限**的定义：设$X$为非空数集，$x\_0\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$为$X$的极限点，$a\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，$f:X\to\mathbb{R}$为函数。若$\forall\epsilon>0,\exists\delta>0,\forall x\in\mathring{B}\_X(x\_0,\delta),f(x)\in B(a,\epsilon)$，则称当$x$趋近于$x\_0$时，$f(x)$趋近于$a$，记为$\lim\limits\_{X\ni x\to x\_0}f(x)=a$。有如下几种情况：

1. $x\_0,a\in\mathbb{R}$，有如下三种情况：
    1. $\exists\eta>0,X\supseteq(x\_0-\eta,x\_0+\eta)$，则我们有$\lim\limits\_{x\to x\_0}f(x)=a$；
    2. **右极限**：$\exists\eta>0,X\supseteq(x\_0,x\_0+\eta)$，则我们有$\lim\limits\_{x\to x\_0^+}f(x)=a$；
    3. **左极限**：$\exists\eta>0,X\supseteq(x\_0-\eta,x\_0)$，则我们有$\lim\limits\_{x\to x\_0^-}f(x)=a$；
2. $x\_0\in\mathbb{R},a\in\\{\infty,\pm\infty\\}$，极限及其左右极限，共9种情况；
3. $x\_0\in\\{\infty,\pm\infty\\},a\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，共12种情况。

函数在某点（包括$\infty$）极限存在等价于其左右极限存在且相等。

### 函数极限的性质

函数极限与数列极限的关系：设$X$为非空数集，$x\_0$为$X$的极限点，$f:X\to\mathbb{R}$为函数，而$a\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，那么$\lim\limits\_{X\ni x\to x\_0}f(x)=a\Leftrightarrow$对$X\setminus\\{x\_0\\}$中极限为$x\_0$的任意数列$\\{a\_n\\}$，有$\lim\limits\_{n\to\infty}f(a\_n)=a$。

函数极限有以下性质：

1. 唯一性；
2. 局部有界性：对于$\lim\limits\_{X\ni x\to x\_0}f(x)=a$，则$\exists\delta,M>0,\forall x\in\mathring{B}\_X(x\_0,\delta),|f(x)|<M$；
3. 局部保序：对于$\lim\limits\_{X\ni x\to x\_0}f(x)=a,\lim\limits\_{X\ni x\to x\_0}g(x)=b$：
    1. $a>b\Rightarrow\exists\delta>0,\forall x\in\mathring{B}\_X(x\_0,\delta),f(x)>g(x)$；
    2. $\exists\delta>0,\forall x\in\mathring{B}\_X(x\_0,\delta),f(x)\geq g(x)\Rightarrow a\geq b$。
4. 局部保序：上述$g(x)$恒取$0$可得到的推论。

有5条定理：

1. 函数极限遵守四则运算和广义四则运算法则（包含了$\infty$）；
2. 此外也有**夹逼原理**：$\exists\delta>0,\forall x\in\mathring{B}\_X(x\_0,\delta),g(x)\leq f(x)\leq h(x)$且$\lim\limits\_{X\ni x\to x\_0}g(x)=\lim\limits\_{X\ni x\to x\_0}h(x)=a\in\mathbb{R}\cup\\{\pm\infty\\}$，则$\lim\limits\_{X\ni x\to x\_0}f(x)=a$；
3. 复合函数极限：设$X,Y$为非空数集，$x\_0$为$X$的极限点而$y\_0\in\mathbb{R}\cup\\{\infty,\pm\infty\\}$，且函数$f:X\to\mathbb{R},g:Y\to\mathbb{R}$，满足$\forall x\in X\setminus\\{x\_0\\},f(x)\in Y\setminus\\{y\_0\\}$且$\lim\limits\_{X\ni x\to x\_0}f(x)=y\_0,\lim\limits\_{Y\ni y\to y\_0}g(y)=a$，则$\lim\limits\_{X\ni x\to x\_0}g(f(x))=a$；
4. 单调有界定理：
    1. 左极限：设$x\_0\in\mathbb{R}\cup\\{+\infty\\},\eta\in\mathbb{R}\cup\\{-\infty\\},f:(\eta,x\_0)\to\mathbb{R}$为单调函数，$\lim\limits\_{x\to x\_0^-}$存在。若$f$递增，$\operatorname{Im}(f)$是上确界。若$f$递增，$\operatorname{Im}(f)$是下确界。还有与之类似的右极限的情况；
    2. 左右极限：设$f:(a,b)\to\mathbb{R}$为单调函数而$x\_0\in(a,b)$，$\lim\limits\_{x\to x\_0^-}f(x),\lim\limits\_{x\to x\_0^+}f(x)$存在且有限。若$f$递增，$\lim\limits\_{x\to x\_0^-}f(x)\leq f(x\_0)\leq\lim\limits\_{x\to x\_0^+}f(x)$。若$f$递减，$\lim\limits\_{x\to x\_0^-}f(x)\geq f(x\_0)\geq\lim\limits\_{x\to x\_0^+}f(x)$。
5. Cauchy准则：设$X$为非空数集，$x\_0$为其极限点，$f:X\to\mathbb{R}$为函数，则极限$\lim\limits\_{X\ni x\to x\_0}f(x)$存在且有限$\Leftrightarrow\forall\epsilon>0,\exists\delta>0,\forall x,x'\in\mathring{B}\_X(x\_0,\delta),|f(x)-f(x')|<\epsilon$。

### 无穷小量与无穷大量

极限为0的函数被称为**无穷小量**。若$\lim\limits\_{X\ni x\to x\_0}\alpha(x)=0$，则记$\alpha(x)=o(1)(X\ni x\to x\_0)$。极限为无穷的函数称为**无穷大量**。

设$\lim\limits\_{X\ni x\to x\_0}\alpha(x)=\lim\limits\_{X\ni x\to x\_0}\beta(x)=0$且$\beta(x)\neq 0$：

1. 如果$\lim\limits\_{X\ni x\to x\_0}\frac{\alpha(x)}{\beta(x)}=0$，则称$X\ni x\to x\_0$时，$\alpha(x)$是$\beta(x)$的**高阶无穷小量**，记作$\alpha(x)=o(\beta(x))(X\ni x\to x\_0)$；
2. 如果$\lim\limits\_{X\ni x\to x\_0}\frac{\alpha(x)}{\beta(x)}=c\neq 0$，则称$X\ni x\to x\_0$时，$\alpha(x)$与$\beta(x)$为**同阶无穷小量**；
3. 如果$\lim\limits\_{X\ni x\to x\_0}\frac{\alpha(x)}{\beta(x)}=1$，则称$X\ni x\to x\_0$时，$\alpha(x)$与$\beta(x)$为**等价无穷小量**，记作$\alpha(x)\sim\beta(x)(X\ni x\to x\_0)$；
4. 设$x\_0\in\mathbb{R},r\in\mathbb{N}^*$如果$\lim\limits\_{X\ni x\to x\_0}\frac{\alpha(x)}{(x-x\_0)^r}=c\neq 0$，则称$X\ni x\to x\_0$时，$\alpha(x)$为 **$r$阶无穷小量**。

等价无穷小量的代换是求极限的方法之一。无穷大量也有类似的定义。

### 函数的连续与间断

设$X$为数集，$x\_0\in X,f:X\to\mathbb{R}$为函数。若$\forall\epsilon>0,\exists\delta>0,\forall x\in B(x\_0,\delta),|f(x)-f(x\_0)|<\epsilon$，则称$f$在点$x\_0$**连续**。若$f$在$X$的每点连续，则称$f$为$X$的连续函数。这样连续函数的集合记为$C(X)$。若$x\_0$为$X$的极限点，则$f$在点$x\_0$连续$\Leftrightarrow\lim\limits\_{X\ni x\to x\_0}f(x)=f(x\_0)$。

若$\lim\limits\_{x\to x\_0^-}f(x)=f(x\_0)$，称$f$在点$x\_0$**左连续**；若$\lim\limits\_{x\to x\_0^+}f(x)=f(x\_0)$，称$f$在点$x\_0$**右连续**。

有如下的定理：

1. 函数在某点（内点）连续$\Leftrightarrow$函数在该点左、右连续；
2. 设$X$为数集，$x\_0\in X$，则$f:X\to\mathbb{R}$在点$x\_0$处连续$\Leftrightarrow$对$X$中收敛到$x\_0$的任意数列$\\{a\_n\\}$，均有$\lim\limits\_{n\to\infty}f(a\_n)=f(x\_0)$；
3. 设$X$为数集，$x\_0\in X$而$f,g:X\to\mathbb{R}$：
    1. 局部有界：若$f$在点$x\_0$处连续，则$\exists\delta>0,\forall x\in B\_X(x\_0,\delta),|f(x)|<1+|f(x\_0)|$；
    2. 局部保序：设$f,g$在点$x\_0$处连续
    3. $f(x\_0)>g(x\_0)\Rightarrow\exists\delta>0\forall x\in B\_X(x\_0,\delta),f(x)>g(x)$；
    4. $\exists\delta>0\forall x\in B\_X(x\_0,\delta),f(x)\geq g(x)\Rightarrow f(x\_0)\geq g(x\_0)$。
    5. 局部保号：上述$g$恒为0的特殊情况；
4. 四则运算法则：连续函数的四则运算也连续；
5. 复合法则：连续函数函数的复合也连续。

初等函数在其定义域内连续。

**间断点**的分类：

1. $\lim\limits\_{X\ni x\to x\_0}f(x)$存在且有限，但异于$f(x\_0)$或$f$在$x\_0$处无定义，称点$x\_0$为$f$的**可去间断点**；
2. 若左右极限存在且有限，但不相等，称改点为$f$的**跳跃间断点**
3. 可去间断点及跳跃间断点合称为**第一类间断点**，其余的称为**第二类间断点**，它的至少一个单侧极限不存在或无限。

单调函数只能有第一类间断点（否则与单调有界定理矛盾）。

### 闭区间上连续函数的性质

有如下的定理：

1. **连续函数介值定理**：若$f\in C[a,b],\forall\mu$介于$f(a)$和$f(b)$之间，则$\exists\xi\in[a,b],f(\xi)=\mu$。推论：**零点存在定理**：若$f\in C[a,b],f(a)f(b)\leq 0$，则$\exists\xi\in[a,b],f(\xi)=0$；
    1. 若$X$为区间，$f\in C(X)$，则$\operatorname{Im}f$为区间；
    2. 若$X$为区间，$f\in C(X)$为单射，则$f$为严格单调函数；
    3. 若$X$为区间，$f$为单调函数，则$f\in C(X)\Leftrightarrow\operatorname{Im}f$是区间。
2. **反函数定理**：若$X$为区间，$f\in C(X)$为单射，则反函数$f^{-1}:\operatorname{Im}f\to X$存在且连续；
3. **最值定理**：若$f\in C[a,b]$，则$f$有最值。

## 函数的导数

### 导数与微分的概念

设$f:(a,b)\to\mathbb{R}$为函数，$x\_0\in(a,b)$。若$\lim\limits\_{x\to x\_0}\frac{f(x)-f(x\_0)}{x-x\_0}=\lim\limits\_{h\to 0}\frac{f(x\_0+h)-f(x\_0)}{h}$存在且有限，则称$f$在点$x\_0$处**可导**，该极限称为$f$在点$x\_0$处的**导数**，记作$f'(x\_0),\frac{dy}{dx}\Big|\_{x=x\_0},\frac{df}{dx}(x\_0)$。若$f$在$(a,b)$处处可导，则称$f$在$(a,b)$上可导，由此得到的函数$f'$称为$f$的**导函数**。此外还有**单侧导数**：

1. 左导数：$f'\_-(x\_0):=\lim\limits\_{x\to x\_0^-}\frac{f(x)-f(x\_0)}{x-x\_0}$；
2. 右导数：$f'\_+(x\_0):=\lim\limits\_{x\to x\_0^+}\frac{f(x)-f(x\_0)}{x-x\_0}$。

函数在某点可导$\Leftrightarrow$函数在该点左右导数存在有限且相等。若函数在某点可导，则函数在该点连续。

设$f:(a,b)\to\mathbb{R}$为函数，$x\_0\in(a,b)$。若$\exists A\in\mathbb{R}$，使得$f(x\_0+h)-f(x\_0)=Ah+o(h)(h\to 0)$，则称$f$在点$x\_0$处**可微**，此时还称线性函数$h\mapsto Ah$为$f$在点$x\_0$的**微分**，记作$df(x\_0),dy\Big|\_{x=x\_0}$。如果函数$f$在$(a,b)$处处可微，则称$f$在$(a,b)$上可微。

函数在某点可微$\Leftrightarrow$函数在该点可导。此时$df(x\_0)=f'(x\_0)dx$。

### 求导法则

有如下定理：

1. 导数的四则运算：若$f,g:(a,b)\to\mathbb{R}$在点$x\_0\in(a,b)$处可导，则：
    1. $\forall\lambda,\mu\in\mathbb{R},(\lambda f+\mu g)'(x\_0)=\lambda f'(x\_0)+\mu g'(x\_0)$；
    2. $(fg)'(x\_0)=f'(x\_0)g(x\_0)+f(x\_0)g'(x\_0)$；
    3. $\left(\frac{f}{g}\right)'(x\_0)=\frac{f'(x\_0)g(x\_0)-f(x\_0)g'(x\_0)}{(g(x\_0))^2}$，若$g(x\_0)\neq 0$。推论：$\left(\frac{1}{g}\right)'(x\_0)=-\frac{g'(x\_0)}{(g(x\_0))^2}$。
2. 复合函数求导的**链式法则**：$(f\circ g)'(x\_0)=f'(g(x\_0))g'(x\_0)$；
3. 反函数求导法则：设函数$f:(a,b)\to(c,d)$为双射，在点$x\_0$可导且$f'(x\_0)\neq 0$，若$f^{-1}:(c,d)\to(a,b)$在点$y\_0=f(x\_0)$处连续，则$f^{-1}$在点$y\_0$处可导，且$(f^{-1})'(y\_0)=\frac{1}{f'(x\_0)}$；
4. 初等函数在其定义域内内部可导，且导函数也为初等函数。

**隐函数求导**：在两变量的方程$f(x,y)=0$中，将$y$看成$x$的函数，对$x$求导后解出$y'=\frac{dy}{dx}$。

**参数方程求导**：$\frac{dy}{dx}=\frac{\frac{dy}{dt}}{\frac{dx}{dt}}$。

### 高阶导数

$f$的 **$n$阶导数**记作$f^{(n)},\frac{d^nf}{dx^n}$。若$f$ $n$阶可导且$f^{(n)}$连续，那么称$f$为$n$阶连续可导。这样的函数的集合记为$C^{n}$。

有如下定理：

1. 初等函数在其定义域内内部无穷可导；
2. 高阶导数的四则运算：若$f,g:(a,b)\to\mathbb{R}$为$n$阶可导，则：
    1. $\forall\lambda,\mu\in\mathbb{R},(\lambda f+\mu g)^{(n)}=\lambda f^{(n)}+\mu g^{(n)}$；
    2. $(fg)^{(n)}=\sum\limits\_{k=0}^n\binom{n}{k}f^{(k)}g^{(n-k)}$。

## 导数的应用

### 微分中值定理

极值的定义：设$X$为数集，$x\_0\in X$，$f:X\to\mathbb{R}$，若$\exists\delta>0,B(x\_0,\delta)\subseteq X\land\forall x\in B(x\_0,\delta),f(x)\geq f(x\_0)$，则称$x\_0$为$f$的**极小值点**，称$f(x\_0)$为**极小值**，类似可以定义**极大值点**和**极大值**。

有如下定理：

1. Fermat（费马）：设$x\_0$为$f$的极值点，若$f$在$x\_0$处可导，则$f'(x\_0)=0$。导数为0的点称为驻点；
2. Darboux（达布）导数介值定理：若$f$在$[a,b]$上可导，而$\mu$严格介于$f'\_+(a),f'\_-(b)$之间，则$\exists\xi\in(a,b),f'(\xi)=\mu$；
    - 推论：若$f$在某个区间上可导，则其导函数的像集为区间。若$f'$恒不为0，则它恒正或恒负。
3. Rolle（罗尔）：若$f\in C[a,b]$在$(a,b)$内可导且$f(a)=f(b)$，则$\exists\xi\in(a,b),f'(\xi)=0$；
4. Lagrange拉格朗日中值定理：若$f\in C[a,b]$在$(a,b)$内可导，则$\exists\xi\in(a,b),f'(\xi)=\frac{f(b)-f(a)}{b-a}$；
    1. 设$f\in C[a,b]$在$(a,b)$内可导，则$f$为常值函数$\Leftrightarrow\forall x\in(a,b),f'(x)=0$；
    2. 设$f,g\in C[a,b]$在$(a,b)$内可导，若$\forall x\in(a,b),f'(x)=g'(x)$，则$\exists C\in\mathbb{R},\forall x\in[a,b],f(x)=g(x)+C$；
    3. 反函数定理：若$f\in C[a,b]$在$(a,b)$内可导且$f'$不为0，则$f$为单射且反函数可导。
5. Cauchy柯西中值定理：设$f\in C[a,b]$在$(a,b)$内可导，则$\exists\xi\in(a,b),(f(b)-f(a))g'(\xi)=(g(b)-g(a))f'(\xi)$。

### L'Hospital（洛必达）法则

设$-\infty\leq a<b\leq+\infty$，函数$f,g:(a,b)\in\mathbb{R}$可导，而$g'$恒不为0，且$\lim\limits\_{x\to a^+}\frac{f'(x)}{g'(x)}=\alpha\in\mathbb{R}\cup\\{\pm\infty,\infty\\}$，若$\lim\limits\_{x\to a^+}f(x)=\lim\limits\_{x\to a^+}g(x)=0$，或$\lim\limits\_{x\to a^+}g(x)=\infty$，则我们有$\lim\limits\_{x\to a^+}\frac{f(x)}{g(x)}=\alpha$。极限过程换成$x\to a^-$和$x\to a$仍成立。

### Taylor（泰勒）公式

有如下定理：

1. 带Peano（皮亚诺）余项的Taylor公式：设$n\geq 1$为整数，$x\_0\in\mathbb{R}$，函数$f:B(x\_0)\to\mathbb{R}$为$n-1$阶可导，且在点$x\_0$为$n$阶可导。则当$x\to x\_0$时，$f(x)=\sum\limits\_{x=0}^n\frac{f^{(k)}(x\_0)}{k!}(x-x\_0)^k+o((x-x\_0)^n)$。当$x\_0=0$时，该公式也称为Maclaurin（麦克劳林）公式；
2. 带Lagrange余项的Taylor公式：设$n\geq 1$为整数，$f\in C^{(n)}[a,b]$在(a,b)上$n+1$阶可导，那么$\forall x\_0,x\in[a,b](x\_0\neq x),\exists\xi$严格介于$x\_0,x$之间，使得$f(x)=\sum\limits\_{x=0}^n\frac{f^{(k)}(x\_0)}{k!}(x-x\_0)^k+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x\_0)^{(n+1)}$。

- 推论：如果$f\in C^{(n)}[a,b]$在$(a,b)$上的$n+1$阶导数恒为0，则$f$为次数不超过$n$的多项式。

### 函数的增减性与极值问题

对于函数的增减性，有如下定理：

1. 若$f\in C[a,b]$在$(a,b)$内可导，则$f$递增$\Leftrightarrow\forall x\in(a,b),f'(x)\geq 0$；$f$递减$\Leftrightarrow\forall x\in(a,b),f'(x)\leq 0$；
2. 若$f\in C[a,b]$在$(a,b)$内可导，则$f$严格递增$\Leftrightarrow\forall x\in(a,b),f'(x)\geq 0$且$f'$在$(a,b)$的任意子区间不恒为0；$f$严格递减$\Leftrightarrow\forall x\in(a,b),f'(x)\leq 0$且$f'$在$(a,b)$的任意子区间不恒为0。

对于函数的极值，有如下定理：

1. 设$x\_0\in(a,b),f\in C(a,b)$在$(a,b)\setminus\\{x\_0\\}$上可导，若$\forall x\in(a,x\_0),f'(x)\geq 0,\forall x\in(x\_0,b),f'(x)\leq 0$，则$x\_0$为$f$的最大值点，也为极大值点；若$\forall x\in(a,x\_0),f'(x)\leq 0,\forall x\in(x\_0,b),f'(x)\geq 0$，则$x\_0$为$f$的最小值点，也为极小值点；
2. 设$f:(a,b)\to\mathbb{R}$可导，$x\_0\in(a,b), f'(x\_0)=0$，且$f''(x\_0)$存在，若$f''(x\_0)<0$，则$x\_0$为$f$的极大值点；若$f''(x\_0)>0$，则$x\_0$为$f$的极小值点；若$f''(x\_0)=0$，无法判断。

### 凸函数

凸函数的定义：设$I$为区间，而$f:I\to\mathbb{R}$为函数：

1. 若$\forall x,y\in I,\forall\lambda\in(0,1),f(\lambda x+(1-\lambda)y)\leq\lambda f(x)+(1-\lambda)f(y)$，则称$f$为$I$上的**下凸函数**，简称**凸函数**；
2. 若$\forall x,y\in I(x\neq y),\forall\lambda\in(0,1),f(\lambda x+(1-\lambda)y)<\lambda f(x)+(1-\lambda)f(y)$，则称$f$为$I$上的**严格下凸函数**，也称**严格凸**；
3. 若$\forall x,y\in I,\forall\lambda\in(0,1),f(\lambda x+(1-\lambda)y)\geq\lambda f(x)+(1-\lambda)f(y)$，则称$f$为$I$上的**上凸函数**，简称**凹函数**；
4. 若$\forall x,y\in I(x\neq y),\forall\lambda\in(0,1),f(\lambda x+(1-\lambda)y)>\lambda f(x)+(1-\lambda)f(y)$，则称$f$为$I$上的**严格上凸函数**，也称**严格凹**。

有如下定理：

1. 函数$f$为区间$I$上的凸函数$\Leftrightarrow\forall n\in\mathbb{N}^*,\forall x\_1,x\_2,\cdots,x\_n \in I,\forall \lambda\_1,\lambda\_2,\cdots,\lambda\_n\geq 0$，若$\lambda\_1+\lambda\_2+\cdots+\lambda\_n=1$，则$f(\sum\limits\_{k=1}^n\lambda\_kx\_k)\leq\sum\limits\_{k=1}^n\lambda\_kf(x\_k)$；
2. 函数$f$为区间$I$上的凸函数$\Leftrightarrow x\_1,x\_2,x\_3\in I$，当$x\_1<x\_2<x\_3$时，均有$\frac{f(x\_2)-f(x\_1)}{x\_2-x\_1}\leq\frac{f(x\_3)-f(x\_1)}{x\_3-x\_1}\leq\frac{f(x\_3)-f(x\_2)}{x\_3-x\_2}$；
3. 若$f\in C[a,b]$在$(a,b)$内可导，则$f$为凸函数$\Leftrightarrow f'$在$(a,b)$上递增；
4. 若$f\in C[a,b]$在$(a,b)$上二阶可导，则$f$为凸函数$\Leftrightarrow\forall x\in(a,b),f''(x)\geq 0$；
5. 若$f\in C[a,b]$在$(a,b)$上二阶可导，则$f$为严格凸函数$\Leftrightarrow\forall x\in(a,b),f''(x)\geq 0$且$f''$在$(a,b)$的任意子区间上不恒为0。

函数凹凸性发生改变的点为**拐点**。

### 函数作图

渐近线的定义：设曲线$\Gamma$由方程$y=f(x)$给出：

1. 若$L\in\mathbb{R},\lim\limits\_{x\to-\infty}f(x)=L$或$\lim\limits\_{x\to+\infty}f(x)=L$，则称$y=L$为曲线$\Gamma$的**水平渐近线**；
2. 若$x\_0\in\mathbb{R},\lim\limits\_{x\to x\_0^-}f(x)=\infty$或$\lim\limits\_{x\to x\_0^+}f(x)=\infty$，则称$x=x\_0$为曲线$\Gamma$的**竖直渐近线**；
3. 若$k,b\in\mathbb{R},k\neq 0,\lim\limits\_{x\to+\infty}(f(x)-kx-b)=0$或$\lim\limits\_{x\to-\infty}(f(x)-kx-b)=0$，则称$y=kx+b$为曲线$\Gamma$的斜渐近线。

## Riemann（黎曼）积分

### Riemann积分的概念

设$f:[a,b]\to\mathbb{R}$为函数：

1. **分割**：称$P:a=x\_0<x\_1<\cdots<x\_n=b$为$[a,b]$的分割，它将$[a,b]$分成内部不相交的小区间$\Delta\_i=[x\_{i-1},x\_i] (1\leq i\leq n)$。令$\Delta x\_i:=x\_i-x\_{i-1}(1\leq i\leq n)$，步长$\lambda(P):=\max\limits\_{1\leq i\leq n}\Delta x\_i$；
2. **取点**：称$\xi=\\{\xi\_1,\xi\_2,\cdots,\xi\_n\\}$为分割$P$的取点，其中$\xi\_i\in[x\_{i-1},x\_i] (1\leq i\leq n)$。此时称$(P,\xi)$为$[a,b]$的**带点分割**；
3. **Riemann和**：对$[a,b]$的带点分割$(P,\xi)$，令$\sigma(f;P,\xi)=\sum\limits\_{i=1}^nf(\xi\_i)\Delta x\_i$，称为$f$关于带点分割$(P,\xi)$的Riemann和；
4. **Riemann积分**：若$\exists I\in\mathbb{R},\forall\epsilon>0,\exists\delta>0$，对于$[a,b]$的任意带点分割$(P,\xi)$，当$\lambda(P)<\delta,|\sigma(f;P,\xi)-I|<\epsilon$。此时记$I=\lim\limits\_{\lambda(P)\to 0}\sigma(f;P,\xi)=\lim\limits\_{\lambda(P)\to 0}\sum\limits\_{i=1}^nf(\xi\_i)\Delta x\_i$，称为$f$在$[a,b]$上的**定积分**，简记为$I=\int\_a^bf(x)dx$，并且称$f$在$[a,b]$上可积，否则称之为不可积。

记$R[a,b]$为$[a,b]$上所有可积函数的集合。若$f\in R[a,b]$，则$f$在$[a,b]$上有界。

判断函数可积的**Darboux准则**：设$f:[a,b]\to\mathbb{R}$为有界函数，而$P:a=x\_0<x\_1<\cdots<x\_n=b$为$[a,b]$的分割。对于$1\leq i\leq n$，定义$m\_i=\inf\limits\_{x\in\Delta\_i}f(x),M\_i=\sup\limits\_{x\in\Delta\_i}f(x)$，Darboux下和$L(f;P)=\sum\limits\_{i=1}^nm\_i\Delta x\_i$，Darboux上和$U(f;P)=\sum\limits\_{i=1}^nM\_i\Delta x\_i$。有如下定理：

1. 设$f:[a,b]\to\mathbb{R}$为有界函数，而$P\_1,P\_2$为$[a,b]$的两个分割，则$L(f;P\_1)\leq U(f;P\_2)$。由此定义下积分$\underline{\int\_a^b}f(x)dx=\sup\limits\_PL(f;P)$，上积分$\overline{\int\_a^b}f(x)dx=\inf\limits\_PU(f;P)$，我们有$L(f;P)\leq\underline{\int\_a^b}f(x)dx\leq\overline{\int\_a^b}f(x)dx\leq U(f;P)$；
2. 设$f:[a,b]\to\mathbb{R}$为有界函数，而$P$为$[a,b]$的分割，则$L(f:P)=\inf\limits\_\xi\sigma(f;P,\xi),U(f:P)=\sup\limits\_\xi\sigma(f;P,\xi)$；
3. Darboux：设$f:[a,b]\to\mathbb{R}$为有界函数，则下述结论等价：
    1. $f\in R[a,b]$；
    2. $\forall\epsilon>0$，存在$[a,b]$的分割$P$使得$U(f;P)-L(f;P)<\epsilon$；
    3. $\underline{\int\_a^b}f(x)dx=\overline{\int\_a^b}f(x)dx$；
    4. $\lim\limits\_{\lambda(P)\to 0}(U(f;P)-L(f;P))=0$。

利用振幅刻画函数的可积性：设$X$为非空数集，而$f:X\to\mathbb{R}$为有界函数，对于任意非空子集$J\subseteq X$，定义$\omega(f;J):=\sup\limits\_{x,y\in J}|f(x)-f(y)|$，并称之为$f$在$J$上的**振幅**。则有$\omega(f;J)=\sup\limits\_{x\in J}f(x)-\inf\limits\_{x\in J}f(x)$。有如下定理：

- $f\in R[a,b]\Leftrightarrow\lim\limits\_{\lambda(P)\to 0}\sum\limits\_{i=1}^n\omega(f;\Delta\_i)\Delta x\_i=0$。

一致连续函数：设$X$为非空数集，$f:X\to\mathbb{R}$为函数，若$\forall\epsilon>0,\exists\delta>0,\forall x,y\in X$，当$|x-y|<\delta$时，有$|f(x)-f(y)|<\epsilon$，则称$f$为**一致连续**。有如下定理：

1. 函数$f$为一致连续$\Leftrightarrow$对于$X$中任意的数列$\\{x\\},\\{y\\}$，若$\lim\limits\_{n\to\infty}(x\_n-y\_n)=0$，则$\lim\limits\_{n\to\infty}(f(x\_n)-f(y\_n))=0$；
2. 若$f\in C[a,b]$，则$f$为一致连续；

可积函数类有：

1. $C[a,b]\subseteq R[a,b]$；
2. 若$f:[a,b]\to\mathbb{R}$为有界函数并且存在有限多个点间断，则$f\in R[a,b]$；
3. 若$f:[a,b]\to\mathbb{R}$单调，则$f\in R[a,b]$；

Lebesgue判别准则：称数集$X$为零测度集，若$\forall\epsilon>0$，存在一列开区间$\\{(a\_n,b\_n)\\}$，使$X\subseteq\bigcup\limits\_{n=1}^\infty(a\_n,b\_n), \lim\limits\_{n\to\infty}\sum\limits\_{k=1}^n(b\_k-a\_k)<\epsilon$。区间$[a,b]$上的有界函数$f$为Riemann可积$\Leftrightarrow f$的所有间断点构成的集合是零测度集。

### Riemann积分的性质

有如下性质：

1. 积分的线性性：设$f,g\in R[a,b],\alpha,\beta\in\mathbb{R}$，则$\alpha f+\beta g\in R[a,b]$且$\int\_a^b(\alpha f(x)+\beta g(x))dx=\alpha\int\_a^bf(x)dx+\beta\int\_a^bg(x)dx$；
2. 积分区间的可加性：设$f:[a,b]\to\mathbb{R},c\in(a,b)$，则$f$在$[a,b]$上可积$\Leftrightarrow f$分别在$[a,c],[c,b]$上可积，此时$\int\_a^bf(x)dx=\int\_a^cf(x)dx+\int\_c^bf(x)dx$；
3. 保序性：若$f,g\in R[a,b]$且$f\geq g$，则$\int\_a^bf(x)dx\geq\int\_a^bg(x)dx$。特别地，若$\exists m,M\in\mathbb{R}, m\leq f\leq M$，则$m(b-a)\leq \int\_a^bf(x)dx\leq M(b-a)$；
    1. 保号性：若$f\in R[a,b]$非负，则$\int\_a^bf(x)dx\geq 0$；
    2. 严格保号性：若$f\in C[a,b]$非负，则$\int\_a^bf(x)dx=0\Leftrightarrow f\equiv 0$；
    3. 严格保序性：若$f,g\in C[a,b]$且$f\geq g$，则$\int\_a^bf(x)dx\geq\int\_a^bg(x)dx$，等号成立$\Leftrightarrow f\equiv g$。
4. 若$f\in R[a,b]$，则$|f|\in R[a,b]$且$|\int\_a^bf(x)dx|\leq\int\_a^b|f(x)|dx$；
5. 若$f,g\in R[a,b]$，则$fg\in R[a,b]$。

有如下定理：

1. Cauchy不等式：若$f,g\in R(a,b)$，则$\left(\int\_a^bf(x)g(x)dx\right)^2\leq\left(\int\_a^b(f(x))^2\right)\left(\int\_a^b(g(x))^2\right)$。
2. 经典的Hölder不等式：若$x\_k,y\_k,p,q>0(1\leq k\leq n),\frac{1}{p}+\frac{1}{q}=1$，则$\sum\limits\_{k=1}^nx\_ky\_k\leq\left(\sum\limits\_{k=1}^nx\_k^p\right)^{\frac{1}{p}}\left(\sum\limits\_{k=1}^ny\_k^q\right)^{\frac{1}{q}}$，且等号成立$\Leftrightarrow x\_k^py\_k^{-q}$为不依赖$k$的常数。积分Hölder不等式：若$f,g\in C[a,b],p,q>1$且$\frac{1}{p}+\frac{1}{q}=1$，则$\left|\int\_a^bf(x)g(x)dx\right|=\left(\int\_a^b|f(x)|^p\right)^{\frac{1}{p}}\left(\int\_a^b|g(x)|^q\right)^{\frac{1}{q}}$。
3. 积分第一中值定理：若$f\in C[a,b]$，则$\exists\xi\in[a,b],\int\_a^bf(x)dx=f(\xi)(b-a)$。

- 广义积分第一中值定理：若$f,g\in C[a,b]$且$g$不变号，则$\exists\xi\in[a,b],\int\_a^bf(x)g(x)dx=f(\xi)\int\_a^bg(x)dx$。

### 微积分基本定理

原函数的定义：设$J$为区间，$F,f:J\to\mathbb{R}$为函数，若$F$在$J$上连续，在$J$内部可导且$F'=f$，则称$F$为$f$的一个**原函数**。

有如下定理：

1. 设$f\in R[a,b]$，$\forall x\in[a,b]$，定义$F(x)=\int\_a^xf(t)dt$，则$F\in C[a,b]$，若$f$在点$x\_0\in[a,b]$连续，则$F$在点$x\_0$处可导且$F'(x\_0)=f(x\_0)$，若$f$仅有单侧连续，则$F$有相应的单侧导数；
    1. 若$f\in C[a,b]$，则$F\in C^{(1)}[a,b]$且$F'=f$，即$F$为$f$在$[a,b]$上的一个原函数；
    2. 若$f\in C[a,b]$，$\phi,\psi:[\alpha,\beta]\to[a,b]$可导，$\forall u\in[\alpha,\beta]$，令$G(u)=\int\_{\psi(u)}^{\phi(u)}f(t)dt$，则$G$可导且$\forall u\in[\alpha,\beta], G'(u)=f(\phi(u))\phi'(u)-f(\psi(u))\psi'(u)$。
2. Newton-Leibniz公式：设$f\in C[a,b], G\in C[a,b]$为$f$的一个原函数，则$\int\_a^bf(x)dx=G\big|\_a^b:=G(b)-G(a)$。

### 不定积分

将定义在区间上的函数$f$的原函数的一般表达式称为$f$的**不定积分**，记作$\int f(x)dx$。

有如下性质：

1. 若$F,G$均为$f$的原函数，则$\exists C\in\mathbb{R},G-F=C$，故$\int f(x)dx=F(x)+C$（$C$为常数）；
2. 若$f\in C[a,b]$，则$\int f(x)dx=\int\_a^xf(t)dt+C$；
3. 线性性：$\forall\alpha,\beta\in\mathbb{R},\int(\alpha f(x)+\beta g(x))dx=\alpha\int f(x)dx+\beta\int g(x)dx$。

有跳跃间断点的函数没有原函数。

有如下的积分法：

1. 第一换元积分法（凑微分）：$\int f(u(x))u'(x)dx=\int f(u(x))du(x)=F(u(x))+C$；
2. 第二换元积分法：$\int f(x)dx\stackrel{x=x(t)}{=}\int f(x(t))x'(t)dt=F(t)+C\stackrel{t=t(x)}{=}F(t(x))+C$；
3. 分部积分法：$\int udv=uv-\int vdu$。

有理函数的不定积分：有理真分式最终可以分解成如下4种最简单的分式之和：（$m\geq 2$）$\frac{A}{x-\alpha},\frac{A}{(x-\alpha)^m},\frac{Ax+B}{x^2+px+q},\frac{Ax+B}{(x^2+px+q)^m}(p^2-4q<0)$，经过变量替换，可以归结成下述6种最简单的分式的不定积分（$a>0$）：$\frac{1}{x-\alpha},\frac{1}{(x-\alpha)^m},\frac{x}{x^2+a^2},\frac{1}{x^2+a^2},\frac{x}{(x^2+a^2)^m},\frac{1}{(x^2+a^2)^m}$，这些不定积分有公式可用。

三角有理函数的不定积分：设$R(u,v)$为关于$u,v$的有理函数，则$\int R(\sin x,\cos x)dx\stackrel{t=\tan\frac{x}{2}}{=}\int R\left(\frac{2t}{1+t^2},\frac{1-t^2}{1+t^2}\right)\frac{2}{1+t^2}dt$。

某些无理函数的不定积分：考虑不定积分$\int R(x,y(x))dx$：

1. $y(x)=\sqrt[n]{\frac{ax+b}{cx+d}},(ad-bc\neq 0)$：$\int R\left(x,\sqrt[n]{\frac{ax+b}{cx+d}}\right)\stackrel{t=\sqrt[n]{\frac{ax+b}{cx+d}}}{=}\int R\left(\frac{dt^n-b}{a-ct^n},t\right)\frac{n(ad-bc)t^{n-1}}{(a-ct^n)^2}dt
$；
2. $y(x)=\sqrt{ax^2+bx+c},(a\neq 0)$：先配方，再用三角函数将原来的不定积分转化为三角有理函数的不定积分。

### 定积分的计算

有如下定理：

1. 定积分的换元积分公式：若$f\in C[a,b],\phi:[\alpha,\beta]\to[a,b]\in C^{(1)}$，则$\int\_{\varphi(\alpha)}^{\varphi(\beta)}f(x)dx=\int\_{\alpha}^{\beta}f(\phi(t))\phi'(t)dt$；
2. 定积分的分部积分公式：若$u,v\in C^{(1)}[a,b]$，则$\int\_a^bu(x)dv(x)=uv\Big|\_a^b-\int\_a^bv(x)du(x)$；
3. 积分的对称性：$f\in R[-a,a] (a>0)$，若$f$为奇函数，则$\int\_{-a}^af(x)dx=0$；若$f$为偶函数，则$\int\_{-a}^af(x)dx=2\int\_0^af(x)dx$；
4. 周期连续函数的定积分：如果$f\in C(\mathbb{R})$是周期为$T>0$的周期函数，则$\forall a\in\mathbb{R},\int\_a^{a+T}f(x)dx=\int\_0^Tf(x)dx$；
5. 定积分与数列极限：设$f\in R[a,b]$，而$\\{P\_n\\}$为$[a,b]$的一列分割，使得$\lim\limits\_{n\to\infty}\lambda(P\_n)=0$，记$P\_n=(x\_i^{(n)})\_{0\leq i\leq k\_n}$，则对任意点$\xi\_i^{(n)}\in[x\_{i-1}^{(n)},x\_i^{(n)}](1\leq i\leq k\_n)$，均有$\lim\limits\_{n\to\infty}\sum\limits\_{i=1}^{k\_n}f(\xi\_i^{(n)})(x\_i^{(n)}-x\_{i-1}^{(n)})=\int\_a^bf(x)dx$；
6. 带积分余项的Taylor：设$n\in\mathbb{N}$，若$f\in C^{(n+1)}[a,b],x\_0\in[a,b]$，则$\forall x\in[a,b],f(x)=\sum\limits\_{k=0}^n\frac{f^{(k)}(x\_0)}{k!}(x-x\_0)^k+\frac{1}{n!}\int\_{x\_0}^x(x-u)^nf^{(n+1)}(u)du$。

### 积分的应用

积分有如下的应用：

1. 平面面积：
    1. 直角坐标系：设$f,g\in C[a,b],\forall x\in[a,b], f(x)\geq g(x)$，则由曲线$y=f(x),y=g(x)$与直线$x=a,x=b$，所围平面区域的面积$S=\int\_a^b(f(x)-g(x))dx$；
    2. 直角坐标系下的参数方程：设曲线$\Gamma$的方程为$\begin{cases}x=x(t)\\\\y=y(t)\end{cases},(\alpha\leq t\leq\beta)$，其中$x,y$连续，$y\geq 0$，$x(t)$为严格递增，定义$a=x(\alpha),b=x(\beta)$，则由$\Gamma,x=a,x=b$和$x$轴所围区域的面积$S=\int\_a^by(t(x))dx\stackrel{x=x(t)}{=}\int\_{\alpha}^{\beta}y(t)x'(t)dt$；
    3. 极坐标系：设曲线弧$\overset{\frown}{AB}$的极坐标方程为$\rho=\rho(\theta)(\alpha\leq\theta\leq\beta)$，其中$\rho(\theta)$为连续函数，则曲线弧$\overset{\frown}{AB}$与射线$\theta=\alpha,\theta=\beta$所围成的区域的面积等于$S=\frac{1}{2}\int\_{\alpha}^{\beta}(\rho(\theta))^2d\theta$。
2. 曲线弧长：
    1. 直角坐标系下的参数方程：若曲线$\Gamma$的参数方程为$\begin{cases}x=x(t)\\\\y=y(t)\end{cases},(\alpha\leq t\leq\beta)$，其中$x(t),y(t)$为连续可导且导数不同时为0，这样的曲线称为光滑曲线，则弧长为$L=\int\_{\alpha}^{\beta}\sqrt{(x'(t))^2+(y'(t))^2}dt$；
    2. 直角坐标系：若曲线$\Gamma$的方程为$y=f(x)(a\leq x\leq b)$，其中$f$连续可导，则弧长为$L=\int\_a^b\sqrt{1+(f'(x))^2}dx$；
    3. 极坐标系：若曲线$\Gamma$的极坐标系方程为$\rho=\rho(\theta)(\alpha\leq\theta\leq\beta)$，其中$\rho(\theta)$连续可导，则弧长为$L=\int\_{\alpha}^{\beta}\sqrt{(\rho(\theta))^2+(\rho'(\theta))^2}d\theta$；
3. 曲线曲率：曲线**曲率**为$\kappa:=\left|\frac{d\alpha}{dl}\right|$，其中$\alpha$是切线与$x$轴正向的夹角：
    1. 直角坐标系下的参数方程：$\kappa=\frac{|x'y''-x''y'|}{(x')^2+(y')^2)^{\frac{3}{2}}}$；
    2. 直角坐标系：$\kappa=\frac{|y''|}{(1+(y')^2)^{\frac{3}{2}}}$；
    3. 极坐标系：$\kappa=\frac{|\rho^2+2(\rho')^2-\rho\rho''|}{(\rho^2+(\rho')^2)^{\frac{3}{2}}}$。
4. 旋转体体积：
    1. 绕$x$轴旋转：$V=\pi\int\_a^b(f(x))^2dx$；
    2. 绕$y$轴旋转：$V=2\pi\int\_a^bxf(x)dx$。
5. 旋转体的侧面积，绕$x$轴旋转：
    1. 直角坐标系下的参数方程：$S=2\pi\int\_{\alpha}^{\beta}|y(t)|\sqrt{(x'(t))^2+(y'(t))^2}dt$；
    2. 直角坐标系：$S=2\pi\int\_a^b|f(x)|\sqrt{1+(f'(x))^2}dx$；
    3. 极坐标系：$S=2\pi\int\_{\alpha}^{\beta}|\rho(\theta)\sin\theta|\sqrt{(\rho(\theta))^2+(\rho'(\theta))^2}f\theta$。

## 广义Riemann积分

### 广义Riemann积分的概念

设$a\in\mathbb{R},\omega\in(a,+\infty],f:[a,\omega)\to\mathbb{R},\forall A\in(a,\omega),f\in R[a,A]$，定义$f$在$[a,\omega)$上的**广义积分**为$\int\_a^{\omega}f(x)dx=\lim\limits\_{A\to\omega^-}\int\_a^Af(x)dx$。当$\omega\in\mathbb{R}$，而函数$f$在$\omega$的领域内无界，此时称$\omega$为$f$的**奇点**，相应的广义积分称为**瑕积分**。

广义积分继承了正常的定积分的性质，比如说线性性，保序性，Newton-Leibniz公式，分部积分，换元法。

### 广义积分收敛性的判定

有如下定理：

1. Cauchy准则：设$a\in\mathbb{R},\omega\in(a,+\infty],f:[a,\omega)\to\mathbb{R},\forall A\in(a,\omega),f\in R[a,A]$，则$\int\_a^\omega f(x)dx$收敛$\Leftrightarrow\forall\epsilon>0,\exists c\in(a,\omega),\forall A\_1,A\_2\in(c,\omega),\left|\int\_{A\_1}^{A\_2}f(x)dx\right|<\epsilon$；
2. 比较法则：设$f,g:[a,\omega)\to[0,+\infty)$在$[a,\omega)$的任意闭子区间上可积且$f(x)=O(g(x))(x\to\omega^-)$，若$\int\_a^{\omega}g(x)dx$收敛，则$\int\_a^{\omega}f(x)dx$收敛；若$\int\_a^{\omega}f(x)dx$发散，则$\int\_a^{\omega}g(x)dx$发散。有如下推论：
    1. 若$f:[a,\omega)\to[0,+\infty)$在$[a,\omega)$的任意闭子区间上可积，则$\int\_a^{\omega}f(x)dx$发散$\Leftrightarrow\int\_a^{\omega}f(x)dx=+\infty$；
    2. 设$f,g:[a,\omega)\to[0,+\infty)$在$[a,\omega)$的任意闭子区间上可积且$\lim\limits\_{x\to\omega^-}\frac{f(x)}{g(x)}=\alpha\in[0,+\infty]$，若$\alpha\in(0,+\infty)$，则$\int\_a^{\omega}g(x)dx$和$\int\_a^{\omega}f(x)dx$同敛散；若$\alpha=0$且$\int\_a^{\omega}g(x)dx$收敛，则$\int\_a^{\omega}f(x)dx$收敛；若$\alpha=+\infty$且$\int\_a^{\omega}g(x)dx$发散，则$\int\_a^{\omega}f(x)dx$发散；
    3. 设$f:[1,+\infty)\to[0,+\infty)$在$[1,+\infty)$的任意闭子区间上可积且$\lim\limits\_{x\to+\infty}\frac{f(x)}{\frac{1}{x^p}}=\lim\limits\_{x\to+\infty}x^pf(x)=\alpha\in[0,+\infty]$，若$p>1\land 0\leq\alpha<+\infty$，则$\int\_1^{+\infty}f(x)dx$收敛；若$p\leq 1\land 0<\alpha\leq+\infty$，则$\int\_1^{+\infty}f(x)dx$发散；
    4. 设$f:(0,b]\to[0,+\infty)$在$(0,b]$的任意闭子区间上可积且$\lim\limits\_{x\to 0^+}\frac{f(x)}{\frac{1}{x^p}}=\lim\limits\_{x\to 0^+}x^pf(x)=\alpha$，若$p<1\land 0\leq\alpha<+\infty$，则$\int\_0^bf(x)dx$收敛；若$p\geq 1\land 0<\alpha\leq+\infty$，则$\int\_0^bf(x)dx$发散；
3. 设$f:[a,\omega)\to\mathbb{R}$在$[a,\omega)$的任意闭子区间上可积，若$\int\_a^{\omega}|f(x)|dx$收敛，则$\int\_a^{\omega}f(x)dx$收敛；若$\int\_a^{\omega}|f(x)|dx$收敛，则称$\int\_a^{\omega}f(x)dx$**绝对收敛**；若$\int\_a^{\omega}f(x)dx$收敛但不绝对收敛，则称$\int\_a^{\omega}f(x)dx$**条件收敛**；
4. 积分第二中值定理：若$f\in R[a,b]$，而$g$在$[a,b]$上单调，则$\exists\xi\in[a,b],\int\_a^bf(x)g(x)dx=g(a)\int\_a^{\xi}f(x)dx+g(b)\int\_{\xi}^bf(x)dx$；
5. 设$f,g:[a,\omega)\to\mathbb{R}$在$[a,\omega)$的任意闭子区间上可积：
    1. Abel判别准则：若$\int\_a^{\omega}f(x)dx$收敛，$g$单调有界，则$\int\_a^{\omega}f(x)g(x)dx$收敛；
    2. Dirichlet判别准则：若$F(A)=\int\_a^Af(x)dx(A\in[a,\omega))$有界，而$g$单调且$\lim\limits\_{x\to\omega^-}g(x)=0$，则$\int\_a^{\omega}f(x)g(x)dx$收敛。

**$\Gamma$函数**：$\Gamma(s)=\int\_0^{+\infty}x^{s-1}e^{-x}dx$。$\Gamma(s)$收敛当且仅当$s>0$。有如下性质：

1. $\forall s>1,\Gamma(s)=(s-1)\Gamma(s-1)$。推论：$\forall n\in\mathbb{N},\Gamma(n+1)=n!$；
2. $\forall s\in(0,1),\Gamma(s)\Gamma(1-s)=\frac{\pi}{\sin s\pi}$。特别地，$\Gamma\left(\frac{1}{2}\right)=\sqrt{\pi}$。

**$B$函数**：$B(p,q)=\int\_0^1x^{p-1}(1-x)^{q-1}dx$。$B(p,q)$收敛当且仅当$p,q>0$。有如下性质：

1. $B(p,q)=B(q,p)$；
2. $B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$；
3. $B(p+1,q)=\frac{p\Gamma(p)\Gamma(q)}{(p+q)\Gamma(p+1)}=\frac{p}{p+q}B(p,q)$。

## 常微分方程

### 常微分方程的基本概念

等式$F(x,y,y',\cdots,y^{(n)})=0$被称为**常微分方程**。方程中导数的最高阶称为方程的**阶**，若$F$为线性函数，则称之为**线性常微分方程**。多个常微分方程组联立成**常微分方程组**。在区间$I$上满足$F(x,y,y',\cdots,y^{(n)})=0$的函数$y=y(x)$称为该方程在$I$上的一个**解**，称$I$为解的存在区间。如果该解含$n$个**独立常数**，则称为方程的**通解**。若不含常数，则称之为**特解**。没有包含在通解中的特解称为奇解。$n$阶常微分方程一般需要$n$个条件确定通解中的常数，这类条件称为**定解条件**。

### 一阶常微分方程的初等解法

一阶常微分方程的一般形式为$F(x,y,\frac{dy}{dx})=0$。一阶线性常微分方程的典型形式为$\frac{dy}{dx}+P(x)y=Q(x)$。如果$Q(x)\equiv 0$则称之为一阶线性齐次常微分方程，否则称之为一阶线性非齐次常微分方程。

有如下定理：

1. 一阶线性非齐次常微分方程的通解为方程的特解与相应的齐次方程的通解之和；
2. $\frac{dy}{dx}+P(x)y=0$的通解为$y=Ce^{-\int P(x)dx}$；
3. $\frac{dy}{dx}+P(x)y=Q(x)$的通解为$y=e^{-\int P(x)dx}\left(C+\int Q(x)e^{\int P(x)dx}dx\right)$（可通过常数变易法求）。

有如下求解方法：

1. 可分离变量的一阶常微分方程，$\frac{dy}{dx}=f(x)g(y)$：当$g(y)\neq 0$时，$\int\frac{dy}{g(y)}=\int f(x)dx+C$。此外当$g(y\_0)=0$时，$y\equiv y\_0$也为方程的解；
2. $\frac{dy}{dx}=f(ax+by+c)(b\neq 0)$：首先作变换$u=ax+by+c$，再利用分离变量法；
3. 齐次型一阶常微分方程，$\frac{dy}{dx}=F(\frac{y}{x})$：首先作变换$u=\frac{y}{x}$，再利用分离变量法；
4. $\frac{dy}{dx}=f(\frac{a\_1x+b\_1y+c\_1}{a\_2x+b\_2y+c\_2})(a\_1b\_2\neq a\_2b\_1)$：设直线$a\_1x+b\_1y+c\_1=0,a\_2x+b\_2y+c\_2=0$的交点为$(x\_0,y\_0)$，作变换$X=x-x\_0,Y=y-y\_0$，则方程化为齐次型一阶常微分方程；
5. Bernoulli方程，$\frac{dy}{dx}+p(x)y=q(x)y^{\alpha}(\alpha\neq 0\land\alpha\neq 1)$：作变换$z=y^{1-\alpha}$，则方程化为一阶线性常微分方程。

### 可降阶的高阶常微分方程

有如下求解方法：

1. $y^{(n)}=f(x)$：求$n$次原函数；
2. $y^{(n)}=F(x,y^{(k)},\cdots,y^{(n-1)})(k\geq 1)$：令$p(x)=y^{(k)}$，由$p^{(n-k)}=F(x,p,p',\cdots,p^{(n-k-1)})$解出$p=p(x)$，再对$y^{(k)}=p(x)$求$k$次原函数；
3. $F(y,\frac{dy}{dx},\frac{d^2y}{dx^2})=0$：令$p=\frac{dy}{dx}$，原方程变为$F(y,p,p\frac{dp}{dy})=0$，解出$p=p(y)$，再对$\frac{dy}{dx}=p(y)$应用分离变量法。

### 高阶线性常微分方程解的结构

$n$阶线性常微分方程的标准形式为$y^{(n)}+a\_{n-1}(x)y^{(n-1)}+\cdots+a\_1(x)y'+a\_0(x)y=f(x)$，其中$a\_0,\cdots,a\_{n-1},f$均为区间$I$上的连续函数，函数$f$被称为该方程的非齐次项。当$f\equiv 0$时，相应的方程为齐次方程。有如下基本结论：

1. 存在与唯一：$\forall x\_0\in I,\forall\xi\_0,\cdots,\xi\_{n-1}\in\mathbb{R}$，在区间$I$上均存在唯一的解$y=y(x)$使得$y^{(k)}(x\_0)=\xi\_k(0\leq k\leq n-1)$；
2. 齐次方程的解集：齐次方程的所有解组成的集合是一个$n$维的线性空间；
3. 非齐次方程的解集：非齐次方程的通解就是非齐次方程的特解与齐次方程的通解之和。

线性相关与线性无关：设函数$f\_1,\cdots,f\_n:I\to\mathbb{R}$，若存在不全为0的实数$c\_1,\cdots,c\_n$，使得$\forall x\in I,c\_1f\_1(x)+\cdots+c\_nf\_n(x)=0$，则称$f\_1,\cdots,f\_n$在$I$上**线性相关**，否则称$f\_1,\cdots,f\_n$在$I$上**线性无关**。

Wronsky（朗斯基）行列式：设$f\_1,f\_2,\cdots,f\_n\in C^{(n-1)}(I)$。定义$W(x):=W(f\_1,f\_2,\cdots,f\_n)(x):=\begin{vmatrix}
f\_1(x)  & f\_2(x)  & \cdots & f\_n(x)  \\\\
f\_1'(x) & f\_2'(x) & \cdots & f\_n'(x) \\\\
\vdots  & \vdots  &        & \vdots  \\\\
f\_1^{(n-1)}(x) & f\_2^{(n-1)}(x) & \cdots & f\_n^{(n-1)}(x)
\end{vmatrix}$，并称为$f\_1,f\_2,\cdots,f\_n$的**Wronsky行列式**。

有如下定理：

1. 若$f\_1,f\_2,\cdots,f\_n\in C^{(n-1)}(I)$在$I$上线性相关，则$\forall x\in I,W(f\_1,f\_2,\cdots,f\_n)(x)=0$；
2. 设$y\_1,\cdots,y\_n\in C^{(n-1)}(I)$为$n$阶齐次线性常微分方程$I$上的解，则它们在$I$上线性相关$\Leftrightarrow W(y\_1,\cdots,y\_n)\equiv 0$（证明充分性仅需要$\exists x\_0\in I, W(y\_1,\cdots,y\_n)(x\_0)=0$）。

$n$阶齐次线性常微分方程的$n$个线性无关解被称为该方程的**基本解组**。

### 常系数高阶线性常微分方程

$n$阶线性常系数常微分方程的标准形式为$y^{(n)}+a\_{n-1}y^{(n-1)}+\cdots+a\_1y'+a\_0y=f(x)$，其中$a\_0,a\_1,\cdots,a\_{n-1}\in\mathbb{R},f\in C(I)$，函数$f$被称为该方程的非齐次项。当$f\equiv 0$时，相应的方程为齐次方程。

二阶线性常系数齐次方程：$y''+py'+qy=0$，$p,q\in\mathbb{R}$，称$\lambda^2+p\lambda+q=0$为特征方程，称其解为特征根。令$\Delta=p^2-4q$：

1. 若$\Delta>0$，则有两个不同的实特征根$\lambda\_1,\lambda\_2$，方程通解为$y=C\_1e^{\lambda\_1x}+C\_2e^{\lambda\_2x}$；
2. 若$\Delta=0$，方程通解为$y=(C\_1+C\_2x)e^{-\frac{p}{2}x}$；
3. 若$\Delta<0$，则有两共轭复特征根$\lambda=\alpha\pm i\beta$，方程通解为$y=e^{\alpha x}(C\_1\cos\beta x+C\_2\sin\beta x)$。

考虑$n$阶线性常系数齐次常微分方程$y^{(n)}+a\_{n-1}y^{(n-1)}+\cdots+a\_1y'+a\_0y=0$，其中$a\_0,a\_1,\cdots,a\_{n-1}\in\mathbb{R}$。其特征多项式被定义为$P(\lambda)=\lambda^n+a\_{n-1}\lambda^{n-1}+\cdots+a\_1\lambda+a\_0$。假设该特征多项式不同的特征根为$\lambda\_1,\cdots,\lambda\_k$，重数为$n\_1,\cdots,n\_k$，则齐次方程的复值通解为$y(x)=\sum\limits\_{j=1}^k\sum\limits\_{l=0}^{n\_j-1}C\_{j,l}x^le^{\lambda\_jx}$，其中$C\_{j,l}\in\mathbb{C}$。为得到实值通解，只需要针对复数值特征根$\lambda\_j$，在上式中将$e^{\lambda\_jx}$及其共轭替换成$e^{\lambda\_jx}$的实部和虚部，并让$C\_{j,l}$为任意的实常数。

二阶线性常系数非齐次方程：由公式$z\_0(x)=\int\_{x\_0}^x\frac{y\_1(t)y\_2(x)-y\_1(x)y\_2(t)}{W(y\_1,y\_2)(t)f(t)dt}$可得非齐次方程的一个通解。

特殊的二阶线性常系数方程的求解：$y''+py'+qy=P\_n(x)e^{\mu x},p,q\in\mathbb{R},\mu\in\mathbb{C},P\_n$为$n$次多项式。有以下情况：

1. 若$\mu$不是齐次方程的特征根，则会有特解$z\_0(x)=Q\_n(x)e^{\mu x},Q\_n$为待定$n$次多项式；
2. 若$\mu$是齐次方程的一重特征根，则会有特解$z\_0(x)=Q\_n(x)xe^{\mu x},Q\_n$为待定$n$次多项式；
3. 若$\mu$是齐次方程的二重特征根，则会有特解$z\_0(x)=Q\_n(x)x^2e^{\mu x},Q\_n$为待定$n$次多项式。

两个有用的命题：

1. 设$p(x),q(x)$为实值函数，$f(x)$为复值函数，而复值函数$y=y(x)$满足非齐次方程$y''+p(x)y'+q(x)y=f(x)$，令$u(x)=\operatorname{Re}y(x),v(x)=\operatorname{Im}y(x)$，则$u''+p(x)u'+q(x)u=\operatorname{Re}f(x),v''+p(x)v'+q(x)v=\operatorname{Im}f(x)$；
2. 假设$z\_1''+pz\_1'+qz\_1=f\_1(x),z\_2''+pz\_2'+qz\_2=f\_2(x)$，则$z\_0=z\_1+z\_2$为非齐次方程$y''+py'+qy=f\_1(x)+f\_2(x)$的特解。

Euler方程：一般的Euler方程为$x^ny^{(n)}+a\_{n-1}x^{n-1}y^{(n-1)}+\cdots+a\_1xy'+a\_0y=0$，其中$a\_0,a\_1,a\_{n-1}$为常数，作变量替换$t=\log|x|$。

### 一阶线性常微分方程组

一阶线性常微分方程组可以写成$\begin{cases}
\frac{dy\_1}{dx}&=a\_{11}(x)y\_1+a\_{12}(x)y\_2+\cdots+a\_{1n}(x)y\_n+f\_1(x) \\\\
&\vdots \\\\
\frac{dy\_n}{dx}&=a\_{n1}(x)y\_1+a\_{n2}(x)y\_2+\cdots+a\_{nn}(x)y\_n+f\_n(x)
\end{cases}$。该方程组满足初值条件$y\_j(x\_0)=\xi\_j(1\leq j\leq n)$的解存在且唯一。用向量和矩阵可以重新表述为$\begin{cases}\frac{d\mathbf{Y}}{dx}=\mathbf{A}(x)\mathbf{Y}+\mathbf{F}(x)\\\\\mathbf{Y}(x\_0)=\vec{\xi}\end{cases}$，其解为$\mathbf{Y}(x)=P\_{x\_0}^x(\mathbf{A})\vec{\xi}+\int\_{x\_0}^xP\_t^x(\mathbf{A})\mathbf{F}(t)dt$，$P\_{x\_0}^x(A)$为Volterra积分。

一阶线性常微分方程组解的结构：

- $n$个方程组成的一阶线性齐次常微分方程组的解集是$n$维线性空间；
- 设$\mathbf{Y}\_1,\mathbf{Y}\_2,\cdots,\mathbf{Y}\_n$为该齐次方程组的$n$个线性无关的解，定义$\mathbf{\Phi}=(\mathbf{Y}\_1,\mathbf{Y}\_2,\cdots,\mathbf{Y}\_n)$称为齐次方程组的**基解矩阵**，则其通解为$\mathbf{Y}=C\_1\mathbf{Y}\_1+C\_2\mathbf{Y}\_2+\cdots+C\_n\mathbf{Y}\_n=\mathbf{\Phi}\mathbf{C}$，其中$\mathbf{C}=(C\_1,C\_2,\cdots,C\_n)^T$为常数列向量；
- 设$\mathbf{Y}\_1,\mathbf{Y}\_2,\cdots,\mathbf{Y}\_n$为方程组的$n$个解，令$W(x):=W(\mathbf{Y}\_1,\mathbf{Y}\_2,\cdots,\mathbf{Y}\_n)(x):=\det(\mathbf{Y}\_1(x),\mathbf{Y}\_2(x),\cdots,\mathbf{Y}\_n(x))$，称为$\mathbf{Y}\_1,\mathbf{Y}\_2,\cdots,\mathbf{Y}\_n$的Wronsky行列式；
- $W'(x)=(a\_{11}(x)+\cdots+a\_{nn}(x))W(x)$，于是$W(x)=W(x\_0)e^{\int\_{x\_0}^x(a\_{11}(t)+\cdots+a\_{nn}(t))dt}$；
- $W(x)$或者恒为0，或者恒不为0。

有如下定理：

1. 基解矩阵满足$\frac{d\mathbf{\Phi}}{dx}=\mathbf{A}(x)\mathbf{\Phi}$；
2. 齐次方程组的$n$个解$\mathbf{Y}\_1,\mathbf{Y}\_2,\cdots,\mathbf{Y}\_n$线性相关当且仅当$W(x)\equiv 0$（证明充分性仅需要$W(x\_0)=0$）；
3. 一阶线性非齐次常微分方程组的通解为该方程组的一个特解与相应的齐次方程组的通解之和。

一阶线性常系数常微分方程组的求解：$\begin{cases}\frac{d\mathbf{Y}}{dx}=\mathbf{A}\mathbf{Y}+\mathbf{F}(x)\\\\\mathbf{Y}(x\_0)=\vec{\xi}\end{cases}$，其解为$\mathbf{Y}(x)=e^{(x-x\_0)\mathbf{A}}\vec{\xi}+\int\_{x\_0}^xe^{(x-t)\mathbf{A}}\mathbf{F}(t)dt$。

设$\mathbf{\Phi}$为$\frac{d\mathbf{Y}}{dx}=\mathbf{A}\mathbf{Y}+\mathbf{F}(x)$的相应齐次方程组的基解矩阵，则非齐次方程组的通解为$\mathbf{Y}(x)=\mathbf{\Phi}(x)\mathbf{C}+\mathbf{\Phi}(x)\int\_{x\_0}^x(\mathbf{\Phi}(t))^{-1}\mathbf{F}(t)dt$。

一阶线性常系数齐次方程组的求解：$\frac{d\mathbf{Y}}{dx}=\mathbf{A}\mathbf{Y}$，特征方程为$\det(\lambda\mathbf{E}-\mathbf{A})=0$，考虑$n=2$的情形：

1. 若$\mathbf{A}$有两个不相等的实特征根$\lambda\_1,\lambda\_2$，那么相应特征向量$\mathbf{r}\_1,\mathbf{r}\_2$为实向量且线性无关，通解为$\mathbf{Y}=C\_1e^{\lambda\_1x}\mathbf{r}\_1+C\_2e^{\lambda\_2x}\mathbf{r}\_2$，其中$C\_1,C\_2$为任意实常数；
2. 若$\mathbf{A}$有两个相等的实特征根$\lambda$，相应特征向量$\mathbf{r}$为实向量，则$e^{\lambda x}\mathbf{r}$为方程组的解，与之线性无关的解可以取为$e^{\lambda x}\mathbf{P}(x)$，其中$\mathbf{P}(x)$是一个待定列向量，它的每个元素为次数$\leq 1$的多项式；
3. 若$\mathbf{A}$有两个不相等的共轭复特征根$\lambda\_1,\lambda\_2$，相应的特征向量$\mathbf{r}\_1,\mathbf{r}\_2$也为共轭的复向量且线性无关。通解为$\mathbf{Y}=Ce^{\lambda\_1x}\mathbf{r}\_1+\bar{C}e^{\lambda\_2x}\mathbf{r}\_2$，其中$C$为任意复常数，也可表示成$\mathbf{Y}=C\_1\operatorname{Re}(e^{\lambda\_1x}\mathbf{r}\_1)+C\_2\operatorname{Im}(e^{\lambda\_1x}\mathbf{r}\_1)$，其中$C\_1,C\_2$为任意实常数。

一般情形（$n\geq 1$）：假设$\mathbf{A}$的不同特征根为$\lambda\_1,\cdots,\lambda\_k$，其重数分别为$n\_1,\cdots,n\_k$，对于$1\leq j\leq k$，存在$n\_j$个形如$e^{\lambda\_jx}\mathbf{P}\_j(x)$的线性无关的解，其中$\mathbf{P}\_j(x)$为$n$阶列向量，其元素为次数$\leq n\_j-1$的多项式，待定系数即可求解。
