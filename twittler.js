var selected = false;
var selection = '';
var $body = $('body');
var $list = $('body').find('.tweetlist');
var visitor = "";
var message = "";

var showTweets = function() {
  $('.tweetlist').html('');
  streams.home.forEach(function(thing){
    displayTweet(thing);
  });
  $('.username').on('click', selectUser);
}

var displayTweet = function(tweet) {
  var $tweet = $('<div></div>');
  $list = $('body').find('.tweetlist');
  tweet.prettyCreatedAt = moment(tweet.created_at).fromNow();

  var tweetContent = "<span class = 'username'>"+"@" + tweet.user + "</span>"
                     +"<span class = 'tweettext'> " + tweet.message + "</span>"
                     +"<span class = 'timestamp'> - " + tweet.prettyCreatedAt + "</span>";
  $tweet.addClass(tweet.user);
  $tweet.html(tweetContent);
  //$tweet.text('@' + tweet.user + ': ' + tweet.message + ' - ' + tweet.prettyCreatedAt);
  //$tweet.prependTo($body.find('.tweetlist'));
  $tweet.prependTo($list);
  tweet.loaded = true;
}

var refreshTweets = function() {
  var newTweets = streams.home;
  $list.html('');
  if (selected) {
    newTweets = newTweets.filter(function(theTweet){
      return (("." + theTweet.user) === selection);
    })
  }
  newTweets.forEach(function(newTweet){
    displayTweet(newTweet);
  })
  $('.username').on('click', selectUser);
}

var selectUser = function() {
  var $siblings = $(this).parent().siblings();
  var $classy = "." + $(this).parent().attr('class');

  if (selected === false){
    $list.children().not($classy).hide();
    $list.find($classy).show();
    selected = true;
    selection = $classy;
  } else {
    selected = false;
    selection = '';
    $list.children().show();
  }
  refreshTweets();
}

var newTweet = function(){
  visitor = $('#user').val();
  if (streams.users[visitor] === undefined) { streams.users[visitor] = []; }
  message = $('#message').val();
  writeTweet(message);
}

$(document).ready(function(){
  showTweets();

  setInterval(refreshTweets, 2000);

});
