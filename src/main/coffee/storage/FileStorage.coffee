define(["vendor/amd/remote_storage/remoteStorage",
		"vendor/amd/remote_storage/modules/presentations"],
(remoteStorage, empty) ->
	prefix = "Strut_"


	class RemoteStorageAdapter
		constructor: ->
			remoteStorage.claimAccess('presentations', 'rw')
			@impl = remoteStorage.presentations.private

		fileNames: (cb) ->
			@impl.list('', cb)

		remove: (name) ->
			@impl.remove(name)

		save: (name, contents) ->
			@impl.set(name, contents)

		open: (name) ->
			@impl.get(name)


	class LocalStorageAdapter
		constructor: () ->
			# this should be configurable!
			@storageImpl = localStorage

		fileNames: (cb) ->
			numFiles = @storageImpl.length
			idx = 0
			fileNames = []
			while idx < numFiles
				fileName = localStorage.key(idx)
				if (fileName.indexOf(prefix) != -1)
					fileNames.push(fileName.replace(prefix, ""))
				++idx

			if cb?
				cb(fileNames)
			
			fileNames

		remove: (fileName) ->
			@storageImpl.removeItem(prefix + fileName)

		save: (fileName, contents) ->
			@storageImpl.setItem(prefix + fileName, JSON.stringify(contents))

		open: (fileName) ->
			item = @storageImpl.getItem(prefix + fileName)
			if item?
				try
					JSON.parse(item)
				catch e
					return null
			else
				null

	# FileStorage should not be a singleton...
	new RemoteStorageAdapter()
)