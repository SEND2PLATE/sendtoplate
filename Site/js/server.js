$('a#plattes').on({
    
    click: function(e){
        
        $.post('/api/log'),function(data,success){
            
            if(data==1){
                document.location.href="/plaques.html"
                
            }
            else
                {
                     document.location.href="/inscription.html"
                    
                }
        }
        
        
    }
    
    
})

$('a#notife').on({
    
    click: function(e){
        
        $.post('/api/log'),function(data,success){
            
            if(data==1){
                document.location.href="/notifsenvoyees.html"
                
            }
            else
                {
                     document.location.href="/inscription.html"
                    
                }
        }
        
        
    }
    
    
})

$('li#profil').on({
    
    click: function(e){
        
        $.post('/api/log'),function(data,success){
            
            if(data==1){
                document.location.href="/profil.html"
                
            }
            else
                {
                     document.location.href="/inscription.html"
                    
                }
        }
        
        
    }
    console.log('salut')
    
})

$('a#notifr').on({
    
    click: function(e){
        
        $.post('/api/log'),function(data,success){
            
            if(data==1){
                document.location.href="/notifsrecues.html"
                
            }
            else
                {
                     document.location.href="/inscription.html"
                    
                }
        }
        
        
    }
    
    
})

	


