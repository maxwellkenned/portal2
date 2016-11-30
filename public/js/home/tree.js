$(document).ready( function() {
        $('.tree').fileTree({
            root: 'public/uploads/',
            script: '/showPastas',
            // expandSpeed: 1000,
            // collapseSpeed: 1000,
        }, function(file) {
            alert(file);
            $('.selected-file').text( $('a[rel="'+file+'"]').text() );
            console.log('File: '+ file);
        });
    });