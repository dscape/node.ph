//swap stylesheet based on size
// thank you css tricks for the base code instructions http://css-tricks.com/resolution-specific-stylesheets/

function adjustStyle(width) {
    width = parseInt(width);
    if (width < 701) {
        $("#style-swap").attr("href", "css/narrow.css");
		$("#display-type").html("Narrow Display");
    } else if ((width >= 701) && (width < 1025)) {
        $("#style-swap").attr("href", "css/medium.css");
		$("#display-type").html("Medium Display");
	 } else if ((width >= 1025) && (width < 1921)) {
        $("#style-swap").attr("href", "css/base.css");
		$("#display-type").html("Base Display");
    } else {
       $("#style-swap").attr("href", "css/wide.css");
	   $("#display-type").html("Wide Display");
    }

}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});