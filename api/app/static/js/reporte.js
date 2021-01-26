 $(function () {

var tblDiezmadores;
var tblConceptos;
 var reporte={
    items: {
        fecha: '',
        importeTotal: 0.00,
        importeDiezmadores: 0.00,
        importeConceptos: 0.00,
        diezmadores: [],
        conceptos: [],
    },
    calcular: function(){
        var totaldiezmo=0.00;
        var totalconcepto=0.00;
        var imptotal=0.00;
        $.each(this.items.diezmadores, function(pos,dict){
            totaldiezmo+=dict.importe;
        });

        $.each(this.items.conceptos, function(pos,dict){
            totalconcepto+=dict.importe;
        });

        this.items.importeDiezmadores=totaldiezmo;
        this.items.importeConceptos=totalconcepto;
        $('#totaldiezmo').val(this.items.importeDiezmadores.toFixed(2));
        $('#totalconceptos').val(this.items.importeConceptos.toFixed(2));

        imptotal=this.items.importeDiezmadores+this.items.importeConceptos;
        $('#totalrep').val(imptotal.toFixed(2));
    },
    add_miembros: function(item){
        this.items.diezmadores.push(item);

    },
    listar_miembros: function(){
        this.calcular();
       tblDiezmadores= $('#mydata1').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            searchable: false,
            data: this.items.diezmadores,
            columns: [
            {"data" : "Options" },
            {"data" : "text" },
            {"data" : "importe" },
            ],
            columnDefs: [
            {
                 targets: [0],
                 class: 'text-center',
                 render: function(data, type, row){
                       return '<a rel="remove" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';
                 }
            },
            {
                 targets: [2],
                 class: 'text-center',
                 render: function(data, type, row){
                       return '<input type="number" name="imp" class="form-control form-control-sm" autocomplete="off" min="0" value="'+data+'">';
                 }
            },


            ],
            iniComplete: function(settings, json){

            }

       });








    },
        add_conceptos: function(item){
        this.items.conceptos.push(item);

    },
    listar_conceptos: function(){
        this.calcular();
       tblConceptos= $('#mydata2').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            searchable: false,
            data: this.items.conceptos,
            columns: [
            {"data" : "Options" },
            {"data" : "text" },
            {"data" : "importe" },
            ],
            columnDefs: [
            {
                 targets: [0],
                 class: 'text-center',
                 render: function(data, type, row){
                       return '<a rel="remove" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';
                 }
            },
            {
                 targets: [2],
                 class: 'text-center',
                 render: function(data, type, row){
                       return '<input type="number" name="imp" class="form-control form-control-sm" autocomplete="off" min="0" value="'+data+'">';
                 }
            },


            ],
            iniComplete: function(settings, json){

            }

       });








    },
 };

       $('.select2').select2({
          theme: 'bootstrap4',
          language: 'es'

            });

       $('#id_miembros').select2({
        theme: 'bootstrap4',
          language: 'es'
       }).on('select2:select', function(e){
            let datos=e.params.data;
            datos.importe=0.00;
            reporte.add_miembros(datos);
            reporte.listar_miembros();
            $(this).val('').trigger('change.select2');
         });

       $('#id_conceptos').select2({
        theme: 'bootstrap4',
          language: 'es'
       }).on('select2:select', function(e){
       let datos=e.params.data;
       datos.importe=0.00;

       reporte.add_conceptos(datos);
       reporte.listar_conceptos();
       $(this).val('').trigger('change.select2');

       });


       //event cantidad de la tabla
       $('#mydata1 tbody')
       .on('click','a[rel="remove"]',function(){
       var tr=tblDiezmadores.cell($(this).closest('td,li')).index();
       confirmacion_eliminar('Confirmacion','Estás seguro que desea eliminar este registro?', function(){
       reporte.items.diezmadores.splice(tr.row, 1);
       reporte.listar_miembros();

       });
       })
       .on('change','input[name="imp"]', function(){
       var imp=parseFloat($(this).val());
       var tr=tblDiezmadores.cell($(this).closest('td,li')).index();
        reporte.items.diezmadores[tr.row].importe=imp;
        reporte.calcular();

       });


        $('#mydata2 tbody')
        .on('click','a[rel="remove"]',function(){
       var tr=tblConceptos.cell($(this).closest('td,li')).index();
       confirmacion_eliminar('Confirmacion','Estás seguro que desea eliminar este registro?', function(){
       reporte.items.conceptos.splice(tr.row, 1);
       reporte.listar_conceptos();

       });
       })
        .on('change','input[name="imp"]', function(){
       var imp=parseFloat($(this).val());
       var tr=tblConceptos.cell($(this).closest('td,li')).index();
        reporte.items.conceptos[tr.row].importe=imp;
        reporte.calcular();


       });

       //on submit
        $('.btnReporte').on('click', function(e) {
            e.preventDefault();
            reporte.items.fecha=$('input[name="fecharep"]').val();

            var parameters = new FormData();

            parameters.append('action',$('input[name="action"]').val());
            parameters.append('data', JSON.stringify(reporte.items));



           $.ajax({
                url: window.location.pathname,
                type: 'POST',
                data: parameters,
                DataType: 'json',
                processData: false,
                contentType: false,
            }).done(function (data) {
                if (!data.hasOwnProperty('error')) {
                    location.href = '/erp/movimientos/list/';
                    return false;
                }
                message_error(data.error);

            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + ': ' + errorThrown);
            }).always(function (data) {
                console.log('complete');
            });

        });


    });
