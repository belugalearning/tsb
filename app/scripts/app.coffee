define (require) ->

  Backbone  = require 'backbone'
  PageView  = require 'views/page'
  Router    = require 'routers/router'

  class App extends Backbone.Model

    initialize: ->
      @init_page()
      window.router = new Router({ app: @})
      Backbone.history.start({ pushState: true})
      console.log("App init")

    init_page: =>
      @pageView = new PageView({el: "#beluga-tsb", navEl: "#nav", subnavEl: "#subnav"})
      @pageView.render()

    setCurrentPane: (page) =>
      if !(page == @currentPage)
        @currentPage = page
      @pageView.displayPane(@currentPage)