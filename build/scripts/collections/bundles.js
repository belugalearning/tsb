(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, Bundle, BundleCollection, _ref;

    Backbone = require('backbone');
    Bundle = require('models/bundle');
    return BundleCollection = (function(_super) {
      __extends(BundleCollection, _super);

      function BundleCollection() {
        _ref = BundleCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      BundleCollection.prototype.model = Bundle;

      BundleCollection.prototype.url = "/api/bundles";

      return BundleCollection;

    })(Backbone.Collection);
  });

}).call(this);
