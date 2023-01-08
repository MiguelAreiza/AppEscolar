'use strict';

fetch('../../../data.txt').then(async (response) => {

    let users = (await response.json()).users;
    
    if (sessionStorage.AppUser) {

        users = users.filter(user => user.id == JSON.parse(sessionStorage.AppUser)[0].id);

        if (users.length === 1) {
            
            $('#nameUser').html(users[0].name);            
            toastr.Success(`Compartenos todas tus metas`);

        } else {

            history.pushState(null, "", "../../login/");
            goLocation.ChangeView('../../views/login/');

        }                   

    } else {

        history.pushState(null, "", "../../login/");
        goLocation.ChangeView('../login/');

    }
    
}).catch(() => {
    toastr.Error('Error en la transaccion');
    location.reload();
});

$(document).ready(function() {

    $('#btnAtras').click(()=>{
        history.pushState(null, "", "../");
        goLocation.ChangeView('./');
    });

    let goalList = [];

    if (localStorage.goalList) {

        goalList = JSON.parse(localStorage.goalList);
        
    }

    UpdateGoalList();


    $('#btnCreate').click(()=>{

        let goal = $('#goal').val();
        let color = $('#color').val();

        if (!goal || !color) {

            toastr.Warning('Diligencia los campos requeridos');
            
        } else{
            
            $('#goal').val('');
            $('#color').val('#cccccc');

            goalList.push({'id':newId(),'goal':goal,'color':color,'complete':'false'});

            UpdateGoalList();

            toastr.Success('Meta creada correctamente');

        }
    
    });

  
    function UpdateGoalList() {

        let html = ``;

        for (let i = 0; i < goalList.length; i++) {

            html += `<div class="goal" id="${goalList[i].id}" style="background:${goalList[i].color};">
                        <label ${goalList[i].complete == 'true'? 'class="complete"':''}>${goalList[i].goal}</label>                            
                        <button></button>
                    </div>`;

        }

        $('#goalList').html(html);

        for (let i = 0; i < goalList.length; i++) {

            $(`#${goalList[i].id}`).dblclick(()=>{

                if (goalList[i].complete == 'true') {

                    goalList[i].complete = 'false';
                    toastr.Info('Meta pendiente');

                } else {

                    goalList[i].complete = 'true';
                    toastr.Info('Meta completada');  

                }

                UpdateGoalList();

            });

            $(`#${goalList[i].id} > button`).click(()=>{

                goalList = goalList.filter(goal => goal.id != goalList[i].id);
                
                UpdateGoalList();

            });

        }

        localStorage.setItem('goalList', JSON.stringify(goalList))

    }
    
    $('.facebook').click(()=>{
        redirect.Facebook();
    });

    $('.instagram').click(()=>{
        redirect.Instagram();
    });

    $('.whatsApp').click(()=>{
        redirect.WhatsApp();
    });

});