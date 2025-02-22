import { Component, signal, WritableSignal } from '@angular/core';
import { ContextService } from '../../../services/context.service';
import { OfficerDTO } from '../../../dtos/officer.dto';
import { PresentationService } from '../../../services/presentation.service';

@Component({
  selector: 'profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private ContextService: ContextService, public PresentationService: PresentationService) {}

  readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null); 
  readonly isCallsActivated: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit() {
    this.ContextService.getCurrentOfficer().subscribe((data) => {
      this.officer.set(data);
    })
  }

  callsClick = () => {
    this.isCallsActivated.set(!this.isCallsActivated())
  }

  mouseleave() {
    this.ContextService.setCurrentOfficer(null);
  }
}
