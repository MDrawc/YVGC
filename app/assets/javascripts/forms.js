function resetFormErrors(form, game_id) {

    var reset_elements = ['#collection', '#game_platform', '.cf-physical', '.cf-digital','#copy_true', '#copy_false']
    var errors_place = '.add-form-errors';
    var element = '#' + form + '-form-' + game_id + ' ' + errors_place;

    for (i = 0; i < reset_elements.length; i++) {

        var formPart = '#' + form + '-form-' + game_id + ' ' + reset_elements[i];

        $(formPart).on('input', function() {
            $(element).html('');
        });
    }
}

function preselectPlatform(form, id, platform) {
    var form = '#' + form + '-form-' + id;
    var element = form + " #game_platform option[value^='" + platform + ",']";
    $(element).attr("selected", "selected");
    $(form + ' .cf-platform-icon').attr('class', 'cf-platform-green');
}

function changeButton(id) {
    var form = '#copy-form-' + id;
    var element = form + " .action input[type='radio']";
    var button = form + " .cf-add-button";
    $(element).on('input', function() {
        var selected = $(element + ":checked");
        if (selected.length > 0) {
            $(form + ' .c-m').removeClass('chosen')
            selected.parent().addClass('chosen');
            selected_val = selected.val();
        }
        b_name = eval(selected_val) ? 'Copy' : 'Move';
        $(button).text(b_name);
    });
}

function activateForm(form, id) {
    var form = '#' + form + '-form-' + id;
    var select_element = form + ' #collection';
    var icon = $(form + ' .cf-collection-icon');
    var platform_element = form + ' #platform-option';
    var needs_platform = form + ' #game_needs_platform';

    $(select_element).on('input', function() {
        var value = $(select_element).val();
        var cv = value.length != 0 ? (value.split(",")[1] == 'true') : 'select';

        if (cv == true) {
            $(platform_element).show();
            icon.attr('class', 'cf-collection-green');
            $(needs_platform).attr('value', 'true');
        } else if (cv == false) {
            $(platform_element).hide();
            icon.attr('class', 'cf-collection-green');
            $(needs_platform).attr('value', 'false');
        } else {
            $(needs_platform).attr('value', 'false');
            icon.attr('class', 'cf-collection-icon');
            $(platform_element).hide();
        }
    });
}

function updatePlatformIcon(form_type, id) {
    var form = '#' + form_type + '-form-' + id;
    var select_element = form + ' #' + 'game_platform';

    $(select_element).on('input', function() {
        var value = $(select_element).val();
        var icon = form + ' .cf-platform-icon';
        if (value.length > 0) {
            $(icon).attr('class', 'cf-platform-green');
        } else {
            icon = form + ' .cf-platform-green';
            $(icon).attr('class', 'cf-platform-icon');
        }
    });
}

function paintItBlack(id) {
  var add_form_link = $('#gs-' + id + ' .plus');
  var game_name = $('#gs-' + id + ' .game-name');
  var other_covers = $('.game-cover').not('#gc-' + id).addClass('bw');

  add_form_link.addClass('disabled');
  game_name.addClass('disabled');
  other_covers.addClass('bw');

  UIkit.util.on('#add-form-' + id, 'hide', function() {
    add_form_link.removeClass('disabled');
    game_name.removeClass('disabled');
    other_covers.removeClass('bw');
  });
}

function changeSearchBar() {
    $("[id^=search_query_type]").on('input', function() {
    var selectedVal = "";
    var selected = $("input[type='radio']:checked");
    if (selected.length > 0) {
        selectedVal = selected.val();
    }

    if (selectedVal === 'char') {
      $('#search-igdb-bar').attr('placeholder', 'Search video game characters...')
    } else if (selectedVal === 'dev') {
      $('#search-igdb-bar').attr('placeholder', 'Search video game developers...')
    } else if (selectedVal === 'game') {
      $('#search-igdb-bar').attr('placeholder', 'Search video games...')
    }

    });
}