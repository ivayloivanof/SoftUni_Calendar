var app = app || {};

app.pageController = (function () {
	/**
	 * @param viewBag
	 * @constructor
	 */
	function PageController(viewBag) {
		this.viewBag = viewBag;
	}

	/**
	 * load page with guest message
	 * @param selector
	 */
	PageController.prototype.loadWelcomeGuestPage = function (selector) {
		this.viewBag.showWelcomeGuestPage(selector);
	};

	/**
	 * load page with user message after autorization
	 * @param selector
	 */
	PageController.prototype.loadWelcomeUserPage = function (selector) {
		var data = {
			user: sessionStorage['username']
		};

		this.viewBag.showWelcomeUserPage(selector, data);
	};

	/**
	 * load add lecture page
	 * @param selector
	 */
	PageController.prototype.loadAddLecturePage = function (selector) {
		this.viewBag.showAddLecturePage(selector);
	};

	return {
		load: function (viewBag) {
			return new PageController(viewBag);
		}
	}
}());