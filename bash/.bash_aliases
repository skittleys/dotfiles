# Interactive operation...
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Default to human readable figures
alias df='df -h'
alias du='du -h'

# Colourful grep
alias grep='grep --color'                     # show differences in colour
alias egrep='egrep --color=auto'              # show differences in colour
alias fgrep='fgrep --color=auto'              # show differences in colour

# Directory listings
alias ls='ls -A --color=auto --file-type'                 # classify files in colour
alias dir='ls -a --color=auto --format=vertical'
alias ll='ls -lhA'                              # long list

alias mad='apt-cache madison'
alias acs='apt-cache search'
alias inst='sudo apt-get install'
alias apt-up='sudo apt-get update && sudo apt-get upgrade'
alias ad='sudo apt-get update'
alias acp='apt-cache policy'
alias asou='apt-get source'
alias abd='sudo apt-get build-dep'
alias rdep='apt-cache rdepends'

alias dquilt="quilt --quiltrc=$HOME/.quiltrc-dpkg"
complete -F _quilt_completion $_quilt_complete_opt dquilt
