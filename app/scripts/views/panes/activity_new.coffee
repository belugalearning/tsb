define (require) ->

  Backbone = require 'backbone'
  Set = require 'models/set'
  TaskCollection = require 'collections/bundles'
  TaskListView = require 'views/lists/bundles'
  SetNewTemplate = require 'text!templates/panes/activity_new.html'

  class SetNewPane extends Backbone.View
    template: _.template(SetNewTemplate)

    events: 
      "click .add-question" : "insertQuestion"
      "click .submit-set" : "saveSet"

    initialize: ->
      @set = new Set()
      @taskList = new TaskCollection(@set.get("bundles"))

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @collection = new TaskCollection()
      @taskListView = new TaskListView({ collection: @taskList , el: '#bundle-list-target', listview: true})
      @renderTaskList();
      @listenTo( @collection, 'reset', @renderTaskPicker )
      @collection.fetch({reset: true})

    renderTaskPicker: =>
      @taskPicker = new TaskListView({ collection: @collection, el: '.set-bundle-picker', listview: true})
      @taskPicker.render()
      @initialiseLists()

    initialiseLists: =>
      $('#bundle-list, #bundle-picker-list').sortable(
        connectWith: ".linked-list"
        handle: ".drag-handle"
        placeholder: "sortable-placeholder"
        forcePlaceholderSize: true 
        update: (event, ui) =>
          if event.target.id == "bundle-list"
            sort_order = $(event.target).sortable('toArray')
            bundle_array = []
            sort_order.map( (item) =>
              bundle_array.push(@collection.get(item))
            )
            @set.set("bundles",bundle_array)
            console.log @set.get("bundles")
      )

    renderTaskList: =>
      console.log "rendering bundle list"
      @taskListView.render()
      console.log @taskListView

    fetchTaskList: =>
      return

    saveSet: (e) =>
      e.preventDefault()
      e.stopPropagation()
      @set.save();

    cleanup: =>
      @remove()