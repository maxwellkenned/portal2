$(document).ready(function(){
    populateTable();
});

function populateTable(){
    var tableContent = '';

    $.getJSON('/show', function (data) {
        for(var item in data){
            tableContent += '<tr>';
            //tableContent += '<td>'+data[item]+'</td>';
            tableContent += '<td><i class="fa fa-file" aria-hidden="true"></i></td>'
            tableContent += '<td><a href='+'/download/'+data[item]+'>'+data[item]+'</a></td>';
        
        }

        $('#download table tbody').html(tableContent);

    });
}