define (require) ->

  Backbone = require 'backbone'

  class MainRouter extends Backbone.Router
    routes:
      ''                : 'Root'
      '/'               : 'Root'
      'task'            : 'TaskList'
      'task/new'        : 'TaskNew'
      'task/view/:id'   : 'TaskView'
      'task/edit/:id'   : 'TaskEdit'
      'activity'             : 'Activity'
      'activity/new'         : 'ActivityNew'
      'activity/view/:id'    : 'ActivityView'
      'analytics'       : 'Analytics'
      'account'         : 'Account'

    initialize: ->
      @app = arguments[0].app

    Root: =>
      @app.setCurrentPane('root')

    TaskList: =>
      @app.setCurrentPane('task')

    TaskNew: =>
      window.taskEditID = null
      @app.setCurrentPane('task_new')

    TaskView: (id) =>
      #TODO: remove global, pass id into setCurrentPane
      window.taskViewID = id
      @app.setCurrentPane('task_view')

    TaskEdit: (id) =>
      #TODO: remove global, pass id into setCurrentPane
      window.taskEditID = id
      @app.setCurrentPane('task_edit')

    Activity: =>
      @app.setCurrentPane('activity')

    ActivityNew: =>
      @app.setCurrentPane('activity_new')
    
    ActivityView: =>
      @app.setCurrentPane('activity_view')

    Analytics: =>
      @app.setCurrentPane('analytics')

    Account: =>
      @app.setCurrentPane('account')