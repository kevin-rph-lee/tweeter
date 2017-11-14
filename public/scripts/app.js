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
      "name": "Descartes",
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
      "name": "Johann von Goethe",
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
  const name = tweet.user.name;
  const handle = tweet.user.handle;
  const avatar = tweet.user.avatars.small;
  const body = tweet.content.text;
  const dateCreated = tweet.created_at;
  var $tweet = $('<article>');
  $($tweet).append(
    `<header class= 'tweetheader'>
      <img class='userimage' src="${avatar}">
      <div class= 'user'>${name}<span class=handle>${handle}</span></div>
      <div class= 'clearfix'></div>
    </header>
    <div class = 'tweetbody'>
    ${body}
    </div>
    <footer class = 'tweetfooter'>
      Created at: ${dateCreated} <span class = 'tweetfootericons'>Icons!</span>
    </footer>`);
  return $tweet;
}

renderTweets(tweetData);

});


