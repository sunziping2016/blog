---
title: "DeepLab"
authors: [wt]
tags: [机器学习]
categories: [机器学习]
date: 2021-10-13T14:15:34+08:00
lastmod: 2021-10-13T14:15:34+08:00
featured: false
draft: false
---

本篇笔记来自多篇paper的整合，分别是：

1. DeepLab v1：Semantic Image Segmentation With Deep Convolutional Nets and Fully Connected CRFs
2. DeepLab v2: Semantic Image Segmentation with Deep Convolutional Nets, Atrous Convolution, and Fully Connected CRFs

<!--more-->

## v1

作者发现DCNNs的最后一层输出并不能有效地对物体分割，这是由于DCNNs的不变性使它更适用于high-level任务。在该文中，将DCNN最后一层输出和全连接的CRF结合起来可以解决上述问题。

### 扫盲

1. 不变性 invariance：对一个函数，在其输入中施加的变换不会影响其输出。CNN中的池化有近似不变性。
2. high-level任务：分类、检测、分割等。一般处理的都是高品质图像，处理降质图像时，性能就会有下降。

### hole algorithm

在Caffe 框架中加入一个im2col函数（可以将多通道特征图转化成向量块）稀疏地抽样。这个方法可以在任何子抽样率下有效计算密集CNN特征图而不用引进任何近似值。

### CRF(Conditional Random Field)

有多层最大池化的深度模型最适合分类任务。但增加的不变性和更大的感受野会使输出时根据分数推断位置更具挑战性。

目前有两个办法。首先是多收集信息来估算物体的边界；其次是表示为超像素，用low-level分类方法处理位置任务。

本文利用DCNNs的识别能力和全连接CRFs的精细位置估算获得了成功，在物体边界上的处理更精准。

一般会用short range CRFs处理平滑噪声分割，CNN输出已经很平滑，再用short range CRF会使模型变得糟糕。所以采用全连接CRFs，可以使模型中的每个像素连接到其他像素。

### 总结

我目前没想明白这篇文章在干嘛。我的大致理解是，CNN可以做语义分割，但是在每个物体的边界处处理很模糊，并不够精确。这是因为CNN中的池化具有不变性，层数越深，这种不变性就会增加，感受野也会变大，想要找到物体在图像中的位置就会更难。因此本文在CNN的最后一层运用了全连接CRF，可以在处理边界时更加精确。但是全连接CRF是如何处理图像中物体的边界的，涉及到一些数学公式的理解，还有待学习。

## v2

### 三个主要贡献

1. 强化了卷积在密集预测任务中的作用，空洞卷积使得计算特征响应时可以有效控制结果，也可以扩大卷积的视场以获得更多上下文信息而不用增加额外的参数或计算量。
2. 提出了ASPP(Atrous Spatial Pyramid Pooling)可以稳健地分割多尺度物体。ASPP在多抽样率和有效的视场检测了输入的卷积特征层，从而获取多尺度物体和图像上下文。
3. 结合DCNNs和概率图模型可以改进对象边界的定位。结合最大池化和DCNNs中的downsampling实现不变性，需要牺牲位置精确度，为了解决这个问题，我们将DCNN最后一层的输出和全连接CRF结合，可以在定性和定量上确保定位的精确度。

### DCNN在语义分割中的挑战及方法

1. 降低了特征的空间分辨率:用反卷积的上采样替代最后几层最大池化。
2. 存在多个尺度的对象:传统方法是向DCNN中输入同一图像的不同缩放版本，然后整合特征或者得分图，但这样会增加计算量。本文在空间金字塔池化的方法上提出了ASPP，不需要重采样特征，而是采用不同采样率的多个并行多孔卷积层有效地实现此映射。
3. 由于DCNN的不变性而降低了定位精度:跳跃结构可以解决此问题，而全连接的CRF可以提高模型捕获精细细节的能力。

## v3

### 主要贡献

## v4