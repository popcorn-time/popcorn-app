
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



	describe("#pageview", function () {
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


		it("should be available via the #pv shortcut", function () {
			var visitor = ua()
			visitor.pv.should.equal(visitor.pageview)
		});


		it("should accept arguments (path)", function () {
			var path = "/" + Math.random()

			var visitor = ua("UA-XXXXX-XX")

			var result = visitor.pageview(path)

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp"]);
			_enqueue.args[0][1].dp.should.equal(path);
		});


		it("should accept arguments (path, fn)", function () {
			var path = "/" + Math.random();
			var fn = sinon.spy();

			var visitor = ua("UA-XXXXX-XX")

			var result = visitor.pageview(path, fn)

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp"]);
			_enqueue.args[0][1].dp.should.equal(path);

			fn.calledOnce.should.equal(true, "callback should have been called once");
		});


		it("should accept arguments (params)", function () {
			var params = {
				dp: "/" + Math.random()
			};

			var visitor = ua("UA-XXXXX-XX")

			var result = visitor.pageview(params)

			visitor._context = result._context;
			result.should.eql(visitor, "should return a visitor that is identical except for the context");

			result.should.be.instanceof(ua.Visitor);
			result._context.should.eql(_enqueue.args[0][1], "the pageview params should be persisted as the context of the visitor clone")

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp"]);
			_enqueue.args[0][1].dp.should.equal(params.dp);
		});


		it("should accept arguments (params, fn)", function () {
			var params = {
				dp: "/" + Math.random(),
				empty: null // Should be removed
			};
			var json = JSON.stringify(params)
			var fn = sinon.spy()

			ua("UA-XXXXX-XX").pageview(params, fn)

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp"]);
			_enqueue.args[0][1].dp.should.equal(params.dp);

			fn.calledOnce.should.equal(true, "callback should have been called once");

			JSON.stringify(params).should.equal(json, "params should not have been modified")
		});


		it("should accept arguments (path, hostname)", function () {
			var path = Math.random().toString();
			var hostname = Math.random().toString();

			ua("UA-XXXXX-XX").pageview(path, hostname);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp", "dh"]);
			_enqueue.args[0][1].dp.should.equal(path);
			_enqueue.args[0][1].dh.should.equal(hostname);
		});


		it("should accept arguments (path, hostname, fn)", function () {
			var path = Math.random().toString();
			var hostname = Math.random().toString();
			var fn = sinon.spy()

			ua("UA-XXXXX-XX").pageview(path, hostname, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp", "dh"]);
			_enqueue.args[0][1].dp.should.equal(path);
			_enqueue.args[0][1].dh.should.equal(hostname);

			fn.calledOnce.should.equal(true, "callback should have been called once");
		});


		it("should accept arguments (path, hostname, title)", function () {
			var path = Math.random().toString();
			var hostname = Math.random().toString();
			var title = Math.random().toString();

			ua("UA-XXXXX-XX").pageview(path, hostname, title);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp", "dh", "dt"]);
			_enqueue.args[0][1].dp.should.equal(path);
			_enqueue.args[0][1].dh.should.equal(hostname);
			_enqueue.args[0][1].dt.should.equal(title);
		});


		it("should accept arguments (path, hostname, title, fn)", function () {
			var path = Math.random().toString();
			var hostname = Math.random().toString();
			var title = Math.random().toString();
			var fn = sinon.spy()

			ua("UA-XXXXX-XX").pageview(path, hostname, title, fn);

			_enqueue.calledOnce.should.equal(true, "#_enqueue should have been called once");
			_enqueue.args[0][0].should.equal("pageview");
			_enqueue.args[0][1].should.have.keys(["dp", "dh", "dt"]);
			_enqueue.args[0][1].dp.should.equal(path);
			_enqueue.args[0][1].dh.should.equal(hostname);
			_enqueue.args[0][1].dt.should.equal(title);

			fn.calledOnce.should.equal(true, "callback should have been called once");
		});


		it("should allow daisy-chaining and re-using parameters", function () {
			var path = "/" + Math.random()
			var title = Math.random().toString();

			ua("UA-XXXXX-XX").pageview(path, null, title).pageview()

			_enqueue.calledTwice.should.equal(true, "#_enqueue should have been called twice, once for each pageview");

			_enqueue.args[0][0].should.equal(_enqueue.args[1][0]);
			_enqueue.args[0][1].should.eql(_enqueue.args[1][1]);
		})


		it("should extend and overwrite params when daisy-chaining", function () {
			var path = "/" + Math.random()
			var path2 = "/" + Math.random()
			var title = Math.random().toString();
			var title2 = Math.random().toString();
			var foo = Math.random()

			ua("UA-XXXXX-XX")
				.pageview(path, null, title)
				.pageview({
					dt: title2,
					dp: path2,
					foo: foo
				}).pageview(path)

			_enqueue.calledThrice.should.equal(true, "#_enqueue should have been called three times, once for each pageview");

			_enqueue.args[0][1].should.have.keys(["dp", "dt"]);
			_enqueue.args[0][1].dp.should.equal(path);
			_enqueue.args[0][1].dt.should.equal(title);

			_enqueue.args[1][1].should.have.keys(["dp", "dt", "foo"]);
			_enqueue.args[1][1].dp.should.equal(path2);
			_enqueue.args[1][1].dt.should.equal(title2);
			_enqueue.args[1][1].foo.should.equal(foo);

			_enqueue.args[2][1].should.have.keys(["dp", "dt"]);
			_enqueue.args[2][1].dp.should.equal(path);
			_enqueue.args[2][1].dt.should.equal(title2);
		})

		it("should fail without page path", function () {
			var fn = sinon.spy()
			var visitor = ua()

			var result = visitor.pageview(null, fn);

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










