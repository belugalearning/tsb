(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Backbone, QuestionModel, QuestionTemplate, TestQuestion, _ref;

    Backbone = require('backbone');
    QuestionTemplate = require('text!templates/questions/test_question.html');
    QuestionModel = require('models/questions/test_question');
    return TestQuestion = (function(_super) {
      __extends(TestQuestion, _super);

      function TestQuestion() {
        this.getCheckboxes = __bind(this.getCheckboxes, this);
        this.getFormVal = __bind(this.getFormVal, this);
        this.getFormData = __bind(this.getFormData, this);
        this.preview = __bind(this.preview, this);
        this.submit = __bind(this.submit, this);
        this.render = __bind(this.render, this);        _ref = TestQuestion.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TestQuestion.prototype.template = _.template(QuestionTemplate);

      TestQuestion.prototype.events = {
        "click :submit": "submit",
        "click .preview": "preview"
      };

      TestQuestion.prototype.initialize = function() {
        return this.page = this.options.page;
      };

      TestQuestion.prototype.render = function() {
        var tmpl;

        tmpl = this.template();
        return this.$el.html(tmpl);
      };

      TestQuestion.prototype.submit = function(e) {
        var form_data, question;

        e.preventDefault();
        form_data = this.getFormData();
        question = new QuestionModel(form_data);
        return console.log(question);
      };

      TestQuestion.prototype.preview = function(e) {
        var form_data;

        e.preventDefault();
        form_data = this.getFormData();
        return console.log("DOIT");
      };

      TestQuestion.prototype.getFormData = function() {
        var form_data;

        return form_data = {
          equation_x_from: this.getFormVal('.x-from'),
          equation_x_to: this.getFormVal('.x-to'),
          equation_y_vals: this.getCheckboxes('.equation-y-checkboxes'),
          solution_output: this.getFormVal('.solution-output'),
          tool: this.getFormVal('.tool'),
          bundle_output: this.getFormVal('.bundle-output')
        };
      };

      TestQuestion.prototype.getFormVal = function(selector) {
        return this.$el.find(selector).val();
      };

      TestQuestion.prototype.getCheckboxes = function(selector) {
        var allVals;

        allVals = [];
        $(selector + ' :checked').each(function() {
          return allVals.push($(this).val());
        });
        return allVals;
      };

      return TestQuestion;

    })(Backbone.View);
  });

}).call(this);
