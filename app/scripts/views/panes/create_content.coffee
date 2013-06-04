define (require) ->

  Backbone = require 'backbone'
  QuestionView = require 'views/questions/test_question'
  CreateContentTemplate = require 'text!templates/panes/create_content.html'

  class CreateContent extends Backbone.View
    template: _.template(CreateContentTemplate)

    events: 
      "click .add-question" : "insertQuestion"

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @
    
    insertQuestion: (e) =>
      e.preventDefault()
      @question = new QuestionView({ el: ".question-container"}).render()

    cleanup: =>
      @remove()