import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataPageService {
  // Subject
  mainAnimation: Subject<Boolean> = new Subject<Boolean>();
  // views
  clipboardView: Boolean = false;
  manualView: Boolean = false;
  isDarkMode: Boolean = false;

  // components
  isAlert: Boolean = false;

  // animations
  isMainAnimationDone: Boolean = false;

  bodyElement = document.getElementsByTagName('body')[0];

  constructor() {
  }

  disableClipboardView() {
    this.clipboardView = false;
  }

  // alert
  openAlert() {
    this.isAlert = !this.isAlert;
  }

  closeAlert() {
    this.isAlert = false;
  }

  mainAnimationLoaded() {
    this.isMainAnimationDone = true;
    this.mainAnimation.next(true);
  }
}
