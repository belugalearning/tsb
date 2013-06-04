define (require) ->

  Squire = require 'squire'
  Bike = require 'bike'

  describe 'Test Bike', () ->

    describe 'with real Wheel', () ->
      it 'it has a real wheel', () ->
        bike = new Bike()
        bike.wheelType().should.equal("real wheel")

    describe 'with Mock', () ->

      it 'is has a fake wheel', (done) ->
        squire = new Squire()
      
        class FakeWheel
          type: ->
            return "fake wheel"
      
        squire
          .mock( 'wheel', Squire.Helpers.returns(FakeWheel) )
          .require ['bike'], (Bike) ->
            bike = new Bike()
            bike.wheelType().should.equal("fake wheel")
            done()
