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

1. 第二部分介绍了语义分割的问题、符号及一些背景
2. 第三部分介绍了数据集、比赛和性能测试
3. 第四部分评论现有模型
4. 第五部分讨论上述模型的结果
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

不能直接应用迁移学习。一方面，必须要有预训练网络，通常会采用已有的网络架构；另一方面，使用微调(fine-tuning)而不是从头训练会有所不同。选择哪一层fine-tuning很重要，通常是网络的最上层————因为最下层会包含更多常见特征，也需要选择合适的学习率，通常会选择更小的，因为我们希望预训练的权重可以恰到好处，之后就可以不再大幅度改变。

### 数据预处理和增强

数据增强一般是将一系列转换应用于数据或者特征空间，或者两者皆有。常见的是应用于数据空间，将已有数据进行转换会生成新的样本。有很多转换可用：翻译、回转、扭曲、缩减、色彩空间变化、裁剪等。

## 数据集和比赛

### 2D数据集

1. PASCAL Visual Object Classes (VOC)：该比赛中的数据集包含ground-truth，并包含五种竞赛：分类、检测、分割、动作分类、人物布局。
2. PASCAL Context：所有的照片包含像素点标签。包含540个类别。
3. PASCAL Part：对象的每个部分都有像素点级别的分割。
4. Semantic Boundaries Dataset(SBD)：是PASCAL VOC的扩充，提供语义分割的ground-truth。
5. Microsoft Common Object in Context(COCO)：关于图片识别、分割和描述的大型数据集。
6. SYNTHetic Collection of Imagery and Annotations：是一个关于虚拟城市的大型数据集。
7. et al

### 2.5D 数据集

1. NYUDv2：包含1449张室内RGB-D照片。
2. SUN3D：大型RGB-D视频数据集，有8个标注序列。
3. SUNRGBD：包含10000张RGB-D照片，适用于场景理解。
4. et al

### 3D 数据集

1. ShapeNet Part：ShapeNet的子集，包含细粒度的3D对象分割。原始数据集的16个类别中的31693个网格样本。
2. Stanford 2D-3D-S：是一个多模型、大型室内空间数据集，有语义标注。
3. et al

## 方法

### 解码变量(decoder variants)

解码或者map低分辨率的图片为分割做像素级处理是难题，这部分叫做decoder，也是FCN架构的divergence point。

### 整合上下文(Itegrating Context Knowledge)

语义分割既需要整合多个空间尺度的信息，又要平衡局部和整体信息。

1. 有条件的随机区域(CRF)：将低水平的照片信息和产生每个像素的类别分数的多类别推断系统结合起来，这种结合有助于抓取那些CNNs也没注意到的长期依赖并完善局部细节。
2. 扩张的卷积：支持指数级扩张的感受野而不牺牲分辨率。
3. 多尺度预测：运用有多种不同尺度的网络然后预测一个单一输出。
4. 特征融合：将上层提取的整体特征和下层的局部特征合并。
5. 循环神经网络：得益于特殊结构，循环神经网络可以同时适用长短序列。但问题是照片没有自然序列结构，标准vanilla RNNs集中在一维输入。

### 实例分割

区分同一类别的不同对象。

### RGB-D数据

如果图片是RGB，深度数据就需要在每个像素用三种channels编码。RGB-D图片会抓取每个观点到FCN网络，然后得到关于每个图片的每个像素的40个类别的概率。

### 3D数据

### 视频序列

## 讨论

## 总结

[^garcia2017review]: Garcia-Garcia, Alberto, et al. "A review on deep learning techniques applied to semantic segmentation." *arXiv preprint arXiv:1704.06857* (2017).
