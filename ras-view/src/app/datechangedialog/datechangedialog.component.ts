import { Component, Input, OnInit } from '@angular/core';

import { NgbDateStruct, NgbTimeStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dateChangeDialog',
  templateUrl: './datechangedialog.component.html',
  styleUrls: ['./datechangedialog.component.css']
})
export class DateChangeDialogComponent implements OnInit {
  
  @Input()
  parentDate: Date;

  dateModel: NgbDateStruct;
  
  timeModel: NgbTimeStruct;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.dateModel = {
      day: this.parentDate.getDate(),
      month: this.parentDate.getMonth() + 1,
      year: this.parentDate.getFullYear()
    };
    this.timeModel = {
      hour: this.parentDate.getHours(),
      minute: this.parentDate.getMinutes(),
      second: this.parentDate.getSeconds()
    }
  }
}
 