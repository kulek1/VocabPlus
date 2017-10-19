import { Component, OnInit } from "@angular/core";
import { DataPageService } from "../data-page.service";

@Component({
  selector: "app-preparation",
  templateUrl: "./preparation.component.html",
  styleUrls: ["./preparation.component.scss"]
})
export class PreparationComponent implements OnInit {
  constructor(private pageService: DataPageService) {}

  ngOnInit() {}

  openClipboard() {
    this.pageService.clipboardView = !this.pageService.clipboardView;
  }
}
