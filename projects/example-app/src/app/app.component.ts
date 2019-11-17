import { Component, OnInit } from '@angular/core';
import { createDispatcher } from '@ngrx-util/autobind';

import { updateTitle } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  updateTitle = createDispatcher(updateTitle);

  ngOnInit() {
    this.updateTitle({title: 'string'});
  }
}
