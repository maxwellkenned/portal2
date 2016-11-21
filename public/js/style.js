function menuMobile(x) {
    x.classList.toggle("change");
}
function sizeOfThings(){
  var windowWidth = window.innerWidth-70;
  var windowHeight = window.innerHeight;
  
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var headerHeight = $('.navbar').outerHeight() *2;
  var footerHeight = $('#rodape').outerHeight() *2;
  var uploadHeight = $('#upload-div').outerHeight();
  
  $(';pace-done').css('max-width', windowWidth);
  //$('body').css('max-height', windowHeight);
  //$('#responsive-table').css('height', windowHeight-footerHeight-headerHeight-uploadHeight);

};
sizeOfThings();

window.addEventListener('resize', function(){
    sizeOfThings();
});