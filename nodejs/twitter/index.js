var tweetstream = require('tweetstream'),
    sys = require('sys'),
    cradle = require('cradle'),
    db = new (cradle.Connection)({
      host: 'indutny.couchone.com',
      port: 80,
      auth: {
        user: 'admin',
        pass: '9l.8k,5gb3dc1az'
      }
    }).database('mapchat');


var username = 'gmaptalk',
    password = 'nodejsisgood';
    
var track = tweetstream.createTweetStream({
               username: username,
               password: password,
               track: ['mapchat']
             });
             
function onTweet(tweet) {
  if (!tweet) return;
  try {
  
    if (!tweet.geo && tweet.place && tweet.place.bounding_box) {
      if (!tweet.place.bounding_box.coordinates[0]) return;
      if (!tweet.place.bounding_box.coordinates[0][0]) return;
      
      var total = [0, 0],
          count = 0;
      
      tweet.place.bounding_box.coordinates.forEach(function(coords) {
        coords.forEach(function(coords) {

          total[0] += coords[0];
          total[1] += coords[1];
          count++;
          
        });
      });
      
      if (count) {
        tweet.geo = {
          type: 'Point',
          coordinates: [total[0] / count, total[1]/ count]
        };
      }
    }

    if (!tweet || !tweet.geo || tweet.geo.type !== 'Point') return;

      
    function toFixed(lat, lng) {
      return [+lat.toFixed(2), +lng.toFixed(2)];
    };
    
    db.save({
      type: 'message',
      loc: toFixed(tweet.geo.coordinates[1], tweet.geo.coordinates[0]),
      author: '@' + tweet.user.screen_name,
      gravatar_url: '00000000000000000000000000000000',
      created_at: +new Date,
      text: tweet.text
    }, function(err, res) {
      if (err) console.log(err);
      
      console.log(res);
    });

  } catch(e) {
    console.log(e);
  }
}               
track.on('tweet', onTweet);
