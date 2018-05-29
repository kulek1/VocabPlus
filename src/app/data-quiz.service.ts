import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataQuizService {
  currentQuestionUpdated: EventEmitter<number> = new EventEmitter();
  finishEvent: EventEmitter<Boolean> = new EventEmitter();
  isStarted: Boolean = false;
  isPreparation: Boolean = false;
  isUppercaseSensitive: Boolean = false;
  isValidationChecked: Boolean = false;

  textareaString: String = '';
  wordsFromString: Array<String>;
  questions: Array<String> = [];
  answers: Array<String> = [];
  answerInput: String = '';
  quizStartClass: 'quiz--started';

  currentQuestion: 0;
  score: 0;

  bodyElement = document.getElementsByTagName('body')[0];

  constructor() {
  }

  trimWhiteSpace(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  startQuiz() {
    this.flushArrays();
    this.stringIntoArray();
    this.arrayDivider();
    this.isStarted = true;
    this.bodyElement.classList.add(this.quizStartClass);
  }

  restartQuiz() {
    this.score = 0;
    this.currentQuestion = 0;
  }

  stopQuiz() {
    this.bodyElement.classList.remove(this.quizStartClass);
    this.isStarted = false;
    this.score = 0;
    this.currentQuestion = 0;
  }

  flushArrays() {
    this.questions = [];
    this.answers = [];
  }

  stringIntoArray() {
    this.wordsFromString = this.textareaString.trim().split(/\r?\n/);
  }

  arrayDivider() {
    const words = this.wordsFromString;
    for (let i = 0; i < words.length; i++) {
      const index = words[i].search(/([-?])/);
      this.questions[i] = words[i].substr(0, index).trim();
      this.answers[i] = words[i].substring(index + 1, words[i].length).trim();
    }
  }

  validateCurrentQuestion() {
    const user = this.trimWhiteSpace(this.answerInput);
    const correctAnswer = this.answers[this.currentQuestion];
    if (this.isUppercaseSensitive) {
      return user === correctAnswer;
    } else {
      return user.toLowerCase() === correctAnswer.toLowerCase();
    }
  }

  displayCorrectAnswer() {
    this.answerInput = this.answers[this.currentQuestion];
  }

  nextQuestion() {
    this.answerInput = '';
    this.currentQuestion += 1;
    this.currentQuestionUpdated.emit(this.currentQuestion);

    if (this.currentQuestion >= this.getNumberOfQuestions()) {
      this.finishEvent.emit(true);
    }
  }

  getNumberOfQuestions() {
    return this.questions.length;
  }

  getScorePercents() {
    // return 0.5 as 50%
    return (this.score / this.getNumberOfQuestions()).toFixed(2);
  }
}
