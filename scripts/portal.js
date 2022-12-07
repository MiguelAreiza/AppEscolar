'use strict';
$(document).ready(()=>{

    $.ajax({
        url : '../data.txt',
        dataType: "text",
        success : function (data)         
        {
            let users = JSON.parse(data).users;

            if (sessionStorage.AppUser) {
                let userId = JSON.parse(sessionStorage.AppUser)[0].id;

                for (let i = 0; i < users.length; i++) {                        
                    if (users[i].id == userId) {
                        let AppUser = [{id:users[i].id,
                                        user:users[i].user,
                                        name:users[i].name,
                                        activo:users[i].acti}];
                        sessionStorage.setItem('AppUser', JSON.stringify(AppUser));
                        
                        $('#nameUser').html(users[i].name)

                        CreateMsj('success', `Bienvenido ${users[i].name}`);
                        break;
                    }else if (i == (users.length - 1)) {
                        CreateMsj('error', 'Logueate primero para iniciar')
                        location.href = './login.html';
                    }                        
                }
            } else {
                CreateMsj('error', 'Logueate primero para iniciar')
                location.href = './login.html';
            }
            
        },
        error: function (error) 
        {
            CreateMsj('error', 'Ocurrio un error')
        },                 
    });
    
    $('#btnLogOut').click(()=>{
        location.href = '../';
    });

    $('.facebook').click(()=>{
        window.open('https://www.facebook.com/miguelangel.areizaberrio');
    });

    $('.instagram').click(()=>{
        window.open('https://www.instagram.com/areizam11/');
    });

    $('.whatsApp').click(()=>{
        window.open('https://api.whatsapp.com/send?phone=573245026814&text=');
    });


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
