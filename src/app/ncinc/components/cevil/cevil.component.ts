import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cevil',
  standalone: false,
  templateUrl: './cevil.component.html', 
  styleUrl: '../../ncinc.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CevilComponent {
  @Input() data: any = {};
  @Input() columns: string[] = [];

  onFine() {

  }

  onWarning() {

  }

  onWanted() {

  }
}
