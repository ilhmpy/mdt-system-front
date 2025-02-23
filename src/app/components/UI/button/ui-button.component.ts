import { Component, Input, input, InputSignal } from '@angular/core';
import { UiButtonDTO } from './ui-button.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-button',
  standalone: false,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  readonly type: InputSignal<UiButtonDTO[]> = input<UiButtonDTO[]>([ "standart" ]);
  readonly link: InputSignal<boolean | undefined> = input<boolean | undefined>(false); 
  readonly path: InputSignal<string | undefined> = input<string | undefined>("");
  @Input() click: () => void = () => {};
  readonly alarm: InputSignal<boolean> = input<boolean>(false);
  @Input() class: string = "";

  constructor(
    private router: Router
  ) {}

  onClick() {
    if (this.link()) {
      this.router.navigate([ this.path() ]);
    } else {
      this.click()
    }
  }
}
