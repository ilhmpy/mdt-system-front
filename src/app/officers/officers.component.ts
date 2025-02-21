import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkingInterface } from '../dtos/markings.dto';
import { UiInputComponent } from '../components/UI/input/ui-input.component';
import { StatusDTO } from './officers.dto';
import { Column, Value } from '../components/UI/table/ui-table.dto';
import { ContextService } from '../services/context.service';
import { OfficerDTO } from '../dtos/officer.dto';

@Component({
  selector: 'app-officers',
  standalone: false,
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  readonly status: WritableSignal<StatusDTO> = signal<StatusDTO>(null);
  readonly marking: WritableSignal<MarkingInterface> = signal<MarkingInterface>({ label: "Linkoln", marking: "L", pairedPatrolCrew: false });
 
  readonly officersColumns: WritableSignal<Column[]> = signal<Column[]>([
    { label: "Last update", field: "lastUpdate", type: "date" },
    { label: "Badge", field: "badgeNumber" },
    { label: "Name", field: "name" },
    { label: "Marking", field: "marking", type: "marking" },
    { label: "Status", field: "status", type: "status" },
    { label: "Location", field: "location" },
    { label: "Rank", type: "rank" },
  ])
  @ViewChild('inputRef') inputRef!: UiInputComponent;

  readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null);
  readonly officers: WritableSignal<OfficerDTO[]> = signal<OfficerDTO[]>([]);

  getNewMaskData() {
    return `1-${this.marking().marking}-`;
  }

  getMaxInputCharactersByMarking() {
    return 5 + this.marking().marking.length;
  }

  async ngOnInit() {
    localStorage.setItem("token", "$argon2id$v=19$m=65536,t=3,p=4$7kZ1VcNGYrm2pLpejIarUg$v9FPZLrS9Y6Vz0vx6hvr6nk5e8RpUdC+NzSF79RyD/Y")
    this.ContextService.getOfficer().subscribe((data) => this.officer.set(data));
    this.ContextService.getAllOfficers().subscribe((data) => {
      this.officers.set(data || []);
    });
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
