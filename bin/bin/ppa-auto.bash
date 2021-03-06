#!/bin/bash

# A script to automate the downloading and building of a from a PPA.
# While direct downloads from PPAs can be troublesome on Debian
# due to "binary incompatibility", building the package from source
# will (help) ensure system compatibility. By using the source code 
# from the PPA repo instead of the upstream source code, all the hard work
# of building a Debian package is already done, and you can reap the 
# advantages of using APT to handle dependencies etc.

# This script is currently not very smart. There are 3 mandatory args,
# and some research must be done to find them.

usage(){
#    cat <<EOF
    
#    Usage: ppa-auto <ppa> <release> <key>
#
#    <ppa> must be in the form of ppa:xx/yy
#
#    <release> is an ubuntu release, e.g., trusty, precise. It doesn't matter too much which one you use, but it is mandatory. 
#    My advice, as of June 2014:
#     Debian Squeeze: lucid
#     Debian Wheezy: quantal
#     Debian Jessie/testing: trusty, otherwise the latest available
#     Debian Sid: trusty, otherwise the latest available
#     Debian experimental (are you crazy?): utopic, otherwise the latest available
#
#    <key> must be viewed on the launchpad page for the ppa. It is the 8-digit hexadecimal "signing key". Omit the "1024R/".
#
#    EOF
#    exit 1
}

[[ $# -eq 3 ]] && usage

REPO="$1"
RELEASE="$2"
KEY8="$3"

URL="$(sed 's|ppa:\w*\/\w*|http:\/\/ppa.launchpad.net\/\1\/ubuntu|')"

sudo sh -c 'echo "\n# ${REPO}\ndeb-src $URL $RELEASE main" >> /etc/apt/sources.list\n'

sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys "$2"
$(sudo apt-get update)

sudo apt-get source -b "$1"
