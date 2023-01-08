'use strict';
$(document).ready(()=>{

    sessionStorage.removeItem('AppUser');

    toastr.Success('Ingresa tus credenciales');
    
    $('#btnHome').click(()=>{

        history.pushState(null, "", "../../");        
        goLocation.ChangeView('./');

    });

    $('#btnLogin').click((e) => {
        const user = e.target.form[0].value;
        const pass = e.target.form[1].value;
        
        if (user == '' ||  pass == '') {
            toastr.Warning('Completa los campos primero');
        }
    })

    $('#formLogin').submit((e) => {

        e.preventDefault();

        const USER = e.target[0].value;
        const PASS = e.target[1].value;

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "procedure": `sp_ValidateLogin '${USER}', '${PASS}';`
            }),
            redirect: 'follow'
        };
          
        fetch('https://www.appescolar.somee.com/api/Procedures/ExecProcedure', requestOptions).then(async (response) => {
        
            let data = (await response.json())[0];
            
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
