import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Car } from '../../ncinc.dto';

@Component({
  selector: 'car',
  standalone: false,
  templateUrl: './car.component.html',
  styleUrl: '../../ncinc.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class CarComponent {
  @Input() data: any = {};
}
