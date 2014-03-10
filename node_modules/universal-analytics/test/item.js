
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


	describe("#item", function () {
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


		it("should be available via the #i shortcut", function () {
			var visitor = ua()
			visitor.i.should.equal(visitor.item)
		});


		it("should accept arguments (price) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
		});


		it("should accept arguments (price, fn) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (price, quantity) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
		});


		it("should accept arguments (price, quantity, fn) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (price, quantity, sku) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
		});


		it("should accept arguments (price, quantity, sku, fn) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (price, quantity, sku, name) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
			_enqueue.args[1][1].in.should.equal(name);
		});


		it("should accept arguments (price, quantity, sku, name, fn) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
			_enqueue.args[1][1].in.should.equal(name);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (price, quantity, sku, name, variation) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var variation = Math.random().toString();

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name, variation);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
			_enqueue.args[1][1].in.should.equal(name);
			_enqueue.args[1][1].iv.should.equal(variation);
		});


		it("should accept arguments (price, quantity, sku, name, variation, fn) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var variation = Math.random().toString();
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name, variation, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
			_enqueue.args[1][1].in.should.equal(name);
			_enqueue.args[1][1].iv.should.equal(variation);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (price, quantity, sku, name, variation, params) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var variation = Math.random().toString();
			var params = {foo: Math.random().toString()};

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name, variation, params);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv", "foo"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
			_enqueue.args[1][1].in.should.equal(name);
			_enqueue.args[1][1].iv.should.equal(variation);
			_enqueue.args[1][1].foo.should.equal(params.foo);
		});


		it("should accept arguments (price, quantity, sku, name, variation, params, fn) when chained to transaction", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var variation = Math.random().toString();
			var params = {foo: Math.random().toString()};
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name, variation, params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv", "foo"]);
			_enqueue.args[1][1].ti.should.equal(transaction);
			_enqueue.args[1][1].ip.should.equal(price);
			_enqueue.args[1][1].iq.should.equal(quantity);
			_enqueue.args[1][1].ic.should.equal(sku);
			_enqueue.args[1][1].in.should.equal(name);
			_enqueue.args[1][1].iv.should.equal(variation);
			_enqueue.args[1][1].foo.should.equal(params.foo);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (price, quantity, sku, name, variation, params, fn) when params include transaction", function () {
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var variation = Math.random().toString();
			var params = {ti: Math.random()};
			var fn = sinon.spy()

			var visitor = ua();

			var result = visitor.item(price, quantity, sku, name, variation, params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("item");
			_enqueue.args[0][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv"]);
			_enqueue.args[0][1].ip.should.equal(price);
			_enqueue.args[0][1].iq.should.equal(quantity);
			_enqueue.args[0][1].ic.should.equal(sku);
			_enqueue.args[0][1].in.should.equal(name);
			_enqueue.args[0][1].iv.should.equal(variation);
			_enqueue.args[0][1].ti.should.equal(params.ti);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (params, fn) when params include transaction", function () {
			var params = {
				ip: Math.random(),
				iq: Math.random(),
				ic: Math.random().toString(),
				in: Math.random().toString(),
				iv: Math.random().toString(),
				ti: Math.random()
			};
			var fn = sinon.spy()

			var visitor = ua();

			var result = visitor.item(params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("item");
			_enqueue.args[0][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv"]);
			_enqueue.args[0][1].ip.should.equal(params.ip);
			_enqueue.args[0][1].iq.should.equal(params.iq);
			_enqueue.args[0][1].ic.should.equal(params.ic);
			_enqueue.args[0][1].in.should.equal(params.in);
			_enqueue.args[0][1].iv.should.equal(params.iv);
			_enqueue.args[0][1].ti.should.equal(params.ti);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should accept arguments (params, fn) when chained to a transaction", function () {
			var transaction = Math.random().toString();
			var params = {
				ip: Math.random(),
				iq: Math.random(),
				ic: Math.random().toString(),
				in: Math.random().toString(),
				iv: Math.random().toString()
			};
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(params, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");
			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[1][1], "the transaction params should be persisted as the context of the visitor clone")

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for the transaction");
			_enqueue.args[1][0].should.equal("item");
			_enqueue.args[1][1].should.have.keys(["ti", "ip", "iq", "ic", "in", "iv"]);
			_enqueue.args[1][1].ip.should.equal(params.ip);
			_enqueue.args[1][1].iq.should.equal(params.iq);
			_enqueue.args[1][1].ic.should.equal(params.ic);
			_enqueue.args[1][1].in.should.equal(params.in);
			_enqueue.args[1][1].iv.should.equal(params.iv);
			_enqueue.args[1][1].ti.should.equal(transaction);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should allow daisy-chaining to re-use arguments", function () {
			var transaction = Math.random().toString();
			var price = Math.random();
			var quantity = Math.random();
			var sku = Math.random().toString();
			var name = Math.random().toString();
			var name2 = Math.random().toString();
			var variation = Math.random().toString();
			var fn = sinon.spy()

			var visitor = ua().transaction(transaction);

			var result = visitor.item(price, quantity, sku, name, variation).item({in: name2}, fn);

			_enqueue.calledThrice.should.equal(true, "#_enqueue should have been called thrice, once for the transaction before");
			_enqueue.args[0][0].should.equal("transaction");

			_enqueue.args[1][0].should.equal(_enqueue.args[2][0]);
			_enqueue.args[1][1].ti.should.equal(_enqueue.args[2][1].ti, "ti should be equal on both");
			_enqueue.args[1][1].ip.should.equal(_enqueue.args[2][1].ip, "ip should be equal on both");
			_enqueue.args[1][1].iq.should.equal(_enqueue.args[2][1].iq, "iq should be equal on both");
			_enqueue.args[1][1].ic.should.equal(_enqueue.args[2][1].ic, "ic should be equal on both");
			_enqueue.args[1][1].iv.should.equal(_enqueue.args[2][1].iv, "iv should be equal on both");
			_enqueue.args[2][1].in.should.equal(name2, "name should have changed on second item");

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});


		it("should fail without transaction ID", function () {
			var params = {
				ip: Math.random(),
				iq: Math.random(),
				ic: Math.random().toString(),
				in: Math.random().toString(),
				iv: Math.random().toString()
			};
			var fn = sinon.spy()

			var visitor = ua();

			var result = visitor.item(params, fn);

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










