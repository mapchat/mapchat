#!/bin/bash

echo "Installing MapChat on CouchOne instance" >&2
echo "" >&2

git=`which git 2>&1`
ret=$?
if [ $ret -ne 0 ] || ! [ -x $git ]; then
  echo "MapChat cannot be installed without git." >&2
  echo "Install git first, and then try again." >&2
  exit $ret
fi

read -p "Instance name (instname.couchone.com): " INSTANCE
read -p "Database name: " DB

echo "" >&2

read -p "Username: " USER
read -p "Password: " -s PASSWORD

echo "" >&2
echo "Starting installation" >&2
echo "" >&2

TMP="${TMPDIR}"
if [ "x$TMP" = "x" ]; then
  TMP="/tmp"
fi
TMP="${TMP}/mapchat.$$"
rm -rf "$TMP" || true
mkdir "$TMP"
if [ $? -ne 0 ]; then
  echo "failed to mkdir $TMP" >&2
  exit 1
fi

echo "Cloning git repo..." >&2
echo "" >&2
cd "$TMP" \
&& git clone git://github.com/mapchat/mapchat.git \
&& cd mapchat \
&& echo "" >&2 \
&& echo "Pushing couchapp..." >&2 \
&& echo "" >&2 \
&& couchapp push . http://$USER:$PASSWORD@$INSTANCE.couchone.com/$DB \
&& cd _auth \
&& echo "" >&2 \
&& echo "Pushing username validation couchapp..." >&2 \
&& echo "" >&2 \
&& couchapp push . http://$USER:$PASSWORD@$INSTANCE.couchone.com/_users

echo "" >&2
echo "Installation finished" >&2
echo "Visit http://$INSTANCE.couchone.com/$DB/_design/mapchat/_rewrite/ and start conversation on a MapChat!" >&2
echo "" >&2
