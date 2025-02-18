import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Markings } from '../dtos/markings.dto';
import { UiInputComponent } from '../components/UI/input/ui-input.component';


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
  readonly status: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly markingValueErrors: WritableSignal<boolean> = signal<boolean>(false);
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

  readonly maskData: WritableSignal<string> = signal<string>(this.getNewMaskData())


  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      markingValue: [
        this.getNewMaskData(),
        [ Validators.required, Validators.maxLength(5) ]
      ]
    })
  }

  handleStatus(newStatus: boolean | null) {
    this.status.set(newStatus);
  }

  onMarkingValue(errors: WritableSignal<boolean>) {
    if (!errors()) {

    }
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
