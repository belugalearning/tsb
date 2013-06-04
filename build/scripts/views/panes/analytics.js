(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AnalyticsPane, AnalyticsTemplate, Backbone, _ref;

    Backbone = require('backbone');
    AnalyticsTemplate = require('text!templates/panes/analytics.html');
    return AnalyticsPane = (function(_super) {
      __extends(AnalyticsPane, _super);

      function AnalyticsPane() {
        this.wire = __bind(this.wire, this);
        this.cleanup = __bind(this.cleanup, this);
        this.render = __bind(this.render, this);        _ref = AnalyticsPane.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AnalyticsPane.prototype.template = _.template(AnalyticsTemplate);

      AnalyticsPane.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        this.$el.html(tmpl);
        return this;
      };

      AnalyticsPane.prototype.cleanup = function() {
        return this.remove();
      };

      AnalyticsPane.prototype.wire = function() {};

      return AnalyticsPane;

    })(Backbone.View);
  });

}).call(this);
