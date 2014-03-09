
module.exports.isUuid = function (uuid) {
	if (!uuid) return false;
	uuid = uuid.toString().toLowerCase();
	return /[0-9a-f]{8}\-?[0-9a-f]{4}\-?4[0-9a-f]{3}\-?[89ab][0-9a-f]{3}\-?[0-9a-f]{12}/.test(uuid)
}


module.exports.isCookieCid = function (cid) {
	return /^[0-9]+\.[0-9]+$/.test(cid)
}


module.exports.ensureValidCid = function (uuid) {
	if (!this.isUuid(uuid)) {
		if (!this.isCookieCid(uuid)) {
			return false;
		}
		return uuid;
	}

	uuid = uuid.replace(/\-/g, "");
	return "" +
		uuid.substring(0, 8) + "-" +
		uuid.substring(8, 12) + "-" +
		uuid.substring(12, 16) + "-" +
		uuid.substring(16, 20) + "-" +
		uuid.substring(20);
}
