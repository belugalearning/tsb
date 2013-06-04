(function() {
  define(function(require) {
    var Bike, Squire;

    Squire = require('squire');
    Bike = require('bike');
    return describe('Test Bike', function() {
      describe('with real Wheel', function() {
        return it('it has a real wheel', function() {
          var bike;

          bike = new Bike();
          return bike.wheelType().should.equal("real wheel");
        });
      });
      return describe('with Mock', function() {
        return it('is has a fake wheel', function(done) {
          var FakeWheel, squire;

          squire = new Squire();
          FakeWheel = (function() {
            function FakeWheel() {}

            FakeWheel.prototype.type = function() {
              return "fake wheel";
            };

            return FakeWheel;

          })();
          return squire.mock('wheel', Squire.Helpers.returns(FakeWheel)).require(['bike'], function(Bike) {
            var bike;

            bike = new Bike();
            bike.wheelType().should.equal("fake wheel");
            return done();
          });
        });
      });
    });
  });

}).call(this);
