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
        , pays:String
    
    })
    /** Middleware for limited access */
var User = mongoose.model("User", userSchema);
//
var request = require("request");



function islog(req, res) {
    if (req.session.username) {
        res.json(1);
    }
    else {
        res.json(0);
    }
}

function inscription(req, res) {
    var mail = req.body.mail;
    var password = req.body.password;
    var plaque = req.body.plaque.toUpperCase();
    if (req.body.other) {
        var other = req.body.other;
       
        var user = new User({
            email: mail
            , pass: password
            , plak: plaque
            , others: other
        })
    }
    else {
        var user = new User({
            email: mail
            , pass: password
            , plak: plaque
        })
    }
    var plaque = new Plaque({
        email: mail
        , num_plaque: plaque
        , type:1
    })
    var query = User.find(null);
    query.where('email', mail);
    query.exec(function (tkt, famille) {
      
        if (famille.length > 0) {
           
            res.json(2)
        }
        else {
            user.save(function (err) {
                if (err) {
                    return console.error(err);
                    res.json(0)
                }
                plaque.save(function (err) {});
                res.json(1);
            })
        }
    })
}

function userConnexion(req, res) {
    var username = req.body.id;
    var password = req.body.pass;
    var query = User.find(null);
    query.where('email', username);
    query.exec(function (err, rese) {
        if (rese.length >= 1) {
            query.where('pass', password);
            query.exec(function (erour, resou) {
                if (resou.length >= 1) {
                    req.session.username = req.body.id;
                    res.json(1)
                }
                else {
                    res.json(0);
                }
            })
        }
        else {
            res.json(0);
        }
    })
}

function userDeconnexion(req, res) {
    req.session.username = "";
    res.json(1);
}

function modifierProfile(req, res) {
    var bnom = req.body.nom;
    var bprenom = req.body.prenom;
    var bage = req.body.age;
    var bpays = req.body.pays;
    var badresse = req.body.adresse;
    var btelephone = req.body.telephone;
    
    var query=User.find(null);
    query.where('email',req.body.username);
    User.findOneAndUpdate(query,req.body,{upsert:true},function(err,doc){
        
        if (err) return res.json(0);
    return res.json(1);
    });
 
    
 
}

function listesPlaques(req, res) {
  
    var resultp = [];
    var username=req.body.id;
    
    var queryp = Plaque.find(null);
    queryp.where('email', username);
    queryp.where('type',1)
    queryp.exec(function (errr, resee) {
       
        if (resee.length >= 1) {
            
            var b = Math.min(4,resee.length)
            for (i = 0; i < b; i++) {
                resultp.push(resee[i].num_plaque);
            }
            res.json(resultp);
        }
        else {
            res.json(0);
        }
    })
}

function addplak(req, res) {
    var plaque_num = req.body.plaque.toUpperCase();
    var mail = req.body.id;
    var plaque = new Plaque({
        num_plaque: plaque_num
        , email: mail
        , type: 1
    , });
    var query=Plaque.find(null);
    query.where('email',req.session.username);
    query.where('type',1);
    query.exec(function(erro,reso){
        
        if(reso.length>3){
            res.json(0)
        }
        else{
            
              plaque.save(function (err) {
        if (err) {
            return console.error(err);
            res.json(0)
        }
        res.json(1)
    });
            
            
        }
        
    })
  
}

function admin(req, res) {
    var resultat = {};
    async.parallel([plaquen.bind(null), plaque.bind(null), nuser.bind(null)], function (err, result) {
        resultat.plaquen = result[0];
        resultat.plaque = result[1];
        resultat.user = result[2];
        res.json(resultat);
    })
}

function plaquen(callback) {
    var query = Plaque.find(null);
    query.where('notif', 'Strong');
    query.exec(function (err, res) {
        callback(err, res.length)
    });
}

function plaque(callback) {
    var query = Plaque.find(null);
    query.exec(function (err, res) {
        callback(err, res.length)
    })
}

function nuser(callback) {
    var query = User.find(null);
    query.exec(function (err, res) {
        callback(err, res.length)
    })
}

function send(req, res) {
    var query = User.find(null);
    query.where('connexion', '1');
    query.exec(function (err, rese) {
        if (rese.length >= 1) {
            var queryp = Plaque.find(null);
            queryp.where('email', rese[0].email);
            queryp.where('notif', 'Strong')
            queryp.exec(function (errep, resep) {
                res.json(resep);
            })
        }
    });
}

function receive(req, res) {
    var plaquesi = [];
    var resultat = {};
    puser(function (err, callback) {
        pstrong(function (er, call) {
            if (callback.length > call.length) {
                for (i = 0; i < callback.length; i++) {
                    for (j = 0; j < call.length; j++) {
                        if (callback[i] = call[j]) {
                            plaquesi.push(callback[i]);
                        }
                    }
                }
            }
            else {
                for (i = 0; i < call.length; i++) {
                    for (j = 0; j < callback.length; j++) {
                        if (call[i] = callback[j]) {
                            plaquesi.push(call[i]);
                        }
                    }
                }
            }
            if (plaquesi.length >= 1) {
                pinfo(plaquesi, function (error, cal) {
                    res.json(cal);
                });
            }
        })
    })
}

function puser(callback) {
    var plaques = [];
    var query = User.find(null);
    query.where('connexion', '1');
    query.exec(function (err, rese) {
        var queryp = Plaque.find(null);
        queryp.where('notif', null);
        queryp.where('email', rese[0].email);
        queryp.exec(function (errep, resep) {
            for (i = 0; i < resep.length; i++) {
                plaques.push(resep[i].num_plaque)
            }
            callback(errep, plaques);
        });
    })
}

function pstrong(callback) {
    var plaques = [];
    var query = Plaque.find(null);
    query.where('notif', 'Strong');
    query.exec(function (err, rese) {
        for (i = 0; i < rese.length; i++) {
            plaques.push(rese[i].num_plaque)
        }
        callback(err, plaques);
    })
}

function pinfo(liste, callback) {
    var result = [];
    var plaque1 = {};
    var query = Plaque.find(null);
    query.where('num_plaque', liste[0]);
    query.where('notif', 'Strong');
    query.exec(function (err, rese) {
        
        plaque1.num = liste[0];
        plaque1.email = rese[0].email;
        if (rese[0].raison == 'pneucreve') {
            plaque1.raison = 'Le pneu est crevé'
        }
        if (rese[0].raison == 'sslavoit') {
            plaque1.raison = 'Quelque chose pas bien attaché sous la voiture'
        }
        if (rese[0].raison == 'drlavoit') {
            plaque1.raison = 'Quelque chose pas bien derrière sous la voiture'
        }
        if (rese[0].raison == 'pbphare') {
            plaque1.raison = 'Problème de phares'
        }
        callback(err, plaque1);
    })
}
//API PLAQUE
function enterplate(req, res) {
    var d=new Date();
    var plaque_num = req.body.plaque.toUpperCase();
    var incident = req.body.incident;
    var mail = req.body.user;
    var plaque = new Plaque({
        num_plaque: plaque_num
        , raison: incident
        , sendemail: mail
        , notif: 'Strong'
        , type: 0
        , date: d
    });
    plaque.save(function (err) {
        if (err) {
            return console.error(err);
        }
    });
    res.json(1);
}

function info(req,res){
    var query=User.find(null);
    var passadmin='sendtoplateadministration4561&'
    if (req.body.pass==passadmin){
    query.where('email',req.body.id);
    User.findOne(query,function(err,doc){
      
        res.json(doc);        
        
        
    });
    }
    
}


function getNotif(req,res){
    
    var user=req.body.id;
    
       var options = { method: 'POST',
  url: 'http://sendtoplate.herokuapp.com/api/getplaques',
  headers: 
   { 'postman-token': '3b103afe-9be6-7e0b-4154-936d3fbadfa8',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { id: req.body.id} };

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
   
  
var resultp=[];
    
    Plaque.find()
    .where("num_plaque")
    .in(cut)
    .where("type")
    .in(['0'])
    .sort({date: -1})
    .exec(function (err, records) {
       
        res.json(records);
    })
           
    
    });
}

function deleteplate(req,res){
    
    var user=req.body.id;
      
    Plaque.remove()
    .where("num_plaque")
    .in([req.body.plate])
    .where("email")
    .in([req.body.id])
    .exec(function (err, records) {
        
        res.json(1);
        if(err){res.json(0)}
    })
        
}

function myNotif(req,res){
    
    var resultp = [];
    var username=req.body.id;
    
    var queryp = Plaque.find(null);
    queryp.where('sendemail', username);
    queryp.where('type',0)
    queryp.sort({date: 1})
    queryp.exec(function (errr, resee) {
       
        if (resee.length >= 1) {
            
            res.json(resee);
        }
        else {
            res.json(0);
        }
    })
    
    
    
}

function remerciement(req,res){
    
    console.log(req.body);
    var query=Plaque.find(null);
    query.where('sendemail',req.body.sendemail);
    query.where('num_plaque',req.body.plaque);
    
    Plaque.findOneAndUpdate(query,req.body,{upsert:true},function(err,doc){
        console.log(doc);
        if (err) return res.json(0);
    return res.json("1");
    });
    
    
    
}

               


module.exports = function (app) {
  
    app.post('/userInscription', inscription);
    app.post('/signup', userConnexion);
    app.post('/logout', userDeconnexion);
    app.post('/profile', modifierProfile)
    app.post('/getplaques', listesPlaques)
    app.post('/addplak', addplak)
    app.post('/admin', admin)
    app.post('/notifsend', send)
    app.post('/receive', receive)
    app.post('/log', islog)
    app.post('/apiplate', enterplate)
    app.post('/disconnect', userDeconnexion)
    app.post('/getinfo',info)
    app.post('/getn',getNotif)
    app.post('/delete',deleteplate)
    app.post('/mNotif',myNotif)
    app.post('/thanks',remerciement)

};