(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AccountPane, AnalyticsPane, Backbone, BundleList, BundleNew, BundleView, MainLayout, NavView, Page, RootPane, ShareContentPane, SubnavView, _ref;

    Backbone = require('backbone');
    MainLayout = require('text!templates/layouts/index.html');
    RootPane = require('views/panes/root');
    BundleList = require('views/panes/bundle_list');
    BundleNew = require('views/panes/bundle_new');
    BundleView = require('views/panes/bundle_view');
    ShareContentPane = require('views/panes/share_content');
    AnalyticsPane = require('views/panes/analytics');
    AccountPane = require('views/panes/account');
    NavView = require('views/modules/nav');
    SubnavView = require('views/modules/subnav');
    return Page = (function(_super) {
      __extends(Page, _super);

      function Page() {
        this.navigateHome = __bind(this.navigateHome, this);
        this.displayPane = __bind(this.displayPane, this);
        this.injectNav = __bind(this.injectNav, this);
        this.render = __bind(this.render, this);        _ref = Page.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Page.prototype.template = _.template(MainLayout);

      Page.prototype.events = {
        "click a.home": "navigateHome"
      };

      Page.prototype.initialize = function() {
        this.navEl = this.options.navEl;
        this.subnavEl = this.options.subnavEl;
        this.currentPane = null;
        return this.panes = {
          "root": RootPane,
          "bundle": BundleList,
          "bundle_new": BundleNew,
          "bundle_view": BundleView,
          "set": ShareContentPane,
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
          el: this.navEl,
          page: this
        });
        this.nav.render();
        this.subnav = new SubnavView({
          el: this.subnavEl,
          page: this
        });
        return this.subnav.render();
      };

      Page.prototype.displayPane = function(page) {
        if (this.currentPane) {
          this.currentPane.cleanup();
        }
        this.currentPane = new this.panes[page];
        this.nav.setSelection(page);
        if (this.$pane) {
          this.$pane.empty();
        }
        this.$el.find('#pane-container').html(this.currentPane.render().el);
        return this.currentPane.wire();
      };

      Page.prototype.navigateHome = function(e) {
        e.preventDefault();
        Backbone.history.navigate(e.target.attributes.href.value, true);
        return console.log("ping");
      };

      return Page;

    })(Backbone.View);
  });

}).call(this);
