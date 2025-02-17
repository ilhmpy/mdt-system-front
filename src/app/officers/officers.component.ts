import { Component, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-officers',
  standalone: false,
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  readonly status: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly markingValueErrors: WritableSignal<boolean> = signal<boolean>(false);
  readonly marking: WritableSignal<string> = signal<string>("L");

  readonly maskData: string = `1-${this.marking()}-`;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      markingValue: [
        this.maskData,
        [ Validators.required, Validators.maxLength(5) ]
      ]
    })
  }

  handleStatus(newStatus: boolean | null) {
    this.status.set(newStatus);
  }

  onMarkingValue(errors: WritableSignal<boolean>) {

  }
}
