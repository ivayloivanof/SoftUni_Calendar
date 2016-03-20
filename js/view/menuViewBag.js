var app = app || {};

app.menuViewBag = (function () {
	function showLoginMenu(selector) {
		$.get('templates/menu-login.html', function(templ) {
			$(selector).html(templ);
		})
	}

	function showHomeMenu(selector) {
		$.get('templates/menu-home.html', function(templ) {
			$(selector).html(templ);
		})
	}

	return {
		load: function () {
			return {
				showLoginMenu: showLoginMenu,
				showHomeMenu: showHomeMenu
			}
		}
	}
}());