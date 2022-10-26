import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  now = dayjs();

  transform(value:Date, ...args: unknown[]): unknown {
    return this.now.to(value, true);
  }

}
