var app = app || {};

app.userModel = (function() {
	/**
	 * @param requester
	 * @constructor
	 */
	function UserModel(requester) {
		this.requester = requester;
		this.serviceUrl = requester.baseUrl + 'user/' + requester.appId + '/';
	}

	/**
	 * User login
	 * @param data
				{
				  "username":"username",
				  "password":"password"
				}
	 * @returns (JSON): {"username":"…","_id":"…","_kmd":{…,"authtoken":"authTokenValue"}}
	 */
	UserModel.prototype.login = function(data) {
		var requestUrl = this.serviceUrl + 'login';
		return this.requester.post(requestUrl, data, false);
	};

	/**
	 * User register
	 * @param data
		{
		  "username":"username",
		  "password":"password"
		}
	 * @returns (JSON): {"username":"…","_id":"…","_kmd":{…,"authtoken":"authTokenValue"}}
	 */
	UserModel.prototype.register = function(data) {
		return this.requester.post(this.serviceUrl, data, false);
	};

	/**
	 *
	 * @returns {*}
	 */
	UserModel.prototype.logout = function() {
		var requestUrl = this.serviceUrl + '_logout';
		return this.requester.post(requestUrl, null, true);
	};

	return {
		load: function(requester) {
			return new UserModel(requester);
		}
	}
}());
