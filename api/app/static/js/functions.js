/**
 * Created by DR on 08/12/2020.
 */
function message_error(obj) {
    var html = '<ul>';

    $.each(obj, function (key, value) {
        html += '<li>' + key + ': ' + value + '</li>';
    });
    html += '</ul>';
    Swal.fire({
        title: 'Error',
        html: html,
        icon: 'error'
    });
}

function message_confirm(url){
$.confirm({
    title: 'Confirmación',
    content: 'Estás seguro que desea eliminar este registro?',
    type: 'red',
    typeAnimated: true,

    buttons: {
        Si: function () {

           $.ajax({
                    url: url,
                    type: 'POST',
                    DataType: 'json',
                }).done(function (data) {

                    $.confirm({
                         title: 'Info',
                         content: 'Se ha eliminado el registro correctamente!',
                         type: 'green',
                         typeAnimated: true,
                            buttons: {
                                    OK: {
                                        text: 'OK',
                                        btnClass: 'btn-green',
                                             action: function(){
                                            location.reload();
                                            }
                                        }
                                    },
                        });

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + ': ' + errorThrown);
                }).always(function (data) {


                });
        },
         Cancelar: function () {



        },

    }
});

}

function confirmacion_eliminar(title, mensaje, callback){
$.confirm({
    title: title,
    content: mensaje,
    type: 'red',
    typeAnimated: true,

    buttons: {
        Si: function () {
            callback();


        },
         Cancelar: function () {

        },

    }
});

}