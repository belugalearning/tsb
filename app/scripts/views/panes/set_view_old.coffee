define (require) ->

  Backbone = require 'backbone'
  JQueryUI = require 'jquery-ui'
  Set = require 'models/set'
  SetViewTemplate = require 'text!templates/panes/set_view.html'
  SetPreviewModule = require 'text!templates/modules/set_preview.html'

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
      @$el.find('.set-bundle-list').sortable(
        handle: ".drag-handle"
        placeholder: "sortable-placeholder"
        forcePlaceholderSize: true 
        update: (event, ui) =>
          console.log @thisSet.get("bundles")
          sort_order = $(event.target).sortable('toArray')
          new_bundles = new Array(@thisSet.get("bundles").length)
          @thisSet.get("bundles").map( (item) =>
            new_bundles[sort_order.indexOf(item._id)] = item 
          )
          @thisSet.set("bundles", new_bundles, {silent: true})
      )

    saveSet: =>
      console.log "ping"
      @thisSet.save()

    wire: =>
      @thisSet.fetch({reset: true})
    
    cleanup: =>
      @remove()