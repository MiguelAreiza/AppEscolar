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

        const USER = e.target[0].value;
        const PASS = e.target[1].value;

        // fetch('../../data.txt').then(async (response) => {

        //     let users = (await response.json()).users;
            
        //     users = users.filter(user => user.user == USER && user.pass == PASS);

        //     if (users.length === 1) {
                
        //         let AppUser = [{id:users[0].id,
        //                         user:users[0].user,
        //                         name:users[0].name,
        //                         activo:users[0].acti}];
        //         sessionStorage.setItem('AppUser', JSON.stringify(AppUser));
        //         // location.href = './portal.html'
        //         history.pushState(null, "", "../portal/");        
        //         goLocation.ChangeView('./');

        //     } else {
        //         toastr.Warning('Usuario o contraseña invalida');
        //     }
            
        // }).catch(() => {
        //     toastr.Error('Error en la transaccion');
        // });

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "procedure": `sp_ValidateUser '${USER}', '${PASS}';`
            }),
            redirect: 'follow'
        };
          
        fetch('http://www.appescolar.somee.com/api/Procedures/ExecProcedure', requestOptions).then(async (response) => {
        
            let data = (await response.json())[0];
            debugger;
            if (!data.rpta) {
                sessionStorage.setItem('AppUser', JSON.stringify(data));
                history.pushState(null, "", "../portal/");        
                goLocation.ChangeView('./');                
            } else {
                toastr.Warning('Usuario o contraseña invalidos');
            }

        }).catch((e) => {
            toastr.Error('Error en la transaccion');
            console.log('Error', e);
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
