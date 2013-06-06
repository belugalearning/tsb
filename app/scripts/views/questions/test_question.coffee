define (require) ->

  Backbone = require 'backbone'
  PreviewView = require 'views/modules/preview'
  QuestionTemplate = require 'text!templates/questions/test_question.html'
  QuestionModel = require 'models/questions/test_question'
  Bundle = require 'services/bundle/index'

  class TestQuestion extends Backbone.View
    template: _.template(QuestionTemplate)

    events:
      "click .submit-question": "submit"
      "click .preview": "preview"

    initialize: ->
      @page = @options.page

    render: =>
      tmpl = @template()
      @$el.html( tmpl )

    submit: (e) =>
      e.preventDefault()
      e.stopPropagation()
      $.ajax
        url: '/api/bundle'
        type: 'POST'
        contentType: 'application/json'
        data: JSON.stringify(@getFormData())
        success: (data) ->
          console.log('save success', data)
          window.location = '/bundle'
        error: (a,b,c) ->
          console.log(a,b,c)

    preview: (e) =>
      e.preventDefault()
      e.stopPropagation()
      bundleOpts = @getFormData()
      console.log(bundleOpts)
      contentService.setBundle(new Bundle(bundleOpts))
      @preview = new PreviewView({ el: ".preview-area" }).render()
      $('html, body').animate({ scrollTop: $(".preview-area").offset().top}, 2000)

    getFormData: =>
      form_data =
        title: @getFormVal('.bundle-title')
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
