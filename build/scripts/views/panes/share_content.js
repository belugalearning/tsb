(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, ShareContent, ShareContentTemplate, _ref;

    Backbone = require('backbone');
    ShareContentTemplate = require('text!templates/panes/share_content.html');
    return ShareContent = (function(_super) {
      __extends(ShareContent, _super);

      function ShareContent() {
        this.cleanup = __bind(this.cleanup, this);
        this.render = __bind(this.render, this);        _ref = ShareContent.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ShareContent.prototype.template = _.template(ShareContentTemplate);

      ShareContent.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        this.$el.html(tmpl);
        return this;
      };

      ShareContent.prototype.cleanup = function() {
        return this.remove();
      };

      return ShareContent;

    })(Backbone.View);
  });

}).call(this);
