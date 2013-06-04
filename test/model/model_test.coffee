define (require) ->

  Chai = require 'chai'
  Squire = require 'squire'

  T = require 'test'
  TM = require 'test_module'

  t = new TM()
  t.test()

  class FakeThing
    type: ->
      return "fake ping"

  injector = new Squire()
  injector.mock('test',Squire.Helpers.returns(FakeThing)
  ).require(['test_module', 'mocha','chai'], (TestModule,Mocha, Chai) -> 


    describe 'test module', ->
      it 'state should be "success"', ->
        t = new TestModule()
        expect(t.test()).to.equal("fake ping")
    
  )


# require(['mocha', 'jquery','chai'], (mocha, jquery, chai) ->

#   confobj = 
#     context: 'm1'
#     map:
#       "*": 
#         "dep1": "mymock"
#         "chai": chai

#   define("mymock",[], ->
#     class Blah
#       dfkdj: "kdfjkd"
#   )

#   new_define = require.config(
#    confobj
#   )


#   new_define( ["mymock","chai"], (myMock,Chai)->
#     console.log "in define"
#     m = new myMock
#     console.log m
#     console.log Chai
#   )

# )
  # Chai = require('chai')
  # expect = Chai.expect  

  # describe 'test module', ->
  #   it 'state should be "success"', ->
  #     m = new MyModel

  #     expect(m.state).to.equal("success!")

  # describe 'test module', ->
  #   it 'state should be "success"', ->
  #     m = new MyModel

  #     expect(m.state).to.equal("success!")
