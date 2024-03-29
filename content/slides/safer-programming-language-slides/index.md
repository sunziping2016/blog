---
title: "更安全的编程语言（幻灯片）"
authors: [szp]
tags: [编程, 静态分析]
categories: [编程]
date: 2020-09-04T18:24:50Z
featured: false
draft: false
slides:
  theme: "white"
---

{{< slide background-image="./background.svg">}}

## 更安全的程序设计语言

<div style="text-align:right;">——从常见漏洞的角度浅谈编程语言设计</div>

<div style="text-align:right;">By 周旻 副研究员 & 孙子平</div>

<div style="margin:3em auto 0;font-size:0.5em;color:gray">

本幻灯片在CC BY 4.0下提供，转载请注明来自<https://szp.io>。本幻灯片包含大量的个人观点，对错误的内容造成的损失，概不负责。

</div>

---

{{< slide background-image="./background.svg">}}

## 1 目录

1. 目录
2. 错误使用空值
3. 未初始化数据
4. 整数溢出
5. 内存及其他资源错误
6. 异常安全
7. 数据竞争
8. 类型安全
9. 最后的建议

---

{{< slide background-image="./background.svg">}}

## 2 错误使用空值

<div style="text-align:left;font-size:0.8em">

> This has led to innumerable errors, vulnerabilities, and system crashes,
> which have probably caused a **billion dollars** of pain and damage in the last forty years.

</div>

<div style="text-align:right;font-size:0.8em">– Tony Hoare, inventor of ALGOL W.</div>

<div style="text-align:left;font-size:0.8em">

某些语言允许空值作为某些类型的一种特殊状态存在：

- C/C++：指针（`NULL`/`nullptr`）
- Java：对象类型（`null`）
- Python：`None`
- JavaScript：`null`和`undefined`

空值带来了便利：没有值的时候可以先赋值为空；同时也是危险的：它不强制程序员检查非空，导致运行时才发现。

</div>

---

{{< slide background-image="./background.svg">}}

### 2.1 空值的例子和可能解决方案

```c
x = *p;
// do something
if (p == NULL) {
  // and then do something
}
```

上面是一个简单的空值漏洞的例子：代码的顺序出现了错误，即先使用后检查。

如果能强制程序员检查空值，就能提醒它犯了这种错误。

---

{{< slide background-image="./background.svg">}}

（续）

如何解决空值的问题？

1. 强大的编程技巧——不保险
2. 静态分析工具的支持——不完备（可能有疏漏）
3. 编程语言层面的支持:heavy_check_mark:

---

{{< slide background-image="./background.svg">}}

### 2.2 使用可空类型避免空值错误

借助完善的类型系统：

1. 不允许普通类型出现空值
2. 使用**可空类型**强制程序员处理可空或断言非空

例如：

- C++：`std::optional`（C++17）替代空指针表示可空类型
- Java：`java.util.Optional`（由于允许对象类型可空，形同虚设）
- Python：`typing.Optional`（由于类型检查很弱，形同虚设）
- TypeScript、Haskell：采用和类型（Union类型或代数数据类型）

---

{{< slide background-image="./background.svg">}}

**可空类型**是如何解决这个问题的？

1. 检查之后再断言非空（传统的过程式方式，C/C++、Java）：

    ```java
    Optional<X> x = ...;
    if (x.isPresent()) {
      y = x.get();
    }
    ```

2. 使用**模式匹配**（Haskell/Rust），避免了断言：

    ```haskell
    Maybe a = Just a | Nothing
    f x = case x of Just a => ...
                    Nothing => ...
    ```

3. 函数式地进行映射、且、或之类的运算（Haskell/Rust/Java）：

    ```haskell
    > fmap (+ 1) (Just 1)  -- Maybe, it's a functor!
    Just 2
    ```

---

{{< slide background-image="./background.svg">}}

## 3 未初始化数据

未初始化与空值类似，是一个正常类型不该有的状态，解决方案：

1. **不允许未初始化数据**：使用**构造函数**，C++（甚至**初始化列表**）
2. **使用控制流分析**：如Rust

一些语言采用一些特殊的值初始化了对象（如Java的`null`），这叫饮鸩止渴。

---

{{< slide background-image="./background.svg">}}

### 3.1 一个使用未初始化数据的例子

下面是C语言的一个使用未初始化数据的例子。这是由于忘记了赋予初值，这种错误通常很容易犯。

```c
int i, counter;
for(i = 0; i < 10; ++i)
    counter += i;
printf("%d\n", counter)
```

---

{{< slide background-image="./background.svg">}}

## 4 整数溢出

整数溢出很可能是程序异常的行为。为了避免这种情况：

- 任意精度的整型：Python
- 运行时检查：C++（`clang -fsanitize=undefined`），Rust debug模式

```bash
$ cat test.c
int main(int argc, char *argv[]) { return 0x7fffffff + argc; }
$ clang -fsanitize=undefined test.c
$ ./a.out
test.c:1:54: runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'
SUMMARY: UndefinedBehaviorSanitizer: undefined-behavior test.c:1:54 in
```

---

{{< slide background-image="./background.svg">}}

## 5 内存及其他资源错误

不再需要的资源（如堆内存、文件、锁）未释放，就会造成泄露。为了避免这种情况：

- 自动调用析构函数：C++（RAII范式）
- 垃圾回收：Java及绝大多数脚本语言（仅能可靠释放堆内存资源）
- 所有权机制：Rust

对于使用垃圾回收的语言，诸如文件之类的资源是需要手动释放的。于是就有了：

- 可关闭对象：Java（`AutoClosable`）、Python（`__enter__`，`__exit__`），需要手动调用`close()`或使用try-with-resources语句

---

{{< slide background-image="./background.svg">}}

### 5.1 RAII范式

RAII是**资源获得即初始化**的简写，指对象的生命周期与资源的获取释放完全一致。这是**异常安全**的。下面的代码不需要显示释放锁和文件。

```cpp
void WriteToFile(const std::string& message) {
  static std::mutex mutex;
  std::lock_guard<std::mutex> lock(mutex);
  std::ofstream file("example.txt");
  if (!file.is_open())
    throw std::runtime_error("unable to open file");
  file << message << std::endl;
}
```

<div style="margin:3em auto 0;font-size:0.5em;color:gray">

来自[Resource acquisition is initialization - Wikipedia](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization)

</div>

---

{{< slide background-image="./background.svg">}}

### 5.2 循环引用及垃圾回收

对于C++、Rust之类的语言，可以通过计数有多少引用，来自动释放不再被引用的内存。**循环引用**对此是致命的，示例如下，所以就引入了弱引用。

```cpp
struct Person { std::shared_ptr<Person> partner; };
auto lucy = std::make_shared<Person>();
auto ricky = std::make_shared<Person>();
lucy->partner = ricky;
ricky->partner = lucy;
```

主流的**垃圾回收**方式是使用遍历判断可达性，可以有效解决循环引用问题。

---

{{< slide background-image="./background.svg">}}

## 6 异常安全

异常安全，是指当异常发生时：

1. 资源**无泄漏**
2. 数据具有**一致性**

即使是在实践了RAII的语言中，这也是一件很困难的事情：

```cpp
int a = new int;
foo();
delete a;
```

上面的代码就会在`foo()`跑出异常时造成内存泄露。所以在C++中全面使用**智能指针**是很有必要的。

---

{{< slide background-image="./background.svg">}}

### 6.1 Try-With-Resources语句

对于不能实践RAII的垃圾回收语言，通过**try-finally**来释放资源很容易有遗漏，所以就有了**try-with-resources**语句。如Python：

```python
with open("lol") as f:
    print(f.read())
```

---

{{< slide background-image="./background.svg">}}

## 7 数据竞争

数据竞争竞争是并发中很容易出现的问题，**加锁**可以解决这个问题，但谁能确保不忘呢。为了避免这种情况：

- 纯函数&不可变数据：Haskell，消除了数据竞争的可能
- 借用检查：Rust，同样消除了数据竞争的可能
- 同步原语：锁（互斥锁、读写锁），channel（Go、Rust）

数据竞争的条件：

- 可能同时出现多次写（$\geq 2$）
- 或，可能同时出现一次写和多次读（$\geq 1$）

---

{{< slide background-image="./background.svg">}}

### 7.1 Rust的借用检查

Rust只允许一个时刻持有：

- 要么，一个可写引用
- 要么，多个可读引用

以上内容是编译时检查的，这对编译器的静态分析提出了更高的要求，也限制了一些可能正确的程序。

---

{{< slide background-image="./background.svg">}}

## 8 类型安全

<div style="display:flex; justify-content:space-between;"><div>

编程语言有如下的分类：

- 强类型：不容忍隐式类型转换
- 弱类型：容忍隐式类型转换
- 静态类型：编译期确定变量类型
- 动态类型：编译期无法确定变量类型

</div><div style="align-self:center;">

![Programming Language Type Categories](./pl-type-categories.png)

</div></div>

总的来说，动态语言很容易写出运行时才会报错的代码，所以**静态比强是更重要的**。当然又强又静态是最好的。

<div style="margin:3em auto 0;font-size:0.5em;color:gray">

来自[弱类型、强类型、动态类型、静态类型语言的区别是什么？ - 知乎](https://www.zhihu.com/question/19918532/answer/21645395)

</div>

---

{{< slide background-image="./background.svg">}}

### 8.1 动态类型语言的坏处

下面是一个典型的动态语言Bug，这在静态语言是不会出现的。相信也有不少的人遇到过，Python写了个神经网络，跑了几小时后，崩在保存模型的代码上。

```python
a = [1, 2, 3]
print('.'.join(a))
```

---

{{< slide background-image="./background.svg">}}

### 8.2 弱类型语言的坏处

JavaScript是一门神一般的语言，举几个栗子：

```javascript
[] == ![]; // -> true

[6, -2, 2, -7].sort() // -> [-2, -7, 2, 6]

null == 0; // -> false
null > 0; // -> false
null >= 0; // -> true
```

<div style="margin:3em auto 0;font-size:0.5em;color:gray">

来自[denysdovhan/wtfjs: 🤪 A list of funny and tricky JavaScript examples](https://github.com/denysdovhan/wtfjs)

</div>

---

{{< slide background-image="./background.svg">}}

### 8.3 Java数组协变带来的错误

早期Java尚不支持泛型，为了支持对数组的通用操作，引入了数组协变：如果`A`是`B`的子类型，那么`A[]`也是`B[]`的子类型。然而这又是一个引来麻烦的设计：

```java
String[] strings = new String[1];
Object[] objects = strings;
objects[0] = 12;
```

这是运行时错误，所以现代语言大多禁止了数组及其他容器的协变。

---

{{< slide background-image="./background.svg">}}

### 8.4 泛型

通过泛型机制，在保证代码正确的基础上，复用代码。我个人将支持泛型的语言分为两类：

- 无约束泛型：类型变量没有约束，在泛型代码被实例化时检查操作的合法性，如C++
- 有约束泛型：类型变量需要实现接口，不需要实例化泛型即可检查错误，编译更快，如Java、TypeScript、Rust

C++在20版本中也引入了Concept，但历史包袱很重。现代语言大多采用有约束泛型。

---

{{< slide background-image="./background.svg">}}

## 9 最后的建议

- 如果你在使用C++，那么看看Rust对你会很有帮助，会很香的
- 如果你在用JavaScript，请转移阵营到TypeScript，也会很香的，你会发现它不断地从bug边缘拯救你
- 如果你在用Python，那么你可以尝试加上类型注解并用mypy，但体验可能很一般

---

{{< slide background-image="./background.svg">}}

<h1 style="text-align:center">谢谢大家!<h1>

---

{{< slide background-image="./background.svg">}}

## 10 被移除的章节

这里包含一些可能过于琐碎和深奥的章节。

---

{{< slide background-image="./background.svg">}}

### 10.1 关于控制流分析 (原3.1)

程序分析通常都是**不是万能的**。例如，`loop`和`while true`在rust中是基本等价的，只有下面的不同：

<div style="display:flex;justify-content:space-between;"><div style="width: 45%">

<div style="text-align:center;color:green">编译成功:heavy_check_mark:</div>

```rust
let x;
loop { x = 1; break; }
println!("{}", x)
```

</div><div style="width: 45%">

<div style="text-align:center;color:red">编译失败:x:</div>

```rust
let x;
while true { x = 1; break; }
println!("{}", x)
```

</div></div>

这是因为编译器不认为`while`循环一定会被执行一次。

<div style="margin:3em auto 0;font-size:0.5em;color:gray">

来自[rust - What is the difference between loop and while true? - Stack Overflow](https://stackoverflow.com/questions/28892351/what-is-the-difference-between-loop-and-while-true)

</div>

---

{{< slide background-image="./background.svg">}}

### 10.2 为什么make_unique (原6.2)

考虑下面的C++代码：

```cpp
foo(std::unique_ptr<X>(new X), std::unique_ptr<Y>(new Y))
```

由于C++中表达式的求值顺序不定。假设求值顺序是：先执行`new X`，再执行`new Y`，最后执行两个`unique_ptr`的构造函数。此时，如果`Y`的构造函数抛出了异常，就会出现内存泄漏。所以上述代码应当改为：

```cpp
foo(std::make_unique<X>(), std::make_unique<Y>())
```

---

{{< slide background-image="./background.svg">}}

### 10.3 Copy-And-Swap范式 (原6.3)

考虑一个C++某类的拷贝赋值函数设计方式：

```cpp
Person& operator=(const Person& that)
{
    if (this != &that) {
        delete[] name;
        name = new char[std::strlen(that.name) + 1];
        std::strcpy(name, that.name);
        age = that.age;
    }
    return *this;
}
```

当`new`抛出异常，`this`所指对象被析构时，就会出现**重复释放内存**。**在拷贝对象时，先销毁旧状态再复制新状态，通常很危险。**

---

{{< slide background-image="./background.svg">}}

（续）

使用Copy-And-Swap模式就能解决这个问题，这需要类实现**拷贝构造函数**和**移动构造函数**，后者在C++中不应该抛出异常：

```cpp
Person& operator=(Person that)
{
    std::swap(*this, that);
    return *this;
}
```

<style>

.reveal .slides {
  text-align: left;
}

.reveal {
  font-size: 28px;
}

.reveal blockquote {
  width: 90%;
}
</style>
