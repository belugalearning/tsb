define (require) ->

  Backbone = require 'backbone'
  TaskItemTemplate = require 'text!templates/items/task_tr.html'
  TaskItemTemplateList = require 'text!templates/items/task_li.html'

  class TaskList extends Backbone.View
    template: _.template(TaskItemTemplate)

    events:
      "click .bundle-view": "navigate"
      "click .bundle-edit": "navigate"

    initialize: ->
      @collection = @options.collection
      @listenTo( @collection, 'reset', @render )
      if @options.listview == true
        @template = _.template(TaskItemTemplateList)

    render: =>
      $(".list-loading-indicator").remove()
      @$el.empty();
      @collection.each (item) =>
        @$el.append(@template(item.attributes))

    navigate: (e) =>
      e.preventDefault()
      console.log e
      Backbone.history.navigate(e.currentTarget.pathname, true)