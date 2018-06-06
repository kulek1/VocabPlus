import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataQuizService {
  currentQuestionUpdated: EventEmitter<number> = new EventEmitter();
  finishEvent: EventEmitter<Boolean> = new EventEmitter();
  isStarted: Boolean = false;
  isUppercaseSensitive: Boolean = false;
  isValidationChecked: Boolean = false;
  isRandomMode: Boolean = true;

  textareaString: String = '';
  wordsFromString: Array<String>;
  quizData: Array<any> = [];
  answerInput: String = '';
  quizStartClass: string = 'quiz--started';

  currentQuestion: number = 0;
  score: number = 0;

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
    this.quizData = [];
  }

  stringIntoArray() {
    this.wordsFromString = this.textareaString.trim().split(/\r?\n/);
  }

  arrayDivider() {
    const words = this.wordsFromString;
    for (let i = 0; i < words.length; i++) {
      const index = words[i].search(/([-?])/);

      this.quizData[i] = {
        question: words[i].substr(0, index).trim(),
        answer: words[i].substring(index + 1, words[i].length).trim(),
      };
    }
    if (this.isRandomMode) { this.shuffleArray(this.quizData); }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  validateCurrentQuestion() {
    const user = this.trimWhiteSpace(this.answerInput);
    const correctAnswer = this.quizData[this.currentQuestion].answer;
    if (this.isUppercaseSensitive) {
      return user === correctAnswer;
    } else {
      return user.toLowerCase() === correctAnswer.toLowerCase();
    }
  }

  displayCorrectAnswer() {
    this.answerInput = this.quizData[this.currentQuestion].answer;
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
    return this.quizData.length;
  }

  getScorePercents() {
    // return 0.5 as 50%
    return (this.score / this.getNumberOfQuestions()).toFixed(2);
  }

  toggleRandomOrder() {
    this.isRandomMode = !this.isRandomMode;
  }
}
