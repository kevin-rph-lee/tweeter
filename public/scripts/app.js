/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){
  /**
   * Creates HTML element for a SINGLE tweet
   * @param  {obj} tweet a single tweet
   */
  function createTweetElement(tweet) {
    $('.hidden').text(tweet.user.name);
    const date = moment(tweet.created_at).fromNow();
    const avatar = tweet.user.avatars.small;
    const likes = tweet.likes;
    const $hidden = $('.hidden');
    const id = tweet._id;
    //Putting text from user into the hidden div to convert to pure text, then pulling it out again t
    //This is to protect against cross site scripting
    const name = $hidden.text(tweet.user.name).html();
    $hidden.text(tweet.content.text);
    const body = $hidden.text(tweet.content.text).html();
    $hidden.text(tweet.user.handle);
    const handle = $hidden.text(tweet.user.handle).html();
    var $tweet = $('<article>');
    $($tweet).append(
      `<header class= 'tweetheader'>
        <img class='userimage' src='${avatar}'>
        <div class= 'user'>${name}<span class= 'handle'>${handle}</span></div>
        <div class= 'clearfix'></div>
      </header>
      <div class = 'tweetbody'>
        ${body}
      </div>
      <footer class = 'tweetfooter'>
        Created ${date}
        <span class = 'tweetfootericons'>
          <span class = 'likeCounter'>${likes}</span>
          <i class='fa fa-heart likebutton' aria-hidden='true'></i>
          <i class='fa fa-flag' aria-hidden='true'></i>
          <i class='fa fa-retweet' aria-hidden='true'></i>
          <span class = 'id'>${id}</div>
        </span>
      </footer>`);
    return $tweet;
  }

  /**
   * Controls submitting a new tweet, including text countercreate
   */
  $('#submit').on('submit', function (event) {
    $submit = $(event.target)
    const $error = $('.error');
    event.preventDefault();
    let count = Number($('.counter').text());
    if (count === 140){
      $error.text('Empty tweets prohibited');
    } else if (Number($('.counter').text()) < 0){
      $error.text('Tweet above max length');
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
            const $newTweet = createTweetElement(tweets[0]);
            $('#tweets-container').prepend($newTweet);
          }
        });
        //Clearing out the textbox area & counter for the next tweet
        $('.counter').text('140');
        $('textarea').val('');
      });
    }
  });


  /**
   * Iterates through an array of tweets and calls the createTweetElement function on each one
   * @param  {array} tweets an array of tweets
   */
  function renderTweets(tweets) {
    for (let i = 0; i < tweets.length; i ++){
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
      //REMEMBER THIS: EXAMPLE OF ASYNC FUNCTINOALITY!!!!!!!!!!!!!!!!
      $('.likebutton').on('click', function (event){
        const id = $(event.target).siblings('.id').text()
        $.ajax({
          url: '/tweets/' + id,
          method: 'POST',
          data: {id: id}
        }).done(() => {

        });
      });
    });
  }

  /**
   * Toggling if the new tweet tab is open or closed
   */
  $('.compose').on('click', function (){
    $('.new-tweet').slideToggle('slow');
  });

  /**
   * Toggling if the new tweet tab is open or closed
   */



  loadTweets();

});