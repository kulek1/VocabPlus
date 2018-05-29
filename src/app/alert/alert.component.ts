import { DataPageService } from '../data-page.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alertState', [
      state('in', style({})),
      transition('void => *', [
        style({transform: 'translateX(20%) scale(0.6)', opacity: 0}),
        animate('.3s ease')
      ]),
      transition('* => void', [
        animate(
          '.2s 3s ease-in-out',
          style({transform: 'translateX(40%) scale(0.6)', opacity: 0})
        )
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  constructor(private pageService: DataPageService) {
  }

  ngOnInit() {
  }

  alertStateLoaded() {
    this.pageService.closeAlert();
  }
}
