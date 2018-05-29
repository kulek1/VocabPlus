import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataQuizService } from './data-quiz.service';
import { DataPageService } from './data-page.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PreparationComponent } from './preparation/preparation.component';
import { QuizComponent } from './quiz/quiz.component';
import { ClipboardComponent } from './preparation/clipboard/clipboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuizComponent,
    ClipboardComponent,
    PreparationComponent,
    WelcomeComponent,
    AlertComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule],
  providers: [DataQuizService, DataPageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
