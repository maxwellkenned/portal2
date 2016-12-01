$(function(){
    populateTable('/show');
    
    var input = document.getElementById("input-file");
    $('#input-file').change(function(){
       var file = input.files;
       var cont = input.files.lenght;
       // $('#form-upload').append($('<input type="text" , name="upFile", class="filestyle" value="'+fileName+'">'));
      $(file).each(function(i){
        $('#form-upload').append($('<input id="file_'+i+'" type="text" , name="upFile", class="col-md-10 col-sm-10 col-xs-10" value="'+file[i].name+'" disabled>'));
        $('#form-upload').append($('<span id="file_'+i+'" class="col-md-2 col-sm-2 col-xs-2">'+filesize(file[i].size,{round: 0})+'</span>'));
      });
    });

    $("#fileuploader").uploadFile({
    url:"/upload",
    fileName:"file",
    autoSubmit: true,
    showDone: false,
    showDownload: false,
    showProgress: true,
    showPreview: true,
    previewWidth: "100%",
    dragdropWidth: "100%",
    afterUploadAll:function(obj)
        {
           location.reload();
           setInterval($.notify('Upload realizado com sucesso.', 'success'), 3000);
        }
    });
    
});

$('#modal-criarPasta').on('shown.bs.modal', function () {
  $('#nomePasta').focus();
});

$('#form-upload').submit(function(){
    var cont = $("#input-file")[0].files.length;
    if(cont < 1){
        $('#input-file').notify('Nenhum arquivo informado');
        return false;
    }
});

$('#criar-pasta').submit(function(){
    var nomePasta = $('#nomePasta').val();
    if(!nomePasta){
        $('#nomePasta').notify('Informe o nome da pasta', 'error');
        return false;
    }
    criarPasta();
    return false;
});
function excluirItem(data){
    var url = $(data).attr('data-url');
    $.confirm({
    title: 'ATENÇÃO!',
    content: 'Tem certeza que deseja excluir esse arquivo?',
    buttons: {
        Excluir: {
            btnClass: 'btn-red',
            action: function () {
            $.get(url, function(){
                location.reload();
            });
        }
        },
        cancelar: function () {
            
        }
    }
    });
};
function criarPasta(){
    var nomePasta = $('#nomePasta').val();
    $.post('/pasta/criar', {nomePasta: nomePasta});
    $('#modal-criarPasta').modal('hide');
    populateTable('/show');
    $.notify('Pasta criada com sucesso', 'success');
};


function showPasta(nome){
    let pasta = "/p/"+nome;
    populateTable(pasta);
};

function populateTable(pasta){
    let tableContent = '';
    $.get(pasta, function (data) {
        if(!data){
            $('#table').hide();
        }else {
        for(var item in data){
            let nome = data[item].filename;
            let dataFormatada = jQuery.format.date(data[item].data_upload, 'dd/MM/yyyy HH:mm:ss');
            let tipo = data[item].ext;
            let icon;
            let tamanho;
                if(data[item].ext == '/'){
                    tamanho = '';
                    nome += '/'; 
                    tipo = 'directory';
                    icon = 'folder';
                } else {
                    tamanho = filesize(data[item].size,{round:0});
                    icon = 'file';
                }
            
            //tableContent += '<tr id="tr-id-'+i+'" class="tr-class-'+i+'" data-title="bootstrap table">';
            tableContent += '<tr id="tr-item">';
            tableContent += '<td class="ext_'+tipo+'"></td>'
            tableContent += '<td><a href="'+/download/+nome+'">'+nome+'</a></td>';
            tableContent += '<td>'+tipo+'</td>';
            tableContent += '<td>'+dataFormatada+'</td>';
            tableContent += '<td>'+tamanho+'</td>';
            tableContent += '<td>'+
            '<button type="button" data-url="/file/remove/'+data[item]._id+'" class="btn btn-danger btn-xs faa-parent animated-hover" onClick="excluirItem(this)" data-toggle="tooltip" data-placement="auto" title="Excluir"><i class="fa fa-trash-o fa-fw fa-2x faa-wrench faa-slow" /></button>'+
            '<a href="#" class="btn btn-primary btn-xs faa-parent animated-hover" data-toggle="modal" data-target=".share-item" data-toggle="tooltip" data-placement="auto" title="Compartilhar"><i class="fa fa-share fa-fw fa-2x faa-wrench faa-slow" /></a>'
            +'</td>';
            tableContent += '</tr>';
        } 
            $('#download table tbody').html(tableContent);
        }
    });
};