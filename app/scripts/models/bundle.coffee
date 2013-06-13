define (require) ->

  Backbone = require 'backbone'

  class BundleModel extends Backbone.Model
    idAttribute: "_id"
    urlRoot: "/api/bundle"