module.exports =
	enumerate: (object, callback) ->
		walk = ((obj, stack) ->
				stack = stack || ''
				return true if typeof obj isnt 'object'
				for prop,val of obj
					if walk val, stack + '.' + prop
						str = ''
						if stack
							str = stack.substring(1) + '.'
						str += prop
						callback str, val
				return false
			)
		walk(object)

	getAtPath: (object, path) ->
		return null if path is null
		props = path.split '.'
		for i in props
			return null if !object or typeof object isnt 'object'
			object = object[i]
		return null if object is undefined
		object

	setAtPath: (object, path, value) ->
		parts = path.split '.'
		len   = parts.length - 1
		for i in [0...len]
			if !object[parts[i]]
				object[parts[i]] = {}
			object = object[parts[i]]
		object[parts[len]] = value
