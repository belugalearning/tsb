define (require) ->
  expect = chai.expect  

  Bike = require 'bike'

  describe 'Bike Test', ->
    it 'state should be "success"', ->
      bike = new Bike

      expect(bike.wheelType()).to.equal("real wheel")