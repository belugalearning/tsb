(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, CreateContent, CreateContentTemplate, QuestionView, _ref;

    Backbone = require('backbone');
    QuestionView = require('views/questions/test_question');
    CreateContentTemplate = require('text!templates/panes/create_content.html');
    return CreateContent = (function(_super) {
      __extends(CreateContent, _super);

      function CreateContent() {
        this.cleanup = __bind(this.cleanup, this);
        this.insertQuestion = __bind(this.insertQuestion, this);
        this.render = __bind(this.render, this);        _ref = CreateContent.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CreateContent.prototype.template = _.template(CreateContentTemplate);

      CreateContent.prototype.events = {
        "click .add-question": "insertQuestion"
      };

      CreateContent.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        this.$el.html(tmpl);
        return this;
      };

      CreateContent.prototype.insertQuestion = function(e) {
        e.preventDefault();
        return this.question = new QuestionView({
          el: ".question-container"
        }).render();
      };

      CreateContent.prototype.cleanup = function() {
        return this.remove();
      };

      return CreateContent;

    })(Backbone.View);
  });

}).call(this);
