'use strict';
$(document).ready(()=>{
    CreateMsj('success', 'Ingresa tus credenciales');
    
    $('#btnHome').click(()=>{
        location.href = '/AppEscolar/';
    })

    $('.facebook').click(()=>{
        window.open('https://www.facebook.com/miguelangel.areizaberrio');
    })

    $('.instagram').click(()=>{
        window.open('https://www.instagram.com/areizam11/');
    })

    $('.whatsApp').click(()=>{
        window.open('https://api.whatsapp.com/send?phone=573245026814&text=');
    })

    $('#btnLogin').click(()=>{
        const user = $('#userLogin').val();
        const pass = $('#passLogin').val();
        
        if (user === '' || pass === '') {
            CreateMsj('error', 'Completa los campos')
        } else {

            axios({
                method: 'post',
                url: 'https://apimaddiapp.azurewebsites.net/Api/ValidateUser',
                data: {
                    "User": "danny@madi.com",
                    "Pass": "qwert.12345"
                }
            });

            axios.post('https://apimaddiapp.azurewebsites.net/Api/ValidateUser', {
                "User": "danny@madi.com",
                "Pass": "qwert.12345"
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });

        }
    })



    function CreateMsj(mode, msj) {
    
        let id = NewId();
        let color = '#000099';
    
        if (mode == 'success') {
            color = '#009900';
        } else if (mode == 'error') {
            color = '#990000';
        }
    
        $('#notifications').append(`<div class="toast" style="background: ${color};" id="${id}">${msj}</div>`);
    
        $(`#${id}`).click(()=>{
            $(`#${id}`).remove();
        })
    
        setTimeout(() => {
            $(`#${id}`).remove();
        }, 10000);
    }
    
    function NewId() {
        let Codigo = '';
    
        for (let i = 0; i < 3; i++) {        
            let str1, str2, str3, str4;
            /*Generar los random de acuerdo al codigo ASCII*/
            str1 = Math.round((Math.random() * (57 - 48)) + 48);
            str2 = Math.round((Math.random() * (90 - 65)) + 65);
            str3 = Math.round((Math.random() * (122 - 97)) + 97);
            str4 = Math.round((Math.random() * (57 - 48)) + 48);
    
            /*Convertirlos a ASCII*/
            str1 = String.fromCharCode(str1);
            str2 = String.fromCharCode(str2);
            str3 = String.fromCharCode(str3);
            str4 = String.fromCharCode(str4);
    
            /*Integrarlo al codigo al codigo*/
            Codigo += `${str1}${str2}${str3}${str4}`;
            if (i != 2) {
                Codigo += `-`;
            }
        }
        return Codigo;
    }
})
