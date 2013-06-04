(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, BundleModel, _ref;

    Backbone = require('backbone');
    return BundleModel = (function(_super) {
      __extends(BundleModel, _super);

      function BundleModel() {
        _ref = BundleModel.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return BundleModel;

    })(Backbone.Model);
  });

}).call(this);
