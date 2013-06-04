(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, TestQuestionModel, _ref;

    Backbone = require('backbone');
    return TestQuestionModel = (function(_super) {
      __extends(TestQuestionModel, _super);

      function TestQuestionModel() {
        _ref = TestQuestionModel.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return TestQuestionModel;

    })(Backbone.Model);
  });

}).call(this);
