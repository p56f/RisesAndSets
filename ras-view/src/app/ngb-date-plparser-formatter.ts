import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import * as moment from 'moment';

@Injectable()
export class NgbDatePLParserFormatter extends NgbDateParserFormatter {
    private readonly dateFormat = 'DD.MM.YYYY';

    parse(value: string): NgbDateStruct {
        if (value) {
            const dateAsMoment = moment(value, this.dateFormat);
            if (dateAsMoment.isValid()) { 
                return {
                    day: dateAsMoment.date(),
                    month: dateAsMoment.month() + 1,
                    year: dateAsMoment.year()
                };
            }
            return null;
        }
        return null;
    }    
    
    format(date: NgbDateStruct): string {
      if (date != null) {
        const dateAsMoment = moment({
            date: date.day,
            month: date.month - 1,
            year: date.year
        });
        return dateAsMoment.format(this.dateFormat);
      }

      return null;
    }
}
