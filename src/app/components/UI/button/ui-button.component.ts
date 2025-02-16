import { Component, input, InputSignal } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-button',
  standalone: false,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  readonly type: InputSignal<"light" | null> = input<"light" | null>(null);
  readonly link: InputSignal<boolean | undefined> = input<boolean | undefined>(false); 
  readonly path: InputSignal<string | undefined> = input<string | undefined>("");
  readonly click: InputSignal<() => void> = input<() => void>(() => {});
  readonly alarm: InputSignal<boolean> = input<boolean>(false);

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
