define (require) ->
  
  Backbone = require 'backbone'
  ActivityCollection = require 'collections/activities'
  ActivityList          = require 'views/lists/activities'
  ActivityListTemplate  = require 'text!templates/panes/activity_list.html'

  class ActivityListPane extends Backbone.View
    template: _.template(ActivityListTemplate)

    initialize: ->
      @collection = new ActivityCollection()

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      @listview = new ActivityList(collection: @collection, el: ".set-list")
      @fetchList()

    fetchList: =>
      @collection.fetch({reset: true})

    cleanup: =>
      @remove()