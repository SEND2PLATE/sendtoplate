var request=require('request');
var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:galerien@ds145389.mlab.com:45389/sendtoplate",function(errour){
     console.log(errour)

});
mongoose.set('debug',true);
var async = require('async');
var plaqueSchema = mongoose.Schema({
    num_plaque: String
    , raison: String
    , email: String
    , notif: String
    , type: String
    , sendemail:String
});

var Plaque = mongoose.model("Plaque", plaqueSchema);


    
    var options = { method: 'POST',
  url: 'http://sendtoplate.herokuapp.com/api/getplaques',
  headers: 
   { 'postman-token': '3b103afe-9be6-7e0b-4154-936d3fbadfa8',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { id: "axel.marciano@gmail.com" } };

request(options, function (error, response, body) {
    
  if (error) throw new Error(error);
    var cut=[];
    var chaine=response.body.substring(1,response.body.length-1);
    var reg=new RegExp("[ ,;]+", "g");
    var tableau=chaine.split(reg);
 
    for(i=0;i<tableau.length;i++){
        
        cut[i]=tableau[i].substring(1,tableau[i].length-1);
        
    }
  
    
  
var resultp=[];
    
    Plaque.find()
    .where("num_plaque")
    .in(cut)
    .where("type")
    .in(['0'])
    .exec(function (err, records) {
        
        console.log(records);
    })
           
            
            
      
     
    
    });
   
      
    

   


