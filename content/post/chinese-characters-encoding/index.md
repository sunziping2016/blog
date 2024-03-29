---
title: "中文字符编码"
authors: [szp]
tags: [编码, C++]
categories: [C++]
date: 2016-11-18T00:00:00+08:00
featured: false
draft: false
---


这篇文章，针对字符编码，以C/C++程序员的角度，谈谈我的一些理解。

<!--more-->

## 前言

<del>QAQ，我是被迫发的这个。。迟到的推送。</del>前一阵子，大二的各位同学们都忙于数算大作业不可开交。这次大作业，各种各样的坑不一一列举啦。这里仅仅针对字符编码，以 C/C++ 程序员的角度，谈谈小编的一些理解。如有错误，请多多包含。

## GBK

GBK 是贵国制定的汉字编码标准。这里 GB 是“国标”的意思，K 就是“扩”展的意思，指的是 GBK 向对于之前的 GB2312 进行了向下兼容的扩展。其中 GB2312 只包含 6763 个常用汉字，而 GBK 包含了几乎所有的汉字字符。

GBK 编码包含了各种简繁体汉字、奇葩符号等等，编码占据 2 字节，范围为 0x8140-0xFEFE。

### GBK 的 ASCII 兼容

这里我们可以发现，所有 GBK 编码的首字节最高位均为 1（大于 0x80）。这意味着不需要特殊处理，GBK 编码即可和 ASCII 码（0x00 ~ 0xFF）混合于同一文件中。混合后的字符编码成了变长编码，即首字节最高位为 0 时，字符占据 1 个字节，首字节最高位为 1 时，字符占据 2 个字节。

### 判断 ASCII 需要依赖变长编码的分割

GB2312 的第二个字节最高位一定为 1。但注意，GBK 编码的第二个字节最高位可能并不是 1。这也就意味着，如果不进行特殊处理，仅用 char 存储 GBK 编码的汉字，一些偏僻的只有 GBK 编码不存在 GB2312 编码的汉字的第二个字节可能会被当作 ASCII 编码的字符处理。如“镕”的 GBK 编码为 0xE946，其中第二个字节的编码对应于 ASCII 中的“F”。如果不分青红皂白对存储着这个字的 char 数组的所有元素调用`tolower()`之类的函数，“镕”字将变成“閒”（0xE966，其中 0x66 对应于 ASCII 中的“f”）。

### 字符串匹配需要依赖变长编码的分割

此外，在 GBK 编码中，可能存在一个字的编码，其首字节与另一个字编码的第二个字节一样，其第二个字节又与再一个字编码的首字节一样（有点绕，看例子）。这意味着如果不进行特殊处理，仅用 char 存储 GBK 编码的汉字，搜索算法可能会匹配到截断的汉字。如“你”、“好”这两个字的 GBK 编码分别为 0xC4E3 和 0xBAC3，而还有一个汉字“愫”的编码是 0xE3BA。假设我们的 char 数组里存着 GBK 编码的“你好”：`char hello[] = "你好"; // encoded in GBK`（C 语言小贴士：这时候`hello`为 5 个元素的数组：`hello[0...1]`为“你”，`hello[2...3]`为“好”，`hello[4]`为`'\0'`）。若你对整个数组用伟大的 KMP 算法搜索是否存在“愫”这个汉字的时候，你将惊讶的发现，`hello[1...2]`匹配上了“愫”这个汉字。

## Unicode 和 UTF-8

歪楼，好喜欢 Unicode 学生节以及这个谐音（You need code）的创意！（求编辑在这里添加一个很期待很可爱很萌的颜文字）可是。。。可是呜呜，我订的院衫还没来。 QAQ

（严肃脸）Unicode 是全球的统一的字符标准。包含各种文字、emoji（求编辑在这里放个翻白眼的 emoji）等等。到目前为止，Unicode 中最长的编码占用 21 位。为了确保可持续发展，Unicode 目前被认为是需要占用 4 个字节。

Unicode 只是给每一个字符定义了唯一的编码，具体存储则可以根据具体需求在 Unicode 编码上再一次进行编码。直接以 32 位定长编码存储，则称之为 UTF-32 或 UCS4；若以 1 ~ 6 个（一般只需要考虑 1 ~ 4 个）8 位变长编码存储，则称之为 UTF-8；若以 1 ~ 6 个（目前只需要考虑 1 ~ 4 个）8 位变长编码存储，则称之为 UTF-8；若以 1 ~ 2 个 16 位变长编码存储，则称之为 UTF-16。限于篇幅，我们只谈谈 UTF-8。

UTF-8 是以 8 位为最小单元去存储，存储方法如下表所示（“U+*hhhh*”实际上就是 Unicode 编码为“0x*hhhh*”的字符）：

|UTF-8 字节数|Unicode 编码位数|第一个 Unicode 编码|最后一个 Unicode 编码|字节 1  |字节 2  |字节 3  |字节 4  |
|:----------:|:--------------:|:-----------------:|:-------------------:|:------:|:------:|:------:|:------:|
|1           |7               |U+0000             |U+007F               |0xxxxxxx|        |        |        |
|2           |11              |U+0080             |U+07FF               |110xxxxx|10xxxxxx|        |        |
|3           |16              |U+0800             |U+FFFF               |1110xxxx|10xxxxxx|10xxxxxx|        |
|4           |12              |U+10000            |U+10FFFF             |11110xxx|10xxxxxx|10xxxxxx|10xxxxxx|

### UTF-8 的 ASCII 兼容

UTF-8 编码下首字节的最高位若不是 1，则编码占据 1 个字节，这与 ASCII 相兼容。若最高位是 1，则高位的 1 的个数对应于编码占据的字节个数。

这里举个例子，“你”的 Unicode 编码为 U+4F60，二进制为 01001111 01100000。由上表知，其 UTF-8 占用的字节长度为 3，对应的 UTF-8 二进制编码为 11100100 10111101 10100000，也就是 0xE4BDA0。

### 判断 ASCII 不需要依赖变长编码的分割

UTF-8 相对于上面所说的 GBK 编码有很多优点。比如，对于非 ASCII 字符，其编码的任一字节最高位都不是 0。这意味着，如果你只是用 char 存储 UTF-8 编码的字符串，不做任何处理，仅通过最高位是否为 1，即可判断字符是否为 ASCII 字符。这对于`tolower()`之类的函数，无疑是个福音。

### 字符串匹配不需要依赖变长编码的分割

对于 UTF-8 编码，可以通过判断其高位是否为 10，得知该字节是否是编码的首字节。这同样也就意味着，不可能存在一个字的编码，其前若干字节与其他字符编码的后若干字节相同。这意味着，对于 char 存储的 UTF-8 编码的字符串，若试图搜索子串，不可能出现截断匹配的现象。

## Windows 的 GBK 与 UTF-8 兼容之战

GBK 和 Unicode 本身采用了完全不同的字符编码体系，但两者的字符集有很大的对应关系。许多时候对于程序员而言，这两者之间的转换只能靠暴力打表。接下来，我谈谈在 Windows 编程时，由于字符编码大家可能遇到的困惑。

### BOM

对于我们可爱的记事本而言，知道一个文本是 GBK 编码还是 UTF-8 编码似乎并不容易。一个最著名的梗便是，用记事本的保存 GBK 编码的文本“联通”，再次用记事本打开将会是乱码。这是由于“联通”的 GBK 编码为 0xC1AACDA8，即 11000001 10101010 11001101 10101000。这与 UTF-8 中 2 字节编码的规则长得太像了，因而被用错误的编码方式打开了。

当然，为了方便记事本识别 UTF-8 文本，微软还是动了一些歪脑经（虽然至今并未修复上述的 Bug）。其中，最坑爹的莫过于 BOM。当你用记事本以 UTF-8 方式保存文本时，记事本会自动为你在整个文档的最前面插入一个字符“零宽度不可换行的空白符”，Unicode 编码为 U+FEFF，UTF-8 编码为 0xEFBBBF。该字符本来是用来防止在一些不该折行的地方折行，却被微软用作了 UTF-8（也包括其他 Unicode 编码方式）识别的工具。由于其本身是“零宽度”，并不可见，对于用户而言没什么差别。但对于程序而言，这无疑是个灾难。

以这次大作业为例。这次作业助教发布的“字典.dic”文件便是带着 BOM 字符的，标准 C++ 组件并不对 BOM 字符进行特殊处理，因而实际读入该文件第一行“一一列举”，转成 Unicode 存储时，其长度将会比正常的字符串多 1 个字符，为 5。

对于这个问题，建议大家可以在代码中对于 BOM 进行特判，或者用 notepad++ 另存为。

### 程序的字符集

对于中文版 Windows 而言，所有程序默认的显示字符编码都是 GBK。换言之，如果你想在源代码中包含有趣的中文字符串，若想在 Windows 上显示而不产生乱码，则必须采用 GBK 保存源代码。这样编译器便会把字符串按照 GBK 编码编译到程序中，并最后以 GBK 编码显示到各种地方。

悲伤的是，除了 Windows，其他操作系统都默认使用 UTF-8。这也就为什么我们不建议在代码中包含中文。如果你在源代码中包含了中文，而不愿意写任何平台相关的代码，势必你的代码只能在 Windows 或其他操作系统上的一个里面保持不乱码的输出。

当然控制台窗口也如上所说，默认输出编码为 GBK。因而，如果你将这次大作业读入的 UTF-8 或者转换得到的 UTF-32 编码的文字直接输出到标准输出上，势必会导致乱码。对此，没有任何简单的解决方案。

（PS 小编本人觉得，大家在代码里尽量保持纯 ASCII 编码不失为一个好习惯。注释也可以尝试用英文写。

### C++

其实这次大作业可以不必将 UTF-8 编码的文件进行转码。但是变长编码终究会带来很多不变。幸运的是，C++11 确实提供了一些用于 UTF-8 转码的库。这点我相信大家也已经有所体会，小编便不再多说啦。这里提一下平台不同导致的一些问题。一般而言，Windows 上 wchar\_t 的大小为 16 位，并不一定能存储所有的 Unicode 字符，而其他平台上基本是 32 位。这也意味着，如果遇到文本中存在着类似 emoji 这类 Unicode 字符时，Windows 上的 C++ 标准库将无能为力。
