define (require) ->

  Backbone = require 'backbone'
  BundleListTemplate = require 'text!templates/panes/bundle_list.html'

  class BundleList extends Backbone.View
    template: _.template(BundleListTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @
      
    cleanup: =>
      @remove()