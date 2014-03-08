
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


	describe("#exception", function () {
		var _enqueue;

		beforeEach(function () {
			_enqueue = sinon.stub(ua.Visitor.prototype, "_enqueue", function () {
				if (arguments.length === 3 && typeof arguments[2] === 'function') {
					arguments[2]();
				}
				return this;
			});
		});

		afterEach(function () {
			_enqueue.restore()
		});


		it("should accept arguments (description)", function () {
			var description = Math.random().toString();

			var visitor = ua()

			var result = visitor.exception(description);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd"]);
			_enqueue.args[0][1].exd.should.equal(description);
		});


		it("should accept arguments (description, fn)", function () {
			var description = Math.random().toString();
			var fn = sinon.spy();

			ua().exception(description, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd"]);
			_enqueue.args[0][1].exd.should.equal(description);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (description, fatal)", function () {
			var description = Math.random().toString();
			var fatal = +!!(Math.random().toString()*2);

			var visitor = ua()

			var result = visitor.exception(description, fatal);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd", "exf"]);
			_enqueue.args[0][1].exd.should.equal(description);
			_enqueue.args[0][1].exf.should.equal(fatal);
		});


		it("should accept arguments (description, fatal, fn)", function () {
			var description = Math.random().toString();
			var fatal = +!!(Math.random().toString()*2);
			var fn = sinon.spy();

			var visitor = ua()

			var result = visitor.exception(description, fatal, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd", "exf"]);
			_enqueue.args[0][1].exd.should.equal(description);
			_enqueue.args[0][1].exf.should.equal(fatal);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (description, fatal, params)", function () {
			var description = Math.random().toString();
			var fatal = +!!(Math.random().toString()*2);
			var params = {"p": "/" + Math.random()}

			var visitor = ua()

			var result = visitor.exception(description, fatal, params);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd", "exf", "p"]);
			_enqueue.args[0][1].exd.should.equal(description);
			_enqueue.args[0][1].exf.should.equal(fatal);
			_enqueue.args[0][1].p.should.equal(params.p);
		});


		it("should accept arguments (description, fatal, params, fn)", function () {
			var description = Math.random().toString();
			var fatal = +!!(Math.random().toString()*2);
			var params = {"p": "/" + Math.random()};
			var fn = sinon.spy();

			var visitor = ua()

			var result = visitor.exception(description, fatal, params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd", "exf", "p"]);
			_enqueue.args[0][1].exd.should.equal(description);
			_enqueue.args[0][1].exf.should.equal(fatal);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (params)", function () {
			var params = {
				exd: Math.random().toString(),
				exf: +!!(Math.random().toString()*2),
				p: "/" + Math.random()
			};

			var visitor = ua()

			var result = visitor.exception(params);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd", "exf", "p"]);
			_enqueue.args[0][1].exd.should.equal(params.exd);
			_enqueue.args[0][1].exf.should.equal(params.exf);
			_enqueue.args[0][1].p.should.equal(params.p);
		});


		it("should accept arguments (params, fn)", function () {
			var params = {
				exd: Math.random().toString(),
				exf: +!!(Math.random().toString()*2),
				p: "/" + Math.random()
			};
			var fn = sinon.spy();

			var visitor = ua()

			var result = visitor.exception(params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("exception");
			_enqueue.args[0][1].should.have.keys(["exd", "exf", "p"]);
			_enqueue.args[0][1].exd.should.equal(params.exd);
			_enqueue.args[0][1].exf.should.equal(params.exf);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

	});

});










