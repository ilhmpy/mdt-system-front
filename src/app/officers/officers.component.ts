import { Component, computed, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkingInterface } from '../dtos/markings.dto';
import { UiInputComponent } from '../components/UI/input/ui-input.component';
import { StatusDTO } from '../components/status/status.dto';
import { Column, Value } from '../components/UI/table/ui-table.dto';
import { ContextService } from '../services/context.service';
import { OfficerDTO } from '../dtos/officer.dto';
import { WebSocketsService } from '../services/websockets.service';

@Component({
  selector: 'app-officers',
  standalone: false,
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  readonly status: WritableSignal<StatusDTO> = signal<StatusDTO>(null);
  readonly marking: WritableSignal<MarkingInterface> = signal<MarkingInterface>({ label: "Linkoln", marking: "L", pairedPatrolCrew: false });
 
  readonly officersColumns: WritableSignal<string[]> = signal<string[]>([
    "lastUpdate", "badgeNumber", "name", "marking", "status", "location", "rank"
  ]);
  @ViewChild('inputRef') inputRef!: UiInputComponent;

  readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null);
  readonly officers: WritableSignal<OfficerDTO[]> = signal<OfficerDTO[]>([]);
  readonly defaultOfficers: WritableSignal<OfficerDTO[]> = signal<OfficerDTO[]>([]);

  computedOfficers = computed(() => [...this.officers()]);

  officersComputed = computed(() => this.officers());

  getNewMaskData() {
    return `1-${this.marking().marking}-`;
  }

  getMaxInputCharactersByMarking() {
    return 5 + this.marking().marking.length;
  }

  async ngOnInit() {
    this.ContextService.getOfficer().subscribe((data) => this.officer.set(data));
    this.WebSocketsService.listen("updateOfficers").subscribe((data: any) => {
      if (data.id == this.officer()?.id) {
        this.ContextService.setOfficer(data);
      }

      const newOfficers = this.officers().map((officer) => {
        if (officer.id == data.id) {
          console.log("data", data)
          return { ...data };
        }

        return { ...officer };
      });


      this.defaultOfficers.set(newOfficers)
      this.officers.set(newOfficers);
    })
    this.ContextService.getAllOfficers().subscribe((data) => {
      this.officers.set(data || []);
    });
  }

  readonly maskData: WritableSignal<string> = signal<string>(this.getNewMaskData())

  form: FormGroup;

  constructor(private fb: FormBuilder, readonly ContextService: ContextService, private WebSocketsService: WebSocketsService) {
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

  setCurrentOfficer = (id: number) => {
    const officer = this.officers().find((officer) => officer.id == id);

    if (officer) {
      this.ContextService.setCurrentOfficer(officer);
    }
  }
}
