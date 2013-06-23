var contentService

;(function() {
  ContentService = function() {
    this.setTask(null)
  }

  ContentService.prototype.setTask = function(task) {
    this.task = task
    this.currentQuestionIx = -1
    this.questions = []
  }

  ContentService.prototype.nextQuestion = function() {
    if (!this.task) return null
    this.questions[++this.currentQuestionIx] = this.task.createQuestion()
    return this.currentQuestion()
  }

  ContentService.prototype.currentQuestion = function() {
    return this.questions[this.currentQuestionIx]
  }

  ContentService.prototype.evalAns = function(ans) {
    return this.task.evalAns(ans, this.currentQuestion())
  }

  contentService = new ContentService()
}())
