import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-plate',
  standalone: false,
  templateUrl: './ui-plate.component.html',
  styleUrl: './ui-plate.component.scss'
})
export class UiPlateComponent {
  @Input() plate: string = ""; 
}
