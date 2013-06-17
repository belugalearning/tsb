define(function(require) {
  var jquery = require('jquery')
  var evalExpressionTemplate = require('text!services/task/templates/eval-expression.xml')
  var yTemplate = require('text!./templates/y.xml')
  var xDivYTemplate = require('text!services/task/templates/xdivy.xml')

  function Task(opts) {
    this.questionType = opts.questionType
    this.vars = opts.vars
    this.numQuestions = opts.numQuestions

    this.evalExpression = $($.parseXML(evalExpressionTemplate))
      .find('ph#num-groups')
      .replaceWith(opts.questionType == 'split_x_y_eq_grps' ? $(yTemplate) : $(xDivYTemplate))
      .end()
      .find('ph#group-size')
      .replaceWith(opts.questionType == 'split_x_y_eq_grps' ? $(xDivYTemplate) : $(yTemplate))
      [0]
  }

  Task.prototype.evalAns = function(ans, question) {
    var reqNumGrps = this.questionType == 'split_x_y_eq_grps'
      ? question.vars.y
      : question.vars.x / question.vars.y

    var reqGrpSize = this.questionType == 'split_x_y_eq_grps'
      ? question.vars.x / question.vars.y
      : question.vars.y

    var $groups = $(ans).children('set')

    return (
      reqNumGrps == $groups.length &&
      reqNumGrps == $groups.filter(function(i, grp) { return $(grp).children().length == reqGrpSize }).length)
  }

  Task.prototype.createQuestion = function() {
    return new Question(this)
  }

  function Question(task) {
    var self = this
    this.vars = {}

    var yVals = task.vars.y.values
    this.vars.y = yVals[ Math.floor(Math.random() * yVals.length) ]

    var xVals = task.vars.x.values.filter(function(v) { return v > self.vars.y && v % self.vars.y == 0 })
    this.vars.x = xVals[ Math.floor(Math.random() * xVals.length) ]

    this.text =
      (task.questionType == 'split_x_y_eq_grps'
        ? 'Split {x} into {y} equal groups'
        : 'Split {x} into equal groups of {y}'
      ).replace(/{(\w+)}/g, function(match, v) {
        return self.vars[v]
      })

    var initialState = $('<set><set></set></set>')
    for (var i = 0; i < this.vars.x; ++i) {
      $(initialState).children().append($('<ci>item' + i + '</ci>'))
    }
    this.initialState = initialState.wrap('<wrap>').parent().html()
  }

  return Task
})
