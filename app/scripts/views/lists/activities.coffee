define (require) ->

  Backbone = require 'backbone'
  ActivityItemTemplate = require 'text!templates/items/activity_tr.html'

  class ActivityList extends Backbone.View
    template: _.template(ActivityItemTemplate)

    events:
      "click .activity-view": "navigate"
      "click .activity-edit": "navigate"

    initialize: ->
      console.log @options.collection
      @collection = @options.collection
      @listenTo( @collection, 'reset', @render )

    render: =>
      @collection.each (item) =>
        @$el.append(@template(item.attributes))

    navigate: (e) =>
      console.log e
      e.preventDefault()
      Backbone.history.navigate(e.currentTarget.attributes.href.value, true)