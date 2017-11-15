$( document ).ready(function() {
  let count = 140;
  console.log('js file is running..');
  $( ".new-tweet textarea" ).keyup(function(e) {
    count = (140 - $(this).val().length);
    $(this).next().next().text(count);
    if (count < 0) {
      $(this).next().next().css('color', 'red');
    } else {
      $(this).next().next().css('color', 'black');
    }

});

});
