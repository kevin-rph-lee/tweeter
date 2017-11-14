$( document ).ready(function() {
  let count = 140;
  console.log('js file is running..');
  $( ".new-tweet textarea" ).keypress(function() {
  count--;
  console.log( "Handler for .keypress() called." );
  console.log($(this).val().length);
  console.log($(this).next().next().text(count));
  if (count < 0) {
    $(this).next().next().css('color', 'red');
  }
});


});