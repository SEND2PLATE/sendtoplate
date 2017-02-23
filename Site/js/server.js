var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
hide(document.getElementById('discop'));
hide(document.getElementById('management'));

if (document.cookie != "") {
    hide(document.getElementById('sep'));
    show(document.getElementById('discop', 'table'));
    show(document.getElementById('management', 'initial'));
}
var plaque = {};
$('a#inscription').on({
    click: function (e) {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        hide(document.getElementById('discop'));
        hide(document.getElementById('management'));
        show(document.getElementById('sep', 'table'));
        $.post('api/disconnect', connexion, function (data, success) {});
    }
})
var inscription = {};
$('input#envoie').on({
    click: function (e) {
      
        if($('#password').val()!=$('#password2').val()){
            alert('Les deux mots de passes ne sont pas identiques')
            document.location.href = "/inscription.html"
            
        }
        if($('#mail').val()=="" || $('#password').val() ==""){
            
            alert('Champs manquant')
            document.location.href = "/inscription.html"
        }
        else{
        inscription.mail = $('#mail').val();
        inscription.password = $('#password').val();
        inscription.plaque = $('#plaque').val();
        var connexion={};
        connexion.id=$('#mail').val();
        connexion.pass=$('#password').val();
        $.post('api/userInscription', inscription, function (datap, successp) {
            
            if (datap == 1) {
                $.post('api/signup', connexion, function (data, success) {
                    setCookie("username", connexion.id, "100")
                   
                    
                })
                 document.location.href="/sendinscription.html"
            }
            if(datap==2){
                
                alert("L'adresse email est déjà utilisé")
                document.location.href = "/inscription.html"
                
            }
        })
    }
    }
});
$('a#disco').on({
    click: function (e) {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        hide(document.getElementById('discop'));
        hide(document.getElementById('management'));
        show(document.getElementById('sep', 'table'));
        $.post('api/logout', function (data, success) {});
    }
})
$('a#send').on({
    click: function (e) {
        plaque.plaque = $('#plaque').val();
        plaque.incident = $('#incident').val();
        if ($('#plaque').val() || $('#incident').val() == "") {
            alert('Remplissez tout les champs')
            document.location.href = "/index.html"
        }
        else {
            if (document.cookie != "") {
                $.post('/api/user', plaque, function (data, success) {
                    document.location.href = "/send.html"
                })
            }
            else {
                alert('Connectez vous ou inscrivez vous pour notifier une plaque')
                document.location.href = "/index.html"
            }
        }
    }
})
var connexion = {};
$('input#connexionuser').on({
    click: function (e) {
        connexion.id = $('#mailco').val();
        connexion.pass = $('#passco').val();
        $.post('api/signup', connexion, function (data, success) {
            if (data == 1) {
                setCookie("username", connexion.id, "100")
                document.location.href = "/connexiont.html"
            }
            if (data == 0) {
                document.location.href = "/connexionw.html"
            }
        })
    }
})
$('a#modifprofil').on({
    click: function (e) {
        document.location.href = "/profil.html"
    }
});
var nom = window.location.pathname;
nom = nom.split("/");
nom = nom[nom.length - 1];
nom = nom.substr(0, nom.lastIndexOf("."));
nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");

if(nom==("profil")){
    
    $.post('api/getinfo',function(data,success){
        
        $('#name').val(data.nom)
        $('#nickname').val(data.prenom)
        $('#age').val(data.age)
        $('#country').val(data.pays)
        $('#adresse').val(data.adresse)
        $('#phone').val(data.telephone)
        
    })
    
}

if(nom==("plaques")){
    
    $.post('api/getplaques',function(data,success){
       console.log(data)
        $('#plaque1').html(data[0])
        $('#plaque2').html(data[1])
        $('#plaque3').html(data[2])
        $('#plaque4').html(data[3])
        
              
        
    })
    
}

$('input#addplaque').on({
    click: function (e) {
    var plaqueux={};
    plaqueux.plaque=$('#plak').val()
    plaqueux.id=getCookie("username");
        
    $.post('api/addplak',plaqueux,function(data,success){
        document.location.href="/plaques.html"
       
    })
    
}});

$('a#platte').on({
    click: function(e){
        
        document.location.href="/plaques.html"
        
        
    }
})

var profil={}
$('input#sendprofil').on({ 
        click: function(e){
            
            profil.nom=$('#name').val();
            profil.prenom=$('#nickname').val();
            profil.age=$('#age').val();
            profil.pays=$('#country').val();
            profil.adresse=$('#adresse').val();
            profil.telephone=$('#phone').val();
            
            $.post('api/profile',profil,function(data,success){
                
                console.log(data);
                document.location.href="/profil.html"
                
                
                
            })
            
            
          
            
}});


//FUNCTION D'AIDE
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function hide(elements) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = 'none';
    }
}

function show(elements, specifiedDisplay) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = specifiedDisplay || 'inline-flex';
    }
}
