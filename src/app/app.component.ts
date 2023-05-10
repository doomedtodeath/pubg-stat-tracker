import { Component } from '@angular/core';
import {PubgService} from "./services/pubg.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tracker';

  constructor(private pubgService: PubgService) {
  }
}
