define (require) ->

  Backbone = require 'backbone'

  class BundleModel extends Backbone.Model
    urlRoot: "/api/bundle"