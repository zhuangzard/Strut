define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		initialize: function() {
			this._template = JST['bundles/slide_editor/templates/SlideEditor'];
		},

		render: function() {
			this.$el.html(this._template());
			return this;
		}
	});
});