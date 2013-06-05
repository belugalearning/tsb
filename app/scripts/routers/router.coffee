define (require) ->

  Backbone = require 'backbone'

  class MainRouter extends Backbone.Router
    routes:
      ''                : 'showRoot'
      '/'               : 'showRoot'
      'bundle'          : 'showBundleList'
      'bundle/new'      : 'showBundleNew'
      'bundle/view/:id' : 'showBundleView'
      'set'             : 'showSet'
      'set/new'         : 'showSetNew'
      'analytics'       : 'showAnalytics'
      'account'         : 'showAccount'

    initialize: ->
      @app = arguments[0].app

    showRoot: =>
      @app.setCurrentPane('root')

    showBundleList: =>
      @app.setCurrentPane('bundle')

    showBundleView: (id) =>
      window.bundleViewID = id
      @app.setCurrentPane('bundle_view')

    showBundleNew: =>
      @app.setCurrentPane('bundle_new')

    showSetNew: =>
      @app.setCurrentPane('set_new')
    
    showSet: =>
      @app.setCurrentPane('set')

    showAnalytics: =>
      @app.setCurrentPane('analytics')

    showAccount: =>
      @app.setCurrentPane('account')