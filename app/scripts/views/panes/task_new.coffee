define (require) ->

  Backbone = require 'backbone'
  QuestionView = require 'views/questions/test_question'
  TaskNewTemplate = require 'text!templates/panes/task_new.html'

  class TaskNewPane extends Backbone.View
    template: _.template(TaskNewTemplate)

    events: 
      "click .add-question" : "insertQuestion"

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @
    
    insertQuestion: (e) =>
      e.preventDefault()
      @question = new QuestionView({ el: ".question-container"}).render()

    wire: =>
      return
      
    cleanup: =>
      @remove()