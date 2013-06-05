define (require) ->

  Backbone = require 'backbone'
  MainLayout = require 'text!templates/layouts/index.html'

  RootPane          = require 'views/panes/root'
  BundleList        = require 'views/panes/bundle_list'
  BundleNew         = require 'views/panes/bundle_new'
  BundleView        = require 'views/panes/bundle_view'
  SetList           = require 'views/panes/set_list'
  SetNew            = require 'views/panes/set_new'

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
        "bundle"          : BundleList
        "bundle_new"      : BundleNew
        "bundle_view"     : BundleView
        "set"             : SetList
        "set_new"         : SetNew
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
    
