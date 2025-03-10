import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NcincService } from '../../ncinc.service';
import { ContextMenuItem } from '../../../components/UI/ui-context-menu-container/ui-context-menu-container.component';

@Component({
  selector: 'weapon',
  standalone: false,
  templateUrl: './weapon.component.html',
  styleUrl: '../../ncinc.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class WeaponComponent {
  constructor(private NcincService: NcincService) {}

  @Input() data: any = {};
  @Input() columns: string[] = [];
  @Input() class: string = "";
  @Input() showOwner: (id: number, name: string) => void = (id: number, name: string) => {}
  @Input() contextMenuItems: ContextMenuItem[] = [];
  @Input() idx: number = 0;
 
  onFine() {

  }

  onWarning() {

  }

  onWanted() {

  }

  onCevilHistoryItem = (id: number) => {
    this.NcincService.showHistoryItem(this.data.history, id);
  }
}
