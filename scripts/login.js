'use strict';
$(document).ready(()=>{

    sessionStorage.removeItem('AppUser');

    toastr.Success('Ingresa tus credenciales');
    
    $('#btnHome').click(()=>{

        history.pushState(null, "", "../../");        
        goLocation.ChangeView('./');

    });

    $('#btnNewUser').click(()=>{

        if ($('#formCreate').css('display') == 'none') {

            $('#formLogin').css('height', '0');
            setTimeout(() => {
                $('#formLogin').hide();
                $('#formCreate').show();
                setTimeout(() => {
                    $('#formCreate').css('height', '100%');
                }, 100);
            }, 1500);

            $('#formCreate > .btnReturn').click(() => {

                $('#formCreate').css('height', '0');
                setTimeout(() => {
                    $('#formCreate').hide();
                    $('#formLogin').show();
                    setTimeout(() => {
                        $('#formLogin').css('height', '100%');
                    }, 100);
                }, 1500);

            });
            
        } else {

            $('#formCreate').css('height', '0');
            setTimeout(() => {
                $('#formCreate').hide();
                $('#formLogin').show();
                setTimeout(() => {
                    $('#formLogin').css('height', '100%');
                }, 100);
            }, 1500);
            
        }

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
            toastr.Error('Contacta tu administrador', 'Error');
            console.log('Error', e);
        });

    });

    $('#btnCreate').click((e) => {
        const NAME = e.target.form[0].value;
        const USER = e.target.form[1].value;
        const PASS1 = e.target.form[2].value;
        const PASS2 = e.target.form[3].value;
        
        if (!NAME ||  !USER || !PASS1 || !PASS2) {
            toastr.Warning('Completa los campos primero');
        }
    });

    $('#passCreate').change((e) => {
        if (e.target.value !== $('#confirmCreate').val() && $('#confirmCreate').val()) {
            toastr.Warning('Las contraseñas no coiciden');
        }
    });

    $('#confirmCreate').change((e) => {
        if (e.target.value !== $('#passCreate').val() && $('#passCreate').val()) {
            toastr.Warning('Las contraseñas no coiciden');
        }
    });


    $('#formCreate').submit((e) => {

        e.preventDefault();
        
        const NAME = e.target[0].value;
        const USER = e.target[1].value;
        const PASS1 = e.target[2].value;
        const PASS2 = e.target[3].value;

        if (PASS1 !== PASS2) {
            toastr.Warning('Las contraseñas no coiciden');
            return false
        }

        var requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "procedure": `sp_CreateUser '7EC0690B-F5FA-4B11-84D0-4B8BE28E29B0', '${USER}', '${PASS1}', '${NAME}';`
            }),
            redirect: 'follow'
        };
          
        fetch('https://www.appescolar.somee.com/api/Procedures/ExecProcedure', requestOptions).then(async (response) => {
        
            let data = (await response.json())[0];
            
            if (!data.rpta) {
                
                $('#formCreate').css('height', '0');
                setTimeout(() => {
                    $('#formCreate').hide();
                    $('#formLogin').show();
                    setTimeout(() => {
                        $('#formLogin').css('height', '100%');
                    }, 100);
                }, 1500);

                $('#userLogin').val(USER);
                $('#passLogin').val(PASS1);
                
                toastr.Success('Puedes ingresar con tu usuario y contraseña', 'Usuario creado con exito');

            } else {
                toastr.Warning('El usuario ya se encuentra registrado');
            }

        }).catch((e) => {
            toastr.Error('Contacta tu administrador', 'Error');
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
