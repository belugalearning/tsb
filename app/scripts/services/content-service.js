var contentService

;(function() {
  ContentService = function() {
    this.setBundle(null)
  }

  ContentService.prototype.setBundle = function(bundle) {
    this.bundle = bundle
    this.currentQuestionIx = -1
  }

  ContentService.prototype.nextQuestion = function() {
    if (!this.bundle) return null
    return this.bundle.questions[++this.currentQuestionIx]
  }

  ContentService.prototype.currentQuestion = function() {
    return this.bundle && this.bundle.questions[this.currentQuestionIx]
  }

  ContentService.prototype.evalAns = function(ans) {
    return this.bundle.evalAns(ans, this.currentQuestion())
  }

  contentService = new ContentService()
}())
