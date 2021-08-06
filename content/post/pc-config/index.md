---
title: "PC系统配置"
authors: [szp]
tags: [PC, 配置, ArchLinux]
categories: [配置]
date: 2017-08-16T04:00:00+08:00
featured: false
draft: false
---

这篇文章主要是关于自己ArchLinux系统的配置的。

<!--more-->

## 硬件配置

### 网络

#### 旧方法（被抛弃）

```bash
pacman -S iw wpa_supplicant
systemctl start systemd-networkd.service
systemctl start systemd-resolved.service
systemctl start wpa_supplicant@wlp3s0.service
systemctl enable systemd-networkd.service
systemctl enable systemd-resolved.service
systemctl enable wpa_supplicant@wlp3s0.service
rm /etc/resolv.conf
ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
pacman -S systemd-resolvconf
```

编辑`/etc/systemd/network/20-wired.network`：

```text
[Match]
Name=enp4s0f1

[Network]
DHCP=yes

[DHCP]
RouteMetric=10
```

编辑`/etc/systemd/network/25-wireless.network`：

```text
[Match]
Name=wlp3s0

[Network]
DHCP=ipv4

[DHCP]
RouteMetric=20
```

注意备份`/etc/wpa_supplicant/wpa_supplicant-wlp3s0.conf`或者创建：

```text
ctrl_interface=/run/wpa_supplicant
ctrl_interface_group=wheel
update_config=1
```

图形界面。

```bash
sudo yay -S wpa_supplicant_gui
```

#### 新方法

```bash
sudo pacman -S networkmanager network-manager-applet
sudo systemctl start NetworkManager.service
sudo systemctl enable NetworkManager.service
```

### 显卡

解开`/etc/pacman.conf`中`multilib`的注释。

```bash
pacman -S bumblebee mesa nvidia xf86-video-intel lib32-virtualgl lib32-nvidia-utils bbswitch
```

为了解决bumblebee无法在睡眠之后启动显卡，修改`/etc/bumblebee/bumblebee.conf`。只有重启才能生效。

```text
[driver-nvidia]
PMMethod=bbswitch

 ...

[driver-nouveau]
PMMethod=bbswitch
```

```bash
gpasswd -a sun bumblebee
systemctl start bumblebeed.service
systemctl enable bumblebeed.service
```

### 触摸板

似乎`xf86-input-synaptics`已经自动安装了。

### 声卡

```bash
sudo pacman -S alsa-utils pulseaudio pulseaudio-bluetooth
```

图形界面使用`pavucontrol`。

```bash
sudo pacman -S pavucontrol
```

消除奇怪的主板beep声。编辑`/etc/modprobe.d/nobeep.conf`。

```text
blacklist pcspkr
```

为解决休眠之后没有声音。编辑`/etc/default/grub`：

```text
...
GRUB_CMDLINE_LINUX_DEFAULT="quiet acpi_enforce_resources=lax"
...
```

```bash
sudo yay -S init-headphone
sudo systemctl enable init-headphone.service
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

### 蓝牙

```text
sudo pacman -S bluez bluez-utils
sudo systemctl start bluetooth.service
sudo systemctl enable bluetooth.service
```

图形界面使用`blueman`

```bash
sudo pacman -S blueman
```

为了消除登录时蓝牙请求权限，创建`/etc/polkit-1/rules.d/81-blueman.rules`：

```javascript
polkit.addRule(function(action, subject) {
  if (action.id == "org.blueman.rfkill.setstate" && subject.local && subject.active && subject.isInGroup("wheel")) {
      return polkit.Result.YES;
  }
  if (action.id == "org.blueman.network.setup" && subject.local && subject.active && subject.isInGroup("wheel")) {
      return polkit.Result.YES;
  }
});
```

### CPU

消除`TSC_DEADLINE disabled due to Errata`的错误：

```bash
sudo pacman -S intel-ucode
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## 非图形界面

### 用户管理

添加自己并取消root登录：

```bash
useradd -m -G wheel -s /bin/zsh sun
passwd sun
passwd -l root
```

修改`/etc/sudoers`，解除`wheel`的注释。

### 引导程序

注意`os-prober`检测Windows需要`ntfs-3g`：

```bash
sudo pacman -S os-prober
```

添加脚本使GRUB隐藏除非Shift键摁下。首先添加下面的到`/etc/default/grub`：

```text
GRUB_FORCE_HIDDEN_MENU="true"
```

然后下载[文件](https://gist.githubusercontent.com/anonymous/8eb2019db2e278ba99be/raw/257f15100fd46aeeb8e33a7629b209d0a14b9975/gistfile1.sh)到`/etc/grub.d/31_hold_shift`，执行下面：

```bash
chmod a+x /etc/grub.d/31_hold_shift
```

添加脚本使GRUB按住Ctrl才进入Linux否则进入Windows。首先修改`/etc/default/grub`中的默认启动项：

```text
GRUB_DEFAULT=2
```

然后编辑`/etc/grub.d/32_hold_ctrl`：

```bash
! /bin/sh
set -e

cat <<EOF
if keystatus; then
  if keystatus --ctrl; then
    set default=0
  fi
fi
EOF
```

```bash
chmod a+x /etc/grub.d/32_hold_ctrl
grub-mkconfig -o /boot/grub/grub.cfg
```

### 源

添加源。编辑`/etc/pacman.conf`。

```text
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

[arch4edu]
SigLevel = Never
Server = http://mirrors.tuna.tsinghua.edu.cn/arch4edu/$arch
```

```bash
sudo pacman -S archlinuxcn-keyring
```

### 开发工具

```bash
sudo pacman -S openssh git gcc gdb cmake make python2 python python2-pip python-pip nodejs npm
```

备份私钥，或者通过`ssh-keygen`生成。

配置git：

```bash
git config --global user.name "Sun Ziping"
git config --global user.email sunziping2016@gmail.com
```

安装cnpm：

```bash
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 常用软件

```bash
sudo pacman -S bash-completion zsh htop tree vim wget gpm w3m tmux ntfs-3g udisks2
sudo systemctl start gpm
sudo systemctl enable gpm
```

### zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sudo pacman -S zsh-syntax-highlighting
```

编辑自己喜爱的主题`~/.oh-my-zsh/themes/my-theme.zsh-theme`：

```bash
PROMPT='%B%F{red}%(?..%? )%F{blue}%n%f%b@%m %B%~%b $(git_prompt_info)%# '

ZSH_THEME_GIT_PROMPT_PREFIX="%B%F{blue}(%F{red}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%f%b"
ZSH_THEME_GIT_PROMPT_DIRTY="%F{yellow}*%F{blue})"
ZSH_THEME_GIT_PROMPT_CLEAN="%F{blue})"
```

### 动态DNS（暂时未配置）

首先配置[DDNS](http://service.oray.com/question/116.html)。注意保存配置文件。

```bash
wget http://download.oray.com/peanuthull/phddns-2.0.2.16556.tar.gz
tar zxvf phddns-2.0.2.16556.tar.gz
cd phddns-2.0.2.16556
aclocal
autoconf
automake --add-missing
./configure
make
sudo mv src/phddns /usr/local/bin
```

添加`/etc/systemd/system/phddns.service`。

```text
[Unit]
Description=phddns service
After=syslog.target network.target

[Service]
Type=oneshot
RemainAfterExit=yes

ExecStart=/usr/local/bin/phddns -c /etc/phlinux.conf -d
ExecReload=/usr/bin/kill -HUP $MAINPID
KillSignal=SIGQUIT
KillMode=mixed

[Install]
WantedBy=multi-user.target
```

### 翻墙（暂时未配置）

注意备份shadowsocks配置文件。

```bash
sudo pacman -S shadowsocks-libev proxychains-ng
sudo systemctl start shadowsocks-libev@tencent.service
sudo systemctl start shadowsocks-libev-redir@tencent-redir.service
sudo systemctl start shadowsocks-libev-tunnel@tencent-tunnel.service
sudo systemctl enable shadowsocks-libev@tencent.service
sudo systemctl enable shadowsocks-libev-redir@tencent-redir.service
sudo systemctl enable shadowsocks-libev-tunnel@tencent-tunnel.service
```

配置iptables、ipset。

```bash
sudo pacman -S ipset
sudo ipset -N gfwlist iphash
sudo iptables -t nat -A OUTPUT -p tcp -m set --match-set gfwlist dst -j REDIRECT --to-port 1080
sudo systemctl start iptables.service
sudo systemctl start ipset.service
sudo systemctl enable iptables.service
sudo systemctl enable ipset.service
```

配置dnsmasq和systemd-resolved。

```bash
sudo pacman -S dnsmasq
```

编辑`/etc/systemd/resolved.conf`。

```text
[Resolve]
...
DNS=127.0.0.1
Cache=no
DNSStubListener=no
```

编辑`/etc/dnsmasq.conf`。

```text
listen-address=127.0.0.1
conf-dir=/etc/dnsmasq.d
```

创建gfwlist。

```bash
cd /usr/local/bin
sudo wget https://raw.githubusercontent.com/cokebar/gfwlist2dnsmasq/master/gfwlist2dnsmasq.sh
sudo mv gfwlist2dnsmasq.sh gfwlist2dnsmasq
sudo gfwlist2dnsmasq -s gfwlist -o /etc/dnsmasq.d/dnsmasq_list.conf -s gfwlist -p 5353
```

启动dnsmasq。

```bash
sudo systemctl start dnsmasq.service
sudo systemctl enable dnsmasq.service
sudo systemctl restart systemd-resolved.service
```

注意应当时常更新下列命令。

```bash
sudo gfwlist2dnsmasq -s gfwlist -o /etc/dnsmasq.d/dnsmasq_list.conf -s gfwlist -p 5353
sudo sh -c "ipset save > /etc/ipset.conf"
```

### LNMP

安装Nginx。

```bash
sudo pacman -S nginx-mainline
sudo systemctl start nginx.service
sudo systemctl enable nginx.service
```

将[Nginx#Configure example](https://wiki.archlinux.org/index.php/nginx#Configuration_example)的内容拷贝到`/etc/nginx/nginx.conf`。

```bash
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
```

安装MariaDB。

```bash
sudo pacman -S mariadb
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mariadb.service
sudo systemctl enable mariadb.service
sudo mysql_secure_installation
```

安装PHP。

```bash
sudo pacman -S php php-fpm
sudo systemctl start php-fpm.service
sudo systemctl enable php-fpm.service
```

编辑`/etc/php/php.ini`。

```text
[php]
...
date.timezone = Asia/Shanghai
...
extension=bz2
extension=mysqli
extension=pdo_mysql
```

安装phpMyAdmin。

```bash
sudo pacman -S phpmyadmin
```

编辑`/etc/nginx/sites-available/pma.conf`，参照[phpMyAdmin#Nginx](https://wiki.archlinux.org/index.php/PhpMyAdmin#Nginx)。最后激活文件。

```bash
sudo ln -s /etc/nginx/sites-available/pma.conf /etc/nginx/sites-enabled/pma.conf
sudo systemctl reload nginx.service
```

编辑`/etc/webapps/phpmyadmin/config.inc.php`。

```text
...
$cfg['blowfish_secret'] = '...';
...
$cfg['TempDir'] = '/tmp/phpmyadmin';
```

### MongoDB和Redis

安装ＭongoDB和Redis。

```bash
sudo pacman -S mongodb redis
sudo systemctl start mongodb.service redis.service
sudo systemctl enable mongodb.service redis.service
```

在终端输入`mongo`进入MongoDB命令行。

```text
use admin
db.createUser(
  {
    user: "sun",
    pwd: "xxxxxxxx",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

修改`/etc/mongodb.conf`，并重启MongoDB服务：

```text
...
security:
  authorization: "enabled"
...
```

安装MongoDB Compass。

```bash
yay -S mongodb-compass
```

## 图形界面

### 安装Display Manager

```bash
sudo pacman -S lightdm lightdm-gtk-greeter
```

在`/etc/lightdm/lightdm.conf`添加greeter。

```text
[Seat:*]
...
greeter-session=lightdm-gtk-greeter
```

注意备份头像和壁纸。在`/etc/lightdm/lightdm-gtk-greeter.conf`中修改Indicators。

```text
[greeter]
indicators=~host;~spacer;~clock;~spacer;~session;~language;~a11y;~power
```

安装用户服务，更改头像。

```bash
sudo pacman -S accountsservice
```

创建`/var/lib/AccountsService/users/sun`。

```text
[User]
Icon=/var/lib/AccountsService/icons/sun.png
```

最后创建用户文件`/usr/local/bin/gdmflexiserver`。

```bash
!/bin/sh
/bin/dm-tool switch-to-greeter
```

```bash
sudo chmod +x /usr/local/bin/gdmflexiserver
```

### 安装xfce4

```bash
sudo pacman -S xfce4 xfce4-goodies
sudo systemctl start lightdm.service
sudo systemctl enable lightdm.service
```

创建`/etc/profile.d/qt.sh`：

```bash
export QT_AUTO_SCREEN_SCALE_FACTOR=0
```

### 字体

注意备份windows-fonts包。同时安装monaco字体作为终端字体。

```bash
sudo pacman -S ttf-monaco
```

编辑`~/.config/fontconfig/fonts.conf`：

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>serif</family>
    <prefer>
      <family>Times New Roman</family>
      <family>SimSun</family>
    </prefer>
  </alias>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Arial</family>
      <family>SimHei</family>
    </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Monaco</family>
      <family>SimSun</family>
    </prefer>
  </alias>
</fontconfig>
```

### 添加gvfs支持

```bash
sudo pacman -S gvfs gvfs-mtp gvfs-smb gvfs-afc
```

### 输入法

```bash
sudo pacman -S fcitx fcitx-im fcitx-sogoupinyin fcitx-configtool zenity
```

在`~/.xprofile`里面添加如下内容。

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

### VirtualBox

```bash
sudo pacman -S virtualbox virtualbox-ext-oracle virtualbox-guest-iso
sudo gpasswd -a sun disk
VBoxManage internalcommands createrawvmdk -filename ~/VirtualBox\ VMs/Windows\ 10/sda.vmdk -rawdisk /dev/sda
VBoxManage internalcommands createrawvmdk -filename ~/VirtualBox\ VMs/Windows\ 10/sdb.vmdk -rawdisk /dev/sdb
sudo gpasswd -a sun vboxusers
```

然后添加一个拥有上面两个虚拟磁盘的虚拟机。

## 软件列表

### Pacman安装的软件

```text
xorg-kill chromium gimp inkscape vlc seafile-client wps-office ttf-wps-fonts
geogebra jdk intellij-idea-ultimate-edition clion unzip-iconv zip boost nvm
wine wine-mono wine_gecko clang rtorrent p7zip unrar texlive-most texlive-lang
texlive-langextra maxima wxmaxima rsync visual-studio-code-bin telegram-desktop
celestia wesnoth qt5-base qt5-multimedia yay valgrind
```
