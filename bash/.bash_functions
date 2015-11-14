mkdcd() {
    [[ -n $1 ]] && mkdir -p "$1" && builtin cd "$1"
}

desc() {
    if [[ -n $1 ]]; then
	for i in $@
	do 
		res=$(apt-cache show $i | grep -m 1 "Description\(-en\)\?:" | sed "s/Description\(-en\)\?: //")
		echo -e "\e[33m$i\e[0m: $res"
	done
    fi
}

cb-shell () {
    chr=$1 ; shift
    sudo cowbuilder \
	--bindmount $HOME \
	--login \
	--basepath=/var/cache/pbuilder/base-${chr}.cow $@
}

cb-shell-save () {
    cb-shell $@ --save-after-login
}

