---
title: "PFENet源码阅读"
authors: [szp]
tags: [深度学习]
categories: [深度学习]
date: 2022-04-23T16:02:49+08:00
featured: false
draft: false
---

这篇文章是小样本语义分割深度学习神经网络[PFENet](https://github.com/dvlab-research/PFENet)[^tian2020prior]的源码阅读报告。

<!--more-->

## 数据处理

Dataset加载的代码主要是在[`dataset.py`](https://github.com/dvlab-research/PFENet/blob/master/util/dataset.py)。

### `make_dataset()`

`make_dataset()`的参数的意义如下：

- `split`：数据集的类别会被均分为固定的4份，其中任选3份作为training set，剩下的1份作为validation set。而`split`是0到3的整数，指这4份中哪一份是validation set；
- `data_root`：`data_list`文件中图片若为相对路径，所相对的目录路径；
- `data_list`：一个文本文件的路径，每行是一个样本，是空格分隔的图片和标签路径；图片是3通道，而标签是灰度图；
- `sub_list`：抽取的图像类别，一般而言，视当前是train还是validate，为与`split`对应的类别列表。

该函数返回两个东西：

1. 一个列表：所有的图片标签路径对；
2. 一个字典：`sub_list`中的类别到图片标签路径对的映射；SemData只有标签中包含改类别的像素数多于[`2 * 32 * 32`](https://github.com/dvlab-research/PFENet/blob/master/util/dataset.py#L60)才会被放进映射里。

从代码中可以看到对于标签图片中的0（纯黑）和255（纯白），代码直接忽略。查看数据集中的样本后，0似乎是背景的，255似乎是分类的边缘（那些可能不能清楚属于某一类别的像素）

### `SemData`类

`SemData`类继承自PyTorch的`Dataset`类，因而需要实现序列相关的接口。

#### 构造函数

参数：

- `mode`：三种模式`train`、`val`、`test`；但就代码来看，`test`是不被支持的；
- `split`：同`make_dataset()`；
- `shot`：一次训练，支撑集的图片个数；
- `data_root`：同`make_dataset()`；
- `data_list`：同`make_dataset()`；
- `transform`：对图片和标签同时进行变换，这里`transform`作为函数，其实是有两个输入参数（图片、标签），不太符合PyTorch中的`transform`，因此作者自己实现了[一系列的类](https://github.com/dvlab-research/PFENet/blob/master/util/transform.py)；
- `use_coco` & `use_split_coco`：见下。

从构造函数来看，PFENet支持3种数据集切割方式：

1. `use_coco: False`：普通数据集的切割方式，20个类别，标签连续分4组；
2. `use_coco: True & use_split_coco: True`：对于coco的切割方式，80个类别，标签轮换分4组；
3. `use_coco: True & use_split_coco: False`：对于coco的切割方式，80个类别，标签连续分4组。

构造函数除了初始化`mode`、`split`、`shot`、`data_root`等字段，还初始化了：

- `class_list`：从1开始的分类列表
- `sub_list`：从1开始的train标签列表
- `sub_val_list`：从1开始的valid标签列表
- `data_list` & `sub_class_file_list`：分别为所有的图像标签路径对，和`mode`相应标签到图像标签路径对的字典。

#### 序列方法

数据集的长度就是`data_list`中的个数。获取一个样本的方式如下：

1. 加载下标对应的彩色原图和灰度标签（原样本）
2. 计算标签中存在的、且和`mode`一致的类别，去除0和255，随机选择一个类别`class_chosen`
3. 生成新的灰度标签，原标签的`class_chosen`对应像素置为1，255对应像素仍设置为255，其他都置为0
4. 随机选取`class_chosen`对应的`shot`个样本作为支撑集，样本避免重复。加载后，标签做与上步一样的处理
5. 原样本和支撑集的图片、标签过一遍`transform`
6. 返回：原样本图片、原样本标签、支撑集图片（stack）、支撑剂标签（stack）、`[class_chosen] * shot`和，如果`mode`不是train的话，未过`transform`的标签

## 模型

[^tian2020prior]: Tian, Zhuotao, et al. "Prior guided feature enrichment network for few-shot segmentation." *IEEE transactions on pattern analysis and machine intelligence* (2020).
