import { Component } from '@angular/core';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'cevil-actions',
  standalone: false,
  templateUrl: './cevil-actions.component.html',
  styleUrl: './cevil-actions.component.scss'
})
export class CevilActionsComponent {
  constructor(private ContextService: ContextService) {}

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
}
