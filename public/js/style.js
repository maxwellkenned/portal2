function menuMobile(x) {
    x.classList.toggle("change");
}
function sizeOfThings(){
  var windowWidth = window.innerWidth-70;
  var windowHeight = window.innerHeight;
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var headerHeight = $('.navbar').outerHeight();
  var footerHeight = $('#rodape').outerHeight()*1.5;
  var uploadHeight = $('#upload-div').outerHeight();
  var content = windowHeight - footerHeight - headerHeight;
  
  var chatHeight = $('.chat').outerHeight(),
      menuChat = $('#menu-chat').outerHeight(),
      formChat = $('#form-chat').outerHeight();
  var chatContent = chatHeight - menuChat - formChat;

  //$('body').css('max-height', windowHeight);
  //$('.container-fluid').css('min-height', content);
  $('.chat').css('min-height', content);
  $('.chat').css('height', content);
  $('.chat-content').css('height', chatHeight);
  $('.chat-content').css('max-height', chatHeight);
  console.log('chatHeight: '+chatHeight);
  console.log('menuChat: '+menuChat);
  console.log('formChat: '+formChat);
  console.log('chatContent: '+chatContent);
};

$(document).ready(function(){
    sizeOfThings();
});