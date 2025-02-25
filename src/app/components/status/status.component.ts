import { Component, signal, WritableSignal } from '@angular/core';
import { StatusDTO } from './status.dto';
import { ContextService } from '../../services/context.service';
import { OfficerDTO } from '../../dtos/officer.dto';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { WebSocketsService } from '../../services/websockets.service';

@Component({
  selector: 'status',
  standalone: false,
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
    constructor(private ContextService: ContextService, private DataService: DataService, private WebSocketsService: WebSocketsService) {}

    readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null)
    updateOfficerSubscription!: Subscription;
    updateOfficersSubscription!: Subscription;

    ngOnInit() {
      this.ContextService.getOfficer().subscribe((data) => this.officer.set(data));
    }

    ngOnDestroy(): void {
      if (this.updateOfficerSubscription) {
        this.updateOfficerSubscription.unsubscribe();
      }
    }

    handleStatus(newStatus: StatusDTO) {
      this.DataService.updateStatus(newStatus).subscribe();
    }
}
