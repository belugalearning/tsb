var contentService

;(function() {
  ContentService = function() {
    this.setTask(null)
  }

  ContentService.prototype.setTask = function(bundle) {
    this.bundle = bundle
    this.currentQuestionIx = -1
    this.questions = []
  }

  ContentService.prototype.nextQuestion = function() {
    if (!this.bundle) return null
    this.questions[++this.currentQuestionIx] = this.bundle.createQuestion()
    return this.currentQuestion()
  }

  ContentService.prototype.currentQuestion = function() {
    return this.questions[this.currentQuestionIx]
  }

  ContentService.prototype.evalAns = function(ans) {
    return this.bundle.evalAns(ans, this.currentQuestion())
  }

  contentService = new ContentService()
}())
