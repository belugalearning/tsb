define (require) ->

  Backbone = require 'backbone'
  PreviewTemplate = require 'text!templates/modules/preview.html'

  class Preview extends Backbone.View
    template: _.template(PreviewTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      if cc?
        console.log "got director already"
        cc.Director.getInstance().replaceScene(ToolLayer.scene());
      else
        DOMContentLoaded_event = document.createEvent("Event")
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
        window.document.dispatchEvent(DOMContentLoaded_event)