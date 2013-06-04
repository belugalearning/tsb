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
      console.log "nav navigate: " + e.target.attributes.href.value
      e.preventDefault()
      @setHighlight("." + e.target.attributes.href.value)
      Backbone.history.navigate(e.target.attributes.href.value, true)

    setSelection: (selection) =>
      console.log "set selection: " + selection
      @setHighlight("." + selection.split('_')[0])
      @options.page.subnav.swap(selection)

    setHighlight: (highlighEl) =>
      @$el.find('a').removeClass("active")
      @$el.find(highlighEl).addClass("active")