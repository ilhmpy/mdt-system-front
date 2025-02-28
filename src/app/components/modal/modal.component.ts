import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [
    trigger("openClose", [
      state("open", style({ opacity: 1, display: "flex" })),
      state("closed", style({ opacity: 0, display: "none" })),
      transition('closed => open', [animate('.3s')]),
      transition('open => closed', [animate('.3s')]),
    ])
  ]
})
export class ModalComponent {
  constructor(private ContextService: ContextService) {}

  @Input() show: boolean = false;

  clickleave(e: Event) {
    if (e.target == e.currentTarget) {
      this.mouseleave();
    }
  }

  mouseleave() {
    this.ContextService.setCurrentOfficer(null);
    this.ContextService.setCurrentHistoryItem(null);
  }
}
