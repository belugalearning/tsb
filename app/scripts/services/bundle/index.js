define(function(require) {
  var jquery = require('jquery')
  var evalExpressionTemplate = require('text!services/bundle/templates/eval-expression.xml')
  var yTemplate = require('text!./templates/y.xml')
  var xDivYTemplate = require('text!services/bundle/templates/xdivy.xml')

  function Bundle(opts) {
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

    this.questions = []
    for (var i = 0; i < this.numQuestions; ++i) {
      this.questions.push(new Question(this))
    }
  }

  function Question(bundle) {
    var self = this
    this.vars = {}

    var yVals = bundle.vars.y.values
    this.vars.y = yVals[ Math.floor(Math.random() * yVals.length) ]

    var xVals = bundle.vars.x.values.filter(function(v) { return v % self.vars.y == 0 })
    this.vars.x = xVals[ Math.floor(Math.random() * xVals.length) ]

    this.text =
      (bundle.questionType == 'split_x_y_eq_grps'
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

  return Bundle
})
