'use strict';

if (sessionStorage.AppUser) {

    var requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "procedure": `sp_ValidateUserById '${JSON.parse(sessionStorage.AppUser).Id}';`
        }),
        redirect: 'follow'
    };
    
    fetch('https://www.appescolar.somee.com/api/Procedures/ExecProcedure', requestOptions).then(async (response) => {
    
        let data = (await response.json())[0];

        if (!data.rpta) {
            
            sessionStorage.setItem('AppUser', JSON.stringify(data));
            $('#nameUser').html(data.StrName);
            toastr.Success(`Permítete brillar como una estrella`);

        } else {

            history.pushState(null, "", "../login/");
            goLocation.ChangeView('../../views/login/');

        }
    
    }).catch((e) => {

        history.pushState(null, "", "../login/");
        goLocation.ChangeView('../login/');
        console.log('Error', e);

    });

} else {

    history.pushState(null, "", "../login/");
    goLocation.ChangeView('../login/');

}

$(document).ready(()=>{

    $('#btnLogOut').click(()=>{
        history.pushState(null, "", "../login/");
        goLocation.ChangeView('../login/');
    });

    $('#btnSettings').click(() => {
        
        if ($('#menu').css('height') == '0px') {

            $('#menu').css('height', 'calc(100% * 4)');
            if (JSON.parse(sessionStorage.AppUser).RoleFk == 'e922ab89-6aa3-4835-ba6a-ce189f0eb74a') {
                $('#adminMenu').css('height', 'calc(100% * 4)');
            }

        }  else {
             
            $('#menu').css('height', '0px'); 
            if (JSON.parse(sessionStorage.AppUser).RoleFk == 'e922ab89-6aa3-4835-ba6a-ce189f0eb74a') {
                $('#adminMenu').css('height', '0px'); 
            }

        }
        
    });

    $('#btnAvatares').click(() => {
                
        $('#menu').css('height', '0');
        
        let html = ``;
        for (let i = 1; i <= 56; i++) {
            html += `<img id="avatar${i}" src="../../Images/Avatars/Avatar${i}.png" alt="Avatar ${i}" draggable="false">`
        }

        $('#avatares').html(html);

        for (let i = 1; i <= 56; i++) {

            $(`#avatar${i}`).click(() => {

                $('.telon').hide();
                $('.personajes').hide();
                $('.pageContent > *').show();
                toastr.Success('Magnífica elección');

            });

        }

        $('.telon').show();
        $('.personajes').show();
        $('.pageContent > *').hide();

        $('.personajes #btnAtras').click(() => {
            $('.telon').hide();
            $('.personajes').hide();
            $('.pageContent > *').show();
        });
        
    });

    $('#btnInsignias').click(() => {
                
        $('#menu').css('height', '0');
        
        $('.telon').show();
        $('.insignias').show();
        $('.pageContent > *').hide();

        $('.insignias #btnAtras').click(() => {
            $('.telon').hide();
            $('.insignias').hide();
            $('.pageContent > *').show();
        });

        $('#insCalidad').click(() => {
            toastr.Info('Crea trabajos de calidad para conseguir una estas', 'Insignia de la calidad');
        });

        $('#insTiempo').click(() => {
            toastr.Info('Utiliza correctamente el tiempo para conseguir una estas', 'Insignia del tiempo');
        });

        $('#insEquipo').click(() => {
            toastr.Info('Trabaja en armonia con tu equipo para conseguir una estas', 'Insignia del trabajo en equipo');
        });
        
    });

    $('#btnPoderes').click(() => {
                
        $('#menu').css('height', '0');

        let poderes = [{nombre:'Musica',imagen:'../../Images/Poderes/Musica.png',calidad:'2',tiempo:'',equipo:'1',puntos:'1500'},
                       {nombre:'Descanso',imagen:'../../Images/Poderes/Descanso.png',calidad:'2',tiempo:'1',equipo:'1',puntos:'1500'},
                       {nombre:'Penitencia',imagen:'../../Images/Poderes/Penitencia.png',calidad:'2',tiempo:'5',equipo:'1',puntos:'3000'}];
        
        let html = ``;

        for (let i = 0; i < poderes.length; i++) {
            
            html += `<div class="poder" >
                        <label class="titulo">${poderes[i].nombre}</label>
                        <div id="poder${poderes[i].nombre}">
                            <img src="${poderes[i].imagen}" alt="Poder de ${poderes[i].nombre.toLowerCase()}">
                            <div class="detalles">
                                <label>Requisitos</label>
                                <p>
                                    Para desbloquear necesitas: <br>
                                    Insignias de calidad: <b>${poderes[i].calidad}</b> <br>
                                    Insignias de tiempo: <b>${poderes[i].tiempo}</b> <br>
                                    Insignias de equipo: <b>${poderes[i].equipo}</b> <br>
                                    Puntos: <b>${poderes[i].puntos}</b>
                                </p> 
                            </div>
                        </div>
                    </div>`;
            
        }

        $('#poderes').html(html);

        for (let i = 0; i < poderes.length; i++) {

            $(`#poder${poderes[i].nombre} .detalles`).click((e) => {

                if ($(`#poder${poderes[i].nombre} .detalles`).hasClass('abierto')) {

                    $(`#poder${poderes[i].nombre} .detalles`).css({'height':'calc(1.2rem + 3vh)','margin':'-1vh auto 0'});
                    $(`#poder${poderes[i].nombre} .detalles`).removeClass('abierto');

                } else {

                    $(`#poder${poderes[i].nombre} .detalles`).css({'height':'calc(7vh + 6.2rem)','margin-top':'calc(-4vh - 5rem)'});
                    $(`#poder${poderes[i].nombre} .detalles`).addClass('abierto');

                }

            });

        }

        $('.telon').show();
        $('.poderes').show();
        $('.pageContent > *').hide();
        
        $('.poderes #btnAtras').click(() => {
            $('.telon').hide();
            $('.poderes').hide();
            $('.pageContent > *').show();
        });

    });

    $('#btnTienda').click(() => {
                
        $('#menu').css('height', '0');

        let productos = [{nombre:'Bombon',imagen:'../../Images/Tienda/Bombon.png',calidad:'2',tiempo:'',equipo:'1',puntos:'1500'},
                       {nombre:'Galletas',imagen:'../../Images/Tienda/Galletas.png',calidad:'2',tiempo:'1',equipo:'1',puntos:'1500'},
                       {nombre:'Chicle',imagen:'../../Images/Tienda/Chicle.png',calidad:'2',tiempo:'5',equipo:'1',puntos:'3000'}];
        
        let html = ``;

        for (let i = 0; i < productos.length; i++) {

            html += `<div class="producto" >
                        <label class="titulo">${productos[i].nombre}</label>
                        <div id="producto${productos[i].nombre}">
                            <img src="${productos[i].imagen}" alt="producto ${productos[i].nombre.toLowerCase()}">
                            <div class="detalles">
                                <label>Requisitos</label>
                                <p>
                                    Para reclamar necesitas: <br>
                                    Insignias de calidad: <b>${productos[i].calidad}</b> <br>
                                    Insignias de equipo: <b>${productos[i].equipo}</b> <br>
                                    Insignias de tiempo: <b>${productos[i].tiempo}</b> <br>
                                    Puntos: <b>${productos[i].puntos}</b>
                                </p> 
                            </div>
                        </div>
                    </div>`;
            
        }

        $('#tienda').html(html);

        for (let i = 0; i < productos.length; i++) {

            $(`#producto${productos[i].nombre} .detalles`).click((e) => {

                if ($(`#producto${productos[i].nombre} .detalles`).hasClass('abierto')) {

                    $(`#producto${productos[i].nombre} .detalles`).css({'height':'calc(1.2rem + 3vh)','margin':'-1vh auto 0'});
                    $(`#producto${productos[i].nombre} .detalles`).removeClass('abierto');

                } else {

                    $(`#producto${productos[i].nombre} .detalles`).css({'height':'calc(7vh + 6.2rem)','margin-top':'calc(-4vh - 5rem)'});
                    $(`#producto${productos[i].nombre} .detalles`).addClass('abierto');

                }

            });

        }

        $('.telon').show();
        $('.tienda').show();
        $('.pageContent > *').hide();
        
        $('.tienda #btnAtras').click(() => {
            $('.telon').hide();
            $('.tienda').hide();
            $('.pageContent > *').show();
        });
        
    });

    $('#btnEquipo').click(() => {
        history.pushState(null, "", "../portal/equipo/");        
        goLocation.ChangeView('./');
    });
    
    $('#btnLista').click(() => {
        history.pushState(null, "", "../portal/lista/");        
        goLocation.ChangeView('./');
    });

    $('#btnMisiones').click(() => {
        history.pushState(null, "", "../portal/misiones/");        
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

})
