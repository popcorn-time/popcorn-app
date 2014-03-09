
module.exports = {
	protocolVersion: "1",
	hostname: "http://www.google-analytics.com",
	path: "/collect",
	acceptedParameters: ["v", "tid", "aip", "qt", "z", "cid", "sc", "dr", "cn", "cs", "cm", "ck", "cc", "ci", "gclid", "dclid", "sr", "vp", "de", "sd", "ul", "je", "fl", "t", "ni", "dl", "dh", "dp", "dt", "cd", "an", "av", "ec", "ea", "el", "ev", "ti", "ta", "tr", "ts", "tt", "ip", "iq", "ic", "in", "iv", "sn", "sa", "st", "utc", "utv", "utt", "utl", "plt", "dns", "pdt", "rrt", "tcp", "src", "exd", "exf", "p"],
	customMetricRegex: /^cm[0-9]+$/,
	customDimensionRegex: /^cd[0-9]+$/
};
