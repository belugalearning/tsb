define (require) ->

  Backbone = require 'backbone'
  MainLayout = require 'text!templates/layouts/index.html'

  RootPane          = require 'views/panes/root'
  TaskList          = require 'views/panes/task_list'
  TaskNew           = require 'views/panes/task_new'
  TaskView          = require 'views/panes/task_view'
  TaskEdit          = require 'views/panes/task_edit'
  ActivityList      = require 'views/panes/activity_list'
  ActivityNew       = require 'views/panes/activity_new'
  ActivityView      = require 'views/panes/activity_view'

  AnalyticsPane     = require 'views/panes/analytics'
  AccountPane       = require 'views/panes/account'

  NavView           = require 'views/modules/nav'
  SubnavView        = require 'views/modules/subnav'

  class Page extends Backbone.View
    template: _.template(MainLayout)

    events:
      "click a.home": "navigateHome"

    initialize: ->
      @navEl = @options.navEl
      @subnavEl = @options.subnavEl
      @currentPane = null
      @panes = 
        "root"            : RootPane
        "task"            : TaskList
        "task_new"        : TaskNew
        "task_view"       : TaskView
        "task_edit"     : TaskEdit
        "activity"             : ActivityList
        "activity_new"         : ActivityNew
        "activity_view"        : ActivityView
        "analytics"       : AnalyticsPane
        "account"         : AccountPane

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @injectNav()

    injectNav: =>
      @nav = new NavView(
        el: @navEl
        page: @
      )
      @nav.render()
      @subnav = new SubnavView(
        el: @subnavEl
        page: @
      )
      @subnav.render()

    displayPane: (page) =>
      console.log page
      if @currentPane
        @currentPane.cleanup()
      @currentPane = new @panes[page]
      @nav.setSelection(page)
      if @$pane
        @$pane.empty()
      @$el.find('#pane-container').html( @currentPane.render().el )
      @currentPane.wire()

    navigateHome: (e) =>
      e.preventDefault()
      Backbone.history.navigate(e.target.attributes.href.value, true)
      console.log "ping"
    
