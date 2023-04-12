import scrollToElement from './scrollToElement'
import $ from 'jquery';

export function initScrollToElementOnPortal() {
	$("body").on(
		"focus",
		"input[type='text'], input[type='tel'], input[type='email'], input[type='password']",
		e => {
			const nav_offset = $('nav.navigation').length ? $('nav.navigation').height() : 0;
			// const topLine = $('.topline').length ? $('.topline').height() + 15 : 0
			// const headerHeight = $("#header").height() + paytimer + topLine + (isVkMiniApp ? 80 : 15);

			const headerHeight = nav_offset + 20;

			scrollToElement($(e.currentTarget), headerHeight, 300);
		}
	);
}
