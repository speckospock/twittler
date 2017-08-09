var selected = false;
var selection = '';
var $body = $('body');

var showTweets = function() {

  $body.html('');
  var index = streams.home.length - 1;
  while(index >= 0){
    displayTweet(streams.home[index]);
    index -= 1;
  }
  $('.username').on('click', selectUser);
}

var displayTweet = function(tweet) {
  if (tweet.loaded !== true){
    var $tweet = $('<div></div>');
    tweet.prettyCreatedAt = moment(tweet.created_at).fromNow();

    var tweetContent = "<span class = 'username'>"+"@" + tweet.user + "</span>"
                       +": " + tweet.message + " - " + tweet.prettyCreatedAt;
    $tweet.addClass(tweet.user);
    $tweet.html(tweetContent);
    //$tweet.text('@' + tweet.user + ': ' + tweet.message + ' - ' + tweet.prettyCreatedAt);
    $tweet.prependTo($body);
    tweet.loaded = true;
  }
}

var refreshTweets = function() {
  var newTweets = streams.home.filter(function(theTweet){
    return theTweet.loaded !== true;
  });
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

    $body.children().not($classy).hide();
    $body.find($classy).show();
    selected = true;
    selection = $classy;
  } else {
    selected = false;
    selection = '';
    $body.children().show();
  }
}

$(document).ready(function(){
  showTweets();

  setInterval(refreshTweets, 1000);

});
