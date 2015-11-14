# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc) for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# get 256color support so vim looks ok!
export TERM=xterm-256color

# don't put duplicate lines or lines starting with space in the history.
HISTCONTROL=ignoreboth
shopt -s histappend
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary, update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will match all files 
# and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
export LESS="-R"
eval "$(lesspipe)"

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi


#####################

## From CygWin:

# When changing directory small typos can be ignored by bash 
# for example, cd /vr/lgo/apaache would find /var/log/apache
shopt -s cdspell

#####################
##     Add-ins     ##
#####################
[[ -f "${HOME}/.bash_aliases" ]] && source "${HOME}/.bash_aliases"
[[ -f "${HOME}/.bash_functions" ]] && source "${HOME}/.bash_functions"

######################
##      Prompt      ##
######################
# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
force_color_prompt=yes

# http://bitmote.com/index.php?post/2012/11/19/Using-ANSI-Color-Codes-to-Colorize-Your-Bash-Prompt-on-Linux
c="\[\033["
p="${c}0;37m\]"
pt1="\n\[\033[0;37m\]╔═══ǁ ${c}0;3\$(if [ \$? -eq 0 ]; then echo '2'; else echo '1'; fi)m\]*$p ǁ ${c}36m\]\A$p ǁ ${c}1;35m\]\j$p ǁ ${c}35m\]${debian_chroot:+($debian_chroot)}\u$p ǁ ${c}34m\]\w$p ǁ"
pt2="\n╚═${c}0;3\$(if [ ${EUID} -eq 0 ]; then echo '1'; else echo '4'; fi)m\]»${c}m\] "

# git stuff
GIT_PS1_SHOWDIRTYSTATE=true
GIT_PS1_SHOWUNTRACKEDFILES=true
GIT_PS1_SHOWSTASHSTATE=true
GIT_PS1_SHOWUPSTREAM="auto"
GIT_PS1_SHOWCOLORHINTS=true
g="\[\033[38;5;155m\]\[\033[48;5;235m\]"

#$(git branch &>/dev/null; \
#if [ $? -eq 0 ]; then \
#	git_branch=$(__git_ps1 ' %s ') \
#	pt1="$pt1 $g$git_branch$p ǁ" \
#fi)

PS1=$pt1$c'0;33m\] ''$(git branch &>/dev/null; if [ $? -eq 0 ]; then echo $( __git_ps1 " %s "); fi)'$p$pt2
#PS1=$pt1$pt2

#######################
##    Other configs  ##
#######################

# eval `dircolors ~/.dir_colors`

# Color man pages
man() {
  env \
    LESS_TERMCAP_mb=$(printf "\e[1;31m") \
    LESS_TERMCAP_md=$(printf "\e[1;31m") \
    LESS_TERMCAP_me=$(printf "\e[0m") \
    LESS_TERMCAP_se=$(printf "\e[0m") \
    LESS_TERMCAP_so=$(printf "\e[1;44;33m") \
    LESS_TERMCAP_ue=$(printf "\e[0m") \
    LESS_TERMCAP_us=$(printf "\e[1;32m") \
      man "$@"
}




DEBEMAIL="skittleys@users.noreply.github.com"
DEBFULLNAME="CM"
