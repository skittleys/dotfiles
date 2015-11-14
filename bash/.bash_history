geany .zshrc
zsh
mount --help | less
cat /etc/passwd
exit
mount --help | less
man mount
dmesg --help | less
ls /usr/lib
ln --help | less
ls ~
chmod --help | less
cp --help | less
mkdir --help | less
mkdir -pv vboxshare/tint2/usr/share/applications/
ls Downloads/
mkdir vboxshare/fonts
cp --help | less
cp -t vboxshare/fonts/ Downloads/Anonymous\ Pro-Powerline.ttf Downloads/DejaVuSansMono-Powerline.ttf 
ls vboxshare/fonts/
ls downloads/
exit
lsblk
lsusb
cat /etc/fstab
mount --help | less
ls
mkdir vboxshare
user
whoami
usermod --help | less
man usermod
sudo mount -t vboxsf -o rw,uid=1000,gid=1000 share vboxshare
sudo mount -vt vboxsf -o rw,uid=1000,gid=1000 share vboxshare
sudo mount -vt vboxsf share vboxshare
dmesg | tail 
dmesg -C
sudo dmesg -C
sudo mount -vt vboxsf share vboxshare
dmesg | tail 
ls /
ls /sbin/
llls .config/openbox/
ls .config/openbox/menu.xml
eany .config/openbox/menu.xml
cd .config/openbox/
colordiff menu.xml menu.xml.bak
ls /sbin
ls /sbin/mount
ls /sbin/mount*
ll /sbin/mount*
history | less
sudo mount -t vboxsf Share ~/vboxshare/
mount
ls vboxshare/
ls /etc/apt
cp --help | less
cd /etc/apt
cp -t ~/vboxshare/ 
cp -t ~/vboxshare/ apt.conf preferences sources.list
ls ~/vboxshare/
ls preferences.d
ls sources.list.d
exit
ls
apt-cache search inxi
sudo apt-get update && sudo apt-get upgrade
apt-cache search inxi
apt-cache madison inxi
sudo apt-get install inxi
sudo apt-get install inxi/jessie
ls
sudo add-apt-repository --help
man add-apt-repository 
apt-key --help
man apt-get
ls
less .bash_aliases 
mad
nano .bash_aliases 
less .bashrc
less /etc/nanorc 
man nano
ls
less /etc/nanorc 
nano --syntax nanorc /etc/nanorc 
nano --syntax sh .bash_functions
. .bashrc
mkdcd test
less .bashrc
nano --syntax=sh .bashrc
less .bashrc
. .bashrc
mkdcd test
cd ..
rm -R test
desc apt-get
desc shadow
nano --syntax sh .bash_functions
. .bashrc
desc shadow
nano --syntax sh .bash_functions
. .bashrc
desc shadow
nano --syntax sh .bash_functions
desc shadow
. .bashrc
desc shadow
nano --syntax sh .bash_functions
. .bashrc
desc shadow
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
sed --help
man sed
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
cp .bash_functions{,2}
ls
nano --syntax sh .bash_functions
. .bashrc
desc aptitude
desc aptitude synaptic
nano --syntax sh .bash_functions
. .bashrc
desc aptitude synaptic
nano --syntax sh .bash_functions
. .bashrc
desc aptitude synaptic
alias
inst build-essential devscripts
inst pbulder make gcc
inst pbuilder make gcc
desc libpcre3-dev
inst libpcre3-dev
dpkg --help | less
dpkg -l | grep libpcre3-dev
mad libpcre3-dev
ls
ls vboxshare/
mount -t vboxsf share ~/vboxshare
sudo mount -t vboxsf share ~/vboxshare
ls vboxshare/
mkdcd vboxshare/2014-05-31
cp -v ~/.bashrc ~/.bash_aliases ~/.bash_functions .
ls
cp -v /etc/apt/sources.list .
ls
ll
sudo chmod 777 *
ll
sudo chown cm:cm *
ll
chown --help
sudo chown -v cm:cm .
ls
ll
sudo chown -v cm:cm *
ll
ll /etc/apt
sudo chown -v cm:cm *
sudo chown -Rv cm:cm ..
sudo chown -Rv cm:cm .
ll
sudo chown -Rv cm:cm sources.list 
ll
sudo chown -v ./sources.list 
sudo chown -v cm:cm ./sources.list 
ll
chown -v cm:cm ./sources.list 
ll
umount share
sudo umount ~/vboxshare/
cd ~
sudo umount ~/vboxshare/
sudo mount -t vboxsf -o rw,uid=1000,gid=1000 share ~/vboxshare
mount
ll
ll vboxshare/
ll vboxshare/2014-05-31/
sudo apt-get build-dep grep/jessie
sudo apt-get -s install grep/jessie
sudo apt-get -s install libpcre3-dev
sudo apt-get -s install libpcre3-dev/jessie
debdiff --help
man dpkg-buildpackage 
man dh-make
man debhelper 
history | grep ssh
ssh cm@192.168.0.12
man ssh
ssh cm@192.168.0.12
man diff
man colordiff
man diff
cd builds/rsync/
ls
ls rsync-3.1.0
colordiff rsync-3.1.0/Makefile.in rsync-3.1.0-rpi/Makefile.in 
colordiff rsync-3.1.0/configure rsync-3.1.0-rpi/configure
cd rsync-3.1.0-rpi/
less Makefile.in 
less configure
less configure.sh
inst stow
man stow
zsh
ls /usr/lib
mkdir /usr/lib/prezto
sudo mkdir /usr/lib/prezto
cd /usr/lib/prezto
git clone --recursive https://github.com/sorin-ionescu/prezto.git
sudo git clone --recursive https://github.com/sorin-ionescu/prezto.git
ls
rm -Rf prezto/
sudo rm -Rf prezto/
cd ..
rm -Rf prezto/
sudo rm -Rf prezto/
sudo git clone --recursive https://github.com/sorin-ionescu/prezto.git
ls
cd prezto/
ls
cd ..
sudo rm -Rf prezto/
sudo git clone --recursive https://github.com/skittleys/prezto.git
cd prezto/
ls
sh -v install.sh
ls ~
sh -v install.sh
ln --help | less
for rcfile in "/usr/lib/prezto/runcoms/^(zshrc|README.md)"; do echo $rcfile; done
for rcfile in /usr/lib/prezto/runcoms/^(zshrc|README.md); do echo $rcfile; done
zsh
sudo bash -c echo -e "source blah\n\nblah" >| ~/test.txt
cat ~/test.txt 
sudo bash -c echo -e "source blah\n\nblah >| ~/test.txt"
cat ~/test.txt 
sudo bash -c "echo -e source blah\n\nblah >| ~/test.txt"
cat ~/test.txt 
sudo bash -c "echo -e source blah\n\nblah >| /home/cm/test.txt"
cat ~/test.txt 
sudo bash -c "echo -e 'source blah\n\nblah' >| /home/cm/test.txt"
cat ~/test.txt 
sudo bash -c "echo -e 'source /etc/zsh/zpreztorc\nsource /usr/lib/prezto/init.zsh\nsource /usr/lib/prezto/runcoms/zshrc' >| /home/cm/test.txt"
cat ~/test.txt 
sh -v install.sh
zsh -v install.sh
zsh install.sh
ls
zsh
ls
less modules/prompt/init.zsh 
sudo nano modules/prompt/init.zsh 
ls modules/prompt/
ls modules/prompt/functions/
nano runcoms/zpreztorc 
sudo nano runcoms/zpreztorc 
zsh
cd ~/builds/powerline-fonts/
ls
ls DroidSansMono/
ls Inconsolata
ls InconsolataDz/
ls Meslo/
ls SourceCodePro/
ls
ls Terminus/
ls Terminus/BDF/
less Terminus/README.rst 
ls Terminus/PCF/
ls Terminus/PSF/
ls
ls UbuntuMono/
ls
apt-cache search tweak
inst gnome-tweak-tool
gnome-tweak-tool
grep -ri localpatterns /usr/lib/prezto/
grep --help
grep -Ri "localpattern" /usr/lib/prezto/
grep -vRi "localpattern" /usr/lib/prezto/
grep -vRi localpattern /
grep -vRi localpattern /etc
grep -vRi localpattern /etc | less -R
grep -vRi localpattern /etc | less
grep -vRi localpattern /etc --color=always | less -R
grep -Ri localpattern /etc --color=always | less -R
sudo grep -Ri localpattern /etc --color=always | less -R
sudo grep -Ri localpattern /bin --color=always | less -R
sudo grep -Ri localpattern /home --color=always | less -R
sudo grep -Ri localpattern /lib --color=always | less -R
sudo grep -Ri localpattern /lib64 --color=always | less -R
sudo grep -Ri localpattern /opt --color=always | less -R
sudo grep -Ri localpattern /var --color=always | less -R
sudo grep -Ri localpattern /usr --color=always | less -R
sudo grep -Ri localpattern /usr/bin --color=always | less -R
sudo grep -Ri localpattern /usr/include --color=always | less -R
sudo grep -Ri localpattern /usr/lib --color=always | less -R
sudo grep -Ri localpattern /usr/local --color=always | less -R
sudo grep -Ri srcpattern /usr/local --color=always | less -R
sudo grep -Ri sbinpattern /usr/local --color=always | less -R
sudo grep -Ri sharepattern /usr/local --color=always | less -R
less /etc/apt/preferences
less /etc/apt/apt.conf
less /etc/apt/preferences
apt-cache search texlive
sudo synaptic
less ~/builds/texinfo/texinfo-5.2.0.dfsg.1/debian/control 
sudo apt-get install -s texinfo
sudo apt-get install -s gettext
sudo apt-get install -s fish
sudo apt-get install -s gnujump
inst -s libncurses5-dev
sudo apt-get -s install libcroco3 libglib2.0-0 mime-support locales gettext libpcre3 perl-modules libxml2 perl libunistring0 mawk
mkdcd ../nano
mad nano
asou nano/stable
ls
ls nano-2.2.6/
less nano-2.2.6/configure
whereis nano
grep -i nanorc /bin
grep -i nanorc /bin/nano
less nano-2.2.6/debian/rules 
man dh_make
man debi
man debpkg
man lintian
sudo apt-get install libxml-libxml-perl 
sudo apt-get build-dep texinfo
sudo apt-get build-dep texinfo/stable
sudo apt-get build-dep texinfo/jessie
sudo apt-get -s install dh-autoreconf groff texlive-fonts-recommended texlive-latex-recommended
sudo apt-get install dh-autoreconf groff texlive-fonts-recommended texlive-latex-recommended
desc groff
desc dh-autoreconf
sudo apt-get install dh-autoreconf groff texlive-fonts-recommended texlive-latex-recommended
apt-cache policy texinfo
cd ../zsh/zsh-5.0.5/
less /etc/nanorc
nano --syntax=c configure
nano --syntax=sh configure
less /etc/nanorc
less /usr/share/nano/debian.nanorc 
ls
nano README 
nano FEATURES 
nano INSTALL 
./configure --help
nano INSTALL 
./configure --help | less
man update-alternatives 
update-alternatives --get-selections
acs sublime
dpkg -l | grep subl
dpkg -l | grep cmake
dpkg -l sudo
dpkg -l | grep sudo
ls ~/.cache
ls /usr/local
ls ~/.config/
ls ~/.config/terminator/
less ~/.config/terminator/config 
nano ~/.config/terminator/config 
acs
list
inst
up
aup
apt-up
ad
acp
asou
apt-get --help | less
apt-cache --help
apt-cache --help | less
rdep
adesc
ades
desc
apt-cache show shadow
apt-cache show aptitude
man grep
apt-cache show aptitude
apt-cache show aptitude | grep "Description(en)?: "
apt-cache show aptitude | grep "Description: "
apt-cache show aptitude | grep "Description-en: "
apt-cache show aptitude | grep Description(-en)?: 
apt-cache show aptitude | grep Description(-en)?
apt-cache show aptitude | grep Description(\-en)?
apt-cache show aptitude | grep "Description(\-en)?"
apt-cache show aptitude | grep "Description(\-en)\?"
apt-cache show aptitude | grep Description(\-en)\?
apt-cache show aptitude | grep "Description(-en)\?"
apt-cache show aptitude | grep "Description\(-en\)\?"
apt-cache show aptitude | grep "Description\(-en\)\?:"
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:"
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed "s/Description(-en)?/"
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed "s/Description-en/"
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed s/Description-en/
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed "s/Description-en/ "
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed "s/Description(-en)?//"
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed "s/Description\(-en\)\?//"
apt-cache show aptitude | grep -m 1 "Description\(-en\)\?:" | sed "s/Description\(-en\)\?: //"
ls
mkdcd builds/grep
. .bashrc
mkdcd builds/grep
mad grep
alias
asou grep/jessie
less /etc/apt/sources.list
nano /etc/apt/sources.list
sudo nano /etc/apt/sources.list
alias
ad
asou grep/jessie
ls
cd grep-2.18/debian/
ls
less control 
less rules
less control 
apt-get build-dep grep/jessie
sudo apt-get build-dep grep/jessie
less control 
lsblk
blkid
mount
less /etc/passwd
cd ../../
rm -R *
rm -Rf *
ls
asou grep
asou grep/wheezy
ls
cd grep-2.12/debian/
less control 
sudo apt-get build-dep grep
sudo apt-get build-dep grep/wheezy
debuild -us -uc
ls
ls ..
cd ../..
ls
cd grep-2.12/
dch --bpo
less debian/changelog 
ls
less debian/control 
less debian/rules 
less config
less configure
nano debian/rules 
less configure
nano debian/rules 
debuild -us -uc
ls ..
pushd ..
debdiff
debdiff --help | less
debdiff grep_2.12-2{,~bpo60+1}_amd64.deb
ls
debdiff grep_2.12-2{,~bpo60+1}_amd64.changes
debdiff grep_2.12-2{,~bpo60+1}_amd64.build
debdiff grep_2.12-2{,~bpo60+1}_amd64.dsc
debdiff grep_2.12-2{,~bpo60+1}.dsc
ls
popd
less debian/control 
cd ../..
ls
mkdcd GNUjump
wget -O gnujump-1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz
ls
dpkg-source --help
man dpkg-source 
ls
tar -xzf gnujump-1.0.8.orig.tar.gz 
ls
cd gnujump-1.0.8/
ls
less README 
less INSTALL 
less configure
less Makefile.am
less Makefile.in
dh-make --help | less
dh_make --help | less
dh_make
cd ..
dh_make
cd gnujump-1.0.8/
dh_make -f ../gnujump-1.0.8.orig.tar.gz 
ls
ls debian/
pushd debian/
less changelog 
less control 
less rules 
less control 
dh --help | less
man dh
dh
cd ..
dh
man dh
dh build
man dh
alias
acs sdl
acs sdl-config
acs libsdl
inst libsdl1.2-dev
nano debian/control 
ls
less configure
dh build
man dh
man debhelper 
man dh_auto_configure 
dh build | less
alias
acs sdl-image
inst sdl-image1.2-dev
less configure
man dpkg-buildpackage 
dpkg-buildpackage 
man debi
inst libsdl-mixer1.2-dev
dh build | less
dh build
debc
ls
cd ..
debc
ls
dh build
cd gnujump-1.0.8/
dh build
ls debian/
ls
ls ..
ll ..
man dh
dh clean
ls
dh build
debc
ls
ls ..
ls debian/
man dh
dh install
man dh
dh binary
dh build clean
dh clean
ls
debian/rules clean
dh binary
man pbuilder
fakeroot dh binary
ls
ls ..
ll ..
debc
debc ...
file ../gnujump_1.0.8-1_amd64.deb 
debc
debc --help
debi
cd ../..
ls
rm -Rf GNUjump/*
ls GNUjump/
cd GNUjump/
ls
history | grep wget
wget -O gnujump_1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz
ls
tar xf gnujump_1.0.8.orig.tar.gz 
ls
cd gnujump-1.0.8/
ls
dh_make
ls ..
man apt-file
apt-file --help
desc apt-file
apt-cache show apt-file
inst apt-file
man apt-file
apt-file update
apt-file sdl
apt-file search sdl
apt-file search sdl-config
ls ..
cd ..
rm -Rf gnujump-1.0.8/
ls
rm gnujump_1.0.8.orig.tar.gz 
wget -O gnujump_1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz | tar xf
ls
rm gnujump_1.0.8.orig.tar.gz 
wget -O gnujump_1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz | tar x
file gnujump_1.0.8.orig.tar.gz 
rm gnujump_1.0.8.orig.tar.gz 
wget -O gnujump_1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz | tar xz
tar --help | less
rm gnujump_1.0.8.orig.tar.gz 
wget --help | less
wget -qO gnujump_1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz | tar xvz
rm gnujump_1.0.8.orig.tar.gz 
wget -qO- http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz | tar xvz
ls
rm -Rf gnujump-1.0.8/
wget -O gnujump_1.0.8.orig.tar.gz http://ftp.gnu.org/gnu/gnujump/gnujump-1.0.8.tar.gz && tar xzf gnujump_1.0.8.orig.tar.gz
ls
cd gnujump-1.0.8/
dh_make
less debian/changelog 
dch --bpo
dh binary
dh clean
fakeroot dh binary
ls
ls ..
dh binary clean
ls
ls ..
rm ../gnujump_1.0.8-1~bpo60+1_amd64.deb 
nano debian/control 
fakeroot dh binary
ls
ls ..
dh binary clean
dh build clean
fakeroot dh binary clean
cd ..
rm -Rf gnujump-1.0.8/
ls
tar -xzf gnujump_1.0.8.orig.tar.gz 
cd gnujump-1.0.8/
dh_make
nano debian/control 
fakeroot dh binary
ls ..
cd ..
debc
cd gnujump-1.0.8/
debc
debc --help | less
debi
cd ..
debi
cd gnujump-1.0.8/
dch --bpo
fakeroot dh binary
rm ../gnujump_1.0.8-1_amd64.deb 
fakeroot dh binary
cd ..
rm -Rf gnujump-1.0.8/
tar -xzf gnujump_1.0.8.orig.tar.gz 
cd gnujump-1.0.8/
dh_make
dch --bpo
nano debian/control 
dh build
debc
ls ..
fakeroot dh binary
ls
debc
ls src
nano src/effects-blur.c
fakeroot dh binary
cd ..
rm -R gnujump-1.0.8/
rm -Rf gnujump-1.0.8/
tar xzf gnujump_1.0.8.orig.tar.gz 
cd gnujump-1.0.8/
dch --bpo
dh_make
dch --bpo
nano debian/control 
nano src/effects-blur.c 
fakeroot dh binary
debc
cd ,,
cd ..
history
tar xzf gnujump_1.0.8.orig.tar.gz  && cd gnujump-1.0.8/ & dh_make
tar xzf gnujump_1.0.8.orig.tar.gz  && cd gnujump-1.0.8/ && dh_make
history
dch --bpo && nano debian/control  && nano src/effects-blur.c  && fakeroot dh binary
ls
debuild
fakeroot debuild
dpkg-buildpackage -us -uc
less /tmp/gnujump_1.0.8-1~bpo60+2.diff.OEn7Pe 
cd ..
rm -Rf gnujump-1.0.8/
tar xzf gnujump_1.0.8.orig.tar.gz  && cd gnujump-1.0.8/ && dh_make
dch --bpo && nano debian/control
pbuilder 
fakeroot debuild
debuild
debuild --help | les
debuild --help | less
dpkg-buildpackage -us -uc
ls
ls ..
debc
cd ..
rm -Rf gnujump-1.0.8/
pbuilder --help | less
ls
rm gnujump_1.0.8-1~bpo60*
tar xzf gnujump_1.0.8.orig.tar.gz  && cd gnujump-1.0.8/ && dh_make
dh build
ls ..
dh binary
fakeroot dh binary
ls ..
cd ../..
mkdcd pdfedit
wget -O pdfedit_0.4.5.orig.tar.gz http://superb-dca2.dl.sourceforge.net/project/pdfedit/pdfedit/0.4.5/pdfedit-0.4.5.tar.gz
tar xzf pdfedit_0.4.5.orig.tar.gz 
ls
cd pdfedit-0.4.5/
ls
less configure
less README
man dpkg-depcheck 
ls
dpkg-depcheck -d ./configure
alias
acs boostlib
apt-file boostlib
apt-file search boostlib
history | grep apt-file
acs boost
inst libboost-dev
dpkg-depcheck -d ./configure
export QTDIR="~/builds/fake-qt"
mkdir ~/builds/fake-qt
echo $QTDIR
dpkg-depcheck -d ./configure
cd ../..
ls
cd grep
ls
cd grep-2.12/
ls
dpkg-depcheck -d ./configure
gcc -dumpmachine
man scp
mkdcd ../../rsync
ls
asou rsync/jessie
ls
man scp
ssh cm@raspberrypi
ls
ls ~
ls ~/.ssh
less ~/.ssh/known_hosts 
nano ~/.ssh/known_hosts 
ssh rpi
nano ~/.ssh/config
nano ~/.ssh/known_hosts 
nano ~/.ssh/config
ssh rpi
scp rpi:/home/cm/builds/rsync-3.1.0/rsync-3.1.0 rsync-3.1.0-rpi
scp -R rpi:/home/cm/builds/rsync-3.1.0/rsync-3.1.0 rsync-3.1.0-rpi
mkdir rsync-3.1.0-rpi
man scp
scp -r rpi:/home/cm/builds/rsync-3.1.0/rsync-3.1.0 rsync-3.1.0-rpi
ls rsync-3.1.0-rpi/
ls rsync-3.1.0-rpi/rsync-3.1.0/
cd rsync-3.1.0-rpi/
mv -Rv ./* .
mv -v ./* .
mv -v ./rsync-3.1.0/* .
ls
rm -Rf rsync-3.1.0/
ls
cd ..
ls
colordiff -ryqW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/
colordiff -ryW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/
colordiff -ryW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/ | less
colordiff -ryW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/ | less -R
colordiff -yW"`tput cols`" ~rsync-3.1.0/ ~rsync-3.1.0-rpi/ | less -R
colordiff -c 1 -ryW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/ | less -R
colordiff -yW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/ | less -R
colordiff -yW"`tput cols`" rsync-3.1.0/ rsync-3.1.0-rpi/
man dpkg
mad ia32-libs
inst ia32-libs
mad ia32-libs-i386
dpkg --add-architecture i386
man dpkg
sudo dpkg --dry-run --add-architecture i386
sudo dpkg -v --dry-run --add-architecture i386
man dpkg
sudo dpkg -add-architecture i386
sudo dpkg --add-architecture i386
sudo apt-get update
debi
alias debi="echo haha"
debi
unalias debi
debi
cd ~
ls
nano /usr/lib/prezto/install.sh 
sudo nano /usr/lib/prezto/install.sh 
nano /usr/lib/prezto/install.sh 
sudo nano /usr/lib/prezto/install.sh 
nano /usr/lib/prezto/install.sh 
sudo nano /usr/lib/prezto/install.sh 
less /etc/zsh/zshrc
less /etc/zsh/zshlogin
less /etc/zsh/zlogin
less .zshrc
ls
ll .z*
zsh
ls /usr/share/fonts/
ls /usr/share/fonts/truetype/
sudo apt-get -s install gnome-font-viewer
ls vboxshare/
ls
ls .fonts
sudo thunar
man fc-cache
ls
cd builds
git clone https://github.com/Lokaltog/powerline-fonts
ls
cd powerline-fonts/
ls
ls AnonymousPro/
less AnonymousPro/README.rst
wget https://gist.github.com/epegzz/1634235/raw/d1e0dd8b745a7868444ecb0d1d6cdb593249f9d5/Monaco_Linux-Powerline.ttf
file Monaco_Linux-Powerline.ttf 
ls /usr/share/fonts/
cd /usr/share/fonts/truetype/
ls
ls anonymous-pro/
cp ~/builds/powerline-fonts/Monaco_Linux-Powerline.ttf Monaco-Powerline.ttf
sudo cp ~/builds/powerline-fonts/Monaco_Linux-Powerline.ttf Monaco-Powerline.ttf
ls
man fc-cache
fc-cache
ls ..
ls ../cmap/
ls ../type1/
ls ../type1/gsfonts/
ls ../X11/
wget https://raw.githubusercontent.com/nicr9/dotfiles/master/monofur.otf
sudo wget https://raw.githubusercontent.com/nicr9/dotfiles/master/monofur.otf
file monofur.otf 
apt-cache search sawasdee
inst fonts-tlwg-sawasdee
ls ~/vboxshare/fonts/
sudo cp ~/builds/powerline-fonts/DroidSansMono/Droid\ Sans\ Mono\ for\ Powerline.otf .
ls
ls droid/
sudo cp ~/builds/powerline-fonts/DroidSansMono/Droid\ Sans\ Mono\ for\ Powerline.otf ./droid/
rm Droid\ Sans\ Mono\ for\ Powerline.otf 
sudo rm Droid\ Sans\ Mono\ for\ Powerline.otf 
sudo cp ~/builds/powerline-fonts/Inconsolata/Inconsolata\ for\ Powerline.otf ./inconsolata/
sudo cp -v ~/builds/powerline-fonts/LiberationMono/Liberation* ./liberation/
sudo cp -v ~/builds/powerline-fonts/LiberationMono/*.ttf ./liberation
ls
sudo cp -v ~/builds/powerline-fonts/Meslo/*.otf .
sudo mkdir SourceCodePro
sudo cp -v ~/builds/powerline-fonts/SourceCodePro/*.otf ./SourceCodePro/
ls
sudo mkdir Ubuntu
sudo rm Ubuntu/
sudo rm -R Ubuntu/
sudo mkdir ubuntu
sudo cp -v ~/builds/powerline-fonts/UbuntuMono/*.ttf ./ubuntu/
fc-cache
zsh
cd ~/builds/zsh/zsh-5.0.5/
ls
cd ..
ls
cd zsh-5.0.5/
less debian/control 
less debian/rules 
less configure
ls
ls /usr
ls /usr/share/
ls /usr/share/info
ls /usr/share/man
less debian/rules 
zsh
cd ..
ls
debi
cd zsh-5.0.5/
debi
sudo debi
zsh --version
sudo aptitude
cd ~
ls
mkdcd builds/rpi-tools
git clone git://github.com/raspberrypi/tools.git
ls
ls tools/
man fc-cache
less /etc/zsh/zshrc
ls
ls ~
ls .fonts
ls ~/.fonts
ls ~/.fontconfig/
ll ~/.fontconfig/
fc-cache -vf | less
ll ~/.fontconfig/
less ~/.fontconfig/cabbd14511b9e8a55e92af97fb3a0461-le64.cache-3 
ls /usr/share/fonts/
ls /usr/share/fonts/truetype/
less /usr/share/fonts/truetype/monofur.otf 
less /usr/share/fonts/truetype/Monofur-Powerline.ttf 
ls
less MACHINES 
less configure
ls Scripts/
less config.h.in 
ls Config/
ls Etc/
ls
ls Functions/
ls Misc/
ls Util/
ls Src
nano --syntax=c Src/mem.c
less configure
ls /bin
ll /bin/z*
ls /etc/alternatives/
ll /etc/alternatives/z*
ll /bin/z*
ls /etc/alternatives/
ll /etc/alternatives/k*
ll /etc/alternatives/r*
ls
byobu
inst cmake
ssh rpi
ls /usr/share/
ls /usr/share/git-core/contrib/
dpkg -l | grep bash
ls /usr/share/bash-completion/
ls /usr/share/bash-completion/completions/
dpkg -l | grep bash
mad bash-completion
inst -s bash-completion/testing
mad git
inst git/stable-backports
inst git=1.9.1-1
inst git=1.9.1-1~bpo70+2
inst git=1:1.9.1-1~bpo70+2
sudo aptitude
nano --syntax=sh .bashrc
. .bashrc
nano --syntax=sh .bashrc
. .bashrc
nano --syntax=sh .bashrc
. .bashrc
cd builds/rpi-tools/tools/
git rev-parse --is-inside-work-tree
nano --syntax=sh .bashrc
nano --syntax=sh ~/.bashrc
. .bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. .bashrc
. ~/.bashrc
pushd ~
git rev-parse --is-inside-work-tree
. ~/.bashrc
popd
. ~/.basrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
popd
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
nano --syntax=sh ~/.bashrc
. ~/.bashrc
popd
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
popd
cd ..
cd tools/
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
popd
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
. ~/.bashrc
popd
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
pushd ~
popd
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
popd
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
cd ..
cd tools/
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
nano --syntax=sh ~/.bashrc
. ~/.bashrc
pushd ~
popd
ls ~
less ~/.bash_alia
less ~/.bash_aliases 
shopt
man shopt
info shopt
info coreutils 'shopt'
info coreutils 'find shopt'
info coreutils'
info coreutils
info bash
alias
sudo apt-get -s clean
sudo apt-get clean
sudo apt-get -s check
sudo apt-get -s autoremove
ls /boot
modprobed_db
uname -a
aptitude
vimtutor
vim
inst vim
sudo aptitude
dpkg -L vim-scripts 
dpkg -L vim-scripts | less
apt-cache show vim-scripts
cd /usr/share
ls vim-scripts/
ls doc
ls doc/vim-scripts/
less doc/vim-scripts/README.Debian 
ls vim-scripts/
cd vim-scripts/
ls
ls doc
less doc/vim-scripts/README.Debian 
less /usr/share/doc/vim-scripts/README.Debian 
desc vim-addon-manager
desc vim-addon-manager sudo
desc vim-addon-manager vim-pathogen
vimtutor
ssh rpi
sudo synaptic
sudo aptitude
ls /usr/share/nano/
less /usr/share/nano/sh.nanorc 
man nano
man nanorc
ls /usr/share/nano/
ls ~/.nano/syntax/
diff ~/.nano/syntax/css.nanorc /usr/share/nano/css.nanorc 
colordiff ~/.nano/syntax/css.nanorc /usr/share/nano/css.nanorc 
ls /etc/nanorc
ls ~/.nano/syntax/
desc darcs
git clone https://github.com/MarcWeber/vim-addon-manager ~/VAM
ls
cd VAM
cd ~/VAM
ls
cd ..
rm -R VAM
rm -Rf VAM
nano .vimrc
nano .nanorc
ls ~/.nano/syntax/
nano .nanorc
zsh
ls
less .bashrc
nano --syntax=sh .bashrc
. .bashrc
nano --syntax=sh .bashrc
. .bashrc
cd builds/rpi-tools/tools/
ls
git status
apt-file git-prompt.sh
apt-file search git-prompt.sh
apt-file update
dpkg --help | less
dpkg -L git | grep completion
__git_ps1
ls
. .bashrc
. ~/.bashrc
type __git_ps1
type __git_ps1 > /dev/null 2>&1
__git_dir
__gitdir
git rev-parse --dit-dir
git rev-parse --git-dir
pushd ..
git rev-parse --git-dir
popd
git rev-parse --is-inside-git-dir
git rev-parse --is-inside-work-tree
ls
pushd pkg
git rev-parse --is-inside-work-tree
git rev-parse --is-inside-work-tree 2> /dev/null
pushd ../..
git rev-parse --is-inside-work-tree
git rev-parse --is-inside-work-tree 2> /dev/null
popd
. .bashrc
. ~/.bashrc
ls
git rev-parse --is-inside-work-tree
. ~/.bashrc
cd ~
git rev-parse --is-inside-work-tree
. ~/.bashrc
cd builds/rpi-tools/tools/
. ~/.bashrc
pushd ~
popd
. ~/.bashrc
ls
git rev-parse --resolve-git-dir
git rev-parse --resolve-git-dir .
git status
git branch
pushd ~
git branch
popd
. ~/.bashrc
git rev-parse --is-inside-work-tree
pushd ~
git rev-parse --is-inside-work-tree
git rev-parse --is-inside-work-tree 2> /dev/null
. ~/.bashrc
popd
ls
blah=`git rev-parse --is-inside-work-tree 2> /dev/null`
echo $blah
pushd ~
blah=`git rev-parse --is-inside-work-tree 2> /dev/null`
echo $blah
. ~/.bashrc
popd
. ~/.bashrc
pushd ~
ls
popd
__gitdir
pushd ~
__gitdir
nano --syntax=debian .nanorc
nano --help | less
man nano
less /usr/share/nano/debian.nanorc 
less .nano/syntax/makefile.nanorc 
ls .nano/syntax/
apt-listbugs --help
apt-listbugs list git
apt-listbugs -s all list git
ls /etc
ls /etc/bash_completion.d
less /etc/bash_completion.d/git
echo $PATH
ls /usr/share/git/
ls /usr/share/
ls /usr/share/git-core
locate
inst locate
ls /usr/share/git-core/contrib/
ls /usr/share/git-core/contrib/hooks/
ls /opt/local
find --help
man find
__git_ps1
pushd
pushd ..
__git_ps1
type __git_ps1
less /etc/bash_completion.d/git
git help rev-parse 
info bash
git help rev-parse 
__git_prompt_dir
less /etc/bash_completion.d/git
type __git_dir
type __git_ps1
type __gitdir
__gitdir
$?
echo "[\e[0;33m]\]lala"
echo '[\e[0;33m]\]lala'
echo '\[\e[0;33m]\]lala'
echo '\[\e[0;33m\]lala'
echo "\[\e[0;33m\]lala"
echo "\[\033[0;33m\]lala"
ls
cd ~
ls
less .bash_functions2
desc git
apt-cache search git
less .bash_functions2
man apt-get
apt-cache search gtk
apt-cache show gtk
apt-cache search $gtk
apt-cache search --help
apt-cache search ^gtk
apt-cache search vim
apt-cache showpkg vim-gkt
apt-cache showpkg vim-gtk
apt-cache show vim-gtk
ls
mkdcd -p .vim/colors
mkdir -p .vim/colors
cd $!
cd .vim/colors
ls
nano blacklight.vim
man scp
scp --help
scp rpi /home/cm/.vimrc
cd ~
scp --help
scp rpi /home/cm/.vimrc
man scp
scp .vimrc rpi
scp /home/cm/.vimrc rpi
scp rpi:/home/cm/.vimrc .
ls
vim
nano .vimrc
vim
nano .vimrc
vim
ls .vim/colors/
vim
vim .vimrc
ls .vim/colors/
vim .vimrc
ls /usr/share/vim/vim73/colors/
vim .vimrc
less .vim/colors/blacklight.vim 
nano .vim/colors/blacklight.vim 
cp .vim/colors/blacklight{,2}.vim 
ls
ls .vim/colors/
nano .vim/colors/blacklight.vim 
vim .vimrc
ls /usr/share/vim/vim73/colors/
vim .vimrc
ls /usr/share/nano/
term=xterm-256color
echo $TERM
TERM=xterm-256color
echo $TERM
vim .vimrc
ls
nano .config/terminator/config 
nano .bashrc
nano --syntax=sh .bashrc
. .bashrc
vim .vimrc
ls /usr/share/nano/
nano /usr/share/nano/awk.nanorc 
ls
git help clone
man git-clone
mkdir -p .nano/syntax
man git-clone
git clone https://github.com/nanorc/nanorc ~/.nano/syntax
ls ~/.nano/syntax
cd ~/.nano/syntax
less c.nanorc
less shell.nanorc
cd ~
rmdir -R .nano
rmdir .nano
rmdir --help
rmdir -p .nano/syntax/
rmdir --ignore-fail-on-non-empty .nano/syntax/
ls
ls .nano
rm -R .nano
rm -Rf .nano
ls
git clone https://github.com/nanorc/nanorc
cd nanorc/
ls
make install
ls
cd ..
ls .nano
ls .nano/syntax/
less .nano/syntax/awk.nanorc 
nano .bashrc
less .nano/syntax/ALL.nanorc 
nano .bashrc
nano --syntax=sh .bashrc
. .bashrc
ls
ll
desc vim
nano .bashrc
nano .nanorc
rm .nanorc
cp /etc/nanorc .nanorc
nano .nanorc
nano .bashrc
nano .nanorc
nano ~/.nano/syntax/ALL.nanorc
nano .zprezto
nano .zpreztorc
nano new.txt
nano shell
nano .nanorc
ls nanorc
rm -Rf nanorc
ls .nano/syntax/
less .nano/syntax/vi.nanorc 
less .nano/syntax/ALL.nanorc 
nano shell.nanorc
nano .nano/syntax/shell.nanorc 
nano .nano/syntax/cython.nanorc 
nano .nano/syntax/vi.nanorc 
nano .vimrc
nano .nano/syntax/vi.nanorc 
ls .nano/syntax/
sudo nano /etc/apt/sources.list
apt-key --help | less
apt-key adv –keyserver keyserver.ubuntu.com –recv-keys 1024R/EEA14886
ad
apt-key adv –keyserver keyserver.ubuntu.com –recv-keys EEA14886
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886
ad
sudo synaptic
alias
desc atom
abd atom
sudo abd atom
nano .bash_aliases
. .bashrc
adb atom
abd ato
abd atom
ag
sudo apt-get -s upgrade
ls
mkdcd builds/atom
asou atom
ls
cd atom-0.99.0~git20140525~webupd8~saucy0/
ls
zsh
nano .zshrc
zsh
nano .zshrc
zsh
zsh --help
zsh -c cd /usr/lib/prezto/modules/prompt/functions/
zsh -c "cd /usr/lib/prezto/modules/prompt/functions/"
man zsh
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
clear
zsh
cd /usr/lib/prezto/modules/prompt/functions/
zsh
alias
acp perl
acp perl-data-dump
acp perl_data_dump
desc obconf
apt-cache policy obconf
apt-cache policy openbox
desc dh-make-perl
desc libyaml-shell-perl
desc pac-apt
dpkg -l | grep ^ob
dpkg -l | grep ^open
dpkg -l | grep ob
inst spacefm
dpkg -l | less
apt-cache --help | less
apt-cache pkgnames | less
apt-cache pkgnames | grep ^ob
desc ob*
desc obapps obexd-client obex-data-server obfsproxy obconf obnam oboinus obmenu obrowser-doc
acs expat
acs expat | less
acp expat
desc expat
apt-file pyexpat
apt-file search pyexpat
desc expat
dpkg -L expat
dpkg -l | grep expat
apt-cache search expat
apt-cache search expat | grep py
dpkg -L libexpat
dpkg -L libexpat1
ls /
ls /lib64
ll /lib64
ls /lib
grep -Ri expat /lib
acs pymongo
acp python-pymongo
desc python-pymongo
inst python-pymongo
ls /opt/sublime_text_2/lib/
clear
man git-revert
cd /usr/lib/prezto/modules/prompt/functions/
git status
mad zsh
man git-pull
man git-fetch
man git-merge
man git-pull
man git-merge
cd builds/zsh
cd ~/builds/zsh
ls
grep -Ri localpatterns
grep -Ri localpatterns | less -R
grep -Ri localpatterns | less -r
grep -Ri localpatterns | less
cd ..
grep -Ri localpatterns | vimpager
desc most
inst most
man most
grep -Ri localpatterns | most
ls
ll
man git-reset
desc cabal
desc cabal-install
alias
apt-cache showpkg alias
apt-cache showpkg cabal
apt-cache showpkg cabal-install
apt-cache show cabal-install
inst cabal-install
df
sudo df
sudo fdisk -l
sudo parted -l
inst parted
sudo parted -l
inst gparted
sudo gparted &
zsh --help | less
info zsh
bash --help | less
man bash
info bash
info zsh
zsh -n /usr/lib/prezto/modules/prompt/functions/prompt_caitlin_setup
ls
ls /usr/lib/prezto/
nano /usr/lib/prezto/
nano 
ls /usr/lib/prezto/
nano /usr/lib/prezto/init.zsh
ls $!
ls $-3:$
ls /usr/lib/prezto/init.zsh
ls .zsh
ls /usr/lib/prezto/init.zsh
ls .zshp
ls /usr/lib/prezto/init.zsh
ls init.zsh
ls
cd /usr/lib/prezto/modules/prompt/functions/
nano prompt_ashmckenzie_setup 
git status
git rm prompt_powerline_setup
git reset HEAD prompt_powerline_setup
man git-revert
man git-reset
git log
man git-reset
desc scrot
acs scrot
acsp scrot
acsh scrot
alias
apt-cache show scrot
apt-cache search screenshot
inst -s gnome-screenshot
inst -s screenie
inst -s shutter
inst shutter
inst -s gnome-screenshot
inst gnome-screenshot
gnome-screenshot 
inst shutter
ad
man apt-config
man apt-cache
man apt-get
man dpkg-architecture 
man dpkg
dpkg --print-foreign-architecture
man dpkg
dpkg --print-foreign-architectures
ag
alias
sudo apt-get upgrade
shutter
zsh
cd builds/zsh
grep -Ri localpatterns
ls
grep -Ri localpatterns zsh-5.0.5/
popd
cd /usr/lib/prezto/
grep -Ri version
grep -Ri localpatterns
grep -Ri localpattern
ls modules/completion/
ls modules/completion/external/
ls modules/completion/external/src/
ls modules/grc
rm modules/grc/external 
git status
git add modules/grc/external
git status | less
git status | less -R
git commit -m "removing grc module for the moment"
git rm modules/grc/external
git commit -m "removing grc module for the moment"
git push
git pull
git push
ls modules/
man git-mv
zsh
ssh rpi
ls
clear
zsh
cd /usr/lib/prezto/
zsh
source .bashrc
. ~/.bashrc
desc nodejs
desc nodejs lintian
zsh
. ~/.bashrc
cat ~/.bashrc
nano ~/.bashrc
. ~/.bashrc
complete -p | grep apt
alias -p | grep apt
complete -p | grep acs
complete -p | grep asou
echo $BASH_COMPLETION
type _alias_completion\:\:acp
. ~/.bashrc
complete -p | grep abd
complete -p | grep apt
. ~/.bashrc
completion -p | grep apt
complete -p | grep apt
. ~/.bashrc
completion -p | grep apt
complete -p | grep apt
. ~/.bashrc
alias --help | less
help alias
. ~/.bashrc
complete -p
alias -
complete -p | grep apt
complete -F _apt_get inst
complete -p | grep apt
zsh
locate
zsh
desc locate
zsh
ls
ls .byobu/
less .byobu/color
byobu --version
zsh
zsh
htop
zsh
dpkg -l | grep virtualbox
lxappearance 
dpkg -l | grep openbox
rmadison openbox
dpkg -l | grep obmenu
obmenu-generator 
zsh
acs virtualbox'
'
spacefm
cd /media/cdrom0/
ls
./VBoxLinuxAdditions.run
ll
sudo ./VBoxLinuxAdditions.run
apt-cache policy virtualbox-guest-additions-iso 
rmadison virtualbox-guest-additions-iso 
zsh
exit
less wrapalias.bash 
exit
less wrapalias.bash
source-highlight -oSTDOUT -fesc -i wrapalias.bash
source-highlight -oSTDOUT -fesc -i wrapalias.bash | less
source .bashrc
source-highlight -oSTDOUT -fesc -i wrapalias.bash | less
less wrapalias.bash
grep cm
grep -R alias
grep -R alias | less

grep -R alias | less -R
ls /usr/bin/env
zsh
ls
vim .bashrc
vim .bash_alias
vim .bash_aliases
source .bashrc
less wrapalias.bash 
vim .lessfilter 
source .bashrc
less wrapalias.bash 
source .bashrc
vim .bashrc
source .bashrc
less wrapalias.bash 
vim .bashrc
vim .lessfilter 
source .bashrc
less wrapalias.bash 
source-highlight -i wrapalias.bash 
source-highlight -i wrapalias.bash -fesc
source-highlight -i wrapalias.bash -fesc -oSTDOUT
eval lesspipe
eval "$(lesspipe)"
less wrapalias.bash 
less -R wrapalias.bash 
grep prezto /usr/lib/prezto | less
grep -R prezto /usr/lib/prezto | less
grep -R prezto /usr/lib/prezto | less -R
grep -R prezto /usr/lib/prezto 
vim .bashrc
bash
grep -R prezto /usr/lib/prezto | less -R
zsh
echo $LESSOPEN
zsh
cat .bashrc
less wrapalias.bash 
echo $LESS
echo $LESSOPEN
grep -R cm
grep -R cm | less
mv -v {.,}lessfilter 
grep -R cm | less
. .bashrc
grep -R cm | less
ls
source-highlight wrapalias.bash
source-highlight -oSTDOUT wrapalias.bash
source-highlight -oSTDOUT -i wrapalias.bash
source-highlight -fesc -oSTDOUT -i wrapalias.bash
source-highlight -fesc -oSTDOUT -i wrapalias.bash | less
cat .lessfilter
cat lessfilter
source-highlight -fesc -oSTDOUT -i wrapalias.bash | less -R
cb-lock

dpkg -l | grep distutils
dpkg -l | grep python-all
type complete
zsh
ssh rpi
zsh
cd builds/koans/
zsh
exit
desc ksensors fancontrol sensord read-edid i2c-tools
desc rdiff-backup
desc captive
desc gnomemeetings
desc isdn
desc bluez obexd-client
exit
zsh
man grep
zsh
vim .pinforc 
man find
man regex
man find
man source-highlight
man zmodload
zsh
man pinfo
ls
man pinfo
pinfo pinfo
cp /etc/pinforc .
ls
mv {,.}pinforc
ls
vim .pinforc
pinfo zsh
vim .pinforc
pinfo zsh
man info
info info
info man
info coreutils 
pinfo info
info info
pinfo zsh
info coreutils 
pinfo coreutils 
pinfo zsh
info zsh
pinfo zsh
info zsh
pinfo zsh
pinfo coreutils 
pinfo zsh
zsh
man 5 info
man info
man ls
syn
man help2man
info --help | less
man help2man
apt-cache search help2man
help2man info
help2man info > infoman.1
man man
man troff
man groff
groff infoman.1 
man groff
man ./infoman.1 
man info
zsh
zsh
zsh
cd /usr/lib/prezto
zsh
zsh
cd /usr/share/zsh/functions/Completion/Debian/
zsh
zsh
vim .pinforc 
info zsh
pinfo zsh
zsh
cd ~
cd Downloads/
wget https://gist.github.com/Zren/2779042/raw/DarkMonokai.css
cp DarkMonokai.{css,qss}
zsh
/etc/init.d/lightdm start
lightdm
sudo lightdm
reboot
sudo reboot
nitrogen
ls
cp .conkyrc{,.bak}
cp .conkyrc{,.cb}
zsh
exit
desc cowbuilder
cb-shell
exit
cb-shell-save sid
exit
cb-shell-save wheezy
exit
cb-shell-save sid
exit
cb-shell-save sid
exit
cb-shell -u sid
chmod +x ~/bin/cowbuilder-create-base 
~/bin/cowbuilder-create-base -u sid
sudo ~/bin/cowbuilder-create-base -u sid
cb-shell-save sid
exit
man git-log
man git-diff
man gbp-buildpackage 
zsh
zsh
zsh
man cowpoke 
man dch
man devscripts
man debsign
man devscripts
zsh
man devscripts
echo $PATH
sudo echo $PATH
exit
cb-shell-save sid
exit
. .bashrc
dquilt
exit
man gbp pq
man gbp clone
man git commit
exit
echo $PATH
less /etc/bash.bashrc 
less /etc/profile
ls
. /etc/profile
less /etc/profile
less /etc/bash.bashrc 
less .bashrc
grep ruby .bash*
zsh
echo $SHELL
exit
ssh-add /home/cm/.ssh/id_rsa
exit
zsh
zsh
zsh
zsh
zsh
zsh
df
fdisk -l
sudo fdisk -l
df
zsh
man git commit
man git diff
man git log
man git add
man git diff
zsh
man git merge
desc emacsen
acsh emacsen
zsh
pinfo bash
zsh
zsh
cd debian/ruby/DONE/execjs/ruby-execjs
zsh
dpkg -l | grep virtualbox
zsh
dpkg -l | grep xserver
zsh
man apt-listbugs 
zsh
cat /etc/apt/apt.conf
zsh
man gbp-clone
vim ~/bin/gbpc
zsh
zsh
exit
