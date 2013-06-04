(function() {
  define(function(require) {
    var Chai, FakeThing, Squire, T, TM, injector, t;

    Chai = require('chai');
    Squire = require('squire');
    T = require('test');
    TM = require('test_module');
    t = new TM();
    t.test();
    FakeThing = (function() {
      function FakeThing() {}

      FakeThing.prototype.type = function() {
        return "fake ping";
      };

      return FakeThing;

    })();
    injector = new Squire();
    return injector.mock('test', Squire.Helpers.returns(FakeThing)).require(['test_module', 'mocha', 'chai'], function(TestModule, Mocha, Chai) {
      return describe('test module', function() {
        return it('state should be "success"', function() {
          t = new TestModule();
          return expect(t.test()).to.equal("fake ping");
        });
      });
    });
  });

}).call(this);
