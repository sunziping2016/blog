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

## 第一篇

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

我目前没想明白这篇文章在干嘛。我的大致理解是，CNN可以做语义分割，但是在每个物体的边界处处理很模糊，并不够精确。这是因为CNN中的池化具有不变性，层数越深，这种不变性就会增加，感受野也会变大，想要找到物体在图像中的位置就会更难。因此本文在CNN的最后一层运用了全连接CRF，可以在处理边界时更加精确。但是全连接CRF是如何处理图像的，还有待学习。
