var express = require('express');
var MongoClient = require('mongodb').MongoClient;

//To run python program in Nodejs
var PythonShell = require('python-shell');

var router = express.Router();


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get("/",function(req,res){
 
    PythonShell.run('test.py', function (err,result) {
      if (err) throw err;
      console.log("login "+result);
    });



    res.render("login.ejs");
});


router.post("/login",function(req,res){
    //Check <form> tag action!
    if(req.body.username=="chinmay" && req.body.password=="kulkarni"){
        res.render("index.ejs",{status:"Login Success!"});
    }else{
        res.render("login.ejs",{status:"Login Unsuccessful!"});
    }
});






//This function is middleware!
router.post('/insert',urlencodedParser, function(req, res, next){
        //Form data comes here.
        MongoClient.connect("mongodb://localhost:27017/Mydb", function (err, db) {
              if(err) throw err;
        // databse Insert
        db.collection('Persons', function (err, collection) {      
                 collection.insert({ id: 5, firstName: req.body.name});    
              });
         });
        //res.render("index.ejs",{nameData : req.body.name});
        // console.log("Entered Name is :"+req.body.name);     
       console.log("Data inserted Successfully!");
       res.render("index.ejs",{status : "Data inserted success!"});
});


//This function is middleware!
router.post('/display',urlencodedParser, function(req, res, next){
    //Form data comes here.
    MongoClient.connect("mongodb://localhost:27017/Mydb", function (err, db) {
        if(err) throw err;
        //this function gave me collection of array
        db.collection("Persons").find({}).toArray(function(err,data){
            //this function gave me individual array elements
            data.forEach(function(eachVal){
                console.log(eachVal.firstName);
               
           });
           res.render("dataManager.ejs",{"users":data});
        });
    }); 
    //res.render("index.ejs",{"":}); 
});


//This function is middleware!
router.post('/remove',urlencodedParser, function(req, res, next){
    //Form data comes here.
    MongoClient.connect("mongodb://localhost:27017/Mydb", function (err, db) {
        if(err) throw err;
        //this function gave me collection of array
        db.collection("Persons").remove({});
        console.log("Records remove successfully!");

    }); 
    res.render("index.ejs"); 
});


router.get("/ExtraBootstrapConcept",function(req,res){
    res.render("ExtraBootstrapConcept.ejs");
});






module.exports = router;