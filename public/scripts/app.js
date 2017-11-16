/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){



function renderTweets(tweets) {
  for(let i = 0; i < tweets.length; i ++){
    $( createTweetElement(tweets[i])).appendTo( "#tweets-container" );
  }
}

function createTweetElement(tweet) {
  $('.hidden').text(tweet.user.name);

  // Hours part from the timestamp
  const date = moment(tweet.created_at).fromNow();
  const avatar = tweet.user.avatars.small;
  const name = $('.hidden').text(tweet.user.name).html();
  $('.hidden').text(tweet.content.text);
  const body = $('.hidden').text(tweet.content.text).html();
  $('.hidden').text(tweet.user.handle);
  const handle = $('.hidden').text(tweet.user.handle).html();
  var $tweet = $('<article>');
  $($tweet).append(
    `<header class= 'tweetheader'>
      <img class='userimage' src="${avatar}">
      <div class= 'user'>${name}<span class= 'handle'>${handle}</span></div>
      <div class= 'clearfix'></div>
    </header>
    <div class = 'tweetbody'>
      ${body}
    </div>
    <footer class = 'tweetfooter'>
      Created ${date}
      <span class = 'tweetfootericons'>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </span>
    </footer>`);
  return $tweet;
}


$ (function() {
  var $form = $('#submit');
  $form.on('submit', function (event) {
    event.preventDefault();
    let count = Number($('.counter').text());
    if(count == 140){
      console.log('No text');
      $('.error').text('No text');
    } else if(Number($('.counter').text()) < 0){
      $('.error').text('Post too long');
    } else {
      $('.error').empty();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).done(() => {
        $('#tweets-container').empty();
        loadTweets();
        $('.counter').text('140');
        $('textarea').val('');
      })
    }
  });
});

function loadTweets(){
  let tweets = {};
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (tweets) {
      renderTweets(tweets);
    }
  });
}



$('.compose').on('click', function(){
    $( ".new-tweet" ).slideToggle( "slow", function() {
  });
});


loadTweets();

});