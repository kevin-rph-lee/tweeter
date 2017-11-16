$( document ).ready(function() {
  let count = 140;
  $('.new-tweet textarea').on('keyup input', function(e) {
    count = (140 - $(this).val().length);
    $(this).next().next().next().text(count);
    if (count < 0) {
      $(this).next().next().next().css('color', 'red');
    } else {
      $(this).next().next().next().css('color', 'black');
    }
  });
});






