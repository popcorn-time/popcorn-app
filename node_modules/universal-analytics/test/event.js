
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


	describe("#event", function () {
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


		it("should be available via the #e shortcut", function () {
			var visitor = ua()
			visitor.e.should.equal(visitor.event)
		});


		it("should accept arguments (category, action)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();

			var visitor = ua()

			var result = visitor.event(category, action);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);
		});

		it("should accept arguments (category, action, fn)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();
			var fn = sinon.spy()

			ua().event(category, action, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should accept arguments (category, action, label)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();
			var label = Math.random().toString();

			ua().event(category, action, label);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);
			_enqueue.args[0][1].el.should.equal(label);
		});

		it("should accept arguments (category, action, label, fn)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();
			var label = Math.random().toString();
			var fn = sinon.spy()

			ua().event(category, action, label, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);
			_enqueue.args[0][1].el.should.equal(label);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should accept arguments (category, action, label, value)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();
			var label = Math.random().toString();
			var value = Math.random();

			ua().event(category, action, label, value);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el", "ev"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);
			_enqueue.args[0][1].el.should.equal(label);
			_enqueue.args[0][1].ev.should.equal(value);
		});

		it("should accept arguments (category, action, label, value, fn)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();
			var label = Math.random().toString();
			var value = Math.random();
			var fn = sinon.spy()

			ua().event(category, action, label, value, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el", "ev"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);
			_enqueue.args[0][1].el.should.equal(label);
			_enqueue.args[0][1].ev.should.equal(value);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should accept arguments (category, action, label, value, params, fn)", function () {
			var category = Math.random().toString();
			var action = Math.random().toString();
			var label = Math.random().toString();
			var value = Math.random();
			var params = {"p": "/" + Math.random()}
			var fn = sinon.spy()

			ua().event(category, action, label, value, params, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el", "ev", "p"]);
			_enqueue.args[0][1].ec.should.equal(category);
			_enqueue.args[0][1].ea.should.equal(action);
			_enqueue.args[0][1].el.should.equal(label);
			_enqueue.args[0][1].ev.should.equal(value);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should accept arguments (params)", function () {
			var params = {
				ec: Math.random().toString(),
				ea: Math.random().toString(),
				el: Math.random().toString(),
				ev: Math.random(),
				"p": "/" + Math.random(),
				"empty": null
			}
			var json = JSON.stringify(params)

			ua().event(params);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el", "ev", "p"]);
			_enqueue.args[0][1].ec.should.equal(params.ec);
			_enqueue.args[0][1].ea.should.equal(params.ea);
			_enqueue.args[0][1].el.should.equal(params.el);
			_enqueue.args[0][1].ev.should.equal(params.ev);
			_enqueue.args[0][1].p.should.equal(params.p);

			JSON.stringify(params).should.equal(json, "params should not have been modified")
		});

		it("should accept arguments (params, fn)", function () {
			var params = {
				ec: Math.random().toString(),
				ea: Math.random().toString(),
				el: Math.random().toString(),
				ev: Math.random(),
				"p": "/" + Math.random()
			}
			var fn = sinon.spy()

			ua().event(params, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "el", "ev", "p"]);
			_enqueue.args[0][1].ec.should.equal(params.ec);
			_enqueue.args[0][1].ea.should.equal(params.ea);
			_enqueue.args[0][1].el.should.equal(params.el);
			_enqueue.args[0][1].ev.should.equal(params.ev);
			_enqueue.args[0][1].p.should.equal(params.p);

			fn.calledOnce.should.equal(true, "callback should have been called once")
		});

		it("should use the dp attribute as p for providing a event path", function () {
			var params = {
				ec: Math.random().toString(),
				ea: Math.random().toString(),
				"dp": "/" + Math.random(),
			}
			var json = JSON.stringify(params)

			ua().event(params);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("event");
			_enqueue.args[0][1].should.have.keys(["ec", "ea", "p"]);
			_enqueue.args[0][1].ec.should.equal(params.ec);
			_enqueue.args[0][1].ea.should.equal(params.ea);
			_enqueue.args[0][1].p.should.equal(params.dp);

			JSON.stringify(params).should.equal(json, "params should not have been modified")
		});


		it("should allow daisy-chaining and re-using parameters", function () {
			var params = {
				ec: Math.random().toString(),
				ea: Math.random().toString(),
				el: Math.random().toString(),
				ev: Math.random()
			}

			ua().event(params).event()

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for each event");
			_enqueue.args[0][0].should.equal(_enqueue.args[1][0]);
			_enqueue.args[0][1].ec.should.equal(_enqueue.args[1][1].ec);
			_enqueue.args[0][1].ea.should.equal(_enqueue.args[1][1].ea);
			_enqueue.args[0][1].el.should.equal(_enqueue.args[1][1].el);
			_enqueue.args[0][1].ev.should.equal(_enqueue.args[1][1].ev);
		});


		it("should extend and overwrite params when daisy-chaining", function () {
			var params = {
				ec: Math.random().toString(),
				ea: Math.random().toString(),
				el: Math.random().toString(),
				ev: Math.random()
			}
			var category = Math.random().toString();

			ua().event(params).event(category)

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for each event");
			_enqueue.args[0][0].should.equal(_enqueue.args[1][0]);
			_enqueue.args[0][1].ea.should.equal(_enqueue.args[1][1].ea);
			_enqueue.args[0][1].el.should.equal(_enqueue.args[1][1].el);
			_enqueue.args[0][1].ev.should.equal(_enqueue.args[1][1].ev);

			_enqueue.args[0][1].ec.should.equal(params.ec);
			_enqueue.args[1][1].ec.should.equal(category);
		});

		it("should re-use the path when daisy-chained to a pageview", function () {
			var path = "/" + Math.random()
			var params = {
				ec: Math.random().toString(),
				ea: Math.random().toString(),
				el: Math.random().toString(),
				ev: Math.random()
			}

			ua().pageview(path).event(params).event(params);

			_enqueue.calledThrice.should.equal(true, "#_enqueue should have been called twice, once for the pageview, once for the pageview");

			_enqueue.args[1][1].p.should.equal(path)
			_enqueue.args[2][1].p.should.equal(path)
		})

		it("should fail without event category", function () {
			var fn = sinon.spy()
			var action = Math.random().toString();
			var visitor = ua()

			var result = visitor.event(null, action, fn);

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql({}, "the transaction params should not be persisted")

			_enqueue.called.should.equal(false, "#_enqueue should have not been called once");
			fn.calledOnce.should.equal(true, "callback should have been called once");
			fn.args[0][0].should.be.instanceof(Error);
			fn.thisValues[0].should.equal(visitor);
		});

		it("should fail without event action", function () {
			var fn = sinon.spy()
			var category = Math.random().toString();
			var visitor = ua()

			var result = visitor.event(category, null, fn);

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










