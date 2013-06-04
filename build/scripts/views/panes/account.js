(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var AccountPane, AccountTemplate, Backbone, _ref;

    Backbone = require('backbone');
    AccountTemplate = require('text!templates/panes/account.html');
    return AccountPane = (function(_super) {
      __extends(AccountPane, _super);

      function AccountPane() {
        this.cleanup = __bind(this.cleanup, this);
        this.render = __bind(this.render, this);        _ref = AccountPane.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AccountPane.prototype.template = _.template(AccountTemplate);

      AccountPane.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        this.$el.html(tmpl);
        return this;
      };

      AccountPane.prototype.cleanup = function() {
        console.log("remove");
        return this.remove();
      };

      return AccountPane;

    })(Backbone.View);
  });

}).call(this);
