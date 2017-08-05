var showTweets = function() {
  var $body = $('body');
  $body.html('');
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    tweet.prettyCreatedAt = moment(tweet.created_at).fromNow();
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' - ' + tweet.prettyCreatedAt);
    $tweet.appendTo($body);
    index -= 1;
  }
}

$(document).ready(function(){

  showTweets();
  setInterval(showTweets, 1000);

});
