import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Markings } from '../dtos/markings.dto';
import { UiInputComponent } from '../components/UI/input/ui-input.component';
import { StatusDTO } from './officers.dto';
import { Column, Value } from '../components/UI/table/ui-table.dto';
import { OfficerTableItem, MarkingsItem } from '../dtos/officer.dto';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-officers',
  standalone: false,
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  readonly status: WritableSignal<StatusDTO> = signal<StatusDTO>(null);
  readonly marking: WritableSignal<{ label: string; marking: Markings }> = signal<{ label: string; marking: Markings }>({ label: "Linkoln", marking: "L" });
  readonly officersValues: WritableSignal<OfficerTableItem[]> = signal<OfficerTableItem[]>([
      {
        name: "Michael Carter",
        marking: "A",
        markingNumber: 23,
        status: "OS",
        shift: 3,
        lastUpdate: new Date(2025, 1, 1, 8, 30),
        location: "Elgin Ave"
      },
      {
        name: "Jessica Parker",
        marking: "M",
        markingNumber: 8,
        status: null,
        shift: 1,
        lastUpdate: new Date(2025, 1, 2, 9, 0),
        location: "Vespucci Blvd"
      },
      {
        name: "Ryan Thompson",
        marking: "H",
        markingNumber: 45,
        status: true,
        shift: 4,
        lastUpdate: new Date(2025, 1, 3, 7, 45),
        location: "Bay City Ave"
      },
      {
        name: "Sophia Williams",
        marking: "AIR",
        markingNumber: 5,
        status: "OS",
        shift: 2,
        lastUpdate: new Date(2025, 1, 4, 14, 30),
        location: "San Andreas Ave"
      },
      {
        name: "Daniel Martinez",
        marking: "K",
        markingNumber: 30,
        status: false,
        shift: 5,
        lastUpdate: new Date(2025, 1, 5, 13, 20),
        location: "Power St"
      },
      {
        name: "Emily Johnson",
        marking: "R",
        markingNumber: 19,
        status: "OS",
        shift: 3,
        lastUpdate: new Date(2025, 1, 6, 12, 15),
        location: "Alta St"
      },
      {
        name: "James Rodriguez",
        marking: "L",
        markingNumber: 7,
        status: null,
        shift: 1,
        lastUpdate: new Date(2025, 1, 7, 11, 10),
        location: "Rockford Dr"
      },
      {
        name: "Olivia White",
        marking: "A",
        markingNumber: 12,
        status: false,
        shift: 2,
        lastUpdate: new Date(2025, 1, 8, 10, 5),
        location: "Del Perro Fwy"
      },
      {
        name: "William Scott",
        marking: "M",
        markingNumber: 10,
        status: true,
        shift: 4,
        lastUpdate: new Date(2025, 1, 9, 9, 50),
        location: "Strawberry Ave"
      },
      {
        name: "Isabella Green",
        marking: "H",
        markingNumber: 6,
        status: "OS",
        shift: 5,
        lastUpdate: new Date(2025, 1, 10, 8, 45),
        location: "Davis Ave"
      },
      {
        name: "Carlos Hernandez",
        marking: "L",
        markingNumber: 31,
        status: "OS",
        shift: 2,
        lastUpdate: new Date(2025, 1, 11, 7, 40),
        location: "Mirror Park"
      },
      {
        name: "Nathaniel Brown",
        marking: "A",
        markingNumber: 23,
        status: true,
        shift: 3,
        lastUpdate: new Date(2025, 1, 12, 6, 35),
        location: "West Vinewood"
      },
      {
        name: "Amy Davis",
        marking: "M",
        markingNumber: 22,
        status: "OS",
        shift: 1,
        lastUpdate: new Date(2025, 1, 13, 15, 30),
        location: "Little Seoul"
      },
      {
        name: "Charles Mitchell",
        marking: "H",
        markingNumber: 45,
        status: null,
        shift: 4,
        lastUpdate: new Date(2025, 1, 14, 13, 25),
        location: "Pillbox Hill"
      },
      {
        name: "Jessica Turner",
        marking: "AIR",
        markingNumber: 9,
        status: false,
        shift: 5,
        lastUpdate: new Date(2025, 1, 15, 12, 20),
        location: "Chamberlain Hills"
      },
      {
        name: "Mark Taylor",
        marking: "K",
        markingNumber: 11,
        status: true,
        shift: 2,
        lastUpdate: new Date(2025, 1, 16, 11, 15),
        location: "Olympic Fwy"
      },
      {
        name: "Evelyn Brooks",
        marking: "R",
        markingNumber: 16,
        status: null,
        shift: 3,
        lastUpdate: new Date(2025, 1, 17, 10, 10),
        location: "San Fierro St"
      },
      {
        name: "Joshua Clark",
        marking: "L",
        markingNumber: 28,
        status: "OS",
        shift: 4,
        lastUpdate: new Date(2025, 1, 18, 9, 5),
        location: "South Rockford Dr"
      },
      {
        name: "Zoe Johnson",
        marking: "A",
        markingNumber: 12,
        status: false,
        shift: 1,
        lastUpdate: new Date(2025, 1, 19, 8, 0),
        location: "Alta St"
      },
      {
        name: "Henry Walker",
        marking: "M",
        markingNumber: 24,
        status: true,
        shift: 2,
        lastUpdate: new Date(2025, 1, 20, 7, 55),
        location: "Ganton"
      },
      {
        name: "Chloe Carter",
        marking: "H",
        markingNumber: 6,
        status: "OS",
        shift: 5,
        lastUpdate: new Date(2025, 1, 21, 6, 50),
        location: "East Los Santos"
      },
      {
        name: "Daniel King",
        marking: "AIR",
        markingNumber: 4,
        status: null,
        shift: 1,
        lastUpdate: new Date(2025, 1, 22, 5, 45),
        location: "Downtown Vinewood"
      },
      {
        name: "Brian Green",
        marking: "K",
        markingNumber: 10,
        status: "OS",
        shift: 3,
        lastUpdate: new Date(2025, 1, 23, 16, 40),
        location: "El Rancho"
      },
      {
        name: "Gabriel Lee",
        marking: "A",
        markingNumber: 13,
        status: null,
        shift: 2,
        lastUpdate: new Date(2025, 1, 24, 17, 35),
        location: "Vinewood Hills"
      },
      {
        name: "Nancy Taylor",
        marking: "M",
        markingNumber: 8,
        status: "OS",
        shift: 4,
        lastUpdate: new Date(2025, 1, 25, 18, 30),
        location: "Richman"
      },
      {
        name: "Carlos Garcia",
        marking: "A",
        markingNumber: 17,
        status: "OS",
        shift: 2,
        lastUpdate: new Date('2025-02-18T14:15:00'),
        location: "Vespucci Blvd"
      },
      {
        name: "Ava Lee",
        marking: "M",
        markingNumber: 3,
        status: true,
        shift: 4,
        lastUpdate: new Date('2025-02-18T15:30:00'),
        location: "Ganton"
      },
      {
        name: "Ethan Turner",
        marking: "R",
        markingNumber: 12,
        status: false,
        shift: 5,
        lastUpdate: new Date('2025-02-18T16:45:00'),
        location: "Las Colinas"
      },
      {
        name: "Madison Clarke",
        marking: "K",
        markingNumber: 21,
        status: "OS",
        shift: 3,
        lastUpdate: new Date('2025-02-18T17:00:00'),
        location: "Cypress Flats"
      }
  ]);
  readonly officersColumns: WritableSignal<Column[]> = signal<Column[]>([
    { label: "Last update", field: "lastUpdate", type: "date" },
    { label: "Name", field: "name" },
    { label: "Marking", field: "marking", type: "marking" },
    { label: "Status", field: "status", type: "status" },
    { label: "Location", field: "location" }
  ])
  @ViewChild('inputRef') inputRef!: UiInputComponent;

  getNewMaskData() {
    return `1-${this.marking().marking}-`;
  }

  getMaxInputCharactersByMarking() {
    return 5 + this.marking().marking.length;
  }

  readonly maskData: WritableSignal<string> = signal<string>(this.getNewMaskData())

  form: FormGroup;

  constructor(private fb: FormBuilder, readonly ContextService: ContextService) {
    this.form = this.fb.group({
      markingValue: [
        this.getNewMaskData(),
        [ Validators.required, Validators.maxLength(this.getMaxInputCharactersByMarking()) ]
      ],
      notebookValue: [
        '',
        [ Validators.maxLength(400) ]
      ]
    })
  }

  handleStatus(newStatus: StatusDTO) {
    this.status.set(newStatus);
  }

  onMarkingValue = () => {
    const control = this.form.get("markingValue");
    
    control?.setValidators([
      Validators.required,
      Validators.maxLength(this.getMaxInputCharactersByMarking())
    ])

    if (!control?.errors) {
      console.log(control?.value);
    }
  }

  onNoteBookValue() {

  }

  handleMarkingChange = () => {
    const newMaskData = this.getNewMaskData();

    this.inputRef.focus();
    this.maskData.set(newMaskData);
    this.form.patchValue({
      markingValue: newMaskData
    })
  }
}
