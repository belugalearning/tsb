define (require) ->

  Backbone = require 'backbone'
  JQueryUI = require 'jquery-ui'
  Activity = require 'models/activity'
  ActivityViewTemplate = require 'text!templates/panes/activity_view.html'
  ActivityPreviewModule = require 'text!templates/modules/activity_show.html'

  class ActivityViewPane extends Backbone.View
    template: _.template(ActivityViewTemplate)
    activityModule: _.template(ActivityPreviewModule)

    events:
      'click .save-set': 'saveSet'

    initialize: ->
      @setId = window.setViewID
      @thisActivity= new Activity({ _id: @setId })
      @listenTo(@thisActivity, 'change', @showSetModule)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    showSetModule: =>
      # contentService.setSet(new SetService(@set.attributes))
      @$el.find(".set-details").html(@activityModule(@thisActivity.attributes))

    saveSet: =>
      console.log "ping"
      @thisActivity.save()

    wire: =>
      @thisActivity.fetch({reset: true})
    
    cleanup: =>
      @remove()