define (require) ->

  Backbone = require 'backbone'
  SetItemTemplate = require 'text!templates/items/set_tr.html'

  class SetList extends Backbone.View
    template: _.template(SetItemTemplate)

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