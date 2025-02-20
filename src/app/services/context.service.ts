import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { MarkingsItem, OfficerTableItem } from "../dtos/officer.dto";
import { Markings } from "../dtos/markings.dto";
import { HttpClient } from "@angular/common/http";

interface MarkingInterface {
  label: string;
  pairedPatrolCrew: boolean;
  marking: string;
}

interface ConfigInterface {
  markings: MarkingInterface[];
}

@Injectable({
    providedIn: "root"
})
export class ContextService {
      private http = inject(HttpClient);

      private Config: WritableSignal<ConfigInterface> = signal<ConfigInterface>({
        markings: [ 
          { label: "Linkoln", marking: "L", pairedPatrolCrew: false, },
          { label: "Adam", marking: "A", pairedPatrolCrew: true, },
          { label: "Mary", marking: "M", pairedPatrolCrew: false,},
          { label: "Henry", marking: "H", pairedPatrolCrew: true, },
          { label: "Air", marking: "AIR", pairedPatrolCrew: true,},
          { label: "King", marking: "K", pairedPatrolCrew: true, },
          { label: "Robert", marking: "R", pairedPatrolCrew: true, },
        ]
      })

      private officers: WritableSignal<OfficerTableItem[]> = signal<OfficerTableItem[]>([
        {
          name: "Michael Carter",
          marking: "A",
          markingNumber: 23,
          status: "OS",
          shift: 3,
          lastUpdate: new Date(2025, 1, 1, 8, 30),
          location: "Elgin Ave",
          badgeNumber: "LS12345"
        },
        {
          name: "Jessica Parker",
          marking: "M",
          markingNumber: 8,
          status: null,
          shift: 1,
          lastUpdate: new Date(2025, 1, 2, 9, 0),
          location: "Vespucci Blvd",
          badgeNumber: "LS12346"
        },
        {
          name: "Ryan Thompson",
          marking: "H",
          markingNumber: 45,
          status: true,
          shift: 4,
          lastUpdate: new Date(2025, 1, 3, 7, 45),
          location: "Bay City Ave",
          badgeNumber: "LS12347"
        },
        {
          name: "Sophia Williams",
          marking: "AIR",
          markingNumber: 5,
          status: "OS",
          shift: 2,
          lastUpdate: new Date(2025, 1, 4, 14, 30),
          location: "San Andreas Ave",
          badgeNumber: "LS12348"
        },
        {
          name: "Daniel Martinez",
          marking: "K",
          markingNumber: 30,
          status: false,
          shift: 5,
          lastUpdate: new Date(2025, 1, 5, 13, 20),
          location: "Power St",
          badgeNumber: "LS12349"
        },
        {
          name: "Emily Johnson",
          marking: "R",
          markingNumber: 19,
          status: "OS",
          shift: 3,
          lastUpdate: new Date(2025, 1, 6, 12, 15),
          location: "Alta St",
          badgeNumber: "LS12350"
        },
        {
          name: "James Rodriguez",
          marking: "L",
          markingNumber: 7,
          status: null,
          shift: 1,
          lastUpdate: new Date(2025, 1, 7, 11, 10),
          location: "Rockford Dr",
          badgeNumber: "LS12351"
        },
        {
          name: "Olivia White",
          marking: "A",
          markingNumber: 12,
          status: false,
          shift: 2,
          lastUpdate: new Date(2025, 1, 8, 10, 5),
          location: "Del Perro Fwy",
          badgeNumber: "LS12352"
        },
        {
          name: "William Scott",
          marking: "M",
          markingNumber: 10,
          status: true,
          shift: 4,
          lastUpdate: new Date(2025, 1, 9, 9, 50),
          location: "Strawberry Ave",
          badgeNumber: "LS12353"
        },
        {
          name: "Isabella Green",
          marking: "H",
          markingNumber: 6,
          status: "OS",
          shift: 5,
          lastUpdate: new Date(2025, 1, 10, 8, 45),
          location: "Davis Ave",
          badgeNumber: "LS12354"
        },
        {
          name: "Carlos Hernandez",
          marking: "L",
          markingNumber: 31,
          status: "OS",
          shift: 2,
          lastUpdate: new Date(2025, 1, 11, 7, 40),
          location: "Mirror Park",
          badgeNumber: "LS12355"
        },
        {
          name: "Nathaniel Brown",
          marking: "A",
          markingNumber: 23,
          status: true,
          shift: 3,
          lastUpdate: new Date(2025, 1, 12, 6, 35),
          location: "West Vinewood",
          badgeNumber: "LS12356"
        },
        {
          name: "Amy Davis",
          marking: "M",
          markingNumber: 22,
          status: "OS",
          shift: 1,
          lastUpdate: new Date(2025, 1, 13, 15, 30),
          location: "Little Seoul",
          badgeNumber: "LS12357"
        },
        {
          name: "Charles Mitchell",
          marking: "H",
          markingNumber: 45,
          status: null,
          shift: 4,
          lastUpdate: new Date(2025, 1, 14, 13, 25),
          location: "Pillbox Hill",
          badgeNumber: "LS12358"
        },
        {
          name: "Jessica Turner",
          marking: "AIR",
          markingNumber: 9,
          status: false,
          shift: 5,
          lastUpdate: new Date(2025, 1, 15, 12, 20),
          location: "Chamberlain Hills",
          badgeNumber: "LS12359"
        },
        {
          name: "Mark Taylor",
          marking: "K",
          markingNumber: 11,
          status: true,
          shift: 2,
          lastUpdate: new Date(2025, 1, 16, 11, 15),
          location: "Olympic Fwy",
          badgeNumber: "LS12360"
        },
        {
          name: "Evelyn Brooks",
          marking: "R",
          markingNumber: 16,
          status: null,
          shift: 3,
          lastUpdate: new Date(2025, 1, 17, 10, 10),
          location: "San Fierro St",
          badgeNumber: "LS12361"
        },
        {
          name: "Joshua Clark",
          marking: "L",
          markingNumber: 28,
          status: "OS",
          shift: 4,
          lastUpdate: new Date(2025, 1, 18, 9, 5),
          location: "South Rockford Dr",
          badgeNumber: "LS12362"
        },
        {
          name: "Zoe Johnson",
          marking: "A",
          markingNumber: 12,
          status: false,
          shift: 1,
          lastUpdate: new Date(2025, 1, 19, 8, 0),
          location: "Alta St",
          badgeNumber: "LS12363"
        },
        {
          name: "Henry Walker",
          marking: "M",
          markingNumber: 24,
          status: true,
          shift: 2,
          lastUpdate: new Date(2025, 1, 20, 7, 55),
          location: "Ganton",
          badgeNumber: "LS12364"
        },
        {
          name: "Chloe Carter",
          marking: "H",
          markingNumber: 6,
          status: "OS",
          shift: 5,
          lastUpdate: new Date(2025, 1, 21, 6, 50),
          location: "East Los Santos",
          badgeNumber: "LS12365"
        },
        {
          name: "Daniel King",
          marking: "AIR",
          markingNumber: 9,
          status: null,
          shift: 1,
          lastUpdate: new Date(2025, 1, 22, 5, 45),
          location: "Downtown Vinewood",
          badgeNumber: "LS12366"
        },
        {
          name: "Brian Green",
          marking: "K",
          markingNumber: 10,
          status: "OS",
          shift: 3,
          lastUpdate: new Date(2025, 1, 23, 16, 40),
          location: "El Rancho",
          badgeNumber: "LS12367"
        },
        {
          name: "Gabriel Lee",
          marking: "A",
          markingNumber: 13,
          status: null,
          shift: 2,
          lastUpdate: new Date(2025, 1, 24, 17, 35),
          location: "Vinewood Hills",
          badgeNumber: "LS12368"
        },
        {
          name: "Nancy Taylor",
          marking: "M",
          markingNumber: 8,
          status: "OS",
          shift: 4,
          lastUpdate: new Date(2025, 1, 25, 18, 30),
          location: "Richman",
          badgeNumber: "LS12369"
        },
        {
          name: "Carlos Garcia",
          marking: "A",
          markingNumber: 17,
          status: "OS",
          shift: 2,
          lastUpdate: new Date('2025-02-18T14:15:00'),
          location: "Vespucci Blvd",
          badgeNumber: "LS12370"
        },
        {
          name: "Ava Lee",
          marking: "M",
          markingNumber: 3,
          status: true,
          shift: 4,
          lastUpdate: new Date('2025-02-18T15:30:00'),
          location: "Ganton",
          badgeNumber: "LS12371"
        },
        {
          name: "Ethan Turner",
          marking: "R",
          markingNumber: 12,
          status: false,
          shift: 5,
          lastUpdate: new Date('2025-02-18T16:45:00'),
          location: "Las Colinas",
          badgeNumber: "LS12372"
        },
        {
          name: "Madison Clarke",
          marking: "L",
          markingNumber: 21,
          status: "OS",
          shift: 3,
          lastUpdate: new Date('2025-02-18T17:00:00'),
          location: "Cypress Flats",
          badgeNumber: "LS12373"
        }
      ]);

      getMarkingsList() {
        return this.Config().markings;
      }

      isMarkingPaired(marking: Markings) {
        return this.Config().markings.find((item: any) => item.marking == marking)?.pairedPatrolCrew;
      }

      getOfficers() {
        return this.officers();
      }
}