import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgFor } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { DataQuizService } from '../data-quiz.service';
import { DataPageService } from '../data-page.service';
import { TweenMax, Power3, Bounce } from 'gsap';
import ProgressBar from 'progressbar.js';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({})),
      transition('void => *', [
        style({transform: 'translateY(-20%) scale(0.6)', opacity: 0}),
        animate('400ms 100ms ease-in-out')
      ]),
      transition('* => void', [
        animate(
          '400ms ease-in-out',
          style({transform: 'translateX(50%)', opacity: 0})
        )
      ])
    ]),
    trigger('resultOut', [
      transition('* => void', [
        animate(
          '200ms ease-in-out',
          style({transform: 'translateX(-50%)', opacity: 0})
        )
      ])
    ])
  ]
})
export class QuizComponent implements OnInit {
  current: number = 0;
  allQuestions: number;
  headerFontSize: number;
  score: number;
  // specify how many cards should be display above the current card
  visibleNextCards: number = 3;
  state: string = '';
  resultText: string = '';

  isCorrectAnswer: Boolean;
  isFinished = false;
  isSettingsMenu: Boolean = false;

  public watcher;

  @ViewChild('mainQuestion') mainQuestion: ElementRef;
  @ViewChild('mainCard') mainCard: ElementRef;
  @ViewChild('mainButton') mainButton: ElementRef;
  @ViewChild('mainInput') mainInput: ElementRef;

  constructor(
    private quizService: DataQuizService,
    private pageService: DataPageService
  ) {
    this.current = this.quizService.currentQuestion;
  }

  ngOnInit() {
    this.quizService.currentQuestionUpdated.subscribe(currentQuestion => {
      this.current = this.quizService.currentQuestion;
    });
    this.quizService.finishEvent.subscribe(value => {
      this.isFinished = true;
      this.fireResultAnimations();
      this.generateResultText();
    });

    if (this.quizService.getNumberOfQuestions() < this.visibleNextCards) {
      this.visibleNextCards = this.quizService.getNumberOfQuestions();
    }
    this.allQuestions = this.quizService.quizData.length;
  }

  ngAfterViewInit() {
    this.headerFontSize = parseInt(
      window
        .getComputedStyle(this.mainQuestion.nativeElement)
        .getPropertyValue('font-size'),
      10
    );
    this.resizeHeader(this.current);
  }

  nextQuestionHelper() {
    // First check answer and after that skip question on second click/enter
    if (!this.quizService.isValidationChecked) {
      this.isCorrectAnswer = this.quizService.validateCurrentQuestion();
      // add score if it is correct
      this.quizService.score += this.isCorrectAnswer ? 1 : 0;

      this.quizService.displayCorrectAnswer();
      this.fireValidateResult();
      this.resizeHeader(this.current + 1);
      this.quizService.isValidationChecked = true;
    } else {
      this.quizService.isValidationChecked = false;
      this.selectInput();
      this.quizService.nextQuestion();
    }
  }

  restartQuizHelper() {
    this.isFinished = false;
  }

  restartQuizAnimationDone(event) {
    // fire animation only on hide
    if (event.toState) {
      this.current = 0;
      this.quizService.restartQuiz();
    }
  }

  selectInput() {
    if (this.current + 1 < this.allQuestions) {
      const id = (this.current + 1).toString();
      const cardBox = document.getElementById(id);
      const input = <HTMLInputElement>cardBox.getElementsByTagName('input')[0];
      input.select();
      input.focus();
    }
  }

  resizeHeader(id) {
    if (this.allQuestions > id) {
      const cardId = id.toString();
      const cardBox = document.getElementById(cardId);
      const header = cardBox.querySelector('h1');
      const length = header.innerText.length;
      const decreasingScale = 0.1;

      if (length > 30) {
        let value = this.headerFontSize - length * decreasingScale;
        // set default, minimal font size when user typed long sentence
        if (value <= 12) {
          value = 14;
        }
        header.style.fontSize = `${value}px`;
      }
    }
  }

  fireValidateResult() {
    const correct = 'correct';
    const incorrect = 'incorrect';
    const correctBodyClass = 'quiz--correct';
    const incorrectBodyClass = 'quiz--incorrect';

    if (this.isCorrectAnswer) {
      this.mainCard.nativeElement.classList.add(correct);
      this.mainQuestion.nativeElement.classList.add(correct);
      this.mainInput.nativeElement.classList.add(correct);
      this.mainButton.nativeElement.classList.add(correct);

      this.quizService.bodyElement.classList.add(correctBodyClass);

      this.mainButton.nativeElement.innerText = 'CORRECT';
    } else {
      this.mainCard.nativeElement.classList.add(incorrect);
      this.mainQuestion.nativeElement.classList.add(incorrect);
      this.mainInput.nativeElement.classList.add(incorrect);
      this.mainButton.nativeElement.classList.add(incorrect);

      this.quizService.bodyElement.classList.add(incorrectBodyClass);

      this.mainButton.nativeElement.innerText = 'INCORRECT';
    }
    this.clearBodyClasses();
  }

  async clearBodyClasses() {
    const correctBodyClass = 'quiz--correct';
    const incorrectBodyClass = 'quiz--incorrect';
    setTimeout(() => {
      this.quizService.bodyElement.classList.remove(correctBodyClass);
      this.quizService.bodyElement.classList.remove(incorrectBodyClass);
    }, 700);
  }

  generateResultText() {
    this.score = parseFloat(this.quizService.getScorePercents());

    if (this.score === 1) {
      this.resultText = 'Awesome!';
    } else if (this.score < 1 && this.score >= 0.8) {
      this.resultText = 'Great!';
    } else if (this.score < 0.8 && this.score >= 0.5) {
      this.resultText = 'Not bad';
    } else {
      this.resultText = 'Keep doing :(';
    }
  }

  animateResultBox() {
    const target = '.quiz-result';
    TweenMax.fromTo(
      target,
      1,
      {
        scale: 0.6,
        opacity: 0,
        display: 'block'
      },
      {
        opacity: 1,
        scale: 1,
        ease: Power3.easeOut,
        onComplete: () => {
          this.animateResultText();
        }
      }
    );
  }

  animateResultText() {
    const textDelay = this.score;
    const target = '.quiz-result__header';
    TweenMax.fromTo(
      target,
      1,
      {
        opacity: 0,
        scale: 0.5
      },
      {
        opacity: 1,
        delay: textDelay,
        scale: 1,
        ease: Power3.easeOut
      }
    );
  }

  fireResultAnimations() {
    // wait for the last card to disappeard
    setTimeout(() => {
      this.animateResultBox();
      this.initializeProgressBar();
    }, 400);
  }

  initializeProgressBar() {
    const target = document.getElementById('circle__container');
    if (target.getElementsByTagName('svg').length >= 1) {
      target.innerHTML = '';
    }

    const bar = new ProgressBar.Circle(target, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 6,
      trailWidth: 2,
      easing: 'bounce',
      duration: 2000,
      text: {
        autoStyleContainer: true
      },
      from: {color: '#ff2500', width: 1},
      to: {color: '#ffd123', width: 3},
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        let value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '%');
        }
        circle.text.style.color = state.color;
      }
    });
    bar.text.style.fontSize = '2.571em';
    bar.animate(this.score);
  }

  toggleMenu() {
    this.isSettingsMenu = !this.isSettingsMenu;
  }

  toggleDarkMode() {
    this.pageService.isDarkMode = !this.pageService.isDarkMode;
    const darkModeClass = 'dark-mode';
    if (this.pageService.isDarkMode) {
      this.pageService.bodyElement.classList.add(darkModeClass);
    } else {
      this.pageService.bodyElement.classList.remove(darkModeClass);
    }
  }

  toggleReplaceQuestions() {
    this.pageService.isAlert = !this.pageService.isAlert;
  }
}
