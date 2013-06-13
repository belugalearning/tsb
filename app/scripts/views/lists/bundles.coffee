define (require) ->

  Backbone = require 'backbone'
  BundleItemTemplate = require 'text!templates/items/bundle_tr.html'
  BundleItemTemplateList = require 'text!templates/items/bundle_li.html'

  class BundleList extends Backbone.View
    template: _.template(BundleItemTemplate)

    events:
      "click a": "navigate"

    initialize: ->
      @collection = @options.collection
      @listenTo( @collection, 'reset', @render )
      if @options.listview == true
        @template = _.template(BundleItemTemplateList)

    render: =>
      $(".list-loading-indicator").remove()
      @$el.empty();
      @collection.each (item) =>
        @$el.append(@template(item.attributes))

    navigate: (e) =>
      e.preventDefault()
      Backbone.history.navigate(e.target.attributes.href.value, true)