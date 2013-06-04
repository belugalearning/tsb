define (require) ->

  Backbone = require 'backbone'
  QuestionView = require 'views/questions/test_question'
  BundleNewTemplate = require 'text!templates/panes/bundle_new.html'

  class BundleNew extends Backbone.View
    template: _.template(BundleNewTemplate)

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