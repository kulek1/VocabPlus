import { Component, Input } from "@angular/core";
import { DataQuizService } from "./data-quiz.service";
import { DataPageService } from "./data-page.service";
import { TweenMax, Power3 } from "gsap";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  item: Boolean;

  constructor(
    private quizService: DataQuizService,
    private pageService: DataPageService
  ) {
    pageService.mainAnimation.subscribe(value => {
      this.animateBox();
    });
  }

  animateBox() {
    TweenMax.from("#mainbox", 1, {
      opacity: 0,
      scale: 0.6,
      ease: Power3.easeInOut
    });
  }
}
