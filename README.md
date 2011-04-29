## Mapchat

<img src="https://github.com/downloads/mapchat/mapchat/128.png" alt="Mapchat logo" title="Mapchat" />

Chat with your friends, plan meetings, discuss events anywhere!

[http://mapchat.me/](http://mapchat.me/)

### Installation

There're two choices:

* Replicate database http://install.mapchat.me/install to your local CouchDB instance
* Install it on a CouchOne instance:

    $ git clone git://github.com/mapchat/mapchat.git && cd mapchat && ./install.sh

Then visit your MapChat instance at:
[http://somedomain.couchone.com/mapchat/_design/mapchat/_rewrite/](http://somedomain.couchone.com/mapchat/_design/mapchat/_rewrite/)

### Manual Installation
    $ git clone git://github.com/mapchat/mapchat.git && cd mapchat
    $ couchapp push . http://username:password@somedomain.couchone.com/mapchat
    $ cd _auth && couchapp push . http://username:password@somedomain.couchone.com/_users

(Last action is needed to require users to use login with space symbols inside it)

### Using vhosts
1. Visit your CouchDB instance configuration in futon.
2. Add in section "vhosts" - key = "cooldomain.com" value = "/mapchat/_design/mapchat/_rewrite"
3. Visit your MapChath instance on http://cooldomain.com/ (Note that you will need to configure DNS for it too)

### Credits

Icons from:
[http://www.iconfinder.com/search/1/?q=iconset:dortmund](http://www.iconfinder.com/search/1/?q=iconset:dortmund)

(C) 2011 Fedor Indutny
Mapchat is released under Apache License, Version 2.0.
