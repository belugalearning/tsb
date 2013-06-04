(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var App, Backbone, PageView, Router, _ref;

    Backbone = require('backbone');
    PageView = require('views/page');
    Router = require('routers/router');
    return App = (function(_super) {
      __extends(App, _super);

      function App() {
        this.setCurrentPane = __bind(this.setCurrentPane, this);
        this.init_page = __bind(this.init_page, this);        _ref = App.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      App.prototype.initialize = function() {
        this.init_page();
        window.router = new Router({
          app: this
        });
        Backbone.history.start({
          pushState: true
        });
        return console.log("App init");
      };

      App.prototype.init_page = function() {
        this.pageView = new PageView({
          el: "#beluga-tsb",
          navEl: "#nav",
          subnavEl: "#subnav"
        });
        return this.pageView.render();
      };

      App.prototype.setCurrentPane = function(page) {
        if (!(page === this.currentPage)) {
          this.currentPage = page;
        }
        return this.pageView.displayPane(this.currentPage);
      };

      return App;

    })(Backbone.Model);
  });

}).call(this);
