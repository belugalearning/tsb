define (require) ->

  Backbone = require 'backbone'

  class SetModel extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/api/set"

    defaults:
      _id         : null
      _rev        : null
      bundles     : []
