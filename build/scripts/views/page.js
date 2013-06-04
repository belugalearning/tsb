(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AccountPane, AnalyticsPane, Backbone, CreateContentPane, MainLayout, NavView, Page, RootPane, ShareContentPane, SubnavView, _ref;

    Backbone = require('backbone');
    MainLayout = require('text!templates/layouts/index.html');
    RootPane = require('views/panes/root');
    CreateContentPane = require('views/panes/create_content');
    ShareContentPane = require('views/panes/share_content');
    AnalyticsPane = require('views/panes/analytics');
    AccountPane = require('views/panes/account');
    NavView = require('views/modules/nav');
    SubnavView = require('views/modules/subnav');
    return Page = (function(_super) {
      __extends(Page, _super);

      function Page() {
        this.displayPane = __bind(this.displayPane, this);
        this.injectNav = __bind(this.injectNav, this);
        this.render = __bind(this.render, this);        _ref = Page.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Page.prototype.template = _.template(MainLayout);

      Page.prototype.events = {
        "click": 'ping'
      };

      Page.prototype.initialize = function() {
        this.nav = this.options.nav;
        this.subnav = this.options.subnav;
        this.currentPane = null;
        return this.panes = {
          "root": RootPane,
          "create_content": CreateContentPane,
          "share_content": ShareContentPane,
          "analytics": AnalyticsPane,
          "account": AccountPane
        };
      };

      Page.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        this.$el.html(tmpl);
        return this.injectNav();
      };

      Page.prototype.injectNav = function() {
        this.nav = new NavView({
          el: "#nav",
          page: this
        });
        this.nav.render();
        this.subnav = new SubnavView({
          el: "#subnav",
          page: this
        });
        return this.subnav.render();
      };

      Page.prototype.displayPane = function(page) {
        console.log("displaying page " + page);
        if (this.currentPane) {
          this.currentPane.cleanup();
        }
        this.currentPane = new this.panes[page];
        if (this.$pane) {
          this.$pane.empty();
        }
        return this.$el.find('#pane-container').html(this.currentPane.render().el);
      };

      return Page;

    })(Backbone.View);
  });

}).call(this);
