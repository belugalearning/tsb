(function() {
  define(function(require) {
    var Wheel, jQuery;

    jQuery = require('jquery');
    return Wheel = (function() {
      function Wheel() {}

      Wheel.prototype.type = function() {
        return "mock wheel";
      };

      return Wheel;

    })();
  });

}).call(this);
