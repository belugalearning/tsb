(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Nav, NavTemplate, _ref;

    Backbone = require('backbone');
    NavTemplate = require('text!templates/modules/nav.html');
    return Nav = (function(_super) {
      __extends(Nav, _super);

      function Nav() {
        this.setHighlight = __bind(this.setHighlight, this);
        this.setSelection = __bind(this.setSelection, this);
        this.navigate = __bind(this.navigate, this);
        this.render = __bind(this.render, this);        _ref = Nav.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Nav.prototype.template = _.template(NavTemplate);

      Nav.prototype.events = {
        "click a": "navigate"
      };

      Nav.prototype.initialize = function() {
        return this.page = this.options.page;
      };

      Nav.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        return this.$el.html(tmpl);
      };

      Nav.prototype.navigate = function(e) {
        console.log("nav navigate: " + e.target.attributes.href.value);
        e.preventDefault();
        this.setHighlight("." + e.target.attributes.href.value);
        return Backbone.history.navigate(e.target.attributes.href.value, true);
      };

      Nav.prototype.setSelection = function(selection) {
        console.log("set selection: " + selection);
        this.setHighlight("." + selection.split('_')[0]);
        return this.options.page.subnav.swap(selection);
      };

      Nav.prototype.setHighlight = function(highlighEl) {
        this.$el.find('a').removeClass("active");
        return this.$el.find(highlighEl).addClass("active");
      };

      return Nav;

    })(Backbone.View);
  });

}).call(this);
