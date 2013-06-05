define (require) ->

  Backbone = require 'backbone'
  QuestionTemplate = require 'text!templates/questions/test_question.html'
  QuestionModel = require 'models/questions/test_question'
  Bundle = require 'services/bundle/index.js'

  class TestQuestion extends Backbone.View
    template: _.template(QuestionTemplate)

    events:
      "click :submit": "submit"
      "click .preview": "preview"

    initialize: ->
      @page = @options.page

    render: =>
      tmpl = @template()
      @$el.html( tmpl )

    submit: (e) =>
      e.preventDefault()
      # TODO: get data, populate model, save
      form_data = @getFormData()
      question = new QuestionModel( form_data )

    preview: (e) =>
      e.preventDefault()
      form_data = @getFormData()
      console.log form_data
      # make preview

    getFormData: =>
      form_data =
        xValues: @getIntRangeVals('.x-from', '.x-to')
        yValues:  @getCheckboxes('.equation-y-checkboxes')
        questionType:  @getFormVal('.question-type')
        tool:             @getFormVal('.tool')
        numQuestions:    @getFormVal('.num-questions')

    getFormVal: (selector) =>
      @$el.find(selector).val()

    getIntRangeVals: (fromSelector, toSelector) =>
      from = parseInt($(fromSelector).val(), 10)
      to = parseInt($(toSelector).val(), 10)
      $(fromSelector)
        .children('option')
        .toArray()
        .map (opt) =>
          parseInt($(opt).prop('value'), 10)
        .filter (val) =>
          from <= val && val <= to
    
    getCheckboxes: (selector) =>
      allVals = []
      $(selector + ' :checked').each ->
        allVals.push($(this).val())
      allVals

