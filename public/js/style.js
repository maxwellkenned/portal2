function menuMobile(x) {
    x.classList.toggle("change");
}
function sizeOfThings(){
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  
  $('.container').css('width', windowWidth);
  $('body').css('height', windowHeight);

};
sizeOfThings();

window.addEventListener('resize', function(){
    sizeOfThings();
});