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
    
    wire: =>
      @bundle.fetch({reset: true})
    
    cleanup: =>
      @remove()