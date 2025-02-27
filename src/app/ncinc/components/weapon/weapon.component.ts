import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'weapon',
  standalone: false,
  templateUrl: './weapon.component.html',
  styleUrl: '../../ncinc.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class WeaponComponent {
  @Input() data: any = {};
}
