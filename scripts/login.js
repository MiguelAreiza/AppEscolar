'use strict';
$(document).ready(()=>{

    sessionStorage.removeItem('AppUser');

    toastr.Success('Ingresa tus credenciales');
    
    $('#btnHome').click(()=>{

        history.pushState(null, "", "../../");        
        goLocation.ChangeView('./');

    });

    $('#btnLogin').click(() => {
        const user = $('#userLogin').val();
        const pass = $('#passLogin').val();
        
        if (user == '' ||  pass == '') {
            toastr.Warning('Completa los campos primero');
        }
    })

    $('#formLogin').submit((e) => {

        e.preventDefault();

        const USER = $('#userLogin').val();
        const PASS = $('#passLogin').val();
        $('#userLogin').val('');
        $('#passLogin').val('');

        fetch('../../data.txt').then(async (response) => {

            let users = (await response.json()).users;
            
            users = users.filter(user => user.user == USER && user.pass == PASS);

            if (users.length === 1) {
                
                let AppUser = [{id:users[0].id,
                                user:users[0].user,
                                name:users[0].name,
                                activo:users[0].acti}];
                sessionStorage.setItem('AppUser', JSON.stringify(AppUser));
                // location.href = './portal.html'
                history.pushState(null, "", "../portal/");        
                goLocation.ChangeView('./');

            } else {
                toastr.Warning('Usuario no registrado');
            }
            
        }).catch(() => {
            toastr.Error('Error en la transaccion');
        });

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
