import { Directive, AfterViewInit, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => this.element.nativeElement.focus());
  }

}
