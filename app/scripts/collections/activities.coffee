define (require) ->

  Backbone  = require 'backbone'
  Activity    = require 'models/activity'

  class ActivityCollection extends Backbone.Collection
    model: Activity
    url: "/api/sets"