define(["vendor/amd/remoteStorage",
		"vendor/amd/presentations"],
(remoteStorage, empty) ->
	prefix = "Strut_"
	remoteStorage.loadModule('presentations', '0.1', 'rw')
	console.log remoteStorage.presentations.public
	class FileStorage
		constructor: () ->
			# this should be configurable!
			@storageImpl = localStorage

		fileNames: () ->
			numFiles = @storageImpl.length
			idx = 0
			fileNames = []
			while idx < numFiles
				fileName = localStorage.key(idx)
				if (fileName.indexOf(prefix) != -1)
					fileNames.push(fileName.replace(prefix, ""))
				++idx
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
	new FileStorage()
)