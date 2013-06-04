(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, BundleItemTemplate, BundleList, _ref;

    Backbone = require('backbone');
    BundleItemTemplate = require('text!templates/modules/bundle_tr.html');
    return BundleList = (function(_super) {
      __extends(BundleList, _super);

      function BundleList() {
        this.navigate = __bind(this.navigate, this);
        this.render = __bind(this.render, this);        _ref = BundleList.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      BundleList.prototype.template = _.template(BundleItemTemplate);

      BundleList.prototype.events = {
        "click a": "navigate"
      };

      BundleList.prototype.initialize = function() {
        console.log(this.options.collection);
        this.collection = this.options.collection;
        return this.listenTo(this.collection, 'reset', this.render);
      };

      BundleList.prototype.render = function() {
        var _this = this;

        return this.collection.each(function(item) {
          return _this.$el.append(_this.template(item.attributes));
        });
      };

      BundleList.prototype.navigate = function(e) {
        e.preventDefault();
        return Backbone.history.navigate(e.target.attributes.href.value, true);
      };

      return BundleList;

    })(Backbone.View);
  });

}).call(this);
