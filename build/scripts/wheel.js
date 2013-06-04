(function() {
  define(function(require) {
    var Wheel;

    return Wheel = (function() {
      function Wheel() {}

      Wheel.prototype.type = function() {
        return "real wheel";
      };

      return Wheel;

    })();
  });

}).call(this);
