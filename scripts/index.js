'use strict';
$(document).ready(()=>{
        
    sessionStorage.removeItem('AppUser');
    toastr.Success('Bienvenido');
        
    $('#btnLogin').click(()=>{
        
        history.pushState(null, "", "./views/login/");        
        goLocation.ChangeView('/views/login/');

    });

    $('.facebook').click(()=>{
        redirect.Facebook();
    });

    $('.instagram').click(()=>{
        redirect.Instagram();
    });

    $('.whatsApp').click(()=>{
        redirect.WhatsApp();
    });
    
})
