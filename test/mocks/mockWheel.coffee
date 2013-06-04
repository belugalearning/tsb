define (require) ->

  jQuery      = require 'jquery'

  class Wheel

    type: ->
      return "mock wheel"