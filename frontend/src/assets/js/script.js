(function ($) {
	'use strict';

	/*------------------------------------
		Dropdown Opens On Hover
	--------------------------------------*/
	document.addEventListener("DOMContentLoaded", function(){
		if (window.innerWidth > 992) {
			document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){
				everyitem.addEventListener('mouseover', function(e){
					let el_link = this.querySelector('a[data-bs-toggle]');
					if(el_link != null){
						let nextEl = el_link.nextElementSibling;
						el_link.classList.add('show');
						nextEl.classList.add('show');
					}
				});
				everyitem.addEventListener('mouseleave', function(e){
					let el_link = this.querySelector('a[data-bs-toggle]');
					if(el_link != null){
						let nextEl = el_link.nextElementSibling;
						el_link.classList.remove('show');
						nextEl.classList.remove('show');
					}
				})
			});
		}
	});
	/*------------------------------------
		Dropdown Opens On Hover
	--------------------------------------*/



	/*------------------------------------
		Fix Header
	--------------------------------------*/
	if(header != null){
	window.onscroll = function() {myFunction()};

	var header = document.getElementById("header-stickey");
	

	
	var sticky = header.offsetTop;

	function myFunction() {
	  if (window.pageYOffset > sticky) {
	    header.classList.add("sticky");
	  } else {
	    header.classList.remove("sticky");
	  }
	}
}
	/*------------------------------------
		Fix Header
	--------------------------------------*/

	


})(jQuery);