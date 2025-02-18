import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Markings } from '../dtos/markings.dto';
import { UiInputComponent } from '../components/UI/input/ui-input.component';
import { StatusDTO } from './officers.dto';


interface MarkingsItem {
  label: string; 
  marking: Markings;
}

@Component({
  selector: 'app-officers',
  standalone: false,
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  readonly status: WritableSignal<StatusDTO> = signal<StatusDTO>(null);
  readonly marking: WritableSignal<{ label: string; marking: Markings }> = signal<{ label: string; marking: Markings }>({ label: "Linkoln", marking: "L" });
  @ViewChild('inputRef') inputRef!: UiInputComponent;

  readonly markingsList: WritableSignal<MarkingsItem[]> = signal<MarkingsItem[]>([ 
    { label: "Linkoln", marking: "L" },
    { label: "Adam", marking: "A" },
    { label: "Mary", marking: "M" },
    { label: "Henry", marking: "H" },
    { label: "Air", marking: "AIR" },
    { label: "King", marking: "K" },
    { label: "Robert", marking: "R" },
  ]);

  getNewMaskData() {
    return `1-${this.marking().marking}-`;
  }

  getMaxInputCharactersByMarking() {
    return 5 + this.marking().marking.length;
  }

  readonly maskData: WritableSignal<string> = signal<string>(this.getNewMaskData())

  form: FormGroup;

  constructor(private fb: FormBuilder) {
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
