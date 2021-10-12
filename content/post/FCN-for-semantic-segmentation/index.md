---
title: "FCN for Semantic Segmentation"
authors: [wt]
tags: [机器学习]
categories: [机器学习]
date: 2021-10-11T20:20:44+08:00
lastmod: 2021-10-11T20:20:44+08:00
featured: false
draft: false
---

本篇笔记来自FCN for semantic segmentation[^long2015fully]一文。

<!--more-->

## 介绍

摘要：Fully Convolutional networks中可以输入不同大小的照片，并产生相应大小的输出。

一个从端到端，像素到像素的FCN不需要更多别的机器就已经超过先进的技术了。Fully convolutional现有网络从大小不一的输入中预测输出。学习和推断通过反向计算会在整张图片上同时进行。网络中的上采样层可以做出像素级预测，并在子采样池中学习。

语义分割在语义和位置上面临一个固有的关系：整体信息解决对象是什么，而局部信息让我们知道对象的位置。深度特征分层将位置和语义编码成一个局部到整体的金字塔。我们把结合了了深度、粗糙的语义信息和浅层、精细的表层信息的特征谱定义为一个skip框架。

在下文中，我们将回顾深度分类器网、FCNs和用convnet的语义分割的最新工作。接下来的内容解释FCN的设计和预测，介绍网络中上采样的架构和多层结合，再介绍一下我们的实验框架。最后，证明一下PASCAL VOC 2011-2、NYUDv2、和SIFT Flow。

## 相关工作

## FCN

convnet里的每一层数据都是一个大小为h*w*d三维行列式，h和w是空间维度，d是特征或者channel维度。第一层是图片，像素大小为h*w，有d种颜色。

### Adapting classifiers for dense prediction

### shift-and-stitch is filter rarefaction

### 上采样是倒退的卷积

### 逐块训练是损失采样

## 分割架构

### 从分类器到密集FCN

### 结合对象和位置

### 框架

## 结果

## 结论

[^long2015fully]:Long, Jonathan, Evan Shelhamer, and Trevor Darrell. "Fully convolutional networks for semantic segmentation." Proceedings of the IEEE conference on computer vision and pattern recognition. 2015.
