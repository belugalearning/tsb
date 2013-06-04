define (require) ->

  Backbone = require 'backbone'
  MainLayout = require 'text!templates/layouts/index.html'

  RootPane          = require 'views/panes/root'
  CreateContentPane = require 'views/panes/create_content'
  ShareContentPane  = require 'views/panes/share_content'
  AnalyticsPane     = require 'views/panes/analytics'
  AccountPane       = require 'views/panes/account'

  NavView           = require 'views/modules/nav'
  SubnavView        = require 'views/modules/subnav'

  class Page extends Backbone.View
    template: _.template(MainLayout)

    events:
      "click" : 'ping'

    initialize: ->
      @nav = @options.nav
      @subnav = @options.subnav
      @currentPane = null
      @panes = 
        "root"            : RootPane
        "create_content"  : CreateContentPane
        "share_content"   : ShareContentPane
        "analytics"       : AnalyticsPane
        "account"         : AccountPane

    render: =>
      tmpl = @template()
      @$el.html( tmpl )
      @injectNav()

    injectNav: =>
      @nav = new NavView({ el: "#nav", page: @})
      @nav.render()
      @subnav = new SubnavView(
        el: "#subnav"
        page: @
      )
      @subnav.render()

    displayPane: (page) =>
      console.log "displaying page " + page
      if @currentPane
        @currentPane.cleanup()
      @currentPane = new @panes[page]
      if @$pane
        @$pane.empty()
      @$el.find('#pane-container').html( @currentPane.render().el )

    
