'use strict';

fetch('../../../data.txt').then(async (response) => {

    let users = (await response.json()).users;
    
    if (sessionStorage.AppUser) {

        users = users.filter(user => user.id == JSON.parse(sessionStorage.AppUser)[0].id);

        if (users.length === 1) {
            
            $('#nameUser').html(users[0].name);            
            toastr.Success(`Compartenos todas tus metas`);

        } else {

            history.pushState(null, "", "../../login/");
            goLocation.ChangeView('../../views/login/');

        }                   

    } else {

        history.pushState(null, "", "../../login/");
        goLocation.ChangeView('../login/');

    }
    
}).catch(() => {
    toastr.Error('Error en la transaccion');
    location.reload();
});

$(document).ready(function() {

    $('#btnAtras').click(()=>{
        history.pushState(null, "", "../");
        goLocation.ChangeView('./');
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

});