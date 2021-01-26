$(function(){

$('#mydata').DataTable({
    responsive: true,
    autoWidth: false,
    destroy: true,
    deferRender: true,
    ajax: {
        url: window.location.pathname,
        type: 'POST',
        data: {
            'action': 'searchdata'
        },


    },
    columns: [

         {'data': 'foto'},
         {'data': 'exp'},
         {'data': 'ci'},
         {'data': 'nombres'},
         {'data': 'apellido1'},
         {'data': 'apellido2'},
         {'data': 'direccion'},
        ],
         initComplete: function(settings, json){
        alert('completa la carga');
    }

} );


});