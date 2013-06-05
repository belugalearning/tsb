define (require) ->
  
  Backbone = require 'backbone'
  SetCollection = require 'collections/sets'
  SetList          = require 'views/lists/sets'
  SetListTemplate  = require 'text!templates/panes/set_list.html'

  class SetListPane extends Backbone.View
    template: _.template(SetListTemplate)

    initialize: ->
      @collection = new SetCollection()

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @listview = new SetList(collection: @collection, el: ".set-list")
      @fetchList()

    fetchList: =>
      @collection.fetch({reset: true})

    cleanup: =>
      @remove()