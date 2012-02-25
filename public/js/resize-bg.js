//thanks for the resize script  http://stackoverflow.com/questions/8170609/resize-image-to-browser-proportionally-checking-width-and-height

function setSizes() {
	var margin_top = 0;
	var margin_right = 0;
	var margin_bottom = 0;
	var margin_left = 0;
	
	// get image width and height
	var img_w = $('.bg-image').width();
	var img_h = $('.bg-image').height();
	// calculate viewport width and height
	var vp_w = $(window).width() - margin_right - margin_left;
	var vp_h = $(window).height() - margin_top - margin_bottom;
	//
	if (vp_w <= img_w || vp_w > img_w) {
		// new width
		var img_w_new=vp_w;
		// calculate new height
		var img_h_new=Math.round((img_h*img_w_new) / img_w);
	}
	//
	if (vp_h <= img_h || vp_h > img_h) {
		// new height
		var img_h_new=vp_h;
		// calculate new width
		var img_w_new=Math.round((img_w*img_h_new) / img_h);
	}
	// change image width and height to new width and new height
	$('.bg-image').width(img_w_new);
	$('.bg-image').height(img_h_new);
}