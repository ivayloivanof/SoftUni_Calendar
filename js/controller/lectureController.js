var app = app || {};

app.lecturesController = (function () {
	/**
	 * @param viewBag
	 * @param model
	 * @constructor
	 */
	function LecturesController(viewBag, model) {
		this.model = model;
		this.viewBag = viewBag;
	}

	/**
	 * load page with all lecture in calendar
	 * @param selector
	 */
	LecturesController.prototype.getAllLecturesAndPutInCalendar = function (selector) {
		var _this = this;
		this.model.getAllLectures()
			.then(function (data) {
				//render calendar
				_this.viewBag.showCalendarPage(selector, data);
			})
			.catch(function (error) {
				Sammy(function() {
					this.trigger('error-msg', "Internet connection lost");
				});
			})
			.done();
	};

	/**
	 * load page with my lecture in calendar
	 * @param selector
	 */
	LecturesController.prototype.getMyLecturesAndPutInCalendar = function (selector) {
		var _this = this;
		var userId = sessionStorage['userId'];
		this.model.getLecturesByCreatorId(userId)
			.then(function (data) {
				//render calendar
				_this.viewBag.showCalendarPage(selector, data);
			})
			.catch(function (error) {
				Sammy(function() {
					this.trigger('error-msg', "Internet connection lost");
				});
			})
			.done();
	};

	/**
	 * add lecture to kinvey
	 * @param data
	 */
	LecturesController.prototype.addLecture = function (data) {
		this.model.addLecture(data)
			.then(function (success) {

				Sammy(function() {
					this.trigger('success-msg', "Added lecture correctly");
				});

				Sammy(function() {
					this.trigger('redirectUrl', {url: '#/calendar/my/'});
				});
			});
	};

	/**
	 * edit lecture page
	 * @param selector
	 * @param id
	 */
	LecturesController.prototype.loadEditLecturePage = function (selector, id) {
		var _this = this;
		this.model.getLectureById(id)
			.then(function(success) {
				var result = {
					id : success[0]._id,
					title : success[0].title,
					start : success[0].start,
					end : success[0].end
				};

				_this.viewBag.showEditLecturePage(selector, result);
			});
	};

	/**
	 * edit lecture
	 * @param id
	 * @param data
	 */
	LecturesController.prototype.editLecture = function(id , data) {
		this.model.editLecture(id, data)
			.then(function (success) {
				Sammy(function() {
					this.trigger('redirectUrl', {url: '#/calendar/my/'});
				});
			})
	};

	/**
	 * delete lecture page
	 * @param selector
	 * @param id
	 */
	LecturesController.prototype.loadDeleteLecturePage = function (selector, id) {
		var _this = this;
		this.model.getLectureById(id)
			.then(function(success) {
				var result = {
					id : success[0]._id,
					title : success[0].title,
					start : success[0].start,
					end : success[0].end
				};

				_this.viewBag.showDeleteLecturePage(selector, result);
			});
	};

	/**
	 * delete lecture
	 * @param lectureId
	 */
	LecturesController.prototype.deleteLecture = function (lectureId) {
		this.model.deleteLecture(lectureId)
			.then(function (success) {

				Sammy(function() {
					debugger;
					this.trigger('success-msg', "Internet connection lost");
				});

				Sammy(function() {
					this.trigger('redirectUrl', {url: '#/calendar/my/'});
				});
			});
	};

	return {
		load: function (viewBag, model) {
			return new LecturesController(viewBag, model);
		}
	};
}());