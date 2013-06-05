define (require) ->

  Backbone = require 'backbone'
  SetNewTemplate = require 'text!templates/panes/set_new.html'

  class SetNewPane extends Backbone.View
    template: _.template(SetNewTemplate)

    events: 
      "click .add-question" : "insertQuestion"

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      return
      
    cleanup: =>
      @remove()