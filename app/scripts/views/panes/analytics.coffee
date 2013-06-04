define (require) ->

  Backbone = require 'backbone'
  AnalyticsTemplate = require 'text!templates/panes/analytics.html'

  class AnalyticsPane extends Backbone.View
    template: _.template(AnalyticsTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    cleanup: =>
      @remove()