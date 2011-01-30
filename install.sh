#!/bin/bash
clear
echo "Installing MapChat on CouchOne instance" >&2
echo "" >&2

read -p "Instance name (instname.couchone.com): " INSTANCE
read -p "Database name: " DB

echo "" >&2

read -p "Username: " USER
read -p "Password: " -s PASSWORD

echo "" >&2
echo "Starting installation" >&2
echo "" >&2

echo "Pushing couchapp..." >&2 \
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
exit 0

