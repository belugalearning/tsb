(function() {
  define(function(require) {
    var Bike, expect;

    expect = chai.expect;
    Bike = require('bike');
    return describe('Bike Test', function() {
      return it('state should be "success"', function() {
        var bike;

        bike = new Bike;
        return expect(bike.wheelType()).to.equal("real wheel");
      });
    });
  });

}).call(this);
