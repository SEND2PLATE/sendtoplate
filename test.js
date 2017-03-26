var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:galerien@ds145389.mlab.com:45389/sendtoplate",function(errour){
     

});

var async = require('async');



// Schema for the dabase
var plaqueSchema = mongoose.Schema({
    num_plaque: String
    , raison: String
    , email: String
    , notif: String
    , type: String
    , sendemail:String
    , date:String,
    thanks:String
});

var Plaque = mongoose.model("Plaque", plaqueSchema); 
var query=Plaque.find(null);
    query.where('sendemail','max.catrice@gmail.com');
    query.where('_id','58d6fe7e0f6d871100ac4522')
     query.exec(function (errr, resee) {
         console.log(resee)
     });
