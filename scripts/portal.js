'use strict';

fetch('../../data.txt').then(async (response) => {

    let users = (await response.json()).users;
    
    if (sessionStorage.AppUser) {

        users = users.filter(user => user.id == JSON.parse(sessionStorage.AppUser)[0].id);

        if (users.length === 1) {
            
            $('#nameUser').html(users[0].name);            
            toastr.Success(`Permítete brillar como una estrella`);

        } else {

            toastr.Warning('Logueate primero para iniciar');
            history.pushState(null, "", "../login/");
            goLocation.ChangeView('../../views/login/');

        }                   

    } else {

        toastr.Warning('Logueate primero para iniciar');
        history.pushState(null, "", "../login/");
        goLocation.ChangeView('../login/');

    }
    
}).catch(() => {
    toastr.Error('Error en la transaccion');
});

$(document).ready(()=>{

    $('#btnLogOut').click(()=>{
        history.pushState(null, "", "../login/");
        goLocation.ChangeView('../login/');
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
