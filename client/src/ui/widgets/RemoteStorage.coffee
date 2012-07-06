define(["vendor/amd/backbone",
		"./Templates"],
(Backbone, Templates) ->
	Backbone.View.extend(
		className: "remoteStorage"
		initialize: ->

		render: ->
			@$el.html(Templates.RemoteStorage())
			@$el
	)
)