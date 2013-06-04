define (require) ->

  Backbone = require 'backbone'
  SubnavTemplate = require 'text!templates/modules/subnav_content.html'

  class Subnav extends Backbone.View
    template: _.template(SubnavTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )