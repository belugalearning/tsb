define (require) ->

  Backbone = require 'backbone'

  class ActivityModel extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/api/set"

    defaults:
      _id         : null
      _rev        : null
      bundles     : []
