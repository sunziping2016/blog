---
title: "Coq学习笔记（未完待续）"
authors: [szp]
tags: [编程, 类型论]
categories: [类型论]
date: 2021-08-29T23:33:32+08:00
lastmod: 2021-08-29T23:33:32+08:00
featured: false
draft: false
---

这篇文章来自《Coq in a Hurry》[^bertot2016coq]的总结。

<!--more-->

## 表达式和逻辑公式

### 编写正确的公式

使用`Check`命令能查看公式的类型：

```coq
> Check True.
True : Prop

> Check 3.
3 : nat
```

`a: A`可以表示`a`的类型是`A`，或者`a`是`A`的证明。它可以位于表达式中，显式指明表达式类型。

常见的类型有`Prop`表示命题，`nat`表示自然数。复杂的类型可以通过逻辑联结词（`/\`、`\/`）和诸如加、乘、对`(a, b)`（其类型为`A * B`）等等创建。使用`fun`能创建λ表达式（其类型为`A -> B`，右结合）、`forall`和`exists`创建量词：

```coq
> Check (fun x:nat => x = 3).
fun x : nat => x = 3 : nat -> Prop

> Check (forall x:nat, x < 3 \/ (exists y: nat, x = y + 3)).
forall x : nat, x < 3 \/ (exists y : nat, x = y + 3) : Prop
```

使用`let .. in`可以给表达式一个临时的名字，注意到函数应用不需要括号。

```coq
> Check (let f := fun x => (x * 3,x) in f 3).
(let f := fun x : nat => (x * 3, x) in f 3 : nat * nat
```

有些符号被重载了，比如`*`既表示数字的乘法，又表示笛卡尔积类型。使用`Locate`命令可以找到符号背后的函数。

```coq
> Locate "_ <= _".
```

项是合法的需要遵守：

1. 语法正确
2. 类型正确

而`Check`命令不仅进行了上面的检查，还给出了表达式的类型。

### 对表达式求值

使用`Compute`可以对表达式求值。

## 用Coq编程

Coq中的程序用函数表示，简单的程序可以被Coq执行，复杂的可以用`Extraction`命令转换为其他编程语言的。

### 定义新的常量

使用`Definition`关键字可以定义常量：

```coq
> Definition example1 := fun x : nat => x*x+2*x+1.
```

上面的形式等价于：

```coq
> Definition example1 (x : nat) := x*x+2*x+1.
```

定义完后，就可以在诸如`Check`和`Compute`的命令中使用。使用`Reset`后面跟一个名字可以清除该名字。可以使用`Print`命令查看一个对象的定义。

### 布尔条件表达式

Coq内置了布尔（`bool`）值`true`和`false`。为了使用它，你需要导入`Bool`库。

```coq
> Require Import Bool.
```

布尔值可以使用`if ... then ... else ...`。后者接受一个模式返回符合的；而后者接受一系列的模式，返回都符合的。

### 使用自然数计算

需要使用`Arith`库进行自然数的计算。自然数有两种形式，一种是`0`，另一种是`S p`，其中`p`是一个自然数。可以使用`match ... with ... end`进行模式匹配。第一个子句的`|`可省略。

```coq
Definition is_zero (n:nat) :=
    match n with
        0 => true
    | S p => false
    end.
```

如果要使用递归，可以使用`Fixpoint`关键字。`Fixpoint`必须遵守一个约束叫structural recursion，即递归只能作用在初始参数（上面的`p`）上。这个约束确保计算是可终止的。递归函数可以有多个参数，这时候structural recursion必须在一个参数上是成立的。

Coq还支持深模式匹配，Coq会检查是否所有的模式都匹配了：

```coq
Fixpoint evenb n :=
    match n with
            0 => true
    |       1 => false
    | S (S p) => evenb p
    end.
```

### 使用列表计算

需要导入`List`库。如果要将几个元素放入列表中，需要使用`::`，它将左边的元素添加到右边列表的头，用`nil`表示空列表：

```coq
Check 1::2::3::nil.
```

注意`nil`需要上下文确定其具体类型。可以使用类型注解表示其类型。

```coq
Check (nil : list nat)
```

有一些预定义的列表函数：

- `app`，别名`++`：链接列表。
- `map`：对列表的每个元素做映射。

列表也可以模式匹配为`nil`和`a::tl`（`a`是一个元素，`tl`是剩余的列表）。同样也可以递归，递归只能作用在剩余的列表上。

## 命题和证明

### 找到已有的证明

`Search`后面跟标识符可以搜索已有的证明。`SearchPattern`后面跟一个模式表达式（使用`_`表示一个不完整的子表达式）。`SearchRewrite`与`SearchPattern`类似，只是寻找的一定是个相等的谓词。`SearchAbout`搜索所有的与某个符号相关的证明。

### 构建新的证明

构建证明的通常方式是“目标导向的证明”：

1. 使用`Theorem`或者`Lemma`开始一个定理。
2. Coq显示需要证明的命题，已经可以用于该证明的上下文（上下文在`=====`上方，目标在下方）。
3. 用户输入命令，分解目标。
4. Coq显示还需要证明的命题。
5. 回到3。

步骤3称为tactics。某些tactics减少了目标的数量。当所有目标都解决，证明就完成了，这时候可以输入`Qed.`命令，该命令保存了证明。一个简单的证明如下：

```coq
Lemma example2 : forall a b: Prop, a /\ b -> b /\ a.
Proof.
    intros a b H.
    split.
        destruct H as [H1 H2].
            exact H2.
        intuition.
Qed.
```

上下文中的内容一般是`a: type`或者`H: formula`的形式，我们称为假设，它表示我们现在有的事实。`destruct H as [H1 H2]`在`H`为两个命题的合取时可以使用。它的作用是创建两个新的假设，名字为`H1`和`H2`。下表包含了常见的tactics。

| |Hypothesis `H`|conclusion|
|:-:|:-|:-|
|$\Rightarrow$|`apply H`|`intros H`|
|$\forall$|`apply H`|`intros H`|
|$\land$|`elim H`、`case H`、`destruct H as [H1 H2]`|`intros H`|
|$\neg$|`elim H`、`case H`|`intros H`|
|$\exists$|`elim H`、`case H`、`destruct H as [x H]`|`exists v`|
|$\lor$|`elim H`、`case H`、`destruct H as [H1 \| H2]`|`left`或者`right`|
|$=$|`rewrite H`、`rewrite <- H`|`reflexivity`、`ring`|
|`False`|`elim H`、`case H`| |

当你在处理假设时，可以用Hypothesis那一列；处理结论时用conclusion那列。

我们用`exact H`表示我们要证明的结论就在上下文中，`assumption`可以做到类似的效果。`intuition`可以用于自动证明。

当使用`elim`或者`case`，会将事实放在结论处，其目标会成为蕴含的前件。这些前件稍后可被`intros`引入。因此有`destruct`可以同时完成这两件事。

所有的以假设作为参数的tactics都可以以定理作为参数。

### 用基本tactics的另一个例子

（未完待续）

[^bertot2016coq]: Yves Bertot. Coq in a Hurry. 3rd cycle. Types Summer School, also used at the University of Goteborg, Nice,Ecole Jeunes Chercheurs en Programmation,Universite de Nice, France. 2016, pp.49. inria-00001173v6
