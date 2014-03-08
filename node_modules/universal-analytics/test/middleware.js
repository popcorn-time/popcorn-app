
var _ = require("underscore");
var request = require("request");
var qs = require("querystring");
var uuid = require("node-uuid");
var should = require("should");
var sinon = require("sinon");
var url = require("url");

var ua = require("../lib/index.js");
var utils = require("../lib/utils.js")
var config = require("../lib/config.js")


describe("ua", function () {


	describe("middleware", function () {

		it("should return a middleware-capable function", function () {
			var middleware = ua.middleware()
			middleware.length.should.equal(3, "function signature should have three arguments")
		});

		it("should try to create a visitor based on session data", function () {
			var req = {session: {cid: uuid.v4()}}
			var options = {debug: true}
			var middleware = ua.middleware("tid", options)
			var next = sinon.spy()

			middleware(req, {}, next)

			next.calledOnce.should.equal(true, "next() should've been called once")
			req.visitor.should.be.instanceof(ua.Visitor, "The request should have gained a UA visitor instance")
			req.visitor.cid.should.equal(req.session.cid, "The client ID should've been propagated")
			req.visitor.tid.should.equal("tid", "The tracking ID should've been propagated")
			req.visitor.options.should.eql(options, "The options should've been proprapated")
		});


		it("should try to create a visitor based on the _ga cookie", function () {
			var req = {cookies: {_ga: "GA1.2.46218180.1366882461"}}
			var options = {debug: false}
			var middleware = ua.middleware("tid", options)
			var next = sinon.spy()

			middleware(req, {}, next)

			next.calledOnce.should.equal(true, "next() should've been called once")
			req.visitor.should.be.instanceof(ua.Visitor, "The request should have gained a UA visitor instance")
			req.visitor.cid.should.equal("46218180.1366882461", "The client ID should've been extracted from the cookie")
			req.visitor.tid.should.equal("tid", "The tracking ID should've been propagated")
			req.visitor.options.should.eql(options, "The options should've been proprapated")
		})


		it("should allow changing the _ga cookie name", function () {
			var req = {cookies: {foo: "GA1.2.46218180.1366882461"}}
			var options = {cookieName: "foo"}
			var middleware = ua.middleware("tid", options)
			var next = sinon.spy()

			middleware(req, {}, next)

			req.visitor.cid.should.equal("46218180.1366882461", "The client ID should've been extracted from the cookie")
		})


		it("should store the cid in the session", function () {
			var req = {cookies: {_ga: "GA1.2.46218180.1366882461"}, session: {}}
			var options = {debug: false}
			var middleware = ua.middleware("tid", options)
			var next = sinon.spy()

			middleware(req, {}, next)

			req.session.cid.should.equal("46218180.1366882461", "The client ID should've saved to the session")
		})
	});

	describe("createFromSession", function () {

		it("should combine an existing tracking ID with a client ID from the session", function () {
			var options = {debug: false}
			var middleware = ua.middleware("tid", options)
			var session = {cid: uuid.v4()}

			var visitor = ua.createFromSession(session);

			visitor.should.be.instanceof(ua.Visitor, "The request should have gained a UA visitor instance")
			visitor.cid.should.equal(session.cid, "The client ID should've been extracted from the cookie")
			visitor.tid.should.equal("tid", "The tracking ID should've been propagated")
			visitor.options.should.eql(options, "The options should've been proprapated")
		})

	})


});










