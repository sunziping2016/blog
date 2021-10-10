---
title: "深度学习在语义分割中的应用（未完待续）"
authors: [wt]
tags: [机器学习]
categories: [机器学习]
date: 2021-10-10T19:38:17+08:00
lastmod: 2021-10-10T19:38:17+08:00
featured: false
draft: false
---

本篇笔记来自深度学习在语义分割中的应用的评论[^garcia2017review]一文。

<!--more-->

## 介绍

本文剩余部分包括：

1. 第二部分介绍了语义分割的问题和符号，以及一些背景
2. 第三部分介绍了数据集，比赛和性能测试
3. 第四部分评论现有模型
4. 第五部分讨论并总结模型的结果
5. 最后总结全文

## 术语和背景介绍

### 通用深度网络架构

下面介绍当前最流行的几种架构：

#### AlexNet

AlextNet是深度CNN先驱，曾凭借84.6%的TOP5测试准确率获得ILSVRC-2012。它由五个卷积层、最大池化、ReLUs(Rectified Linear Units)、三个FC(fully-connected) layers以及dropout。

#### VGG(Visual Geometry Group)

该模型，也叫VGG16，因为其有16加权层。凭借92.7%的TOP5测试准确率获得ILSVRC-2013。VGG16和以前的模型的主要区别在于运用一堆卷积层和小的感受野(receptive fields)，这使得参数变小，更加非线性，分辨能力更强，模型更加容易训练。

#### GoogLeNet

GoogLeNet以93.3%的TOP5测试准确率获得ILSVRC-2014，其特点是复杂、包含了22层、以及有一个最新介绍的*inception*模组。这种方法证明了CNN层不止能按照以前的方式排列，还可以通过别的方式堆积在一起。这些模组由一个NiN(Network in Network)层、一个池操作、一个大和一个小的卷积层组成。这些部分平行计算，然后通过卷积计算降维。因为这些模组的存在，网络可以减少参数数量和操作步骤。

#### ResNet

微软的ResNet以96.4%准确率赢得了ILSVRC-2016。其拥有152层和残差块(residual block)。在残差块中，每一层都可以将输入复制到下一层。这个方法基于，下一层总是学新的东西并且不同于已经编码的输入。此外，这种连接可以解决梯度消失问题。

#### ReNet

在ReNet中，他们一直用的序列RNNs，而不是多维RNNs。通过这种方式，RNNs的数量在每一层根据输入照片的维数*d*线性缩减，这样，每一个卷积层都会被四个垂直以及平行方向的RNNs代替。

### 迁移学习

[^garcia2017review]: Garcia-Garcia, Alberto, et al. "A review on deep learning techniques applied to semantic segmentation." *arXiv preprint arXiv:1704.06857* (2017).
