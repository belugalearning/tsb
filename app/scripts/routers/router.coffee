define (require) ->

  Backbone = require 'backbone'

  class MainRouter extends Backbone.Router
    routes:
      ''                : 'showRoot'
      '/'               : 'showRoot'
      'create_content'  : 'showCreateContent'
      'share_content'   : 'showShareContent'
      'analytics'       : 'showAnalytics'
      'account'         : 'showAccount'

    initialize: ->
      @app = arguments[0].app

    showRoot: =>
      @app.setCurrentPane('root')

    showCreateContent: =>
      @app.setCurrentPane('create_content')
    
    showShareContent: =>
      @app.setCurrentPane('share_content')

    showAnalytics: =>
      @app.setCurrentPane('analytics')

    showAccount: =>
      @app.setCurrentPane('account')