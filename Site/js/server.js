var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
var nom = window.location.pathname;
nom = nom.split("/");
nom = nom[nom.length - 1];
nom = nom.substr(0, nom.lastIndexOf("."));
nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");

if(document.cookie==""){
hide(document.getElementById('discop'));
hide(document.getElementById('management'));
    }


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
        plaque.user=getCookie("username")
        if ($('#plaque').val() ==""|| $('#incident').val() == "") {
            alert('Remplissez tout les champs')
            document.location.href = "/index.html"
        }
        else {
            if (document.cookie != "") {
                $.post('/api/apiplate', plaque, function (data, success) {
                    
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
    hide(document.getElementById('pl1'));
    hide(document.getElementById('pl2'));
    hide(document.getElementById('pl3'));
    hide(document.getElementById('pl4'));
    
    var plaque={};
    plaque.id=getCookie("username");
    $.post('api/getplaques',plaque,function(data,success){
    
        if(data.length>0){$('#plaque1').html(data[0]);
                          show(document.getElementById('pl1'));}
        if(data.length>1){$('#plaque2').html(data[1])
                          show(document.getElementById('pl2'));}
        if(data.length>2){$('#plaque3').html(data[2])
                          show(document.getElementById('pl3'));}
        if(data.length>3){$('#plaque4').html(data[3])
                         show(document.getElementById('pl4'));}
        
              
        
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
                
              
                document.location.href="/profil.html"
                
                
                
            })
            
            
          
            
}});

$('a#p1').on({ 
        click: function(e){
             if(confirm("Voulez vous vraiment supprimer cette plaque?")){
                 var send={};
                 var user=getCookie("username");
                 send.id=user;
                 
                 var plaque=document.getElementById('plaque1').outerHTML.substring(21,document.getElementById('plaque1').outerHTML.length-9)
                 send.plate=plaque;
                 $.post('api/delete',send,function(data,success){
                 location.reload();
                 });
             }
                 
    
    else{
        return false;
    }
        }})

$('a#p2').on({ 
        click: function(e){
             if(confirm("Voulez vous vraiment supprimer cette plaque?")){
                 var send={};
                 var user=getCookie("username");
                 send.id=user;
                 
                 var plaque=document.getElementById('plaque2').outerHTML.substring(21,document.getElementById('plaque1').outerHTML.length-9)
                 send.plate=plaque;
                 $.post('api/delete',send,function(data,success){
                 location.reload();
                 });
             }
                 
    
    else{
        return false;
    }
        }})

$('a#p3').on({ 
        click: function(e){
             if(confirm("Voulez vous vraiment supprimer cette plaque?")){
                 var send={};
                 var user=getCookie("username");
                 send.id=user;
                 
                 var plaque=document.getElementById('plaque3').outerHTML.substring(21,document.getElementById('plaque1').outerHTML.length-9)
                 send.plate=plaque;
                 $.post('api/delete',send,function(data,success){
                 location.reload();
                 });
             }
                 
    
    else{
        return false;
    }
        }})

$('a#p4').on({ 
        click: function(e){
             if(confirm("Voulez vous vraiment supprimer cette plaque?")){
                 var send={};
                 var user=getCookie("username");
                 send.id=user;
                 
                 var plaque=document.getElementById('plaque4').outerHTML.substring(21,document.getElementById('plaque1').outerHTML.length-9)
                 send.plate=plaque;
                 $.post('api/delete',send,function(data,success){
                 location.reload();
                 });
             }
                 
    
    else{
        return false;
    }
        }})

$('a#notifr').on({
    
    click:function(e){
        
        document.location.href="/notifsrecues.html"
                
        
    }})




if(nom=="notifsrecues"){
    var ide=getCookie("username");
    var send={};
    send.id=ide;
    
    $.post('/api/getn',send,function(data,success){
       
    if(data.length!=0){
        
        for(i=0;i<data.length;i++){
            /*
            $('#notifer').html('<tr><td data-title="Nature du danger" style="text-align:center;"><inject id="pr'+i+'"></inject></td><td data-title="Par" style="text-align:center;"><inject id="pu'+i+'"></inject></td><td data-title="Plaque" style="text-align:center;"><inject id="p'+i+'"></inject></td></tr>')
            $('#p'+i).html(data[i].num_plaque);*/
            
        
        if (data[i].raison == 'pneucreve') {
            tkt='Le pneu est crevé'
        }
        if (data[i].raison == 'sslavoit') {
           tkt='Quelque chose pas bien attaché sous la voiture'
        }
        if (data[i].raison == 'drlavoit') {
            tkt='Quelque chose pas bien derrière sous la voiture'
        }
        if (data[i].raison == 'pbphare') {
            
           tkt='Problème de phares'
        }
             
        
         $('#notifer').html('<tr><td data-title="Nature du danger" style="text-align:center;"><inject>'+tkt+'</inject></td><td data-title="Par" style="text-align:center;"><inject>'+data[i].sendemail+'</inject></td><td data-title="Plaque" style="text-align:center;"><inject>'+data[i].num_plaque+'</inject></td></tr>')
    }
    
    
    
    
}})

}



   
   
   

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
