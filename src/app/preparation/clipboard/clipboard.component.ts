import { Component, OnInit, Input } from '@angular/core';
import { DataQuizService } from '../../data-quiz.service';
import { DataPageService } from '../../data-page.service';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss']
})
export class ClipboardComponent implements OnInit {
  @Input() clipboardData: String;

  constructor(
    private quizService: DataQuizService,
    private pageService: DataPageService
  ) {
  }

  ngOnInit() {
  }
}
