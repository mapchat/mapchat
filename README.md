## Mapchat

<img src="https://github.com/downloads/mapchat/mapchat/128.png" alt="Mapchat logo" title="Mapchat" />

Chat with your friends, plan meetings, discuss events anywhere!

http://mapchat.me/

### Installation
    $ git clone git://github.com/mapchat/mapchat.git && cd mapchat
    $ couchapp push . http://username:password@somedomain.couchone.com/mapchat
Then visit your MapChat instance at:
[http://somedomain.couchone.com/mapchat/_design/mapchat/_rewrite/](http://somedomain.couchone.com/mapchat/_design/mapchat/_rewrite/)

### Using vhosts
1. Visit your CouchDB instance configuration in futon.
2. Add in section "vhosts" - key = "cooldomain.com" value = "/mapchat/_design/mapchat/_rewrite"
3. Visit your MapChath instance on http://cooldomain.com/ (Note that you will need to configure DNS for it too)

### Credits

Icons from:
[http://www.iconfinder.com/search/1/?q=iconset:dortmund](http://www.iconfinder.com/search/1/?q=iconset:dortmund)

(C) 2011 Fedor Indutny
Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported LICENSE
