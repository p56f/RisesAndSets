import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbDatePLParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.split('.');
            if (dateParts.length !== 3) {
                return null;
            }
            return this.convertToDate(dateParts);
        }
        return null;
    }    
    
    format(date: NgbDateStruct): string {
      if (date != null) {
        const day = date.day.toString().padStart(2, '0');
        const month = date.month.toString().padStart(2, '0');
        const year = date.year.toString();
        return `${day}.${month}.${year}`;
      }

      return null;
    }

    private convertToDate(dateParts: string[]) : NgbDateStruct {
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year) && this.isCorrectDate(day, month, year)) {
            return {day: day, month: month, year: year};
        }
        return null;
    }

    private isCorrectDate(day: number, month: number, year: number) : boolean {
        const daysInMonth = [31, this.daysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return (month > 0) && (month <= 12) && (day <= daysInMonth[month - 1]); 
    }

    private daysInFebruary(year: number) : number {
        return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    }
}
