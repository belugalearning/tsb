define (require) ->

  Backbone = require 'backbone'

  class TaskModel extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/api/tasks"

    defaults:
      type        : 'task'
