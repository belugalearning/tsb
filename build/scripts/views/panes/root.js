(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Root, RootTemplate, _ref;

    Backbone = require('backbone');
    RootTemplate = require('text!templates/panes/root.html');
    return Root = (function(_super) {
      __extends(Root, _super);

      function Root() {
        this.cleanup = __bind(this.cleanup, this);
        this.wire = __bind(this.wire, this);
        this.render = __bind(this.render, this);        _ref = Root.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Root.prototype.template = _.template(RootTemplate);

      Root.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        this.$el.html(tmpl);
        return this;
      };

      Root.prototype.wire = function() {};

      Root.prototype.cleanup = function() {
        return this.remove();
      };

      return Root;

    })(Backbone.View);
  });

}).call(this);
