define (require) ->

  Backbone = require 'backbone'
  TaskService = require 'services/task/index'
  Task = require 'models/task'
  TaskViewTemplate = require 'text!templates/panes/task_view.html'
  TaskPreviewTemplate = require 'text!templates/modules/task_preview.html'
  
  class TaskViewPane extends Backbone.View
    template: _.template(TaskViewTemplate)
    taskTemplate: _.template(TaskPreviewTemplate)

    initialize: ->
      @task = new Task({ _id: window.taskViewID })
      window.tmp = @task
      @listenTo(@task, 'change', @showTask)

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @

    showTask: =>
      console.log "show task"
      console.log @task
      contentService.setTask(new TaskService(@task.attributes))
      @$el.find(".details").html(@taskTemplate(@task.attributes))

      if cc?
        console.log "got director already"
        cc.Director.getInstance().replaceScene(ToolLayer.scene());
      else
        DOMContentLoaded_event = document.createEvent("Event")
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
        window.document.dispatchEvent(DOMContentLoaded_event)

    wire: =>
      console.log "fetch task"
      @task.fetch({reset: true})
    
    cleanup: =>
      console.log "cleanup cocos2d -- nothing required, will replace scene later"
    
      @remove()
