/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){

var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "<h1>hello</h1>",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "<h1>Johann von Goethe</h1>",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
  console.log(name);
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

renderTweets(tweetData);

});


