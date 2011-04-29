all:
	java -jar compiler.jar \
			 --js vendor/couchapp/_attachments/jquery.couch.js \
			 --js vendor/couchapp/_attachments/jquery.couch.app.js \
			 --js vendor/couchapp/_attachments/jquery.couch.app.util.js \
			 --js vendor/couchapp/_attachments/jquery.mustache.js \
			 --js vendor/couchapp/_attachments/jquery.pathbinder.js \
			 --js vendor/couchapp/_attachments/jquery.evently.js \
			 --js vendor/couchapp/_attachments/jquery.evently.couch.js \
			 > vendor/couchapp/_attachments/combined.js

