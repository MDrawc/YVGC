function toggleAddlInfo() {
    $('#addl-hide').click(function() {
        $('.addl-info').slideToggle();
    });
}

function toggleEditMenu() {
    var show = $("#g-show-edit");
    var menu;

    show.click(function() {
        if ((menu = $(".g-menu")).length != 0) {
            if (menu.hasClass("out")) {
                menu.removeClass('out');
                show.removeClass('active');
                Cookies.set("edit_open", "false");
            } else {
                menu.addClass('out');
                show.addClass('active');
                Cookies.set("edit_open", "true");
            }
        } else if ((menu = $(".t-menu")).length != 0) {
            var added = $(".t-added")
            var menu_shadow = $(".menu-shadow")
            if (menu.hasClass("out")) {
                menu.removeClass('out');
                added.removeClass('out');
                menu_shadow.removeClass('out');
                show.removeClass('active');
                Cookies.set("edit_open", "false");
            } else {
                menu.addClass('out');
                added.addClass('out');
                menu_shadow.addClass('out');
                show.addClass('active');
                Cookies.set("edit_open", "true");
            }
        } else {
            menu = $(".c-menu");
            if (menu.attr('style') === 'display: block;') {
                menu.slideUp();
                show.removeClass('active');
                Cookies.set("edit_open", "false");
            } else {
                menu.slideDown();
                show.addClass('active');
                Cookies.set("edit_open", "true");
            }
        }
    });
}
