function menuMobile(x) {
    x.classList.toggle("change");
}
function sizeOfThings(){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var headerHeight = $('.navbar').outerHeight() *2;
  var footerHeight = $('#rodape').outerHeight() *2;
  var uploadHeight = $('#upload-div').outerHeight();
  
  $('.container').css('width', windowWidth);
  $('body').css('height', windowHeight);
  $('body').css('max-height', windowHeight);
  $('#responsive-table').css('height', windowHeight-footerHeight-headerHeight-uploadHeight);

};
sizeOfThings();

window.addEventListener('resize', function(){
    sizeOfThings();
});