$( document ).ready(function() {
  $("article").hover(function(){
    $( "<span class='tweetfootericons'>Icons!</span>" ).appendTo( "article .tweetfooter" );
  /*console.log($("article .tweetfooter"));*/
    }, function(){
      $('article .tweetfootericons').remove();
  });
});
