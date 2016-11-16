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


function removeFile(data){
    $(data).remove();
    return false;
};

function populateTable(){
    var tableContent = '';
    $.get('/show', function (data) {
        if(!data){
            $('#div-arq').hide();
        }else {
        for(var item in data){
            let nome = data[item].filename;
            let dataFormatada = jQuery.format.date(data[item].data_upload, 'dd/MM/yyyy HH:mm:ss');
            let tamanho = filesize(data[item].size,{round:0});
            //tableContent += '<tr id="tr-id-'+i+'" class="tr-class-'+i+'" data-title="bootstrap table">';
            tableContent += '<tr style="">';
            tableContent += '<td><i class="fa fa-file" aria-hidden="true"></i></td>'
            tableContent += '<td><a href="'+/download/+nome+'">'+nome+'</a></td>';
            tableContent += '<td>'+dataFormatada+'</td>';
            tableContent += '<td>'+tamanho+'</td>';
            tableContent += '</tr>';
        } 
            $('#download table tbody').html(tableContent);
        }
    });
};