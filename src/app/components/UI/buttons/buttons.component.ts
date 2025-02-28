import { Component, Input } from '@angular/core';

@Component({
  selector: 'buttons',
  standalone: false,
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  @Input() isWanted: boolean = false;
  @Input() onFine: (() => void) | null = null;
  @Input() onWarning: (() => void) | null = null;
  @Input() onWanted: () => void = () => {}; 
  @Input() class: string = "";
}
