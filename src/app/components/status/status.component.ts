import { Component, signal, WritableSignal } from '@angular/core';
import { StatusDTO } from './status.dto';
import { ContextService } from '../../services/context.service';
import { OfficerDTO } from '../../dtos/officer.dto';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'status',
  standalone: false,
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
    constructor(private ContextService: ContextService, private DataService: DataService) {}

    readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null)
    getOfficerSubscription!: Subscription;
    updateStatusSubscription!: Subscription;

    ngOnInit() {
      this.getOfficerSubscription = this.ContextService.getOfficer().subscribe((data) => this.officer.set(data))
    }

    ngOnDestroy(): void {
      if (this.getOfficerSubscription) {
    //    this.getOfficerSubscription.unsubscribe();
      }

      if (this.updateStatusSubscription) {
      //  this.updateStatusSubscription.unsubscribe();
      }
    }

    handleStatus(newStatus: StatusDTO) {
      this.updateStatusSubscription = this.DataService.updateStatus(newStatus).subscribe();
    }
}
