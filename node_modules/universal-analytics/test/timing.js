
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


	describe("#timing", function () {
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


		it("should accept arguments (category)", function () {
			var category = Math.random().toString();

			var visitor = ua()

			var result = visitor.timing(category);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc"]);
			_enqueue.args[0][1].utc.should.equal(category);
		});


		it("should accept arguments (category, fn)", function () {
			var category = Math.random().toString();
			var fn = sinon.spy();

			var visitor = ua()

			var result = visitor.timing(category, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc"]);
			_enqueue.args[0][1].utc.should.equal(category);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (category, variable)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();

			var visitor = ua()

			var result = visitor.timing(category, variable);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
		});


		it("should accept arguments (category, variable, fn)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var fn = sinon.spy();

			var visitor = ua()

			var result = visitor.timing(category, variable, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (category, variable, time)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var time = Math.random();

			var visitor = ua()

			var result = visitor.timing(category, variable, time);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
			_enqueue.args[0][1].utt.should.equal(time);
		});


		it("should accept arguments (category, variable, time)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var time = Math.random();
			var fn = sinon.spy()

			var visitor = ua()

			var result = visitor.timing(category, variable, time, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
			_enqueue.args[0][1].utt.should.equal(time);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (category, variable, time, label)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var time = Math.random();
			var label = Math.random().toString();

			var visitor = ua()

			var result = visitor.timing(category, variable, time, label);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt", "utl"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
			_enqueue.args[0][1].utt.should.equal(time);
			_enqueue.args[0][1].utl.should.equal(label);
		});


		it("should accept arguments (category, variable, time, label, fn)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var time = Math.random();
			var label = Math.random().toString();
			var fn = sinon.spy()

			var visitor = ua()

			var result = visitor.timing(category, variable, time, label, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt", "utl"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
			_enqueue.args[0][1].utt.should.equal(time);
			_enqueue.args[0][1].utl.should.equal(label);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (category, variable, time, label, params)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var time = Math.random();
			var label = Math.random().toString();
			var params = {p: Math.random().toString()}

			var visitor = ua()

			var result = visitor.timing(category, variable, time, label, params);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt", "utl", "p"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
			_enqueue.args[0][1].utt.should.equal(time);
			_enqueue.args[0][1].utl.should.equal(label);
			_enqueue.args[0][1].p.should.equal(params.p);
		});


		it("should accept arguments (category, variable, time, label, params, fn)", function () {
			var category = Math.random().toString();
			var variable = Math.random().toString();
			var time = Math.random();
			var label = Math.random().toString();
			var params = {p: Math.random().toString()}
			var fn = sinon.spy()

			var visitor = ua()

			var result = visitor.timing(category, variable, time, label, params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt", "utl", "p"]);
			_enqueue.args[0][1].utc.should.equal(category);
			_enqueue.args[0][1].utv.should.equal(variable);
			_enqueue.args[0][1].utt.should.equal(time);
			_enqueue.args[0][1].utl.should.equal(label);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (category, variable, time, label, params)", function () {
			var params = {
				utc: Math.random().toString(),
				utv: Math.random().toString(),
				utt: Math.random(),
				utl: Math.random().toString(),
				p: Math.random().toString()
			}

			var visitor = ua()

			var result = visitor.timing(params);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt", "utl", "p"]);
			_enqueue.args[0][1].utc.should.equal(params.utc);
			_enqueue.args[0][1].utv.should.equal(params.utv);
			_enqueue.args[0][1].utt.should.equal(params.utt);
			_enqueue.args[0][1].utl.should.equal(params.utl);
			_enqueue.args[0][1].p.should.equal(params.p);
		});


		it("should accept arguments (category, variable, time, label, params)", function () {
			var params = {
				utc: Math.random().toString(),
				utv: Math.random().toString(),
				utt: Math.random(),
				utl: Math.random().toString(),
				p: Math.random().toString()
			}
			var fn = sinon.spy()

			var visitor = ua()

			var result = visitor.timing(params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("timing");
			_enqueue.args[0][1].should.have.keys(["utc", "utv", "utt", "utl", "p"]);
			_enqueue.args[0][1].utc.should.equal(params.utc);
			_enqueue.args[0][1].utv.should.equal(params.utv);
			_enqueue.args[0][1].utt.should.equal(params.utt);
			_enqueue.args[0][1].utl.should.equal(params.utl);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

	});

});










