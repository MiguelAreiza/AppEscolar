'use strict';
function Redirect() {

    this.Facebook = () => {
        window.open('https://www.facebook.com/miguelangel.areizaberrio');
    }

    this.Instagram = () => {
        window.open('https://www.instagram.com/areizam11/');
    }

    this.WhatsApp = () => {
        window.open('https://api.whatsapp.com/send?phone=573245026814&text=');        
    }
    
}

function Toastr() {

    this.Info = (mesagge) => { 
        newMesagge(mesagge, 'toast-info', newId());
    }

    this.Success = (mesagge) => {
        newMesagge(mesagge, 'toast-success', newId());
    }

    this.Error = (mesagge) => {
        newMesagge(mesagge, 'toast-error', newId());
    }

    this.Warning = (mesagge) => {
        newMesagge(mesagge, 'toast-warning', newId());
    }
    
    function newMesagge(mesagge, type, id) {
        
        if ($('#notifications :last-child').html() != mesagge) {

            $('#notifications').append(`<div class="toast ${type}" id="${id}">${mesagge}</div>`);
    
            $(`#${id}`).click(()=>{
                $(`#${id}`).remove();
            })
        
            setTimeout(() => {
                $(`#${id}`).remove();
            }, 10000);

        }

    }

    function newId() {

        let Codigo = '';
    
        for (let i = 0; i < 3; i++) {   

            let str1, str2, str3, str4;
            /*Generar numeros random de acuerdo al codigo ASCII y convertirlos*/
            str1 = String.fromCharCode(Math.round((Math.random() * (57 - 48)) + 48));
            str2 = String.fromCharCode(Math.round((Math.random() * (90 - 65)) + 65));
            str3 = String.fromCharCode(Math.round((Math.random() * (122 - 97)) + 97));
            str4 = String.fromCharCode(Math.round((Math.random() * (57 - 48)) + 48));    
    
            /*Integrarlo al codigo al codigo*/
            Codigo += `${str1}${str2}${str3}${str4}`;

            if (i != 2) {
                Codigo += `-`;
            }

        }

        return Codigo;

    }

}

function GoLocation() {

    this.ChangeView = (urlView) => {

        fetch(urlView).then(async (response) => {
            $('body').html(await response.text());
        }).catch(() => {
            toastr.Error('Error en la transaccion');
        });

    }

}

var redirect = new Redirect();
var toastr = new Toastr();
var goLocation = new GoLocation();