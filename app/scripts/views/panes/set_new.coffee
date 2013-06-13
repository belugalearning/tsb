define (require) ->

  Backbone = require 'backbone'
  Set = require 'models/set'
  BundleCollection = require 'collections/bundles'
  BundleListView = require 'views/lists/bundles'
  SetNewTemplate = require 'text!templates/panes/set_new.html'

  class SetNewPane extends Backbone.View
    template: _.template(SetNewTemplate)

    events: 
      "click .add-question" : "insertQuestion"
      "click .submit-set" : "saveSet"

    initialize: ->
      @set = new Set()
      @bundleList = new BundleCollection(@set.get("bundles"))

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @collection = new BundleCollection()
      @bundleListView = new BundleListView({ collection: @bundleList , el: '#bundle-list-target', listview: true})
      @renderBundleList();
      @listenTo( @collection, 'reset', @renderBundlePicker )
      @collection.fetch({reset: true})

    renderBundlePicker: =>
      @bundlePicker = new BundleListView({ collection: @collection, el: '.set-bundle-picker', listview: true})
      @bundlePicker.render()
      @initialiseLists()

    initialiseLists: =>
      $('#bundle-list, #bundle-picker-list').sortable(
        connectWith: ".linked-list"
        handle: ".drag-handle"
        placeholder: "sortable-placeholder"
        forcePlaceholderSize: true 
        update: (event, ui) =>
          if event.target.id == "bundle-list"
            sort_order = $(event.target).sortable('toArray')
            bundle_array = []
            sort_order.map( (item) =>
              bundle_array.push(@collection.get(item))
            )
            @set.set("bundles",bundle_array)
            console.log @set.get("bundles")
      )

    renderBundleList: =>
      console.log "rendering bundle list"
      @bundleListView.render()
      console.log @bundleListView

    fetchBundleList: =>
      return

    saveSet: (e) =>
      e.preventDefault()
      e.stopPropagation()

    cleanup: =>
      @remove()