#!/bin/bash
clear

couchapp=`which couchapp 2>&1`
ret=$?
if [ $ret -ne 0 ] || ! [ -x $couchapp ]; then
  echo "MapChat cannot be installed without couchapp." >&2
  echo "Install couchapp first, and then try again." >&2
  exit $ret
fi

echo "Installing MapChat on CouchDB server" >&2
echo "" >&2

read -p "Server url (mapchat.iriscouch.com): " SERVER
read -p "Database name: " DB

echo "" >&2

read -p "Username: " USER
read -p "Password: " -s PASSWORD

echo "" >&2
echo "Starting installation" >&2
echo "" >&2

couchapp=`which couchapp 2>&1`
ret=$?
if [ $ret -ne 0 ] || ! [ -x $couchapp ]; then
  make all
  DIR="."
else
  cake build
  DIR="./.build/"
fi

echo "Pushing couchapp..." >&2 \
&& echo "" >&2 \
&& couchapp push $DIR http://$USER:$PASSWORD@$SERVER/$DB \
&& cd $DIR/_auth \
&& echo "" >&2 \
&& echo "Pushing username validation couchapp..." >&2 \
&& echo "" >&2 \
&& couchapp push . http://$USER:$PASSWORD@$SERVER/_users

echo "" >&2
echo "Installation finished" >&2
echo "Visit http://$SERVER/$DB/_design/mapchat/_rewrite/ and start conversation on a MapChat!" >&2
echo "" >&2
exit 0

