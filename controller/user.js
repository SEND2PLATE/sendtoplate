var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:galerien@ds157539.mlab.com:57539/send2plate",function(err){
     
});

var async = require('async');


var plaqueSchema = mongoose.Schema({
    num_plaque: String
    , raison: String
    , email: String
    , notif: String
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
    })
    /** Middleware for limited access */
var User = mongoose.model("User", userSchema);

function plaque_post(req, res,callback) {
    
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
    else
        {
            res.json(0);
        }
}

function islog(req,res){
    
       if (req.session.username) {
           res.json(1);
 }
    else
        {
            res.json(0);
        }
    
}
function inscription(req, res) {
    var mail = req.body.mail;
    var password = req.body.password;
    var plaque = req.body.plaque;
    var other = req.body.other;
    var user = new User({
        email: mail
        , pass: password
        , plak: plaque
        , others: other
        , connexion: '0'
    })
    var plaque = new Plaque({
        email: mail
        , num_plaque: plaque
    })
    user.save(function (err) {
        if (err) {
            return console.error(err);
        }
        plaque.save(function (err) {});
    })
};

function userConnexion(req, res) {
    var username = req.body.id;
    var password = req.body.pass;
    var query = User.find(null);
    query.where('email', username);
      query.exec(function(err,rese){
        if(rese.length >=1){
            query.where('pass', password);
            query.exec(function(erour,resou){
                if(resou.length>=1){
                    
                     req.session.username = req.body.id;
                     
                     res.json(1)
                     
                }
                else{res.json(0);}
                
            })
        }
          else{res.json(0);}
      })
   

      
}

<<<<<<< HEAD

=======
function userDeconnexion(req, res) {
               
    req.session.username = null;
   
}
>>>>>>> origin/master

function modifierProfile(req, res) {
    var bnom = req.body.nom;
    var bprenom = req.body.prenom;
    var bage = req.body.age;
    var bpays = req.body.pays;
    var badresse = req.body.adresse;
    var btelephone = req.body.telephone;
    User.update({
        connexion: '1'
    }, {
        nom: bnom
    }, {
        multi: true
    }, function (err) {});
    User.update({
        connexion: '1'
    }, {
        prenom: bprenom
    }, {
        multi: true
    }, function (err) {});
    User.update({
        connexion: '1'
    }, {
        age: bage
    }, {
        multi: true
    }, function (err) {});
    User.update({
        connexion: '1'
    }, {
        pays: bpays
    }, {
        multi: true
    }, function (err) {});
    User.update({
        connexion: '1'
    }, {
        adresse: badresse
    }, {
        multi: true
    }, function (err) {});
    User.update({
        connexion: '1'
    }, {
        telephone: btelephone
    }, {
        multi: true
    }, function (err) {});
}

function listesPlaques(req, res) {
    var resultp = [];
    var query = User.find(null);
    query.where('connexion', '1');
    query.exec(function (err, rese) {
        var queryp = Plaque.find(null);
        queryp.where('email', rese[0].email);
        queryp.exec(function (errr, resee) {
            if (resee.length >= 1) {
                var b = Math.min(3, resee.length);
                for (i = 0; i < b; i++) {
                    resultp.push(resee[i].num_plaque);
                }
                res.json(resultp);
            }
            else {
                res.json(resultp);
            }
        })
    })
}

function addplak(req, res) {
    var query = User.find(null);
    query.where('connexion', '1');
    query.exec(function (err, rese) {
        var result = {}
        result.longueur = rese.length;
        if (rese.length >= 1) {
            var plaque_num = req.body.plaque;
            var mail = rese[0].email;
            var plaque = new Plaque({
                num_plaque: plaque_num
                , email: mail
            , });
            plaque.save(function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }
        else {
            var plaque_num = req.body.plaque;
            var mail = '0'
            var plaque = new Plaque({
                num_plaque: plaque_num
                , email: mail
            , });
            plaque.save(function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        }
    });
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
    app.post('/log',islog)
  
};