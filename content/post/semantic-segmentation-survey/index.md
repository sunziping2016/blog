---
title: "语义分割论文概览（未完待续）"
authors: [szp]
tags: [机器学习]
categories: [机器学习]
date: 2021-09-26T02:01:01+08:00
lastmod: 2021-09-26T02:01:01+08:00
featured: false
draft: false
---

这篇文章是顺着一篇语义分割的综述[^liu2020deep]开始阅读相关论文。

## 介绍

早期的Object Detection多数采用尺度不变特征转换（SIFT）。深度学习应用到Object Detection，使得模型相较于传统算法能进行更复杂、精细地识别。这使得大家的研究方向着重于Generic Object Detection（而不是针对某个类别设计特殊的算法）。

## SIFT[^lowe1999object]

WIP

### 目标

递进地来说，Object Detection的目标可以分为以下几种：

1. 图像级别的分类：将图片标记为一个或多个类别
2. 用边框围出事物并标类（边框有时会被叫做Axis-Aligned，因为它们是与坐标轴平齐的矩形）
3. 语义分割：将图片的每个像素标类
4. 事物实例分割：语义分割的基础上，对于同一类别的不同实例加以区分

### 挑战

- 准确度相关的挑战
  - 类别内变化大
    - 内在因素：比如各种各样的椅子
    - 图像条件：背景、光照等
  - 类别数目多
- 性能相关的挑战

## 模型分类

总的来说模型可以分为两类：

1. 两阶段模型：先预处理选出候选区域
2. 一阶段模型：无预处理阶段

## 两阶段模型

### RCNN（Regions with CNN Features）[^girshick2014rich]

1. 与类别无关的候选区域选取，方案为Selective Search[^uijlings2013selective]

WIP

### Selective Search

#### 基于图（数据结构）的分割算法[^felzenszwalb2004efficient]

Selective Search的第一步是使用基于图（数据结构）的分割算法。具体来说，对于图像中的每个通道，我们将其看作由边和节点组成的带权无向图$G=(V,E)$，其中每个像素$p_i$对应于一个节点$v_i\in V$。而边，则是连接相邻的8个像素（论文指出可以采用其他的方法）。边的权重表示的是像素的不相似程度（越大越不相似），这里直接使用像素强度$I(p_i)$的差异作为权重：

$$w(v_i,v_j)=|I(p_i)-I(p_j)|$$

通常在进行这步之前，会使用$\sigma=0.8$的高斯模糊（模糊半径1.6）处理一下图片。

接下来，我们定义该图连通分量$C$的**内部差异**$Int(C)$。它被定义为其最小生成树$MSE$（Prim算法可以得到）最大的边权。

$$Int(C)=\max_{e\in MST(C)} w(e)$$

然后，我们定义两个连通分量$C_1,C_2$的**最小内部差异**$MInt(C_1,C_2)$：

$$MInt(C_1,C_2)=\min(Int(C_1)+\tau(C_1),Int(C_2)+\tau(C_2))$$

其中函数$\tau$可以调控差异，它越大象征着内部差异越大，相对地更能容忍连通区域之间的大差异，从而促使更大的连通区域形成。可能的设计包括使得细条形的$\tau$比较大，从而使得最终分割不太包含细条形的区域。这里我们使用：

$$\tau(C)=k/|C|$$

其中$|C|$表示连通分量节点的个数。这使得小的连通区域不太可能形成。$k$越大，算法更易形成越大的区域。对于128x128的图片，$k=150$是不错的选择；对于320x240及更大的图片，$k=300$是不错的选择。

算法的结果是一个分割$S$，它被定义为互不交且之间无空隙的连通分量的集合。

最后算法如下：

1. 对边集$E$按权重递增排序$\pi=(o_1,\dots,o_m)$（$m=|E|$）
2. 初始化分割$S$，其中每个节点各自成一个连通分量。
3. 对于$\pi$中的每个边$o_q=(v_i,v_j)$:
   1. 如果$v_i$和$v_j$分属于$S$中不同的两个连通分量$C_i$和$C_j$，且$w(o_q)\leq MInt(C_i,C_j)$：
      1. 合并$S$中的连通分量$C_i$和$C_j$

对于彩色的图片，这个算法在每个通道上运行，最终两个像素在同一个连通分量里当且仅当它们在各个通道上都在同一个连通分量里。

### Selective Search剩余算法

WIP

[^liu2020deep]: Liu, Li, et al. "Deep learning for generic object detection: A survey." *International journal of computer vision* 128.2 (2020): 261-318.
[^lowe1999object]: Lowe, David G. "Object recognition from local scale-invariant features." *Proceedings of the seventh IEEE international conference on computer vision*. Vol. 2. Ieee, 1999.
[^girshick2014rich]: Girshick, Ross, et al. "Rich feature hierarchies for accurate object detection and semantic segmentation." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2014.
[^uijlings2013selective]: Uijlings, Jasper RR, et al. "Selective search for object recognition." *International journal of computer vision* 104.2 (2013): 154-171.
[^felzenszwalb2004efficient]: Felzenszwalb, Pedro F., and Daniel P. Huttenlocher. "Efficient graph-based image segmentation." International journal of computer vision 59.2 (2004): 167-181.
