var socket = io.connect('/');
socket.on('tweet', function(tweet) {
	if ($('#tweets li[id="' + tweet.id + '"]').length == 0) {
		var markup = '\
      		<li id="' + tweet.id + '">\
 	      		<p class="user">' + injectLinks("@" + tweet.user.screen_name) + '</p>\
 	      		<p class="text">' + injectLinks(tweet.text) + '</p>\
   	  		</li>';

		$('#tweets').queue(function() {
			var container = $(this);
			var children = container.children('li');
			
			if (children.length >= 3) {
	    		children.last().remove();
	  		} 
	  		
	  		container.prepend(markup);	  		
	  		container.dequeue();
		});  		
   	}
});

function injectLinks(text) {
	// links
	var result = text.replace(/([a-zA-Z]*:\/\/[a-zA-Z0-9\.\-\/]*)/g, '<a href="$1" target="_blank">$1</a>');
	
	// users
	result = result.replace(/@([a-zA-Z0-9_]*)/g, '<a href="http://www.twitter.com/$1" target="_blank">@$1</a>');
	
	// hashtags
	result = result.replace(/#([a-zA-Z0-9]*)/g, '<a href="https://twitter.com/#!/search/%23$1" target="_blank">#$1</a>');
	
	return result;
};
