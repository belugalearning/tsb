(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, MainRouter, _ref;

    Backbone = require('backbone');
    return MainRouter = (function(_super) {
      __extends(MainRouter, _super);

      function MainRouter() {
        this.showAccount = __bind(this.showAccount, this);
        this.showAnalytics = __bind(this.showAnalytics, this);
        this.showSet = __bind(this.showSet, this);
        this.showBundleNew = __bind(this.showBundleNew, this);
        this.showBundleView = __bind(this.showBundleView, this);
        this.showBundleList = __bind(this.showBundleList, this);
        this.showRoot = __bind(this.showRoot, this);        _ref = MainRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MainRouter.prototype.routes = {
        '': 'showRoot',
        '/': 'showRoot',
        'bundle': 'showBundleList',
        'bundle/new': 'showBundleNew',
        'bundle/view/:id': 'showBundleView',
        'set': 'showSet',
        'analytics': 'showAnalytics',
        'account': 'showAccount'
      };

      MainRouter.prototype.initialize = function() {
        return this.app = arguments[0].app;
      };

      MainRouter.prototype.showRoot = function() {
        return this.app.setCurrentPane('root');
      };

      MainRouter.prototype.showBundleList = function() {
        return this.app.setCurrentPane('bundle');
      };

      MainRouter.prototype.showBundleView = function(id) {
        window.bundleViewID = id;
        return this.app.setCurrentPane('bundle_view');
      };

      MainRouter.prototype.showBundleNew = function() {
        return this.app.setCurrentPane('bundle_new');
      };

      MainRouter.prototype.showSet = function() {
        return this.app.setCurrentPane('set');
      };

      MainRouter.prototype.showAnalytics = function() {
        return this.app.setCurrentPane('analytics');
      };

      MainRouter.prototype.showAccount = function() {
        return this.app.setCurrentPane('account');
      };

      return MainRouter;

    })(Backbone.Router);
  });

}).call(this);
