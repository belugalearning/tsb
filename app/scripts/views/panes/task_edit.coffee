define (require) ->

  Backbone = require 'backbone'
  Task = require 'models/task'
  QuestionView = require 'views/questions/test_question'
  TaskNewTemplate = require 'text!templates/panes/task_new.html'

  class TaskNewPane extends Backbone.View
    template: _.template(TaskNewTemplate)

    events: 
      "click .add-question" : "insertQuestion"

    initialize: ->
      if window.bundleEditID
        console.log window.bundleEditID
        @task = new Task({ _id: window.taskEditID})
        @listenToOnce(@task, "change", @showQuestion)
        @task.fetch({ reset: true })
      else
       @task = new Task()
       @insertQuestion()

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @
    
    insertQuestion: (e) =>
      e.preventDefault()
      @showQuestion()

    showQuestion: =>
      console.log "showing question"
      @question = new QuestionView({ el: ".question-container", bundle: @task}).render()

    wire: =>
      return
      
    cleanup: =>
      @remove()