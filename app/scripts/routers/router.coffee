define (require) ->

  Backbone = require 'backbone'

  class MainRouter extends Backbone.Router
    routes:
      ''                : 'showRoot'
      '/'               : 'showRoot'
      'bundle'          : 'showBundleList'
      'bundle/new'      : 'showBundleNew'
      'bundle/view'     : 'showBundleView'
      'set'             : 'showSet'
      'analytics'       : 'showAnalytics'
      'account'         : 'showAccount'

    initialize: ->
      @app = arguments[0].app

    showRoot: =>
      @app.setCurrentPane('root')

    showBundleList: =>
      @app.setCurrentPane('bundle')

    showBundleView: =>
      @app.setCurrentPane('bundle_view')

    showBundleNew: =>
      @app.setCurrentPane('bundle_new')
    
    showSet: =>
      @app.setCurrentPane('set')

    showAnalytics: =>
      @app.setCurrentPane('analytics')

    showAccount: =>
      @app.setCurrentPane('account')