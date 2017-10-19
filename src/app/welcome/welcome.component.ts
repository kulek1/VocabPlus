import { Component, OnInit } from "@angular/core";
import { DataPageService } from "./../data-page.service";
import { TweenMax, Power3 } from "gsap";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  constructor(private pageService: DataPageService) {}

  ngOnInit() {
    TweenMax.from(".welcome__container", 2.5, {
      opacity: 0,
      scale: 0.4,
      y: "-30%",
      delay: 0.1,
      ease: Power3.easeInOut
    });
    TweenMax.from(".plus-char", 1, {
      opacity: 0,
      scale: 0.4,
      y: "-30%",
      delay: 3,
      ease: Power3.easeInOut
    });
    TweenMax.to(".welcome__container, .plus-char", 0.5, {
      opacity: 0,
      delay: 4.5,
      onComplete: () => this.mainTextLoaded()
    });
  }
  mainTextLoaded() {
    this.pageService.mainAnimationLoaded();
  }
}
