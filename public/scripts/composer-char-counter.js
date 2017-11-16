$( document ).ready(function() {
  let count = 140;
  $('.new-tweet textarea').on('keyup input', function(event) {
    $textArea = $(event.target);
    count = (140 - $textArea.val().length);
    $textArea.siblings('.counter').text(count);
    $textArea.siblings('.counter').css('color', count < 0 ? 'red' : 'black');
  });
});






