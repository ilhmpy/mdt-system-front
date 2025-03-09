import { Component, WritableSignal, signal } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { OfficerDTO } from '../../dtos/officer.dto';

@Component({
  selector: 'cevil-actions',
  standalone: false,
  templateUrl: './cevil-actions.component.html',
  styleUrl: './cevil-actions.component.scss'
})
export class CevilActionsComponent {
  form: FormGroup;
  readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null)

  constructor(private ContextService: ContextService, private fb: FormBuilder, private DataService: DataService) {
    this.form = this.fb.group({
      cevilActionValue: [
        '', 
        [ Validators.required ]
      ]
    })
  }

  ngOnInit() {
    this.ContextService.getOfficer().subscribe((data) => this.officer.set(data));
  }

  get getDescByType(): string {
    const cevilAction = this.ContextService.getCurrentCevilAction().getValue()?.type;

    switch(cevilAction) {
      case("wanted"): {
        return "Put on the wanted list"
      }

      case("fined"): {
        return "Fine"
      }

      case("warned"): {
        return "Issue a warning"
      }

      case("deprDrivingLicense"): {
        return "Deprivation of driving License"
      }

      case("deprGunLicense"): {
        return "Deprivation of gun License"
      }
    }

    return "";
  }

  onCevilActionKeydown() {
    const control = this.form.get("cevilActionValue");
    const cevilAction = this.ContextService.getCurrentCevilAction().getValue();

    if (!control?.errors) {
      switch(cevilAction?.type) {
        case("wanted"): {
          this.DataService.wanted(cevilAction.id, control?.value, cevilAction.object, this.officer()?.id || null).subscribe();
        }
      }
    }

    this.ContextService.setCevilAction(null);
  }
}
