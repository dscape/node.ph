/** 
 * @projectDescription Scalable Background Image
 * @author 	Matt Hobbs (http://nooshu.com/)
 * @version 0.1
 * 
 * Takes an IMG tag you want as a page / container background
 * and scales the image up / down depending on page size
 */
(function($){
	$.fn.backgroundScale = function(customOptions){
		//Merge default and user options
		var options = $.extend({}, $.fn.backgroundScale.defaultOptions, customOptions);
		return this.each(function(i){
			var $this = $(this);
			var $bgImage = $(options.imageSelector);
			
			//Set some basic CSS positioning rules
			$this.css({position: "absolute"});
			$bgImage.css({position: "absolute"});
			
			//Define out vars
			var containerWidth, containerHeight, containerRatio;
			var imageWidth, imageHeight, imageRatio;
			
			//Manipulation function
			var imageManipulation = function(){
				//Set the container details
				containerWidth = $this.width() + options.containerPadding;
				containerHeight = $this.height() + options.containerPadding;
				containerRatio = containerWidth / containerHeight;
				
				//Set the image details
				imageWidth = $bgImage.width();
				imageHeight = $bgImage.height();
				imageRatio = imageWidth / imageHeight;
				
				//Center the image within the container?
				if(options.centerAlign){
					$bgImage.css({
						left: '50%',
						top: '50%',
						marginLeft: -(containerWidth/2),
						marginTop: -(containerHeight/2)
					});
				}
				
				//Decide what to do with the image
				if(imageRatio < containerRatio){//Width less than height
					$bgImage.css({
						width: containerWidth,
						height: containerWidth * (1/imageRatio)
					});
				} else if(imageRatio > containerRatio){//Height less than width
					$bgImage.css({
						width: containerHeight * imageRatio,
						height: containerHeight
					});
				} else if(imageRatio == containerRatio){//Unlikely event ratios are equal
					//Image width less or equal to height, choose width as it's shorter
					if(imageWidth <= imageHeight){
						$bgImage.css({
							width: containerWidth,
							height: containerWidth * (1/imageRatio)
						});
					} else {//Else choose shorter height
						$bgImage.css({
							width: containerHeight * imageRatio,
							height: containerHeight
						});
					}
				}
			}
			
			//Fire on page load
			imageManipulation();
			
			//Add the browser resize event
			$(window).bind("resize.backgroundScale", function(){
				imageManipulation();
			})
		});
	}
	
	//Set our plugin defaults
	$.fn.backgroundScale.defaultOptions = {
		imageSelector: "#bgImage",
		centerAlign: true,
		containerPadding: 100
	};
})(jQuery);