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
        this.showShareContent = __bind(this.showShareContent, this);
        this.showCreateContent = __bind(this.showCreateContent, this);
        this.showRoot = __bind(this.showRoot, this);        _ref = MainRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MainRouter.prototype.routes = {
        '': 'showRoot',
        '/': 'showRoot',
        'create_content': 'showCreateContent',
        'share_content': 'showShareContent',
        'analytics': 'showAnalytics',
        'account': 'showAccount'
      };

      MainRouter.prototype.initialize = function() {
        return this.app = arguments[0].app;
      };

      MainRouter.prototype.showRoot = function() {
        return this.app.setCurrentPane('root');
      };

      MainRouter.prototype.showCreateContent = function() {
        return this.app.setCurrentPane('create_content');
      };

      MainRouter.prototype.showShareContent = function() {
        return this.app.setCurrentPane('share_content');
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
