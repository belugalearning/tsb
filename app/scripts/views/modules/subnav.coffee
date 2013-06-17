define (require) ->

  Backbone = require 'backbone'
  BlankSubnavTemplate = require 'text!templates/modules/subnav_blank.html'
  TaskSubnavTemplate = require 'text!templates/modules/subnav_task.html'
  ActivitySubnavTemplate = require 'text!templates/modules/subnav_activity.html'

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
      console.log(nav)
      if @current && (@current == nav.split('_')[0])
        @setHighlight("." + nav.split('_').slice(-1)[0])
        return
      @current = nav.split('_')[0]
      if @current == "blank"
        @template = _.template(BlankSubnavTemplate)
      else if @current == "task"
        @template = _.template(TaskSubnavTemplate)
      else if @current == "activity"
        @template = _.template(ActivitySubnavTemplate)
      else
        @template = _.template(BlankSubnavTemplate)
      @render()
      @setHighlight("." + nav.split('_').slice(-1)[0])

    setHighlight: (navEl) =>
      @$el.find('a').removeClass("active")
      @$el.find(navEl).addClass("active")