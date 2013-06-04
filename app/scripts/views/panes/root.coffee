define (require) ->

  Backbone = require 'backbone'
  RootTemplate = require 'text!templates/panes/root.html'

  class Root extends Backbone.View
    template: _.template(RootTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @
    
    wire: =>
      return
      
    cleanup: =>
      @remove()