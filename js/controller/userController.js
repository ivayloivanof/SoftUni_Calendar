var app = app || {};

app.userController = (function () {
	/**
	 * @param viewBag
	 * @param model
	 * @constructor
	 */
	function UserController(viewBag, model) {
		this.model = model;
		this.viewBag = viewBag;
	}

	/**
	 * register page loader
	 * @param selector
	 */
	UserController.prototype.loadRegisterPage = function(selector) {
		this.viewBag.showRegisterPage(selector);
	};

	/**
	 * login page loader
	 * @param selector
	 */
	UserController.prototype.loadLoginPage = function(selector) {
		this.viewBag.showLoginPage(selector);
	};

	/**
	 *
	 * @param data
	 * @returns error message or redirect to #/
	 */
	UserController.prototype.login = function (data) {
		return this.model.login(data)
			.then(function (success) {
				sessionStorage['sessionId'] = success._kmd.authtoken;
				sessionStorage['username'] = success.username;
				sessionStorage['userId'] = success._id;

				Sammy(function() {
					this.trigger('success-msg', ("Login with " + success.username));
				});

				Sammy(function () {
					this.trigger('redirectUrl', {url: '#/'});
				});

			})
			.catch(function (error) {
				Sammy(function () {
					var msg = JSON.parse(error.responseText);
					this.trigger('error-msg', msg.description);
				});
			})
			.done();
	};

	/**
	 *
	 * @param data
	 * @returns error message or redirect to #/
	 */
	UserController.prototype.register = function (data) {
		return this.model.register(data)
			.then(function (success) {
				sessionStorage['sessionId'] = success._kmd.authtoken;
				sessionStorage['username'] = success.username;
				sessionStorage['userId'] = success._id;

				Sammy(function () {
					this.trigger('redirectUrl', {url: '#/'});
				});
			})
			.catch(function (error) {
				//TODO trow register error notification
			})
			.done();
	};

	/**
	 * logout
	 */
	UserController.prototype.logout = function () {
		this.model.logout()
			.then(function () {
				sessionStorage.clear();

				Sammy(function () {
					this.trigger('redirectUrl', {url: '#/'});
				});
			})
	};

	return {
		load: function (viewBag, model) {
			return new UserController(viewBag, model);
		}
	}
}());