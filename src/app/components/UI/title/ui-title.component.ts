import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-title',
  standalone: false,
  templateUrl: './ui-title.component.html',
  styleUrl: './ui-title.component.scss'
})
export class UiTitleComponent {
  @Input() class: string = "";
}
