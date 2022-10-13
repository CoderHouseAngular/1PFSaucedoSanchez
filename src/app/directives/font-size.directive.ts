import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.fontSize = '20px';
   }

}
