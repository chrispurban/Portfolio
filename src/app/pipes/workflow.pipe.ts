import { Pipe, PipeTransform } from '@angular/core';
import { Task, workflow } from '../classes/task';

@Pipe({
  name: 'workflow'
})
export class WorkflowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return workflow(value);
  }
}

// investigate whether a hybrid pipe class is possible to allow the same set of functions to be executed on both sides
