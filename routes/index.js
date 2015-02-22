var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

router.get('/userpage', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userpage', {
            "userpage" : docs
        });
    });
});

router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userDetails = req.body.userdetails;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" 	: userName,
        "email" 	: userEmail,
        "details" 	: userDetails
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userpage");
            // And forward to success page
            res.redirect("userpage");
        }
    });
});

router.post('/updateuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.updateuser;
    var userEmail = req.body.updateemail;
    var userDetails = req.body.updatedetails;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.update({
        "username" 	: userName
        } ,
        { $set: {
        "email" 	: userEmail,
        "details"	: userDetails
    	}
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem updating the information in the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /deleteuser
            res.location("userpage");
            // And forward to success page
            res.redirect("userpage");
        }
    });
});

router.post('/deleteuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.deleteuser;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({
        "username" : userName,
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem removing the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /deleteuser
            res.location("userpage");
            // And forward to success page
            res.redirect("userpage");
        }
    });
});

module.exports = router;
