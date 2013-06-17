define (require) ->

  Backbone = require 'backbone'
  TaskCollection = require 'collections/tasks'
  TaskList          = require 'views/lists/tasks'
  TaskListTemplate  = require 'text!templates/panes/task_list.html'

  class TaskListPane extends Backbone.View
    template: _.template(TaskListTemplate)

    initialize: ->
      @collection = new TaskCollection()

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @listview = new TaskList(collection: @collection, el: ".bundle-list")
      @fetchList()

    fetchList: =>
      @collection.fetch({reset: true})

    cleanup: =>
      @remove()