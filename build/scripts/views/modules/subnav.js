(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Subnav, SubnavTemplate, _ref;

    Backbone = require('backbone');
    SubnavTemplate = require('text!templates/modules/subnav_content.html');
    return Subnav = (function(_super) {
      __extends(Subnav, _super);

      function Subnav() {
        this.render = __bind(this.render, this);        _ref = Subnav.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Subnav.prototype.template = _.template(SubnavTemplate);

      Subnav.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        return this.$el.html(tmpl);
      };

      return Subnav;

    })(Backbone.View);
  });

}).call(this);
