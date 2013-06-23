define (require) ->

  Backbone = require 'backbone'
  PreviewView = require 'views/modules/preview'
  QuestionTemplate = require 'text!templates/questions/test_question.html'
  QuestionModel = require 'models/questions/test_question'
  BBTask = require 'models/task'
  Task = require 'services/task/index'

  class TestQuestion extends Backbone.View
    template: _.template(QuestionTemplate)

    events:
      "click .submit-question": "submit"
      "click .preview": "preview"

    initialize: ->
      @page = @options.page
      @task = @options.bundle || new QuestionModel()

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @setFormData()

    setFormData: =>
      console.log @task

      questionType = @task.get('questionType')

      if @resolve(@task.get('vars'), "x.values")
        xVars = @task.get('vars').x.values

      if @resolve(@task.get('vars'), "x.values")
        yVars = @task.get('vars').y.values

      tool = @task.get('tool')
      numOfQuestions = @task.get('numQuestions')
      bundleTitle = @task.get('title')

      if questionType
        @setSelectVal('.question-type', questionType)

      if xVars
        @setSelectVal('.x-from', xVars[0])
        @setSelectVal('.x-to',  xVars[1])

      console.log yVars

      if yVars
        @setCheckboxVals('.equation-y-checkboxes', yVars)

      if tool
        @setSelectVal('.tool', tool)

      if numOfQuestions
        @setSelectVal('.num-questions', numOfQuestions)

      if bundleTitle
        @setSelectVal('.bundle-title', bundleTitle)

    submit: (e) =>
      e.preventDefault()
      e.stopPropagation()
      q = new BBTask(@getFormData())
      q.set(@task.attributes)
      console.log q
      q.save({},{
        success: -> console.log "success"
        error: -> console.log "error"
      })

    preview: (e) =>
      e.preventDefault()
      e.stopPropagation()
      taskOpts = @getFormData()
      console.log(taskOpts)
      contentService.setTask(new Task(taskOpts))
      @preview = new PreviewView({ el: ".preview-area" }).render()
      $('html, body').animate({ scrollTop: $(".preview-area").offset().top}, 2000)

    setSelectVal: (selector, value) =>
      $control = @$el.find(selector)
      window.tem = $control
      $control.val( value )

    setCheckboxVals: (selector, values) =>
      $checkboxHolder = @$el.find(selector)
      $checkboxHolder.find('input').val(values)

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

    redirect: (model, response, options) =>
      console.log "redirect"

    error: =>
      console.log "error"

    resolve: (obj, prop) =>
      ns = prop.split('.')
      while obj && ns[0]
        obj = obj[ns.shift()] || undefined
      return obj
