define (require) ->

  Backbone = require 'backbone'
  Bundle = require 'models/bundle'
  BundleViewTemplate = require 'text!templates/panes/bundle_view.html'
  BundlePreviewTemplate = require 'text!templates/modules/bundle_preview.html'
  class BundleViewPane extends Backbone.View
    template: _.template(BundleViewTemplate)
    bundleTemplate: _.template(BundlePreviewTemplate)

    initialize: ->
      @bundleId = window.bundleViewID
      @bundle = new Bundle({ id: @bundleId })
      @listenTo(@bundle, 'change', @showBundle)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    showBundle: =>
      console.log "show bundle"
      console.log @bundle
      @$el.append(@bundleTemplate(@bundle.attributes))

      if cc?
        console.log "got director already"
        cc.Director.getInstance().replaceScene(ToolLayer.scene());
      else
        DOMContentLoaded_event = document.createEvent("Event")
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
        window.document.dispatchEvent(DOMContentLoaded_event)

    wire: =>
      @bundle.fetch({reset: true})
    
    cleanup: =>
      console.log "cleanup cocos2d -- nothing required, will replace scene later"
    
      @remove()