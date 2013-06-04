/*jshint expr:true */
define(['squire'], function(Squire) {
  describe('squire', function() {

    describe('require', function() { 
      it('should require my specified dependencies', function(done) {
        var squire = new Squire();
        squire.require(['bike'], function(Bike) {
          Bike.should.exist;
          t = new Bike()
          t.wheelType().should.equal('real wheel')
          done();
        });
      });

      it('should require my mock', function(done) {
        var squire = new Squire();
        squire
         .mock('wheel', function(){ return function() { return {type: function() {return "kdjfkdjf"}} }} )
         .require(['bike'], function(Bike) {
            t = new Bike()
            t.wheelType().should.equal('kdjfkdjf')
            done();
         });
      });

    })
  })
})