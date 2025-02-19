import { Injectable, WritableSignal, signal } from "@angular/core";
import { MarkingsItem } from "../dtos/officer.dto";
import { Markings } from "../dtos/markings.dto";

@Injectable({
    providedIn: "root"
})
export class ContextService {
      private markingsList: WritableSignal<MarkingsItem[]> = signal<MarkingsItem[]>([ 
        { label: "Linkoln", marking: "L", pairedPatrolCrew: false, },
        { label: "Adam", marking: "A", pairedPatrolCrew: true, },
        { label: "Mary", marking: "M", pairedPatrolCrew: false,},
        { label: "Henry", marking: "H", pairedPatrolCrew: true, },
        { label: "Air", marking: "AIR", pairedPatrolCrew: true,},
        { label: "King", marking: "K", pairedPatrolCrew: true, },
        { label: "Robert", marking: "R", pairedPatrolCrew: true, },
      ]);

      getMarkingsList() {
        return this.markingsList;
      }

      isMarkingPaired(marking: Markings) {
        return this.markingsList().find((item) => item.marking == marking)?.pairedPatrolCrew;
      }
}