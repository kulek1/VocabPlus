import { Component, OnInit } from '@angular/core';
import { TweenMax, Bounce } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    TweenMax.from('header', 1, {
      opacity: 0,
      y: -200,
      delay: 6,
      ease: Bounce.easeOut
    });
  }
}
