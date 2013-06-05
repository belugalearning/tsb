define (require) ->

  Backbone = require 'backbone'
  BlankSubnavTemplate = require 'text!templates/modules/subnav_blank.html'
  BundleSubnavTemplate = require 'text!templates/modules/subnav_bundle.html'
  SetSubnavTemplate = require 'text!templates/modules/subnav_set.html'

  class Subnav extends Backbone.View
    template: _.template(BlankSubnavTemplate)

    events:
      "click a": "navigate"

    render: =>
      tmpl = @template()
      @$el.html( tmpl )

    navigate: (e) =>
      e.preventDefault()
      Backbone.history.navigate(e.target.attributes.href.value, true)

    swap: (nav) =>
      if @current && (@current == nav.split('_')[0])
        @setHighlight("." + nav.split('_').slice(-1)[0])
        return
      @current = nav.split('_')[0]
      if @current == "blank"
        @template = _.template(BlankSubnavTemplate)
      else if @current == "bundle"
        @template = _.template(BundleSubnavTemplate)
      else if @current == "set"
        @template = _.template(SetSubnavTemplate)
      else
        @template = _.template(BlankSubnavTemplate)
      @render()
      @setHighlight("." + nav.split('_').slice(-1)[0])

    setHighlight: (navEl) =>
      @$el.find('a').removeClass("active")
      @$el.find(navEl).addClass("active")