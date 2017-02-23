var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:galerien@ds157539.mlab.com:57539/send2plate", function (err) {});
var async = require('async');
var plaqueSchema = mongoose.Schema({
    num_plaque: String
    , raison: String
    , email: String
    , notif: String
    , type: String
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

function plaque_post(req, res, callback) {
    if (req.session.username) {
        var query = User.find(null);
        query.where('connexion', '1');
        query.exec(function (err, rese) {
            var result = {}
            result.longueur = rese.length;
            if (rese.length >= 1) {
                var plaque_num = req.body.plaque;
                var incident = req.body.incident;
                var mail = rese[0].email;
                var plaque = new Plaque({
                    num_plaque: plaque_num
                    , raison: incident
                    , email: mail
                    , notif: 'Strong'
                });
                plaque.save(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            }
            else {
                var plaque_num = req.body.plaque;
                var incident = req.body.incident;
                var mail = '0'
                var plaque = new Plaque({
                    num_plaque: plaque_num
                    , raison: incident
                    , email: mail
                    , notif: 'Strong'
                });
                plaque.save(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            }
        });
        res.json(1)
    }
    else {
        res.json(0);
    }
}

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
    var plaque = req.body.plaque;
    if (req.body.other) {
        var other = req.body.other;
        console.log(mail)
        console.log(password)
        console.log(plaque)
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
    })
    var query = User.find(null);
    query.where('email', mail);
    query.exec(function (tkt, famille) {
        console.log(famille)
        if (famille.length > 0) {
            console.log('lol')
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
    query.where('email',req.session.username);
    User.findOneAndUpdate(query,req.body,{upsert:true},function(err,doc){
        
        if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
    });
 
    
 
}

function listesPlaques(req, res) {
    var resultp = [];
    var queryu=User.find(null);
    queryu.where('email',req.session.username);
    queryu.exec(function(eror,reso){
        resultp.push(reso.plak)
        
    })
     
    
    var username = req.body.id;
    var queryp = Plaque.find(null);
    queryp.where('email', req.session.username);
    queryp.exec(function (errr, resee) {
        
        if (resee.length >= 1) {
            if(resultp.length=0){var c=4} else{var c=3};
            var b = Math.min(3, resee.length);
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
    var plaque_num = req.body.plaque;
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
        
        if(reso.length>2){
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
        console.log(rese[0]);
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
    var plaque_num = req.body.plaque;
    var incident = req.body.incident;
    var mail = req.body.user;
    var plaque = new Plaque({
        num_plaque: plaque_num
        , raison: incident
        , email: mail
        , notif: 'Strong'
    });
    plaque.save(function (err) {
        if (err) {
            return console.error(err);
        }
    });
    res.json(1)
}

function info(req,res){
    var query=User.find(null);
    query.where('email',req.session.username);
    User.findOne(query,function(err,doc){
      
        res.json(doc);        
        
        
    });
    
}

module.exports = function (app) {
    app.post('/user', plaque_post);
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
};