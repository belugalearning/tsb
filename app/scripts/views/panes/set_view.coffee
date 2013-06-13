define (require) ->

  Backbone = require 'backbone'
  JQueryUI = require 'jquery-ui'
  Set = require 'models/set'
  SetViewTemplate = require 'text!templates/panes/set_view.html'
  SetPreviewModule = require 'text!templates/modules/set_show.html'

  class SetViewPane extends Backbone.View
    template: _.template(SetViewTemplate)
    setModule: _.template(SetPreviewModule)

    events:
      'click .save-set': 'saveSet'

    initialize: ->
      @setId = window.setViewID
      @thisSet = new Set({ _id: @setId })
      @listenTo(@thisSet, 'change', @showSetModule)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    showSetModule: =>
      # contentService.setSet(new SetService(@set.attributes))
      @$el.find(".set-details").html(@setModule(@thisSet.attributes))

    saveSet: =>
      console.log "ping"
      @thisSet.save()

    wire: =>
      @thisSet.fetch({reset: true})
    
    cleanup: =>
      @remove()