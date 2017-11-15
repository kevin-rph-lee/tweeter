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
  const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  const secondDate = new Date(tweet.created_at);
    const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  const avatar = tweet.user.avatars.small;
  const dateCreated = tweet.created_at;
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
      Created ${diffDays} days ago
      <span class = 'tweetfootericons'>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </span>
    </footer>`);
  return $tweet;
}


$ ( function() {
  var $form = $('#submit');
  $form.on('submit', function (event) {
    event.preventDefault();
    console.log($(this).serialize().length-5);
      $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function () {
        console.log('success');

      }
    });
  });
} );

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

loadTweets();

});