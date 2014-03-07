should     = require 'should'
properties = require '../lib/enumerate-properties'

describe 'enumerate-properties.js', ->

	testObject =
		foo: 'bar'
		bar: 'foo'
		nested: 
			foo: 'bar'
			bar: 'foo'
		foobar: 'barfoo'
		verynested:
			nested:
				foo: 'bar'
				bar: 'foo'

	describe 'enumerate()', ->
		it 'should enumerate all properties and values of an object', ->
			props = []
			properties.enumerate testObject, (key, value) ->
				props.push
					key: key
					val: value

			props[0].key.should.equal 'foo'
			props[0].val.should.equal 'bar'
			props[1].key.should.equal 'bar'
			props[1].val.should.equal 'foo'
			props[2].key.should.equal 'nested.foo'
			props[3].key.should.equal 'nested.bar'
			props[3].val.should.equal 'foo'
			props[4].key.should.equal 'foobar'
			props[6].key.should.equal 'verynested.nested.bar'
			props[6].val.should.equal 'foo'

	describe 'getAtPath()', ->
		it 'should get a property at given path', ->
			result = properties.getAtPath testObject, 'nested.foo'
			result.should.equal 'bar'

			result = properties.getAtPath testObject, 'foo'
			result.should.equal 'bar'

			result = properties.getAtPath testObject, 'foobar'
			result.should.equal 'barfoo'

			result = properties.getAtPath testObject, 'verynested.nested.bar'
			result.should.equal 'foo'

		it 'should return null if no object is passed', ->
			result = properties.getAtPath null, ''
			(result is null).should.be.true

		it 'should return null if invalid path is provided', ->
			result = properties.getAtPath testObject, 'inexistant'
			(result is null).should.be.true

			result = properties.getAtPath testObject, 'inexistant,invalid'
			(result is null).should.be.true

			result = properties.getAtPath testObject, null
			(result is null).should.be.true

	describe 'setAtPath()', ->
		it 'should set a property at given path', ->
			properties.setAtPath testObject, 'nested.foo', 'newvalue'
			testObject.nested.foo.should.equal 'newvalue'

		it 'should create the property if given path doesn\'t already exists', ->
			properties.setAtPath testObject, 'newpath.newprop', 'newval'
			testObject.newpath.newprop.should.equal 'newval'
