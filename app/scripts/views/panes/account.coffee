define (require) ->

  Backbone = require 'backbone'
  AccountTemplate = require 'text!templates/panes/account.html'

  class AccountPane extends Backbone.View
    template: _.template(AccountTemplate)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    cleanup: =>
      @remove()