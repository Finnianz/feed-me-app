var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/itemlist', function(req, res) {
	var MongoClient	= mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/feed-me';
	MongoClient.connect(url, function(err, client) {
		if(err){
			console.log('Unable to connect to the server', err);
		} else {
			console.log('Connection Established');
			var collection = client.db('feed-me');
			
			collection.findOne({}, function(err, result) {
				if (err) {
					res.send(err);
				} else if (result.length){
					res.render('itemlist', {
						"itemlist" : result
					});
				} else {
					res.send('No Documents Found');
				}
				db.close();
			});
		}
	});
});

module.exports = router;
