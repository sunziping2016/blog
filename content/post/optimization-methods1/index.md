---
title: "最优化理论与算法第1章：引言"
authors: [szp]
tags: [最优化, 数学]
categories: [数学]
date: 2020-09-17T16:38:14Z
featured: false
draft: false
---

本文的内容主要来自陈宝林的《最优化理论与算法（第2版）》第1章《引言》。

<!--more-->

## 学科简述

（略）

## 线性与非线性规划问题

目标函数和约束函数都是线性的，称为**线性规划问题**，若含有非线性函数，称为**非线性规划问题**。

满足约束条件的点称为**可行点**，全体可行点组成的集合称为**可行集**或**可行域**。如果可行域是整个空间称为**无约束问题**。

**定义1.2.1** $f:\mathbb{R}^n\rightarrow\mathbb{R}$为目标函数，$S$为可行域，$\vec{x}'\in S$，若$\forall \vec{x}(\vec{x}\in S\rightarrow f(\vec{x})\geq f(\vec{x}'))$，则称$\vec{x}'$为$f$在$S$上的**全局极小点**。

**定义1.2.2** $f:\mathbb{R}^n\rightarrow\mathbb{R}$为目标函数，$S$为可行域，$\vec{x}'\in S$，若$\exists\epsilon(\epsilon\in\mathbb{R}^+\land\forall \vec{x}(\vec{x}\in N(\vec{x}',\epsilon)\rightarrow f(\vec{x})\geq f(\vec{x}')))$，则称$\vec{x}'$为$f$在$S$上的**局部极小点**。其中$N(\vec{x}',\epsilon)=\{\vec{x}\mid\|\vec{x}-\vec{x}'\|<\epsilon\}$为邻域。

注：全局极小点不需要用到距离和范数，它和函数的最值定义几乎是一样的，只是定义域成了可行域。而局部极小点用到了邻域，需要距离也就是范数，它和函数的极小值定义也几乎是一样的。

## 几个数学概念

### 向量范数和矩阵范数

**定义1.3.1** 实值函数$\|\cdot\|:\mathbb{R}^n\rightarrow\mathbb{R}$称为**向量范数**，若满足$\forall\alpha,\vec{x},\vec{y}(\alpha\in\mathbf{R}\land \vec{x},\vec{y}\in\mathbf{R}^n)$：

1. 严格正定性：$\|\vec{x}\|\geq 0\land(\|\vec{x}\|=0\leftrightarrow\vec{x}=\vec{0})$；
2. 齐次性（线性形）：$\|\alpha\vec{x}\|=|\alpha|\cdot\|\vec{x}\|$
3. 三角不等式：$\|\vec{x}+\vec{y}\|\leq\|\vec{x}\|+\|\vec{y}\|$

常见的向量范数有：

1. $L\_1$范数：$\|\vec{x}\|\_1=\sum\limits\_{j=1}^n |x\_j|$
2. $L\_2$范数：$\|\vec{x}\|\_2=(\sum\limits\_{j=1}^n x\_j^2)^\frac{1}{2}$
3. $L\_\infty$范数：$\|\vec{x}\|\_\infty=\max\limits\_j |x\_j|$

注：这里的范数都称为$L\_p$-范数，来源于$\|\vec{x}\|\_p=(\sum\limits\_{j=1}^n |x\_j|^p)^\frac{1}{p}$。其中$\|\vec{x}\|\_\infty=\lim\limits\_{p\rightarrow+\infty}(\sum\limits\_{j=1}^n |x\_j|^p)^\frac{1}{p}$。

**定义1.3.2** $\|\cdot\|\_\alpha,\|\cdot\|\_\beta$为$\mathbb{R}^n$上的范数，若$\exists c\_1, c\_2(c\_1, c\_2\in\mathbb{R}^+\land\forall\vec{x}(\vec{x}\in\mathbb{R}^n\rightarrow c\_1\|\vec{x}\|\_\alpha\leq \|\vec{x}\|\_\beta\leq c\_2\|\vec{x}\|\_\alpha))$，则称这两个**范数等价**。

$\mathbb{R}^n$中任何两个范数等价（这里必须是有限维，这个定理的证明我尚不能掌握，需要参考泛函分析）。

**定义1.3.3** $\mathbf{A}\in\mathbb{R}^{m\times n}$为矩阵，$\|\cdot\|\_\alpha$为$\mathbb{R}^m$上的向量范数，$\|\cdot\|\_\beta$为$\mathbb{R}^n$上的向量范数，定义**矩阵范数**$\|\mathbf{A}\|=\max\limits\_{\|\vec{x}\|\_\beta=1}\|\mathbf{A}\vec{x}\|\_\alpha$。

注：这里可以想像成矩阵的范数，是其对应的线性映射，能够将一个向量拉长的最大倍数。

**定理1.3.1** 矩阵范数的性质：

1. $\|\mathbf{A}\vec{x}\|\_\alpha\leq\|\mathbf{A}\|\cdot\|\vec{x}\|\_\beta$；
2. $\|\lambda\mathbf{A}\|=|\lambda|\cdot\|\mathbf{A}\|$；
3. $\|\mathbf{A}+\mathbf{B}\|\leq\|\mathbf{A}\|+\|\mathbf{B}\|$；
4. $\|\mathbf{A}\mathbf{D}\|\leq\|\mathbf{A}\|\cdot\|\mathbf{D}\|$。

**定理1.3.1 (1) 证：**

$$
\begin{aligned}
            &\|\mathbf{A}\|=\max\limits\_{\|\vec{x}\|\_\beta=1}\|\mathbf{A}\vec{x}\|\_\alpha \\\\
\Rightarrow &\|\mathbf{A}\|=\max\limits\_{\|\frac{\vec{x}}{\|\vec{x}\|}\_\beta\|\_\beta=1}\|\mathbf{A}\frac{\vec{x}}{\|\vec{x}\|}\_\beta\|\_\alpha\;(\text{变量代换}) \\\\
\Rightarrow &\|\mathbf{A}\|=\max\frac{\|\mathbf{A}\vec{x}\|\_\alpha}{\|\vec{x}\|\_\beta}\;(\text{利用齐次性，并去掉了恒成立的max条}) \\\\
\Rightarrow &\|\mathbf{A}\|\geq\frac{\|\mathbf{A}\vec{x}\|\_\alpha}{\|\vec{x}\|\_\beta}
\end{aligned}
$$

**定理1.3.1 (3) 证：**

$$
\begin{aligned}
|\mathbf{A}+\mathbf{B}\|&=\max\limits\_{\|\vec{x}\|\_\beta=1}\|(\mathbf{A}+\mathbf{B})\vec{x}\|\_\alpha \\\\
&\leq\max\limits\_{\|\vec{x}\|\_\beta=1}\|\mathbf{A}\vec{x}\|\_\alpha + \|\mathbf{B}\vec{x}\|\_\alpha\;(\text{三角不等式}) \\\\
&=\|\mathbf{A}\|+\|\mathbf{B}\|
\end{aligned}
$$

**定理1.3.1 (4) 证：**

$$
\begin{aligned}
\|\mathbf{A}\mathbf{D}\|&=\max\limits\_{\|\vec{x}\|\_\beta=1}\|\mathbf{A}\mathbf{D}\vec{x}\|\_\alpha \\\\
&\leq\max\limits\_{\|\vec{x}\|\_\beta=1}\|\mathbf{A}\|\cdot\|\mathbf{D}\vec{x}\|\_\gamma\;(\text{性质1}) \\\\
&=\|\mathbf{A}\|\cdot\|\mathbf{D}\|
\end{aligned}
$$

常见的矩阵范数有：

1. $\|\mathbf{A}\|\_1=\max\_j\sum\limits\_{i=1}^m |a\_{ij}|$；
2. $\|\mathbf{A}\|\_2=\sqrt[]{\lambda\_{\mathbf{A}^T\mathbf{A}}}$，（$\lambda$是最大特征值，这被称为**谱范数**）；
3. $\|\mathbf{A}\|\_\infty=\max\_i\sum\limits\_{j=1}^n |a\_{ij}|$。

注：这里$p$矩阵范数就是$L\_p$向量范数的组合，我采用形象化的方式来解释这3种范数。先考虑第2个范数，它将球拉伸成椭球，长径拉伸最大值也就是其最大的奇异值；再考虑第1个范数，它将一个立方体拉伸成长方体，其中立方体的顶点是$[0,\dots,0,1,0,\dots,0]^T$，映射完后，相当于挨个取出列向量，求他们的$L\_1$范数（求和），再取出最大的；最后考虑第3个范数，它同样将一个立方体拉伸成长方体，其中立方体的顶点是$[1,\dots,1]^T$，映射完后，相当于将行向量求和，最后取出最大的。

### 序列的极限

**定义1.3.4** $\{\vec{x}^{(k)}\}$是$\mathbb{R}^n$中的向量序列，$\vec{x}'\in\mathbb{R}^n$，若：

$$\forall\epsilon(\epsilon\in\mathbb{R}^+\rightarrow\exists N(N\in\mathbb{N}^+\land\forall n(n\in\mathbb{N}^+\land n>N\rightarrow \|\vec{x}^{(n)}-\vec{x}'\|<\epsilon))$$

则称序列**收敛**到$\vec{x}'$，或序列以$\vec{x}'$为**极限**，记作$\lim\limits\_{k\to\infty}\vec{x}^{(k)}=\vec{x}'$。

序列若存在极限，则任何子序列有相同的极限（选取适当的$N$即可证明），序列的极限是唯一的。

**序列的极限是唯一的 证：**

反证法，若存在两极限，则$\lim\limits\_{k\to\infty}\vec{x}^{(k)}=\vec{a}$同时$\lim\limits\_{k\to\infty}\vec{x}^{(k)}=\vec{b}$，且$\vec{a}\neq\vec{b}$。取$\epsilon\_0=\frac{\|\vec{b}-\vec{a}\|}{2}$，由假设知道：

$$
\begin{aligned}
&\begin{aligned}
&\exists N\_1(N\_1\in\mathbf{N}^+\land\forall n(n\in\mathbb{N}^+\land n>N\_1\rightarrow \|\vec{x}^{(n)}-\vec{a}\|<\epsilon\_0))) \\\\
\land &\exists N\_2(N\_2\in\mathbf{N}^+\land\forall n(n\in\mathbb{N}^+\land n>N\_2\rightarrow \|\vec{x}^{(n)}-\vec{b}\|<\epsilon\_0)))
\end{aligned} \\\\
\Rightarrow & \exists N\_1,N\_2(N\_1,N\_2\in\mathbf{N}^+\land \forall n (n\in\mathbb{N}^+\land n>N\_1\land n>N\_2\rightarrow \|\vec{x}^{(n)}-\vec{a}\|<\epsilon\_0 \land \|\vec{x}^{(n)}-\vec{b}\|<\epsilon\_0)) \\\\
\Rightarrow & \exists N\_1,N\_2(N\_1,N\_2\in\mathbf{N}^+\land \forall n (n\in\mathbb{N}^+\land n>\max(N\_1,N\_2)\rightarrow \|\vec{x}^{(n)}-\vec{a}\| + \|\vec{x}^{(n)}-\vec{b}\|<\|\vec{b}-\vec{a}\|)) \\\\
\Rightarrow & \bot \;(\text{违反三角不等式})
\end{aligned}
$$

**定义1.3.5** $\{\vec{x}^{(k)}\}$是$\mathbb{R}^n$中的向量序列，若存在子序列$\{\vec{x}^{(k\_j)}\}$，$\lim\limits\_{k\_j\to\infty}\vec{x}^{(k\_j)}=\hat{\vec{x}}$，则称$\hat{\vec{x}}$是$\{\vec{x}^{(k)}\}$的一个**聚点**。

**Bolzano–Weierstrass定理**：$\mathbb{R}^n$中有界序列必有聚点，即有界序列必有收敛子列，证明详见[波尔查诺-魏尔斯特拉斯定理 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%B3%A2%E7%88%BE%E6%9F%A5%E8%AB%BE-%E9%AD%8F%E7%88%BE%E6%96%AF%E7%89%B9%E6%8B%89%E6%96%AF%E5%AE%9A%E7%90%86)。这只在有限维实向量赋范空间成立。

**定义1.3.6** $\{\vec{x}^{(k)}\}$是$\mathbb{R}^n$中的向量序列，若：

$$\forall\epsilon(\epsilon\in\mathbb{R}^+\rightarrow\exists N(N\in\mathbb{N}^+\land\forall n\_1,n\_2(n\_1,n\_2\in\mathbb{N}^+\land n\_1,n\_2>N\rightarrow\|\vec{x}^{n\_1}-\vec{x}^{n\_2}\|<\epsilon)))$$

则称$\{\vec{x}^{(k)}\}$为**柯西序列**。$\mathbb{R}^n$中，柯西序列和收敛数学互为充要条件。

注：柯西序列的定义没有涉及到极限值，这便于完成一些对收敛性的证明。那些所有柯西序列收敛到空间中某点的空间，称为**完备空间**，比如实数是完备的，有理数是不完备的。完备空间中，柯西序列和收敛序列互为充要条件。不完备空间中，柯西序列是收敛序列的必要条件。

**定理1.3.2** $\{\vec{x}^{(k)}\}$是$\mathbb{R}^n$中的柯西序列，则其聚点为极限点。

注：$\mathbb{R}^n$中，收敛序列（即柯西序列）必有唯一聚点，且该聚点为极限点。一个序列可能有多个聚点。

设$S\subseteq\mathbb{R}^n$：

1. 若$S$中每个收敛序列的极限均在$S$，则称$S$为**闭集**；
2. 若$\forall\hat{\vec{x}}(\hat{\vec{x}}\in S\rightarrow\exists\epsilon(\epsilon\in\mathbb{R}^+\land N(\hat{\vec{x}},\epsilon)\subseteq S))$，则称$S$为**开集**，这样的$\hat{\vec{x}}$称为**内点**；
3. 若$S$是有界闭集，则称$S$为**紧集**。

闭集的另一个定义是：一个补集是开集的集合称为闭集。这里集合$S$的补集定义为$S^C=\{x\mid x\notin S,x\in\mathbb{N}\}$。

紧集的一个等价定义是：集合中的序列都有收敛子序列。由Bolzano–Weierstrass定理可证$S\subseteq\mathbb{R}^n$紧致，当且仅当，$S$为有界闭集。

### 梯度、海森矩阵、泰勒展开式

设$f:S\to\mathbb{R}$，其中$S\subseteq\mathbb{R}^n$。如果$f$在$S$中的每一点连续，则称$f$在$S$上**连续**，记作$f\in C(S)$。若$f$在每一点$\vec{x}\in S$，一阶导数$\frac{\partial f(\vec{x})}{\partial x\_i}$存在且连续，则称$f$在$S$上**连续可微**，记作$f\in C^1(S)$。若$f$在每一点$\vec{x}\in S$，二阶导数$\frac{\partial^2 f(\vec{x})}{\partial x\_i\partial x\_j}$存在且连续，则称$f$在$S$上**二次连续可微**，记作$f\in C^2(S)$。

函数$f\in C^1(S)$在$\vec{x}$的**梯度**为：

$$\nabla f(\vec{x})=\begin{bmatrix}
\frac{\partial f(\vec{x})}{\partial x\_1},\frac{\partial f(\vec{x})}{\partial x\_2},\cdots,\frac{\partial f(\vec{x})}{\partial x\_n}
\end{bmatrix}^T$$

函数$f\in C^2(S)$在$\vec{x}$的**海森矩阵**为对称矩阵，如下：

$$[\nabla^2 f(\vec{x})]\_{ij}=\frac{\partial^2 f(\vec{x})}{\partial x\_i\partial x\_j}$$

对于二次函数$f(\vec{x})=\frac{1}{2}\vec{x}^T\mathbf{A}\vec{x}+\vec{b}^T\vec{x}+c$：

1. 其梯度：$\nabla f(\vec{x})=\mathbf{A}\vec{x} + \vec{b}$；
2. 其海森矩阵：$\nabla^2 f(\vec{x})=\mathbf{A}$。

对$S\in\mathbb{R}^n$上的函数$f:S\to\mathbb{R}$：

1. 若$f\in C^1(S)$，则对任意$\vec{x}\_0\in\mathbb{R}^n$，有一阶泰勒展式：
    $$f(\vec{x})=f(\vec{x\_0})+\nabla f(\vec{x}\_0)^T(\vec{x}-\vec{x}\_0)+o(\|\vec{x}-\vec{x}\_0\|)$$
2. 若$f\in C^2(S)$，则对任意$\vec{x}\_0\in\mathbb{R}^n$，有二阶泰勒展式：
    $$f(\vec{x})=f(\vec{x\_0})+\nabla f(\vec{x}\_0)^T(\vec{x}-\vec{x}\_0)+\frac{1}{2}(\vec{x}-\vec{x}\_0)^T\nabla^2 f(\vec{x}\_0)(\vec{x}-\vec{x}\_0)+o(\|\vec{x}-\vec{x}\_0\|^2)$$

### 雅可比矩阵、链式法则和隐函数存在定理

#### 雅可比矩阵

考虑向量值函数$\vec{h}:\mathbb{R}^n\to\mathbb{R}^m$：

$$\vec{h}(\vec{x})=(h\_1(\vec{x}),h\_2(\vec{x}),\cdots,h\_m(\vec{x}))^T$$

若对任意$i,j$，$\frac{\partial h\_i(\vec{x})}{\partial x\_j}$存在，则其**雅可比矩阵**为：

$$[\vec{h}'(\vec{x})]\_{ij}=\frac{\partial h\_i(\vec{x})}{\partial x\_j}$$

也可记作$\nabla\vec{h}(\vec{x})^T$。

#### 链式法则

对于实数空间上的复合向量值函数$\vec{h}(\vec{x})=\vec{f}(\vec{g}(\vec{x}))$，若$f,g$均可微，则有：

$$\vec{h}'(\vec{x})=\vec{h}'(\vec{g}(\vec{x}))\vec{g}'(\vec{x})$$

#### 隐函数定理

**定理 1.3.3** 对于$\vec{h}:\mathbb{R}^m\times\mathbb{R}^n\to\mathbb{R}^m$，定点向量$\vec{a}^{(0)}\in\mathbb{R}^m,\vec{b}^{(0)}\in\mathbb{R}^n$，令$\vec{x}^{(0)}=[\vec{a}^{(0)}\,|\,\vec{b}^{(0)}]$，满足：

1. $\vec{h}(\vec{x}^{(0)})=\vec{0}$；
2. 在$\vec{x}^{(0)}$的某一个邻域中，$h\_i\in C^1 (i=1\,\cdots,m)$；
3. $\begin{vmatrix}\begin{bmatrix}\frac{\partial h\_i}{\partial a\_j}(\vec{x})\end{bmatrix}\_{m\times m}\end{vmatrix}\neq 0$

则存在$\vec{b}^{(0)}\in\mathbb{R}^n$的一个邻域，使得对于邻域中的点$\vec{b}\in\mathbb{R}^n$，唯一存在函数$\vec{\phi}:\mathbb{R}^n\to\mathbb{R}^m$，满足：

1. $\phi\_i\in C^1\;(i=1,\cdots,m)$；
2. $\vec{a}^{(0)}=\phi(\vec{b}^{(0)})$；
3. $\vec{h}([\vec{\phi}(\vec{b}^{(0)})\,|\,\vec{b}^{(0)}])=\vec{0}$。

### 二次型的正定性与半正定性

**正定二次型的定义** 对实二次型$f(\vec{x})=\vec{x}^T\mathbf{A}\vec{x}$，若：

$$\forall\vec{x}(\vec{x}\in\mathbb{R}^n\land\vec{x}\neq\vec{0}\rightarrow f(\vec{x})\geq 0)$$

则称$f(x)$为**正定二次型**，$\mathbf{A}$为**正定矩阵**。

**正定二次型的判断** 对于$\mathbf{A}\in\mathbb{R}^{n\times n}$，下列命题等价：

1. $\vec{x}^T\mathbf{A}\vec{x}$是正定二次型；
2. $\mathbf{A}$是正定矩阵；
3. $\mathbf{A}$的$n$个顺序主子式都大于零；
4. $\mathbf{A}$的$n$个特征值都大于零；
5. 存在可逆矩阵$\mathbf{P}$，使得$A=P^TP$。

**半正定二次型的定义** 对实二次型$f(\vec{x})=\vec{x}^T\mathbf{A}\vec{x}$，若：

$$\forall\vec{x}(\vec{x}\in\mathbb{R}^n\land\vec{x}\neq\vec{0}\rightarrow f(\vec{x})\geq 0)\land\exists\vec{x}(\vec{x}\in\mathbb{R}^n\land\vec{x}\neq\vec{0}\land f(\vec{x})=0)$$

则称$f(x)$为**半正定二次型**，$\mathbf{A}$为**半正定矩阵**。

**半正定二次型的判断** 对于$\mathbf{A}\in\mathbb{R}^{n\times n}$，下列命题等价：

1. $\vec{x}^T\mathbf{A}\vec{x}$是半正定二次型；
2. $\mathbf{A}$是半正定矩阵；
3. $\mathbf{A}$的所有主子式都大于等于零，且至少有一个等于零；
4. $\mathbf{A}$的$n$个特征值都大于等于零，且至少有一个等于零。

## 凸集和凸函数

### 凸集

**定义1.4.1** 设$S\subseteq\mathbb{R}^n$，若$\forall\vec{x}\_1,\vec{x}\_2,\lambda(x\_1,x\_2\in S\land\lambda\in[0,1]\rightarrow\lambda\vec{x}\_1+(1-\lambda)\vec{x}\_2\in S)$，则称$S$为**凸集**。其中$\lambda\vec{x}\_1+(1-\lambda)\vec{x}\_2$称为**凸组合**。

常见的凸集有**超平面**$\{\vec{x}\mid\vec{p}^T\vec{x}=\alpha\}$、**半空间**$\{\vec{x}\mid\vec{p}^T\vec{x}\leq\alpha\}$、**射线**$\{\vec{x}\mid\vec{x}\_0+\lambda\vec{d},\lambda\geq 0\}$（其中$\vec{x}\_0$为顶点，$\vec{d}$为方向向量)。

设$S\_1,S\_2\subseteq\mathbb{R}^n$为凸集，$\beta\in\mathbb{R}$，则：

1. $\beta S\_1=\{\beta\vec{x}\mid\vec{x}\in S\_1\}$为凸集；
2. $S\_1\cap S\_2$为凸集；
3. $S\_1+S\_2=\{\vec{x}\_1+\vec{x}\_2\mid\vec{x}\_1\in S\_1,\vec{x}\_2\in S\_2\}$为凸集；
4. $S\_1-S\_2=\{\vec{x}\_1-\vec{x}\_2\mid\vec{x}\_1\in S\_1,\vec{x}\_2\in S\_2\}$为凸集。

凸集的线性组合也是凸集，但凸集的并不是凸集。

**定义1.4.2**  设$C\subseteq\mathbb{R}^n$，若$\forall\vec{x},\lambda(\vec{x}\in C\land\lambda\in\mathbb{R}^*\rightarrow\lambda\vec{x}\in C)$，则称$C$为**锥**。若$C$又为凸集，则称$C$为**凸锥**。

向量集$\{\vec{x}\_1,\vec{x}\_2,\cdots,\vec{x}\_n\}$的非负线性组合$\{\sum\limits\_{i=1}^n\lambda\_i\vec{x}\_i\mid\lambda\_i\geq 0,i=1,\cdots,n\}$。

**定义1.4.3** 有限个半空间的交$\{\vec{x}\mid\mathbf{A}\vec{x}\leq\vec{b}\}$称为**多面集**，若$\vec{b}=\vec{0}$，则多面集成为凸锥。

**定义1.4.4** 设$S$为非空凸集，$\vec{x}\in S$，若$\forall\vec{x}\_1,\vec{x}\_2,\lambda(\vec{x}\_1,\vec{x}\_2\in S\land\lambda\in(0,1)\land\vec{x}=\lambda\vec{x}\_1+(1-\lambda)\vec{x}\_2\rightarrow\vec{x}=\vec{x}\_1=\vec{x}\_2)$，则称$\vec{x}$为凸集$S$的**极点**。

紧凸集中的点可以表示为极点的线性组合，但对无界集并不成立。

**定义1.4.5** 设$S\subseteq\mathbb{R}^n$为闭凸集，$\vec{d}\in\mathbb{R}^n$非零，若$\forall\vec{x}(\vec{x}\in S\rightarrow\{\vec{x}+\lambda\vec{d}\mid\lambda\in\mathbb{R}^+\}\subseteq S)$，则称$\vec{d}$为$S$的**方向**。又设$\vec{d}\_1,\vec{d}\_2$是$S$的两个方向，若$\forall\lambda(\lambda\in\mathbb{R}^+\rightarrow\vec{d}\_1\neq\lambda\vec{d}\_2)$，则称$\vec{d}\_1,\vec{d}\_2$是不同的方向。若$S$的方向$\vec{d}$不能表示成两个不同方向的正的线性组合，则称$\vec{d}$是$S$的极方向。

有界集不存在方向和极方向。

考虑平面直角坐标系中的半平面$x\geq \alpha$，可以发现有3个极方向，分别是$(0, \lambda\_+)^T,(0, \lambda\_-)^T,(\lambda\_+, \lambda)^T$，且不存在极点。

特别地，对于$S=\{x\mid\mathbf{A}\vec{x}=\vec{b},\vec{x}\geq\vec{0}\}$，$\vec{d}$为$S$的方向等价于$\vec{d}\geq\vec{0}\land\mathbf{A}\vec{d}=\vec{0}$。

**定理1.4.1** 表示定理：设$S=\{x\mid\mathbf{A}\vec{x}=\vec{b},\vec{x}\geq\vec{0}\}$为非空多面集（它一定是多面集），则：

1. 极点集非空且为有限个$\vec{x}\_1,\cdots,\vec{x}\_k$；
2. 极方向为空当且仅当$S$有界，$S$无界，则有有限个极方向$\vec{d}\_1,\cdots,\vec{d}\_l$；
3. $\vec{x}\in S$当且仅当：
    $$\begin{aligned}&\vec{x}=\sum\_{j=1}^k\lambda\_j\vec{x}\_{j}+\sum\_{j=1}^l\mu\_j\vec{d}\_j,\\\\
    &\sum\_{j=1}^k\lambda\_j=1,\\\\
    &\lambda\_j\geq 0, j=1,\cdots,k,\\\\
    &\mu\_j\geq 0, j=1,\cdots,l.
    \end{aligned}$$

### 凸集分离定理

（暂不收录）

### 凸函数

（暂不收录）

### 凸函数的判别

（暂不收录）

### 凸规划

（暂不收录）
