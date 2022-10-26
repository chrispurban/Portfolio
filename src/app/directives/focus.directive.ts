import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  constructor(private element:ElementRef){}
  ngAfterViewInit(){setTimeout(() => {this.element.nativeElement.focus();});}

  /*
  constructor(private renderer:Renderer2){}
  ngAfterViewInit(){setTimeout(() => this.renderer.selectRootElement('#initial').focus();});}
  */

}
