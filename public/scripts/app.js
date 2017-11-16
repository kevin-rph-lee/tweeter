$(function(){

  /**
   * Creates HTML element for a SINGLE tweet
   * @param  {obj} tweet a single tweet
   */
  function createTweetElement(tweet) {
    $('.hidden').text(tweet.user.name);
    const date = moment(tweet.created_at).fromNow();
    const avatar = tweet.user.avatars.small;
    var $tweet = $('<article>');
    $($tweet).append(
      `<header class= 'tweetheader'>
        <img class='userimage' src='${avatar}'>
        <div class= 'user'>${escape(tweet.user.name)}<span class= 'handle'>${escape(tweet.user.handle)})</span></div>
        <div class= 'clearfix'></div>
      </header>
      <div class = 'tweetbody'>
        ${escape(tweet.content.text)}
      </div>
      <footer class = 'tweetfooter'>
        Created ${date}
        <span class = 'tweetfootericons'>
          <span class = 'likeCounter'>0</span>
          <i class='fa fa-heart' aria-hidden='true'></i>
          <i class='fa fa-flag' aria-hidden='true'></i>
          <i class='fa fa-retweet' aria-hidden='true'></i>
        </span>
      </footer>`);
    return $tweet;
  }

  /**
   * Controls submitting a new tweet, including text countercreate
   */
  $(function() {
    var $form = $('#submit');
    $form.on('submit', function (event) {
      const $error = $('.error');
      event.preventDefault();
      let count = Number($('.counter').text());
      if (count === 140){
        $error.text('Empty tweeet allowed');
      } else if (Number($('.counter').text()) < 0){
        $error.text('Tweet too long');
      } else {
        $('.error').empty();
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize()
        }).done(() => {
          //If the post req is successful, it does another get request and appeneds the new tweeet to the tweets container
          $.ajax({
            url: '/tweets',
            method: 'GET',
            success: function (tweets) {
              const $newTweet = createTweetElement(tweets[tweets.length - 1]);
              $('#tweets-container').prepend($newTweet);
            }
          });
          //Clearing out the textbox area & counter for the next tweet
          $('.counter').text('140');
          $('textarea').val('');
        });
      }
    });
  });

  /**
   * Iterates through an array of tweets and calls the createTweetElement function on each one
   * @param  {array} tweets an array of tweets
   */
  function renderTweets(tweets) {
    for (let i = tweets.length-1; i >= 0; i --){
      $(createTweetElement(tweets[i])).appendTo('#tweets-container');
    }
  }

  /**
   * Loading all tweets with a GET request, creating the diff HTML elements for them and displaying them
   */
  function loadTweets(){
    let tweets = {};
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).done((tweets) => {
      renderTweets(tweets);
    });
  }

  /**
   * Toggling if the new tweet tab is open or closed
   */
  $('.compose').on('click', function (){
    $('.new-tweet').slideToggle('slow');
  });

  //loading the initial tweets
  loadTweets();

});