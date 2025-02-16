import { Component, input, InputSignal } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: false,
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  readonly type: InputSignal<"dark" | "light"> = input<"dark" | "light">("dark");
}
