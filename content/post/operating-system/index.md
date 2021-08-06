---
title: "操作系统复习笔记"
authors: [szp]
tags: [OS]
categories: [OS]
date: 2017-07-18T00:00:00Z
featured: false
draft: false
---

主要是操作系统的笔记。

<!--more-->

## 操作系统复习进度表

### 操作系统

- [x] 1. 第1章 概述
- [x] 2. 第2章 进程管理
- [x] 3. 第2章 死锁问题
- [x] 4. 第3章 存储管理
- [x] 5. 第4章 IO设备管理
- [x] 6. 第5章 文件系统
- [x] 7. 第6章 操作系统与安全

### Petri网

- [x] 1. 第2章 Petri网
- [ ] <del>2. 第2章 着色Petri</del>
- [ ] <del>3. 第3章 基于Petri网的缺失事件高效修复</del>
- [ ] <del>4. 第5章 清洗结构化事件日志</del>
- [ ] <del>5. 第6章 过程模型相似性法</del>

### 中间件

- [x] 1. 第01章 中间件概述
- [ ] <del>2. 第02章 GlassFish简介</del>
- [ ] <del>3. 第02章 J2EE</del>
- [ ] <del>4. 第03章 EJB 3.0入门 - Part I</del>
- [ ] <del>5. 第03章 EJB 3.0入门 - Part II</del>
- [ ] <del>6. 第03章 EJB 3.0入门 - Part III</del>
- [ ] <del>7. 第03章 EJB 3.0入门 - Part IV</del>
- [ ] <del>8. 第04章 Workflow Technology</del>
- [ ] <del>9. 第05章 JBPM介绍</del>
- [ ] <del>10. 第06章 数据库访问中间件-ADO.NET</del>
- [ ] <del>11. 第06章 数据库访问中间件-JDBC</del>

## 笔记

### 操作系统

#### 概述

操作系统分类：

- 无操作系统：纸带
- 单道批处理系统：减少手工操作 vs 调试比较困难，CPU和I/O设备使用忙闲不均
- 多道批处理系统：并行
- 分时系统：交互（CTSS，MULTICS，UNIX）
- 实时操作系统：实时性、可靠性
  - 实时过程控制
  - 实时通信处理

其他分类：

- 嵌入式操作系统
- 个人计算机操作系统
- 分布式操作系统

处理器状态（存于PSW）：

- 管态（系统调用引起访管中断进入）：特权指令如硬件、IO、页表、系统状态
- 目态（修改PSW）

中断（中断向量进入异常处理程序）：

- 同步中断：异常（错误、陷阱和中止）
- 异步中断：
  - 可屏蔽中断：I/O中断
  - 不可屏蔽中断：硬件故障

#### 进程管理

进程（动态性、独立性、并发性，系统调用创建，PCB存储状态）包括：

- 代码、数据
- 寄存器（各线程独立）
- 堆（动态分配）、栈（存储局部变量和上下文信息，各线程独立）
- 系统资源（地址空间、打开的文件）

三种基本状态：

- 运行状态：小于CPU数目
- 就绪状态：可被运行
- 阻塞状态

![Process State](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter3/3_02_ProcessState.jpg)

被组织成状态队列：运行、就绪、阻塞。

线程（并发、共享，执行流，TCB存储状态，状态同进程）：

- 寄存器
- 栈

进程间通信IPC（满足互斥、同步的需求）：

- 低级通信：信号量（semaphore）、信号（signal）
- 高级通信：共享内存（shared memory）、消息传递（message passing）、管道（pipe）

竞争状态：

- 临界区：完成互斥共享资源访问的程序段
- 临界资源：互斥共享资源

互斥访问四条件：

1. 两个进程不同时进入临界区
2. CPU个数和运行速度无关
3. 临界区外进程不妨碍其他进程进入临界区
4. 有限时间内被满足进入

互斥实现：

- 基于关闭中断（不能用户、多CPU）
- 基于繁忙等待
  - 加锁标志位法：`while (lock); lock = 1; 临界区; lock = 0;`，对`lock`的竞争状态问题
  - 强制轮流法：`while (turn != 0); 临界区; turn = 1;`，违反3
  - Peterson 方法：`enter_region(0); 临界区; leave_region(0)`;

    ```c
    void enter_region(int process) {
        int other = 1 - process;
        interested[process] = true;
        turn  =  process;
        while (interested[other] == true && turn == process);
    }

    void leave_region(int process) {
        interested[process] = false;
    }
    ```

- 信号量（P原语获取资源、V原语释放资源）
  信号量实现的互斥机制：

  ```c
  semaphore mutex(1);
  P(mutex);
  临界区;
  V(mutex);
  ```

  信号量实现的同步机制：

  ```c
  semaphore Buffer;
  semaphore Data;
  // Compute
  while (计算未完成) {
      得到一个计算结果;
      P(Buffer);
      将数据送到缓冲区;
      V(Data);
  }
  // Print
  while (打印未完成) {
      P(Data);
      从缓冲区中取一数据;
      V(Buffer);
      打印该数据;
  }
  ```

**生产者消费者问题：** 使用互斥锁保护缓冲区。

**哲学家就餐问题：**

```c
void philosopher(int i) {
    while (true) {
        think();
        take_forks(i);
        eat();
        put_forks(i);
    }
}
void take_forks(int i) {
    P(mutex)
    state[i] = HUNGRY;
    test(i);
    V(mutex);
    P(s[i]);
}
void test(int i) {
    if (state[i] == HUNGRY && state[LEFT] != EATING && state[RIGHT] != EATING) {
        state[i] = EATING;
        V(s[i]);
    }
}
void put_forks(int i) {
    P(mutex);
    state[i] = THINKING;
    test(LEFT);
    test(RIGHT);
    V(mutex);
}
```

进程调度：CPU繁忙（大时间片） vs I/O繁忙（高优先级），抢占式（分时、实时） vs 非抢占式（多批道）

衡量标准：

- 用户视角：平均周转时间$T = \frac{1}{N} \sum\limits_{i = 1}^N T_i$，平均带权周转时间$W = \frac{1}{N} \sum\limits{i = 1}^N \frac{T_i}{r_i}$，等待时间，响应时间
- 系统视角：吞吐量、CPU利用率，设备均衡利用。

进程切换算法：

- 批处理系统：
  - 先来先服务FCFS
  - 短作业优先SJF
- 时间片轮转法RR（循环遍历队列），时间片一般20-50ms
- 优先级算法（抢占 vs 非抢占，静态 vs 动态）
  - 按优先级分组，不同级别按优先级执行，同级别按RR（高优先级阻塞时发生优先级反转）
  - 多级反馈队列，默认优先级最高。时间片内完成提升优先级，时间片内未完成降低优先级。高优先级时间片短。同级别按FCFS。

#### 死锁问题

资源分两类：

- 可抢占
- 不可抢占（死锁的主要原因）

死锁发生的条件（用资源分配图进行描述）：

1. 互斥条件
2. 请求和保持条件
3. 不可抢占条件
4. 环路条件

死锁的应对策略：

1. “无为而治”
2. 死锁的检测和解除（检测：借助资源图判断环路或可否简化，解除：剥夺资源、进程回退、撤销进程）
3. 动态避免：安全状态保证进程能结束，不安全状态不保证。下列等式始终满足
    - 银行家算法
4. 死锁预防
    - 抢占式分配资源（破坏1）
    - 一次性分配所有资源（破坏2）
    - 资源编号，按序分配（破坏4）

银行家算法：不断判断分配资源后是否会进入不安全状态，如果会进入则不批准分配资源。（$n$：进程数，$m$：资源数，$\vec{E}$：总资源向量，$\vec{A}$：空闲资源向量，$C_{n \times m}$：当前分配矩阵，$R_{n \times m}$：当前请求矩阵）

$$\sum{i = 1}^n C_{ij} + A_j = E_j$$

其安全性算法如下：

1. $\vec{W}=\vec{A}$（表示资源）。$\vec{F}={(false)}_{m \times 1}$（表示完成与否）
2. 寻找 $F_i=false$且$\forall 1 \leq j \leq m, R_{ij} \leq W_j$。找不到跳转4
3. $\forall 1 \leq j \leq m, W_j = W_j + C_{ij}$。$F_i = true$。跳转2
4. 如果$\vec{F}={(true)}_{m \times 1}$那么安全，否则不安全

#### 存储管理

存储管理：

- 单道程序存储管理（分系统区、用户区，无保护）
- 分区存储管理，多道/分时（分系统区、用户区，用户区又被划分）
  - 固定分区（划分大小不同，内碎片）
  - 动态分区（链表维护，外碎片）：分配（最先匹配法、下次匹配法、最佳匹配法、最坏匹配法），回收（合并）
- 地址映射（逻辑地址$\rightarrow$物理地址）：
  - 静态地址映射：对指令代码进行修改
  - 动态地址映射：硬件，含保护，分段 vs 分页（基地址+限长寄存器）

程序内存布局：

![Memory Layout](http://www.geeksforgeeks.org/wp-content/uploads/Memory-Layout.gif)

动态地址映射包括：

- 分页（逻辑页面Page$\rightarrow$物理页面即页框Page Frame，大小确定，内碎片，需要PTBR和PTLR）：页表（逻辑页面号Page$\rightarrow$物理页面号，TLB缓存映射），物理页面表（物理页面空闲与否+空闲页数，位示图）
  $$\text{逻辑地址} = \text{逻辑页面号} \times \text{页面大小} + \text{页内偏移地址}$$
- 分段（分代码段、数据段、栈段等，段号$\rightarrow$基地址和长度，外碎片，需要STBR和STLR）
- 段页式存储管理。先把程序划分为段，然后在段内分页

分页可以进一步使用虚拟内存（局部性原理），缺页中断后载入页面（后备存储上的后备页面）。页表项包含（驻留位、保护位、修改位、访问位）。

页面置换算法：

- 最优页面置换算法OPT：等待时间最长
- 最近最久未使用算法LRU（可以使用页面链表、活动页面栈、时间戳或近似算法实现）
- 最不常用算法LFU
- 先进先出算法FIFO（性能较差）
- 时钟页面置换算法Clock（FIFO+跳过访问过的页面，定期清0）

工作集：当前使用的逻辑页面集合$W(t,\Delta)$（进程属性）。工作集大小在局部性区域的位置改变时，快速扩张和收缩过渡到一个稳定值。

驻留集：驻留在内存当中的逻辑页面集合（系统决定）。

**各种访问时间计算和地址计算。**

页面分配策略：

- 驻留集大小固定（进程内置换）。
- 可变分配策略（全局置换）。缺页率算法。

页表结构：

- 多级页表（二级页表，32位）
- 反置页表：物理页面号作为索引，页表项个数仅与物理内存大小相关，页表项内记录进程号和进程中的逻辑页面号。

Windows的存储管理：

- 低2G为用户空间，高2G为内核空间，虚拟页式存储（4K页大小，二级页表）
- 逻辑空间划分为区域，用VAD指明属性
- 努力维持空闲物理页面。

#### IO设备管理

设备文件：

- 块设备（数据块，有地址）
- 字符设备（字符，无寻址）

I/O单元由两部分组成：

1. 机械部分
2. 设备控制器（芯片）或适配器（印刷电路卡插入扩充槽）

通信方法：

- I/O独立编址：I/O端口地址对应于控制器中的每一个寄存器（与内存无关）
- 内存映像编址：内存地址对应于控制器中的每一个寄存器（一般是高位）
- 混合编址：寄存器采用独立编制，数据缓存区采用内存映像编址

I/O控制方式：

- 程序循环检测方式（浪费CPU）
- 中断驱动方式
- 直接内存访问方式（借助DMA控制器，通过中断表示完成IO操作）

程序/OS的接口（设备独立性，统一命名，阻塞 vs 非阻塞）。

OS/设备驱动的接口（块设备、字符设备和网络设备，分层），由底层到高层：

1. 中断处理程序
2. 设备驱动程序：与中断协调方式
    - 直接调用（适合互斥资源）
    - 借助请求队列对I/O进行优化
3. 设备独立的I/O软件（缓冲技术、数据块大小无关）
4. 用户空间的I/O软件（库函数，Spooling技术）

磁盘结构（由大到小）：柱面、磁道、扇区。

格式化：

1. 低级格式化：标出磁道和扇区，扇区包括相位编码（魔数、柱面号、扇区号、扇区大小）、数据区和纠错码
2. 分区：逻辑分区
3. 高级格式化：每个逻辑分区生成一个文件系统

寻址时间：

- 柱面定位时间
- 旋转延迟时间（和转速有关）
- 数据传送时间

磁盘调度算法：

- 先来先服务FCFS（低效）
- 最短定位时间优先SSTF
- 电梯算法：从某个方式移动，直到没有访问请求反方向

#### 文件系统

文件是一种抽象机制，单独的、连续的逻辑地址空间。文件的逻辑结构一般是字节流。用户在其之上构建数据结构。

`文件名.扩展名`，文件名不超过8个字符，扩展名不超过3个字符（FAT），但很多系统支持长文件名。

文件的分类：

- 普通文件
  - ASCII文件
  - 二进制文件
- 目录文件

文件的属性：权限、创建者、只读/隐藏/系统、时间戳、文件大小。

磁盘空间划分为大小相同的物理块（一个或多个扇区组成），逻辑地址空间也分成大小相同的逻辑块。扇区0称为主引导记录MBR，包含启动盘引导器和分区表。分区表记录了每个分区的起始扇区和大小。

文件控制块FCB包含文件类型、大小、所有者、权限、时间戳和物理块信息。Unix中成为I结点。

文件的物理结构：

- 连续结构：高效，外碎片，文件不能动态的增长，广泛用于一次性写入介质
- 链表结构：低效，不适合随机访问。
- 带有文件分配表的链表结构（FAT）：存在一个与物理块一一对应的FAT表，建立索引。
- 索引结构：

FAT有三种版本（12、16、32）决定FAT表项宽度，FAT-32仅用了28位。

表项的个数是物理块的个数。块大小为512的倍数（扇区大小）。

$$\text{FAT表的大小}=\text{FAT表项的个数}\times\text{表项宽度}$$

$$\text{最大容量}=\text{FAT表项的最大个数}\times\text{块的大小}$$

目录项的内容：

- 直接法：文件名和FCB，（FAT每一个目录项有32字节，包含起始物理块编号）
- 间接表：文件名和FCB的地址

内存中的数据结构：

- 系统内打开文件表：FCB、共享计数
- 进程内打开文件表：打开方式、读写指针、系统打开文件表中的索引

**各种文件系统计算。**

空闲空间列表：

- 位图法
- 链表法
- 索引法

#### 操作系统与安全

计算机安全的3个目标：

1. 数据的私密性
2. 数据的完整性
3. 系统的可用性

数据加密：

- 私钥加密：加密密钥和解密密钥都是秘密的，且可互推
- 公钥加密：加密密钥公开，和解密密钥不可互推

数字签名：MD5散列

用户认证：

- 基于密码的认证（已被穷举法攻破）
- 基于物理对象的认证（IC卡）
- 基于生物特征的认证

系统内部攻击：

- 特洛伊木马
- 登录欺骗
- 逻辑炸弹
- 后门
- 缓冲区溢出

系统外部攻击：

- 病毒（感染）
- 可执行程序病毒
- 常驻内存病毒
- 宏病毒
- 蠕虫（传播）

### Petri网

#### Petri网

$N = (S,T,F)$，$F: S \times T \rightarrow T \times S$。S表示资源集合（含Token的状态）用圆表示，T表示任务集合用方块表示。Marking Vector存储资源状态。

注意：形状及箭头方向和资源图的相反。

Trainsition发生条件：

1. 任务的前缀集全部Mark，后缀集全无Mark
2. 每次仅有一个发生

### 中间件

#### 中间件概述

中间件网络环境中运行于操作系统与应用软件之间可以简化应用软件的复杂性克服网络环境多种挑战的一类系统软件。

分类：

- 终端仿真/屏幕转换中间件
- 数据访问中间件
- 远程过程调用中间件
- 面向消息中间件
- 事务（交易）中间件
- 对象中间件

作用：

- 支持软件实体的交互模式（过程、对象、构件与服务）
= 支持软件实体的交互质量（可靠性、安全性、高效性）

中间件系列规范：DCE，OMA，J2EE/DNA，SOA

中间件发展趋势：开源化、发散化、易用化、挑战