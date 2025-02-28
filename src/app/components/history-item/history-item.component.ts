import { Component, signal, WritableSignal } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { CarHistoryItem, CivilHistoryItem, WeaponHistoryItem } from '../../ncinc/ncinc.dto';
import { PresentationService } from '../../services/presentation.service';

type HistoryItemModalType = CivilHistoryItem | CarHistoryItem | WeaponHistoryItem;

@Component({
  selector: 'history-item',
  standalone: false,
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.scss'
})
export class HistoryItemComponent {
  constructor(public ContextService: ContextService, public PresentationService: PresentationService) {}
}
