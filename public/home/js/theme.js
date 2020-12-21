;(function($) {
    "use strict";
    
    var nav_offset_top = $('header').height(); 
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

	//* Navbar Fixed  
    function navbarFixed(){
        if ( $('.main_menu_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".main_menu_area").addClass("navbar_fixed");
                } else {
                    $(".main_menu_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();
    
  
   
    
})(jQuery)

