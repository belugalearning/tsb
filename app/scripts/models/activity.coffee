define (require) ->

  Backbone = require 'backbone'

  class ActivityModel extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/api/activities"

    defaults:
      _id         : null
      _rev        : null
      type        : 'activity'
      tasks       : []
