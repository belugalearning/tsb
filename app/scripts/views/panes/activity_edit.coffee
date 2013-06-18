define (require) ->

  Backbone = require 'backbone'
  Activity = require 'models/activity'
  TaskCollection = require 'collections/tasks'
  ActivityForm= require 'views/modules/activity_form'
  TaskListView = require 'views/lists/tasks'
  ActivityNewTemplate = require 'text!templates/panes/activity_new.html'

  class ActivityNewPane extends Backbone.View
    template: _.template(ActivityNewTemplate)

    events: 
      "click .add-question" : "insertQuestion"
      "click .submit-set" : "saveActivity"

    initialize: ->
      if window.activityEditID
        @activity = new Activity({ _id: activityEditID })
        @listenToOnce(@activity, "change", @showActivityForm)
        @activity.fetch({ reset: true })
      else 
        @activity = new Activity()
      @taskList = new TaskCollection(@activity.get("bundles"))

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @collection = new TaskCollection()
      @taskListView = new TaskListView({ 
        collection: @taskList, 
        el: '#bundle-list-target', 
        listview: true
      })
      @renderTaskList();
      @listenTo( @collection, 'reset', @renderTaskPicker )
      @collection.fetch({reset: true})

    showActivityForm: =>
      console.log @activity

    renderTaskPicker: =>
      @taskPicker = new TaskListView({ 
        collection: @collection, 
        el: '.set-bundle-picker', listview: true
      })
      @taskPicker.render()
      @initialiseLists()

    initialiseLists: =>
      $('#bundle-list, #bundle-picker-list').sortable(
        connectWith: ".linked-list"
        helper: "clone"
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
            @activity.set("bundles",bundle_array)
            console.log @activity.get("bundles")
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