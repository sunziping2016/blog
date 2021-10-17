---
title: "Stanford CS231n"
authors: [wt]
tags: [计算机视觉]
categories: [机器学习]
date: 2021-10-17T14:21:21+08:00
lastmod: 2021-10-17T14:21:21+08:00
featured: false
draft: false
---

## Image Classification

Distance Metric to compare images

L1 distance: $d_1(I_1,I_2)=\sum_p|I_1^p-I_2^p|$

In Nearest Neighbor classifier, we just memorize all training image, and then find the nearest training image for each testing image, which is the label of testing image. Therefore, with N examples, training need O(1) and predicting need O(N), which is not what we want.

K-nearest neighbors: instead of copying label from nearest neighbor, take $\textbf{majority vote}$ from K closest points.
