define (require) ->

  Backbone = require 'backbone'
  NavTemplate = require 'text!templates/modules/nav.html'

  class Nav extends Backbone.View
    template: _.template(NavTemplate)

    events:
      "click a.navlink": "navigate"

    initialize: ->
      @page = @options.page

    render: =>
      tmpl = @template()
      @$el.html( tmpl )

    navigate: (e) =>
      e.preventDefault()
      @setHighlight("." + e.target.attributes.href.value)
      Backbone.history.navigate(e.target.attributes.href.value, true)

    setSelection: (selection) =>
      @setHighlight("." + selection.split('_')[0])
      @options.page.subnav.swap(selection)

    setHighlight: (highlighEl) =>
      @$el.find('a').removeClass("active")
      @$el.find(highlighEl).addClass("active")