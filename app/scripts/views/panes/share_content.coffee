define (require) ->

  Backbone = require 'backbone'
  ShareContentTemplate = require 'text!templates/panes/share_content.html'

  class ShareContent extends Backbone.View
    template: _.template(ShareContentTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    wire: =>
      return
    
    cleanup: =>
      @remove()