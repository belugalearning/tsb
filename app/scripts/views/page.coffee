define (require) ->

  Backbone = require 'backbone'
  MainLayout = require 'text!templates/layouts/index.html'

  RootPane          = require 'views/panes/root'
  BundleList        = require 'views/panes/bundle_list'
  BundleNew         = require 'views/panes/bundle_new'
  BundleView        = require 'views/panes/bundle_view'
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
      @navEl = @options.navEl
      @subnavEl = @options.subnavEl
      @currentPane = null
      @panes = 
        "root"            : RootPane
        "bundle"          : BundleList
        "bundle_new"      : BundleNew
        "bundle_view"     : BundleView
        "set"             : ShareContentPane
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

    
