import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: number): string {
    const hoursPart = Math.floor(value / 3600);
    const minutesPart = Math.floor((Math.abs(value) % 3600) / 60);
    const minutesPartString = (minutesPart > 0) ? ` ${minutesPart}m` : '';
    return `${hoursPart}h${minutesPartString}`;
  }
}
