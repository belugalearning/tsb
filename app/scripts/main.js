(function () {
   "use strict";

  require.config({
      baseUrl: "/scripts",
      paths: {
          text: '../components/requirejs-text/text',
          jquery: '../components/jquery/jquery',
          "jquery-ui" :  '../components/jquery-ui/ui/jquery-ui',
          "jquery-ui-touch-punch" :  '../components/jquery-ui-touch-punch/jquery.ui.touch-punch',
          "jquery-dateFormat": '../components/jquery-dateFormat/jquery.dateFormat-1.0',
          parsley: '../components/parsley/parsley',
          select2 :  '../components/select2.js',
          bootstrap: 'vendor/bootstrap',
          underscore: '../components/lodash/dist/lodash',
          backbone: '../components/backbone/backbone',
          localstorage: '../components/Backbone.localStorage/backbone.localStorage',
          "backbone.bootstrap-modal": '../components/backbone.bootstrap-modal/src/backbone.bootstrap-modal',
          d3: '../components/d3/d3'
      },
      shim: {
          "jquery-dateFormat": {
              deps: ['jquery'],
              exports: 'jQuery.format.date'
          },
          "jquery-ui-dragdrop": {
              deps: ['jquery'],
              exports: 'jQuery.ui'
          },
          "jquery-ui-touch-punch": {
              deps: ['jquery','jquery-ui-dragdrop'],
              exports: 'jQuery.ui'
          },
          parsley: {
              deps: ['jquery'],
              exports: 'jQuery.fn.parsley'
          },
          bootstrap: {
              deps: ['jquery'],
              exports: 'jQuery.fn.modal'
          },
          d3: {
              deps: ['jquery'],
              exports: 'd3'
          },
          backbone: {
              deps: ['jquery', 'underscore'],
              exports: 'Backbone'
          },
          "backbone.bootstrap-modal": {
              deps: ['jquery','backbone'],
              exports: 'Backbone.BootstrapModal'
          }
      },
      baseURL: "./"
  });

  require([
    'app'
  ], function (App) {
    $.ajaxSetup({ cache: false });
    window.app = new App();
  });

}());

