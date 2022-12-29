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

    $('#btnSettings').click(() => {
        
        if ($('#menuOpciones').css('height') == '0px') {

            $('#menuOpciones').css('height', '100%');  

        }  else {
             
            $('#menuOpciones').css('height', '0'); 

        }     
        
    });

    $('#btnAvatares').click(() => {
                
        $('#menuOpciones').css('height', '0');
        
        let html = ``;
        for (let i = 1; i <= 56; i++) {
            html += `<img id="avatar${i}" src="../../Images/Avatars/Avatar${i}.png" alt="Avatar ${i}" draggable="false">`
        }

        $('#avatares').html(html);

        for (let i = 1; i <= 56; i++) {
            $(`#avatar${i}`).click(() => {
                $('.telon').hide();
                $('.personajes').hide();
                toastr.Success('Magnífica elección')
            })
        }
        $('.telon').show();
        $('.personajes').show();
        
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
