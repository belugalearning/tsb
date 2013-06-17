define (require) ->

  Backbone = require 'backbone'
  JQueryUI = require 'jquery-ui'
  Activity = require 'models/set'
  ActivityViewTemplate = require 'text!templates/panes/set_view.html'
  ActivityPreviewModule = require 'text!templates/modules/set_preview.html'

  class ActivityViewPane extends Backbone.View
    template: _.template(ActivityViewTemplate)
    setModule: _.template(ActivityPreviewModule)

    events:
      'click .save-set': 'saveSet'

    initialize: ->
      @activityId = window.activityViewID
      @thisActivity = new Activity({ _id: @activityId })
      @listenTo(@thisActivity, 'change', @showActivityModule)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    showActivityModule: =>
      # contentService.setSet(new SetService(@set.attributes))
      @$el.find(".set-details").html(@activityModule(@thisActivity.attributes))
      @$el.find('.set-bundle-list').sortable(
        handle: ".drag-handle"
        placeholder: "sortable-placeholder"
        forcePlaceholderSize: true 
        update: (event, ui) =>
          console.log @thisSet.get("bundles")
          sort_order = $(event.target).sortable('toArray')
          new_tasks = new Array(@thisActivity.get("tasks").length)
          @thisActivity.get("tasks").map( (item) =>
            new_tasks[sort_order.indexOf(item._id)] = item 
          )
          @thisActivity.set("tasks", new_tasks, {silent: true})
      )

    saveActivity: =>
      console.log "ping"
      @thisActivity.save()

    wire: =>
      @thisActivity.fetch({reset: true})
    
    cleanup: =>
      @remove()