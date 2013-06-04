define (require) ->

  Backbone = require 'backbone'
  BundleViewTemplate = require 'text!templates/panes/bundle_view.html'

  class BundleView extends Backbone.View
    template: _.template(BundleViewTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @
      
    cleanup: =>
      @remove()