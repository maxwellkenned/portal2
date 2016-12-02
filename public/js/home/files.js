$(function(){
    var pathname = window.location.pathname;
    populateTable(pathname);
    
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
    var dest = pathname.replace('/p','');
    $("#fileuploader").uploadFile({
    url:"/upload"+dest,
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

$('#modal-criarPasta #criar-pasta').submit(function(){
    var nomePasta = $('#nomePasta').val();
    if(!nomePasta){
        $('#nomePasta').notify('Informe o nome da pasta', 'error');
        return false;
    }else{
    criarPasta();
    }
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
    var url = window.location.pathname;
    var pathname;
    if(url == '/home' || url == 'home' ){
        pathname = '/';
    }else{
        pathname = url.replace('/p','');
    }
    
    $.post('/pasta/criar', {nomePasta: nomePasta, pathname: pathname})
    .done(function(data){
        location.reload();
        $('#modal-criarPasta').modal('hide');
        $.notify('Pasta criada com sucesso', 'success');
    });
    
};

function populateTable(pathname){
    let tableContent = '';
    var pasta = '/show/p/show';
    if(pathname != '/home'){
        pasta = '/show'+pathname;
    }

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
            let curl;
                if(data[item].ext == '/'){
                    tamanho = '';
                    nome += '/'; 
                    tipo = 'directory';
                    icon = 'folder';
                    curl = '/p/'+nome;
                } else {
                    tamanho = filesize(data[item].size,{round:0});
                    icon = 'file';
                    curl = '/download/'+nome;
                }
            
            //tableContent += '<tr id="tr-id-'+i+'" class="tr-class-'+i+'" data-title="bootstrap table">';
            tableContent += '<tr id="tr-item">';
            tableContent += '<td class="ext_'+tipo+'"></td>'
            if(tipo == 'directory'){
                tableContent += '<td><a onClick="showPasta(this)" class="btn btn-link" data-url="'+curl+'" href="'+curl+'">'+nome+'</a></td>';
            }else{
                tableContent += '<td><a href="'+curl+'">'+nome+'</a></td>';
            }
            // tableContent += '<td>'+tipo+'</td>';
            tableContent += '<td>'+dataFormatada+'</td>';
            tableContent += '<td>'+tamanho+'</td>';
            tableContent += '<td><button type="button" data-url="/file/remove/'+data[item]._id+'" class="btn btn-danger btn-xs faa-parent animated-hover" onClick="excluirItem(this)" data-toggle="tooltip" data-placement="auto" title="Excluir"><i class="fa fa-trash-o fa-fw fa-2x faa-wrench faa-slow" /></button></td>';
            tableContent += '</tr>';
        } 
            $('#download table tbody').html(tableContent);
        }
    });
};