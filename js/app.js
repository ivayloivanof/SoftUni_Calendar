var app = app || {};

(function () {
	var router = Sammy(function () {
		var selector = '#container';
		var menu = '#menu';

		var requester = app.requester.load(
			'kid_-kZ_Kbvh1-',
			'a94f951910c74643ac4f483c07473399',
			'https://baas.kinvey.com/'
		);

		//model
		var userModel = app.userModel.load(requester);
		var lectureModel = app.lectureModel.load(requester);

		//view
		var userViewBag = app.userViewBag.load();
		var pageViewBag = app.pageViewBag.load();
		var menuViewBag = app.menuViewBag.load();

		//controller
		var userController = app.userController.load(userViewBag, userModel);
		var pageController = app.pageController.load(pageViewBag);
		var menuController = app.menuController.load(menuViewBag);
		var lectureController = app.lecturesController.load(pageViewBag, lectureModel);

		this.get('#/', function () {
			if (!sessionStorage['sessionId']) {
				menuController.loadLoginMenu(menu);
				pageController.loadWelcomeGuestPage(selector);
			} else {
				menuController.loadHomeMenu(menu);
				pageController.loadWelcomeUserPage(selector);
			}
		});
		
		this.get('#/register/', function () {
			if (!sessionStorage['sessionId']) {
				menuController.loadLoginMenu(menu);
				userController.loadRegisterPage(selector);
			} else {
				this.redirect('#/');
			}
		});

		this.get('#/login/', function () {
			if (!sessionStorage['sessionId']) {
				menuController.loadLoginMenu(menu);
				userController.loadLoginPage(selector);
			} else {
				this.redirect('#/');
			}
		});

		this.get('#/logout/', function () {
			userController.logout();
		});

		this.get(/\#\/calendar\/(.*)\/(.*)/, function () {
			if (sessionStorage['sessionId']) {
				var _this = this;
				menuController.loadHomeMenu(menu);
				if(_this.params.splat[0] === 'list') {
					lectureController.getAllLecturesAndPutInCalendar(selector);
				}

				if(_this.params.splat[0] === 'my') {
					lectureController.getMyLecturesAndPutInCalendar(selector);
				}

				if(_this.params.splat[0] === 'add') {
					menuController.loadHomeMenu(menu);
					pageController.loadAddLecturePage(selector);
				}

				if(_this.params.splat[0] === 'edit') {
					menuController.loadHomeMenu(menu);
					lectureController.loadEditLecturePage(selector, _this.params.splat[1]);
				}

				if(_this.params.splat[0] === 'delete') {
					menuController.loadHomeMenu(menu);
					lectureController.loadDeleteLecturePage(selector, _this.params.splat[1]);
				}
			} else {
				menuController.loadLoginMenu(menu);
				pageController.loadWelcomeGuestPage(selector);
			}
		});


		this.bind('register', function (ev, data) {
			userController.register(data);
		});

		this.bind('login', function (ev, data) {
			userController.login(data);
		});

		this.bind('add-lecture', function (ev, data) {
			lectureController.addLecture(data);
		});

		this.bind('edit-lecture', function (ev, data) {
			lectureController.editLecture(data.id, data);
		});

		this.bind('delete-lecture', function (ev, data) {
			lectureController.deleteLecture(data.id);
		});

		this.bind('redirectUrl', function (ev, data) {
			this.redirect(data.url);
		});
		
		this.bind('success-msg', function (ev, data) {
			$('#message_bar').addClass('green');
			$('#message_bar').text(data).delay(3000).fadeOut();
		});

		this.bind('error-msg', function (ev, data) {
			$('#message_bar').addClass('red');
			$('#message_bar').text(data).delay(4000).fadeOut();
		});
	});

	router.run('#/');
}());

//2016-03-22T22:00:00