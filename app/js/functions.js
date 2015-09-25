$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

//  Dropdown Mega Menu
$("#navbar-dealeron .dropdown-mega-menu a[href^='#ui__']").on('click', function(e) {
    e.preventDefault();
    var hash = this.hash;
    $('html, body').stop().animate({
        scrollTop: $(hash).offset().top
    }, 1500, 'easeInOutExpo', function() {
        window.location.hash = hash;
    });
});

//var nav = priorityNav.init({
//    initClass:                   "js-priorityNav",        // Class that will be printed on html element to allow conditional css styling.
//    mainNavWrapper:              "div",       // mainnav wrapper selector (must be direct parent from mainNav)
//    mainNav:                     "ul",                    // mainnav selector. (must be inline-block)
//    navDropdown:                 ".dropdown",        // class used for the dropdown.
//    navDropdownToggle:           ".dropdown-toggle", // class used for the dropdown toggle.
//    navDropdownLabel:            "more",                  // Text that is used for the dropdown toggle.
//    navDropdownBreakpointLabel:  "menu",                  // button label for navDropdownToggle when the breakPoint is reached.
//    breakPoint:                  500,                     // amount of pixels when all menu items should be moved to dropdown to simulate a mobile menu
//    throttleDelay:               50,                      // this will throttle the calculating logic on resize because i'm a responsible dev.
//    offsetPixels:                0,                       // increase to decrease the time it takes to move an item.
//    count:                       true,                    // prints the amount of items are moved to the attribute data-count to style with css counter.
//});
