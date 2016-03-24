var app = app || {};

app.lectureModel = (function() {
    function LectureModel(requester) {
        this.requester = requester;
		this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }

	/**
	 * List All Lectures
	 * @returns [{...},{...}...]
	 */
	LectureModel.prototype.getAllLectures = function() {
        return this.requester.get(this.serviceUrl, true);
    };

	/**
	 * List Your Lectures
	 * @param userId
	 * @returns (JSON):[{"_id":"…","title":"…","start":"…","end":"…","_acl":{"creator":"…"}}, …]
	 */
	LectureModel.prototype.getLecturesByCreatorId = function(userId) {
		var requestUrl = this.serviceUrl + '?query={"_acl.creator":"'+ userId + '"}';
		return this.requester.get(requestUrl, true);
	};

	/**
	 * get lecture by id
	 * @param idLecture
	 * @returns {*}
	 */
	LectureModel.prototype.getLectureById = function (idLecture) {
		var requestUrl = this.serviceUrl + '?query={"_id":"'+ idLecture + '"}';
		return this.requester.get(requestUrl, true);
	}

	/**
	 * Add Lecture
	 * @param data
	 * 			{
				  "title":"lectureTitle",
				  "start":"lectureStartDateTime",
				  "end":"lectureEndDateTime",
				  "lecturer":"username"
				}
	 * @returns (JSON): {"_acl":{"creator":"userId"},"_id":"…","title":"…","start":"…",…}
	 */
	LectureModel.prototype.addLecture = function(data) {
		return this.requester.post(this.serviceUrl, data, true);
	};

	/**
	 * Edit lecture
	 * @param lectureId
	 * @param data
	 * @returns (JSON): {"title": "...","start": "...","end": "...","lecturer": "...","_id": "...","_acl": {"creator": "..."},"_kmd": {"lmt": "...","ect": "..."}
}
	 */
	LectureModel.prototype.editLecture = function(lectureId, data) {
		var requestUrl = this.serviceUrl + lectureId;
		return this.requester.put(requestUrl, data, true);
	};

	/**
	 * Delete lecture by Id
	 * @param noteId
	 * @returns {"count": ...}
	 */
	LectureModel.prototype.deleteLecture = function(lectureId) {
		var requestUrl = this.serviceUrl + lectureId;
		return this.requester.delete(requestUrl, true);
	};

    return {
        load: function(requester) {
            return new LectureModel(requester);
        }
    }
}());