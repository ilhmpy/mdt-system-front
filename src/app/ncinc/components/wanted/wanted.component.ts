import { Component, Input } from '@angular/core';

@Component({
  selector: 'ncinc-wanted',
  standalone: false,
  templateUrl: './wanted.component.html',
  styleUrl: './wanted.component.scss'
})
export class WantedComponent {
  @Input() isWanted: boolean = false;
}
