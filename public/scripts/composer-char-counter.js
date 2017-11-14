$( document ).ready(function() {
  let count = 140;
  console.log('js file is running..');
  $( ".new-tweet textarea" ).keydown(function(e) {
    console.log($(this).val().length);
    if(e.keyCode == 8 ){
      count ++;
      $(this).next().next().text(count);

    } else{
      count --;
      $(this).next().next().text(count);
    }
    if (count < 0) {
      $(this).next().next().css('color', 'red');
    }
});

});
