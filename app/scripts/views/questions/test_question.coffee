define (require) ->

  Backbone = require 'backbone'
  PreviewView = require 'views/modules/preview'
  QuestionTemplate = require 'text!templates/questions/test_question.html'
  QuestionModel = require 'models/questions/test_question'
  Bundle = require 'services/bundle/index'

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
      bundleOpts = @getFormData()
      contentService.setBundle(new Bundle(bundleOpts))
      @preview = new PreviewView({ el: ".preview-area", form_data: form_data }).render()
      $('html, body').animate({ scrollTop: $(".preview-area").offset().top}, 2000)
      # make preview

    getFormData: =>
      form_data =
        questionType: @getFormVal('.question-type')
        tool:         @getFormVal('.tool')
        vars:
          x:
            values: @getIntRangeVals('.x-from', '.x-to')
          y:
            values: @getCheckboxIntVals('.equation-y-checkboxes')
        numQuestions: @getFormVal('.num-questions')

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
    
    getCheckboxIntVals: (selector) =>
      allVals = []
      $(selector + ' :checked').each ->
        allVals.push(parseInt($(this).val(), 10))
      allVals
