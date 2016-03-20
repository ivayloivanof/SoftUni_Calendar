var app = app || {};

app.menuController = (function() {
	/**
	 * @param viewBag
	 * @constructor
	 */
	function MenuController(viewBag) {
		this.viewBag = viewBag;
	}

	/**
	 * load menu before autorization
	 * @param selector
	 */
	MenuController.prototype.loadLoginMenu = function(selector) {
		this.viewBag.showLoginMenu(selector);
	};

	/**
	 * load menu after autorization
	 * @param selector
	 */
	MenuController.prototype.loadHomeMenu = function(selector) {
		this.viewBag.showHomeMenu(selector);
	};

	return {
		load: function(viewBag) {
			return new MenuController(viewBag);
		}
	}
}());