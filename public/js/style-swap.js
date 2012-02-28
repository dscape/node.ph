//swap stylesheet based on size
// thank you css tricks for the base code instructions http://css-tricks.com/resolution-specific-stylesheets/

function adjustStyle(width) {
    width = parseInt(width);
    if (width < 701) {
        $("#style-swap").attr("href", "css/mobile.css");
    } else {
       $("#style-swap").attr("href", "css/master.css");
    }

}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});