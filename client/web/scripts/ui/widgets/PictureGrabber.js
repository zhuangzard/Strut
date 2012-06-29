// Generated by CoffeeScript 1.3.3
/*
@author Matt Crinklaw-Vogt
*/

define(["vendor/backbone", "./Templates", "common/Throttler"], function(Backbone, Templates, Throttler) {
  return Backbone.View.extend({
    className: "pictureGrabber modal",
    events: {
      "click .ok": "okClicked",
      "keyup input[name='imageUrl']": "urlChanged",
      "paste input[name='imageUrl']": "urlChanged"
    },
    initialize: function() {
      return this.throttler = new Throttler(200, this);
    },
    show: function(cb) {
      this.cb = cb;
      return this.$el.modal('show');
    },
    okClicked: function() {
      if (!this.$el.find(".ok").hasClass("disabled")) {
        this.cb(this.src);
        return this.$el.modal('hide');
      }
    },
    urlChanged: function() {
      return this.throttler.submit(this.loadImage, {
        rejectionPolicy: "runLast"
      });
    },
    loadImage: function() {
      this.img.src = this.$input.val();
      return this.src = this.img.src;
    },
    _imgLoadError: function() {
      this.$el.find(".ok").addClass("disabled");
      return this.$el.find(".alert").removeClass("disp-none");
    },
    _imgLoaded: function() {
      this.$el.find(".ok").removeClass("disabled");
      return this.$el.find(".alert").addClass("disp-none");
    },
    render: function() {
      var _this = this;
      this.$el.html(Templates.PictureGrabber());
      this.$el.modal();
      this.$el.modal("hide");
      this.img = this.$el.find("img")[0];
      this.img.onerror = function() {
        return _this._imgLoadError();
      };
      this.img.onload = function() {
        return _this._imgLoaded();
      };
      this.$input = this.$el.find("input[name='imageUrl']");
      return this.$el;
    },
    constructor: function PictureGrabber() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
  });
});
