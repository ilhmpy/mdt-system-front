import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NcincService } from '../../ncinc.service';
import { ContextMenuItem } from '../../../components/UI/ui-context-menu-container/ui-context-menu-container.component';
import { ContextService } from '../../../services/context.service';

@Component({
  selector: 'cevil',
  standalone: false,
  templateUrl: './cevil.component.html', 
  styleUrl: '../../ncinc.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CevilComponent {
  constructor(public NcincService: NcincService, private ContextService: ContextService) {}

  @Input() data: any = {};
  @Input() cevilColumns: string[] = [];
  @Input() carColumnns: string[] = [];
  @Input() weaponColumns: string[] = [];
  @Input() class: string = "";
  @Input() showCar:  (id: number) => void = (id: number) => {};
  @Input() showWeapon: (id: number) => void = (id: number) => {};
  @Input() contextMenuItems: ContextMenuItem[] = [];
  @Input() idx: number = 0;

  onCevilHistoryItem = (id: number) => {
    this.NcincService.showHistoryItem(this.data.history, id);
  }

  onWanted = () => {
    this.ContextService.setCevilAction({ id: this.data.id, object: "civil", type: "wanted" });
  }
}
