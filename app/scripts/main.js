require.config({
  paths: {
    libs: "../scripts/libs",

    jquery: "../scripts/libs/jQuery",
    lodash: "../scripts/libs/lodash",
    backbone: "../scripts/libs/backbone",
    css: "../scripts/libs/css",
    text: "../scripts/libs/text",
    bootstrap: "../components/bootstrap/bootstrap",
    colorpicker: "../components/colorpicker/js/colorpicker",
    gradientPicker: "../components/gradient_picker/jquery.gradientPicker",
    downloadify: "../components/downloadify/js/downloadify.min",
    swfobject: "../components/downloadify/js/swfobject",
    jqueryUI: "../scripts/libs/jqueryUI",
    bundles: "../bundles"
  },

  shim: {
    bootstrap: {
      deps: ["jquery"]
    },
    
    jqueryUI: {
      deps: ["jquery"]
    },

    colorpicker: {
      deps: ["jquery"]
    },

    gradientPicker: {
      deps: ["jquery", "colorpicker"]
    },

    "../preview_export/scripts/impress": {
      exports: "startImpress"
    }
  }
});

require(['features',
         'bundles/editor/view/EditorView',
         'bundles/editor/model/EditorModel',
         'libs/Handlebars',
         'bootstrap'
        ],
function(registry, EditorView, EditorModel, Handlebars) {
  for (tpl in JST) {
    JST[tpl] = Handlebars.template(JST[tpl]);
  }

  var model = new EditorModel(registry);

  // TODO: the model will need to tell us when it is set to go
  // since there may be some awkward handshaking going on with storage
  // providers

	var editor = new EditorView({model: model, registry: registry});

  editor.render();

  $('body').append(editor.$el);
});