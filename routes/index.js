var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET helloworld page. */
router.get('/helloWorld', function(req, res) {
  res.render('helloWorld', { title: 'Hello World' });
});


/* GET channellist page. */

router.get('/channellist', function(req, res) {
  var db = req.db;
  var collection = db.get('channelcollection');
  
  collection.find({}, {}, function(e,docs) {
      res.render('channellist', {"channellist" : docs});
    });
});
/**/

/* GET add channel page */
router.get("/addchannel", function(req, res) {
    res.render("addchannel", {title : 'Add new channel'});
})


/* POST add channel page */
router.post("/addchannel", function(req, res) {
  
  var channelName = req.body.channelName;
  var callLetters = req.body.callLetters;
  
  var db = req.db;
  var collection = db.get("channelcollection");
  
  console.log("addchannel: " + channelName + " " + callLetters);
  
  collection.find({}, {}, function(e,docs) {
      console.log('channellist', {"channellist" : docs});
    });
  
  collection.insert({
    "channelName" : channelName,
    "callLetters" : callLetters,
  }, function (err, doc) {
    if (err) {
        console.log("Houston, we have a problem");
        res.send("Houston, we have a problem");
    }
  });
})


module.exports = router;
