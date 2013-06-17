define (require) ->

  Backbone  = require 'backbone'
  Task    = require 'models/task'

  class TaskCollection extends Backbone.Collection
    model: Task
    url: "/api/bundles"