define (require) ->

  Backbone  = require 'backbone'
  Set    = require 'models/set'

  class SetCollection extends Backbone.Collection
    model: Set
    url: "/api/sets"