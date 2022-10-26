import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name:'match'
})
export class MatchPipe implements PipeTransform {

  transform( tasks:any[], groupId ): any[] {
    /*
    let output = [];

    for( let i=0; i<object.length; i++ ){
      if ( object[i].state.id == arg ){
        output.push(object[i])
      }
    }
    */

    let groupTasks = tasks.filter(
      x => x.state.id == groupId
    )

    return groupTasks;
  }

}


/*

first value is uhh, whatever
second value is also whatever

if first == second

for each in the provided array




*/
