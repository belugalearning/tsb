define (require) ->

  Backbone  = require 'backbone'
  Bundle    = require 'models/bundle'

  class BundleCollection extends Backbone.Collection
    model: Bundle
    url: "/api/bundles"