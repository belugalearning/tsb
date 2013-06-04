define (require) ->

  Backbone = require 'backbone'
  NavTemplate = require 'text!templates/modules/nav.html'

  class Nav extends Backbone.View
    template: _.template(NavTemplate)

    events:
      "click a": "navigate"

    initialize: ->
      @page = @options.page

    render: =>
      tmpl = @template()
      @$el.html( tmpl )

    navigate: (e) =>
      e.preventDefault()
      Backbone.history.navigate(e.target.attributes.href.value, true)