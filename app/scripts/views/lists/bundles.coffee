define (require) ->

  Backbone = require 'backbone'
  BundleItemTemplate = require 'text!templates/modules/bundle_tr.html'

  class BundleList extends Backbone.View
    template: _.template(BundleItemTemplate)

    events:
      "click a": "navigate"

    initialize: ->
      console.log @options.collection
      @collection = @options.collection
      @listenTo( @collection, 'reset', @render )

    render: =>
      @collection.each (item) =>
        @$el.append(@template(item.attributes))

    navigate: (e) =>
      e.preventDefault()
      Backbone.history.navigate(e.target.attributes.href.value, true)