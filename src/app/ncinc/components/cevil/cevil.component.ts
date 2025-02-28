import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NcincService } from '../../ncinc.service';
import { ContextMenuItem } from '../../../components/UI/ui-context-menu-container/ui-context-menu-container.component';

@Component({
  selector: 'cevil',
  standalone: false,
  templateUrl: './cevil.component.html', 
  styleUrl: '../../ncinc.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CevilComponent {
  constructor(private NcincService: NcincService) {}

  @Input() data: any = {};
  @Input() cevilColumns: string[] = [];
  @Input() carColumnns: string[] = [];
  @Input() weaponColumns: string[] = [];
  @Input() class: string = "";
  @Input() showCar:  (id: number) => void = (id: number) => {};
  @Input() showWeapon: (id: number) => void = (id: number) => {};
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
