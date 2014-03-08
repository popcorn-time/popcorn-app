
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


	describe("#transaction", function () {
		var _enqueue;

		beforeEach(function () {
			_enqueue = sinon.stub(ua.Visitor.prototype, "_enqueue", function (type, params, fn) {
				if (fn) {
					(typeof fn).should.equal('function', "#_enqueue should receive a callback")
					fn();
				}
				return this;
			});
		});

		afterEach(function () {
			_enqueue.restore()
		});


		it("should be available via the #t shortcut", function () {
			var visitor = ua()
			visitor.t.should.equal(visitor.transaction)
		});


		it("should accept arguments (transaction)", function () {
			var transaction = Math.random().toString();

			var visitor = ua()

			var result = visitor.transaction(transaction);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
		});


		it("should accept arguments (transaction, fn)", function () {
			var transaction = Math.random().toString();
			var fn = sinon.spy()

			ua().transaction(transaction, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti"]);
			_enqueue.args[0][1].ti.should.equal(transaction);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (transaction, revenue)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();

			ua().transaction(transaction, revenue);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
		});


		it("should accept arguments (transaction, revenue, fn)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var fn = sinon.spy()

			ua().transaction(transaction, revenue, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (transaction, revenue, shipping)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();

			ua().transaction(transaction, revenue, shipping);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
		});


		it("should accept arguments (transaction, revenue, shipping, fn)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var fn = sinon.spy()

			ua().transaction(transaction, revenue, shipping, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (transaction, revenue, shipping, tax)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var tax = Math.random();

			ua().transaction(transaction, revenue, shipping, tax);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
			_enqueue.args[0][1].tt.should.equal(tax);
		});


		it("should accept arguments (transaction, revenue, shipping, tax, fn)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var tax = Math.random();
			var fn = sinon.spy()

			ua().transaction(transaction, revenue, shipping, tax, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
			_enqueue.args[0][1].tt.should.equal(tax);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (transaction, revenue, shipping, tax, affiliation)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var tax = Math.random();
			var affiliation = Math.random().toString();

			ua().transaction(transaction, revenue, shipping, tax, affiliation);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt", "ta"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
			_enqueue.args[0][1].tt.should.equal(tax);
			_enqueue.args[0][1].ta.should.equal(affiliation);
		});


		it("should accept arguments (transaction, revenue, shipping, tax, affiliation, fn)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var tax = Math.random();
			var affiliation = Math.random().toString();
			var fn = sinon.spy()

			ua().transaction(transaction, revenue, shipping, tax, affiliation, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt", "ta"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
			_enqueue.args[0][1].tt.should.equal(tax);
			_enqueue.args[0][1].ta.should.equal(affiliation);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (transaction, revenue, shipping, tax, affiliation, params)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var tax = Math.random();
			var affiliation = Math.random().toString();
			var params = {p: Math.random().toString()}

			ua().transaction(transaction, revenue, shipping, tax, affiliation, params);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt", "ta", "p"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
			_enqueue.args[0][1].tt.should.equal(tax);
			_enqueue.args[0][1].ta.should.equal(affiliation);
			_enqueue.args[0][1].p.should.equal(params.p);
		});


		it("should accept arguments (transaction, revenue, shipping, tax, affiliation, params, fn)", function () {
			var transaction = Math.random().toString();
			var revenue = Math.random();
			var shipping = Math.random();
			var tax = Math.random();
			var affiliation = Math.random().toString();
			var params = {p: Math.random().toString()}
			var fn = sinon.spy()

			ua().transaction(transaction, revenue, shipping, tax, affiliation, params, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt", "ta", "p"]);
			_enqueue.args[0][1].ti.should.equal(transaction);
			_enqueue.args[0][1].tr.should.equal(revenue);
			_enqueue.args[0][1].ts.should.equal(shipping);
			_enqueue.args[0][1].tt.should.equal(tax);
			_enqueue.args[0][1].ta.should.equal(affiliation);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (params)", function () {
			var params = {
				ti: Math.random().toString(),
				tr: Math.random(),
				ts: Math.random(),
				tt: Math.random(),
				ta: Math.random().toString(),
				p: Math.random().toString(),
				empty: null // Should be removed
			};
			var json = JSON.stringify(params);

			var visitor = ua()

			var result = visitor.transaction(params);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt", "ta", "p"]);
			_enqueue.args[0][1].ti.should.equal(params.ti);
			_enqueue.args[0][1].tr.should.equal(params.tr);
			_enqueue.args[0][1].ts.should.equal(params.ts);
			_enqueue.args[0][1].tt.should.equal(params.tt);
			_enqueue.args[0][1].ta.should.equal(params.ta);
			_enqueue.args[0][1].p.should.equal(params.p);

			JSON.stringify(params).should.equal(json, "params should not have changed");
		});


		it("should accept arguments (params, fn)", function () {
			var params = {
				ti: Math.random().toString(),
				tr: Math.random(),
				ts: Math.random(),
				tt: Math.random(),
				ta: Math.random().toString(),
				p: Math.random().toString()
			};
			var fn = sinon.spy()

			var visitor = ua()

			var result = visitor.transaction(params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[0][1].should.have.keys(["ti", "tr", "ts", "tt", "ta", "p"]);
			_enqueue.args[0][1].ti.should.equal(params.ti);
			_enqueue.args[0][1].tr.should.equal(params.tr);
			_enqueue.args[0][1].ts.should.equal(params.ts);
			_enqueue.args[0][1].tt.should.equal(params.tt);
			_enqueue.args[0][1].ta.should.equal(params.ta);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should fail without transaction ID", function () {
			var fn = sinon.spy()
			var visitor = ua()

			var result = visitor.transaction(null, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql({}, "the transaction params should not be persisted")

			_enqueue.called.should.equal(false, "#_enqueue should have not been called once");
			fn.calledOnce.should.equal(true, "callback should have been called once");
			fn.args[0][0].should.be.instanceof(Error);
			fn.thisValues[0].should.equal(visitor);
		});

	});

});










