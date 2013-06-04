define (require) ->

  Backbone = require 'backbone'
  QuestionTemplate = require 'text!templates/questions/test_question.html'
  QuestionModel = require 'models/questions/test_question'

  class TestQuestion extends Backbone.View
    template: _.template(QuestionTemplate)

    events:
      "click :submit": "submit"

    initialize: ->
      @page = @options.page

    render: =>
      tmpl = @template()
      @$el.html( tmpl )

    submit: (e) =>
      e.preventDefault()
      # TODO: get data, populate model, save
      form_data = 
        equation_x_from:  @getFormVal('.x-from')
        equation_x_to:    @getFormVal('.x-to')
        equation_y_vals:  @getCheckboxes('.equation-y-checkboxes')
        solution_output:  @getFormVal('.solution-output')
        tool:             @getFormVal('.tool')
        bundle_output:    @getFormVal('.bundle-output')
      console.log form_data
      question = new QuestionModel( form_data )
      console.log question

    getFormVal: (selector) =>
      @$el.find(selector).val()

    getCheckboxes: (selector) =>
      allVals = [];
      $(selector + ' :checked').each -> 
        allVals.push($(this).val())
      allVals

