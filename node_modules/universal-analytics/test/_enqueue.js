
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


	describe("#_enqueue", function () {

		var send;

		beforeEach(function () {
			send = sinon.stub(ua.Visitor.prototype, "send").callsArg(0);
		});

		afterEach(function () {
			send.restore()
		});

		it("should accept arguments (type)", function () {
			var tid = "UA-XXXXX-XX";
			var cid = uuid.v4();
			var type = Math.random().toString()

			var visitor = ua(tid, cid)._enqueue(type);

			send.called.should.equal(false, "#send should not have been called without a callback");

			visitor._queue.length.should.equal(1, "1 tracking call should have been enqueued");

			visitor._queue[0].should.have.keys(["v", "tid", "cid", "t"]);
			visitor._queue[0].tid.should.equal(tid)
			visitor._queue[0].cid.should.equal(cid)
			visitor._queue[0].t.should.equal(type)
		});

		it("should accept arguments (type, fn)", function () {
			var tid = "UA-XXXXX-XX";
			var cid = uuid.v4();
			var type = Math.random().toString()
			var fn = sinon.spy()

			var visitor = ua(tid, cid)._enqueue(type, fn);

			send.calledOnce.should.equal(true, "#send should have been called once");

			visitor._queue.length.should.equal(1, "1 tracking call should have been enqueued");

			visitor._queue[0].should.have.keys(["v", "tid", "cid", "t"]);
			visitor._queue[0].tid.should.equal(tid)
			visitor._queue[0].cid.should.equal(cid)
			visitor._queue[0].t.should.equal(type)

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should accept arguments (type, params)", function () {
			var tid = "UA-XXXXX-XX";
			var cid = uuid.v4();
			var type = Math.random().toString()
			var params = {foo: Math.random().toString()}

			var visitor = ua(tid, cid)._enqueue(type, params);

			send.called.should.equal(false, "#send should not have been called without a callback");

			visitor._queue.length.should.equal(1, "1 tracking call should have been enqueued");

			visitor._queue[0].should.have.keys(["v", "tid", "cid", "t", "foo"]);
			visitor._queue[0].tid.should.equal(tid)
			visitor._queue[0].cid.should.equal(cid)
			visitor._queue[0].foo.should.equal(params.foo);
		});

		it("should accept arguments (type, params, fn)", function () {
			var tid = "UA-XXXXX-XX";
			var cid = uuid.v4();
			var type = Math.random().toString()
			var params = {foo: Math.random().toString()}
			var fn = sinon.spy()

			var visitor = ua(tid, cid)._enqueue(type, params, fn);

			send.calledOnce.should.equal(true, "#send should have been called once");

			visitor._queue.length.should.equal(1, "1 tracking call should have been enqueued");

			visitor._queue[0].should.have.keys(["v", "tid", "cid", "t", "foo"]);
			visitor._queue[0].tid.should.equal(tid)
			visitor._queue[0].cid.should.equal(cid)
			visitor._queue[0].foo.should.equal(params.foo);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should continue adding to the queue", function () {
			var tid = "UA-XXXXX-XX";
			var cid = uuid.v4();
			var type = Math.random().toString()

			var visitor = ua(tid, cid)

			visitor._enqueue(type);
			visitor._enqueue(type);
			visitor._enqueue(type);
			visitor._enqueue(type);

			visitor._queue.length.should.equal(4, "4 tracking calls should have been enqueued");
		})

	});

});










