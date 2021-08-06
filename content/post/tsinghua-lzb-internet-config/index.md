---
title: "清华软院零字班上网配置"
authors: [szp]
tags: [配置]
categories: [配置]
date: 2021-01-17T15:49:14Z
featured: false
draft: false
---

这篇文章是关于清华软院零字班学生上网所需要的配置方案的。

<!--more-->

## 简介

我们使用V2Ray翻墙。V2Ray本身只是代理工具，因而还需要服务器。代理服务器由零字班辅导员购买，并有20级硕士新生我（孙子平）维护。

本代理仅被用于学术问题，包括检索文献，搜索技术问题解决方案，加速npm、PyPi、GitHub等的访问速度，在视频网站上浏览MOOC等。我们会记录每个人访问的网站。

## 配置代理

以下涉及版本的配置均是在2021年1月18日的方案，请大家寻找适合的最新版本。v2ray-core是最核心的代理工具，它没有图形界面，而其之上有很多有图形界面的客户端，详见[Awesome V · Project V Official](https://www.v2ray.com/en/awesome/tools.html)，这里只给出我所知道的比较好的方案。

### Windows

Windows上一般使用V2RayN图形界面，下载链接见[Releases · 2dust/v2rayN](https://github.com/2dust/v2rayN/releases)。推荐使用Latest release版，目前为3.29，[此处](https://cloud.tsinghua.edu.cn/smart-link/42eb2e7f-2be4-460f-8454-ff64791c06d9/)为清华云盘链接；Pre-release版没试过，可能也是不错的选择，目前为4.5，[此处](https://cloud.tsinghua.edu.cn/smart-link/2008f31b-9d86-41cb-b7c0-d12ec7101173/)为清华云盘链接。

解压后运行v2rayN.exe，左键点击右下角托盘图标，可以复制邮件中的`vmess.txt`的内容再选择“服务器”->“从剪贴板导入批量URL”，也可以打开邮件中的`vmess.png`在选择“服务器”->“扫描屏幕上的二维码”。最后右键点击托盘图标，选择“http代理”->“PAC模式”，此时托盘图标会变为紫色。

此外也很建议开启开机自启，左键点击右下角托盘图标，选择“参数设置”->“v2rayN设置”->“开机自动启动”。

最后推荐你继续阅读[桌面版Chrome](#桌面版chrome)。在阅读之前你需要记住代理端口号，你可以左键点击右下角托盘图标，选择“参数设置”->“Core:基础设置”->“本地监听端口”即可查看，一般为10808。

### MacOS

MacOS上一般使用V2rayU图形界面，下载链接见[Releases · yanue/V2rayU](https://github.com/yanue/V2rayU/releases)。推荐使用Latest release版，目前为2.3.1，[此处](https://cloud.tsinghua.edu.cn/smart-link/052cd760-74b6-4179-a818-c031dd037d1b/)为清华云盘链接；Pre-release版，目前为3.0.0.preview，[此处](https://cloud.tsinghua.edu.cn/smart-link/4593219b-ae43-4d1a-99d6-a05c2ba60f57/)为清华云盘链接。

运行V2rayU，复制邮件中的`vmess.txt`的内容，左键点击右上角托盘图标，选择“服务器设置”，复制到“导入”按钮左侧的输入框，点击“导入”。之后就可以使用了。

最后推荐你继续阅读[桌面版Chrome](#桌面版chrome)。在阅读之前你需要记住代理端口号，你可以左键点击右上角托盘图标，选择“偏好设置”->“Advance”->“本地Sock监听端口”，一般为1080。

### Linux

#### V2Ray-Core的安装

Ubuntu等发行版可以尝试使用下面的命令安装v2ray-core：

```bash
sudo bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

有时候由于GitHub的连接不太好，你会遇到连接出错。为此，我将安装脚本下载了下来，放在清华云盘的[这里](https://cloud.tsinghua.edu.cn/smart-link/926f8634-ecbd-435b-bef9-f56b96fb820f/)。在下载完后，按照下面的方式安装：

```bash
sudo bash install-release.sh
```

之后，下载邮件附件中的`lzb.szp.io.json`，将它拷贝到`/usr/local/etc/v2ray/`目录下。然后使用systemd启动并设为开机启动。

```bash
sudo cp lzb.szp.io.json /usr/local/etc/v2ray
sudo systemctl start v2ray@lzb.szp.io
sudo systemctl enable v2ray@lzb.szp.io  # 开机自启
```

#### Proxychains的安装

配置文件中已经使用了1080作为socks5代理端口号，但是许多应用可能不支持使用socks5代理。这时候对于命令行的绝大多数程序，proxychains就可以提供帮助。

```bash
sudo apt install proxychains
```

接着编辑`/etc/proxychains.conf`对最后一行做出更改：

```txt
...
[ProxyList]
socks5  127.0.0.1 1080
```

在你需要运行的命令前加上`proxychains`就可以方便地使用。如：

```bash
# 一些proxychains的例子
proxychains wget https://google.com
proxychains git clone ...
proxychains pip install -r requirements.txt
proxychains npm install
```

#### 全局透明代理的配置

但是`proxychains`是采用preload动态链接库的方式，这样只对动态链接到`libc`之类的程序有用。对于Go和Rust编写的程序可能就不起作用。但借助iptables，我们可以实现全系统的透明代理。

首先允许IP包转发：

```bash
sudo sh -c "echo net.ipv4.ip_forward=1 > /etc/sysctl.d/10-ip_forward.conf"
sudo sysctl --system
```

接着是下载我编辑的透明代理脚本：

```bash
cd /usr/local/bin
sudo proxychains wget https://raw.githubusercontent.com/sunziping2016/tproxyctl/master/tproxyctl
sudo chmod +x tproxyctl
```

最后你就可以使用以下命令开启全局透明代理：

```bash
sudo tproxyctl start
```

并使用以下命令关闭全局透明代理：

```bash
sudo tproxyctl stop
```

最后推荐你继续阅读[桌面版Chrome](#桌面版chrome)。记住代理默认端口号是1080。

### 桌面版Chrome

Chrome一般会遵守系统代理，V2Ray的各种客户端在PAC模式下一般都能按照需要决定是否走代理。但即使如此，代理还是比较慢的。为了使Chrome更快、同时也更方便地管理代理测策略，可以安装[Proxy SwitchyOmega - Chrome Web Store](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?hl=en-US)插件。

打开插件后，你可以跳过教程。打开“Profiles”->“proxy”，“Protocol”选择“socks5”，“Server”填`127.0.0.1`，“Port”填代理端口（一般是10808或者1080），然后点击“Apply changes”。接着打开“Profiles”->“auto switch”，跳过教程，删除最上面两个（也就是所有可以删的）“Switch rules”，点击“Add a rule list”，在“Rule List URL”填入`https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt`，点击“Download Profile Now”->“Apply changes”，再到“Switch rules”中找到“Rule list rules”，选择“Profile”->“proxy”，最后“Apply changes”。

新版的Chrome可以Pin一些插件，建议Pin上这个插件。左键点击它就可以选择代理模式，一般选择“auto switch”，这样Chrome只会代理需要代理的网站，而且拥有很好的性能；选择“proxy”，就可以对所有站点都代理。

这个插件还可以为网站添加代理规则，同时管理多个代理等等，这里不再完整说明了。

### Android

Android上一般使用v2rayNG图形界面，有Google Play或者国际应用管理软件的同学可以直接下载。国内的可以使用这个下载链接[Releases · 2dust/v2rayNG](https://github.com/2dust/v2rayNG/releases)，不同的安卓手机有不同的架构，一般是`arm64`，清华云盘在[此处](https://cloud.tsinghua.edu.cn/smart-link/81b4c90e-3d49-4694-a3fe-f2afb84a6f4b/)下载；少数是`armeabi`，清华云盘在[此处](https://cloud.tsinghua.edu.cn/smart-link/4649c81e-d2fd-48ee-bca3-42bede1db87b/)下载。

打开软件后，点击右上角“+”按钮，可以复制`vmess.txt`选择“从剪贴板导入”，也可以在电脑上打开`vmess.png`，直接扫码导入。而后点击右下角的“V”按钮，变为绿色就表示开始代理。

更好的配置方案包括：点击左上角汉堡菜单，会弹出侧栏，选择“设置”中“预定义规则”可以选择“绕过局域网及大陆地址”；在“设置”中，开启分应用代理。

### iOS

iOS上一般使用Shadowrocket。但Shadowrocket需要美区Apple ID，当然可能也有替代的软件。由于我没有iOS设备，所以暂时这部分我不太了解如何配置。
