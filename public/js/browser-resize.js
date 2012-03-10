//swap stylesheet based on resize
// Author: Chatham Financial, Ted Strohecker, Brett Whitham

var alreadyAppended = true;

function adjustStyle(width) {
    width = parseInt(width);
	if (width < 961) {
		if(alreadyAppended){
			$('#tweets').remove();
			$('ul').addClass('toggle');
			$('h1#title').addClass('toggleView').wrap('<a class="mobileSwitch">');
			$('h1#title').addClass('closed');
			$(".toggle").hide();
			$(".tweet-head").html('<img src="/images/mobile-twitter-bird.png" class="twitter-bird"/>');
			$("#sponsors").insertAfter("section.speakers");
			$('.logo').html("Node.Philly 2012");		
		alreadyAppended = false;
		}
    }
	else {
		if(!alreadyAppended){
			$("#sponsors").prependTo(".sidebar");			
			$('.sidebar').append('<ul id="tweets"></ul>');
			$("ul").show();
			$('ul').removeClass('toggle');
			$('h1#title').removeClass('toggleView');
			$('h1#title').unwrap();
			$(".tweet-head").html("Follow @NodePhilly");
			$('.logo').html("&nbsp;");		
		alreadyAppended = true;
		}		
	}
}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});

$(document).ready(function(){
	$('h1#title').addClass('toggleView').wrap('<a class="mobileSwitch">');
	$('a h1.toggleView').click(function() {
			setupClickEvent($(this));
    		$(this).parent().next('.toggle').slideToggle(500)
  	      });	
 	$('h1#title').removeClass('toggleView');
	$('h1#title').unwrap();
	
});
function setupClickEvent(element){
	var openOrClosed = element.attr('class');
    if (openOrClosed == 'closed') {
		element.removeClass('closed');
        element.addClass('open');
		var positionY = element.position().top;
		$('body').animate( { scrollTop: positionY}, 500);		

    }
    else {
		element.removeClass('open');
        element.addClass('closed');
    }
}
