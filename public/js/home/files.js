$(function(){
    populateTable();
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


$('#form-upload').submit(function(){
    var cont = $("#input-file")[0].files.length;
    if(cont < 1){
        $('#input-file').notify('Nenhum arquivo informado');
        return false;
    }
});

$('#criar-pasta').submit(function(){
    criarPasta();
    clearTable();
    populateTable();
    return false;
});

function criarPasta(){
    var nomePasta = $('#nomePasta').val();
    if(nomePasta.length > 0){
        $.post('/pasta/criar', {nomePasta: nomePasta}, 
            function(){
            //$(location).attr("href", './home');
        });
    }
    $('.bd-example-modal-sm').modal('hide');
};


function removeFile(data){
    $(data).remove();
    return false;
};

function clearTable(){
    $('#tr-item').remove();
};

function populateTable(){
    let tableContent = '';
    $.get('/show', function (data) {
        if(!data){
            $('#div-arq').hide();
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
                    icon = 'folder';
                } else {
                    tamanho = filesize(data[item].size,{round:0});
                    icon = 'file';
                }
            
            //tableContent += '<tr id="tr-id-'+i+'" class="tr-class-'+i+'" data-title="bootstrap table">';
            tableContent += '<tr id="tr-item">';
            tableContent += '<td><i class="fa fa-'+icon+'" aria-hidden="true"></i></td>'
            tableContent += '<td><a href="'+/download/+nome+'">'+nome+'</a></td>';
            tableContent += '<td>'+tipo+'</td>';
            tableContent += '<td>'+dataFormatada+'</td>';
            tableContent += '<td>'+tamanho+'</td>';
            tableContent += '<td>'+
            '<a href="/file/remove/'+data[item]._id+'" class="btn btn-outline-danger btn-xs faa-parent animated-hover" onClick="excluirItem()" data-toggle="tooltip" data-placement="auto" title="Excluir"><i class="fa fa-trash-o fa-fw faa-wrench faa-slow" /></a>'+
            '<a href="#" class="btn btn-outline-primary btn-xs faa-parent animated-hover" data-toggle="modal" data-target=".share-item" data-toggle="tooltip" data-placement="auto" title="Compartilhar"><i class="fa fa-share fa-fw faa-wrench faa-slow" /></a>'
            +'</td>';
            tableContent += '</tr>';
        } 
            $('#download table tbody').html(tableContent);
        }
    });
};