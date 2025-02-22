import { Component, signal, WritableSignal } from '@angular/core';
import { StatusDTO } from './status.dto';
import { ContextService } from '../../services/context.service';
import { OfficerDTO } from '../../dtos/officer.dto';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'status',
  standalone: false,
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
    constructor(private ContextService: ContextService, private DataService: DataService) {}

    readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null)

    ngOnInit() {
      this.ContextService.getOfficer().subscribe((data) => this.officer.set(data))
    }

    handleStatus(newStatus: StatusDTO) {
      this.DataService.updateStatus(newStatus).subscribe();
    }
}
