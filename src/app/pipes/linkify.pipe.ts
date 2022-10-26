import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value:String):String {
    return value ? linkifyStr(value, {target: '_system'}) : value;
  }

}
