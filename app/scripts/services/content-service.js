var contentService

;(function() {
  ContentService = function() {
    this.setBundle(null)
  }

  ContentService.prototype.setBundle = function(bundle) {
    this.bundle = bundle
    this.currentQuestionIx = -1
    if (this.bundle) this.nextQuestion()
  }

  ContentService.prototype.nextQuestion = function() {
    if (!this.bundle) return null
    var q = this.bundle.questions[++this.currentQuestionIx]
    return this.currentQuestion
  }

  ContentService.prototype.currentQuestion = function() {
    return this.bundle && this.bundle.questions[this.currentQuestionIx]
  }

  contentService = new ContentService()
}())
