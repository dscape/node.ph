//swap stylesheet based on size
// thank you css tricks for the base code instructions http://css-tricks.com/resolution-specific-stylesheets/
var alreadyAppended = true;

function adjustStyle(width) {
    width = parseInt(width);
	if (width < 961) {
		if(alreadyAppended){
			$('#tweets').remove();
			$('ul').addClass('toggle');
			$('h1#title').addClass('toggleView').wrap('<a>');
			$(".toggle").hide();			
		alreadyAppended = false;
		}
    }
	else {
		if(!alreadyAppended){
			$('.sidebar').append('<ul id="tweets"></ul>');
			$("ul").show();
			$('ul').removeClass('toggle');
			$('h1#title').removeClass('toggleView');
			$('h1#title').unwrap();
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
	$('h1#title').addClass('toggleView').wrap('<a>');
	$('a h1.toggleView').click(function() {
    		$(this).parent().next('.toggle').slideToggle(250);
  	      });	
 	$('h1#title').removeClass('toggleView');
	$('h1#title').unwrap();
	
});