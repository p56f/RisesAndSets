import { Component, Input, OnInit } from '@angular/core';

import { NgbDateStruct, NgbTimeStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Moment } from 'moment';

@Component({
  selector: 'app-dateChangeDialog',
  templateUrl: './datechangedialog.component.html',
  styleUrls: ['./datechangedialog.component.css']
})
export class DateChangeDialogComponent implements OnInit {
  
  @Input()
  parentDate: Moment;

  dateModel: NgbDateStruct;
  
  timeModel: NgbTimeStruct;

  constructor(private _activeModal: NgbActiveModal) {}

  get activeModal() {
    return this._activeModal;
  }

  ngOnInit() {
    this.dateModel = {
      day: this.parentDate.date(),
      month: this.parentDate.month() + 1,
      year: this.parentDate.year()
    };
    this.timeModel = {
      hour: this.parentDate.hours(),
      minute: this.parentDate.minutes(),
      second: this.parentDate.seconds()
    }
  }
}
 