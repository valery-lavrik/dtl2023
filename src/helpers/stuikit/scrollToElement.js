import $ from 'jquery';

const scrollToElement = ($el, offset = 0, speed = 500) => {

	let top = 0;

	$el = $($el);
	if (!$el.length) return null;

	if ($el && $el.length) top = $el.offset().top - offset;

	$('body,html').animate(
		{
			scrollTop: top
		},
		speed ? speed : 500
	);

};



export const scrollToTop = (top = 0, speed = 500) => {
	$('body,html').animate(
		{
			scrollTop: top
		},
		speed ? speed : 500
	);
};




export default scrollToElement;
