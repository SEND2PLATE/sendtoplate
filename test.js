var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:galerien@ds157539.mlab.com:57539/send2plate",function(err){
     
});
var userSchema = mongoose.Schema({
        email: String
        , pass: String
        , plak: String
        , others: String
        , connexion: String
        , nom: String
        , prenom: String
        , age: String
        , adresse: String
        , telephone: String
    })
var User = mongoose.model("User", userSchema);  

var query = User.find(null);
  
    query.exec(function (err, res) {
        
        console.log(res)})
    
			