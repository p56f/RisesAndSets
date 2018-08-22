import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dateChangeDialog',
  templateUrl: './datechangedialog.component.html',
  styleUrls: ['./datechangedialog.component.css']
})
export class DateChangeDialogComponent {

  constructor(private activeModal: NgbActiveModal) {}
}
 