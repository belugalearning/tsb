define (require) ->

  Backbone = require 'backbone'
  PreviewTemplate = require 'text!templates/modules/preview.html'

  class Preview extends Backbone.View
    template: _.template(PreviewTemplate)

    initialize: ->
      @formData = @options.form_data

    render: =>
      tmpl = @template(@formData)
      @$el.html( tmpl )