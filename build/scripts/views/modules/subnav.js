(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, BlankSubnavTemplate, BundleSubnavTemplate, Subnav, _ref;

    Backbone = require('backbone');
    BlankSubnavTemplate = require('text!templates/modules/subnav_blank.html');
    BundleSubnavTemplate = require('text!templates/modules/subnav_bundle.html');
    return Subnav = (function(_super) {
      __extends(Subnav, _super);

      function Subnav() {
        this.highlight = __bind(this.highlight, this);
        this.swap = __bind(this.swap, this);
        this.navigate = __bind(this.navigate, this);
        this.render = __bind(this.render, this);        _ref = Subnav.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Subnav.prototype.template = _.template(BlankSubnavTemplate);

      Subnav.prototype.events = {
        "click a": "navigate"
      };

      Subnav.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        return this.$el.html(tmpl);
      };

      Subnav.prototype.navigate = function(e) {
        e.preventDefault();
        return Backbone.history.navigate(e.target.attributes.href.value, true);
      };

      Subnav.prototype.swap = function(nav) {
        console.log("swap");
        console.log(nav);
        if (this.current && (this.current === nav.split('_')[0])) {
          this.highlight(nav.split('_')[0]);
          return;
        }
        this.current = nav.split('_').slice(-1)[0];
        if (this.current === "blank") {
          this.template = _.template(BlankSubnavTemplate);
        } else if (this.current === "bundle") {
          this.template = _.template(BundleSubnavTemplate);
        } else {
          this.template = _.template(BlankSubnavTemplate);
        }
        return this.render();
      };

      Subnav.prototype.highlight = function(navEl) {
        console.log("highlight");
        console.log(navEl);
        this.$el.find("a").removeClass("active");
        return this.$el.find(navEl).addClass("active");
      };

      return Subnav;

    })(Backbone.View);
  });

}).call(this);
