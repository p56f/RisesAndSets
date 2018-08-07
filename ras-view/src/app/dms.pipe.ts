import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dms'
})
export class DmsPipe implements PipeTransform {

  transform(value: number, args?: string): string {
    const lat = (args === 'lat');
    const lng = (args === 'lng');
    
    let hemisphere = '';
    if (value > 0) {
      hemisphere = (lat) ? 'N' : ((lng) ? 'E' : ''); 
    } else if (value < 0) {
      hemisphere = (lat) ? 'S' : ((lng) ? 'W' : '');
    }

    const absValue = Math.abs(value);
    const degrees = Math.floor(absValue);
    const minutesAndSeconds = (absValue - degrees) * 60;
    const minutes = Math.floor(minutesAndSeconds);
    const seconds = Math.round((minutesAndSeconds - minutes) * 60);

    const degreesStr = degrees.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${degreesStr}° ${minutesStr}' ${secondsStr}'' ${hemisphere}`;
  }

}
