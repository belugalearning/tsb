define (require) ->

  Backbone = require 'backbone'
  BundleCollection = require 'collections/bundles'
  BundleList          = require 'views/lists/bundles'
  BundleListTemplate  = require 'text!templates/panes/bundle_list.html'

  class BundleListPane extends Backbone.View
    template: _.template(BundleListTemplate)

    initialize: ->
      @collection = new BundleCollection()
      console.log @listview

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @listview = new BundleList(collection: @collection, el: ".bundle-list")
      @fetchList()

    fetchList: =>
      @collection.fetch({reset: true})

    cleanup: =>
      @remove()