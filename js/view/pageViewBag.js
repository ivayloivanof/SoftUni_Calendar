var app = app || {};

app.pageViewBag = (function () {
	/**
	 * @param selector
	 */
    function showWelcomeGuestPage(selector) {
        $.get('templates/welcome-guest.html', function(templ) {
            $(selector).html(templ);
        })
    }

	/**
	 * mustache render wolcome user page
	 * @param selector
	 * @param data
	 */
    function showWelcomeUserPage(selector, data) {
        $.get('templates/welcome-user.html', function(templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

	/**
	 * load calendar
	 * @param selector
	 * @param data
	 */
	function showCalendarPage(selector, data) {
		$.get('templates/calendar.html', function(templ) {
			var renderedData = Mustache.render(templ);
			$(selector).html(renderedData);

			$('#calendar').fullCalendar({
				theme: false,
				header: {
					left: 'prev,next today addEvent',
					center: 'title',
					right: 'month,agendaWeek,agendaDay'
				},
				defaultDate: '2016-03-20',
				selectable: false,
				editable: false,
				eventLimit: true,
				events: data,
				customButtons: {
					addEvent: {
						text: 'Add Event',
						click: function () {
							Sammy(function() {
							    this.trigger('redirectUrl', {url: '#/calendar/add/'});
							});
						}
					}
				},
				eventClick: function (calEvent, jsEvent, view) {
					$.get('templates/modal.html', function (templ) {
						var rendered = Mustache.render(templ, calEvent);
						$('#modal-body').html(rendered);
						$('#editLecture').on('click', function () {
							Sammy(function() {
								this.trigger('redirectUrl', {url: '#/calendar/edit/' + calEvent._id});
							});
						});
						$('#deleteLecture').on('click', function () {
							Sammy(function() {
								this.trigger('redirectUrl', {url: '#/calendar/delete/' + calEvent._id});
							});
						})
					});
					$('#events-modal').modal();
				}
			});
			Sammy(function() {
			    this.trigger('success-msg', 'Lecture is loaded correctly!');
			});
		})
	}

	/**
	 * load add-lecture page
	 * @param selector
	 */
	function showAddLecturePage(selector) {
		$.get('templates/add-lecture.html', function(templ) {
			var renderedData = Mustache.render(templ);
			$(selector).html(renderedData);
			$('#addLecture').on('click', function () {
				var title = $('#title').val(),
					start = $('#start').val(),
					end = $('#end').val();

				Sammy(function() {
					this.trigger('add-lecture', {title: title, start: start, end: end, lecturer: sessionStorage['username']});
				})
			})
		})
	}

	/**
	 * load edit page and render with lecture data
	 * @param selector
	 * @param data
	 */
	function showEditLecturePage(selector, data) {
		$.get('templates/edit-lecture.html', function(templ) {
			var renderedData = Mustache.render(templ, data);
			$(selector).html(renderedData);
			$('#editLecture').on('click', function () {
				var title = $('#title').val(),
					start = $('#start').val(),
					end = $('#end').val();

				Sammy(function() {
					this.trigger('edit-lecture', {id: data.id, title: title, start: start, end: end, lecturer: sessionStorage['username']});
				})
			})
		})
	}

	/**
	 * render delete lecture page
	 * @param selector
	 * @param data
	 */
	function showDeleteLecturePage(selector, data) {
		$.get('templates/delete-lecture.html', function(templ) {
			var renderedData = Mustache.render(templ, data);
			$(selector).html(renderedData);
			$('#deleteLecture').on('click', function () {
				Sammy(function() {
					this.trigger('delete-lecture', {id: data.id});
				})
			})
		})
	}

    return {
        load: function () {
            return {
				showWelcomeGuestPage: showWelcomeGuestPage,
				showWelcomeUserPage: showWelcomeUserPage,
				showCalendarPage: showCalendarPage,
				showAddLecturePage: showAddLecturePage,
				showEditLecturePage: showEditLecturePage,
				showDeleteLecturePage: showDeleteLecturePage
            }
        }
    }
}());