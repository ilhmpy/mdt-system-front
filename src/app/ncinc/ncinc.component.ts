import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListInterface } from '../components/UI/list/ui-list.dto';
import { Column, Value } from '../components/UI/table/ui-table.dto';

@Component({
  selector: 'app-ncinc',
  standalone: false,
  templateUrl: './ncinc.component.html',
  styleUrl: './ncinc.component.scss'
})
export class NcincComponent {
    readonly typeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "General Info" },
      { label: "Violations" },
    ]);

    readonly nameTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.typeOfData()[0].label });
    readonly autoTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.typeOfData()[0].label });

    carsColumns: string[] = ["plate", "brand", "violations", "bought"];
    gunsColumns: string[] = ["serial", "brand", "violations", "bought"];

    cars: Value[] = [
      { plate: "LS938145", brand: "Peugeout", violations: true, bought: new Date() },
      { plate: "LS938145", brand: "Peugeout", violations: false, bought: new Date() },
      { plate: "LS938145", brand: "Peugeout", violations: true, bought: new Date() },
      { plate: "LS938145", brand: "Peugeout", violations: false, bought: new Date() },
    ];

    guns: Value[] = [
      { serial: "LS938145", brand: "Smith & Wesson Model 500 ", violations: true, bought: new Date() },
      { serial: "LS938145", brand: "Colt 1911", violations: false, bought: new Date() },
      { serial: "LS938145", brand: "Glock 17 Pistols", violations: true, bought: new Date() },
      { serial: "LS938145", brand: "HK MP5 Carabine", violations: false, bought: new Date() },
    ]

    form: FormGroup;

    constructor(private fb: FormBuilder) {
      this.form = this.fb.group({
        nameValue: [
          '',
          [ Validators.required, Validators.maxLength(20), Validators.minLength(15)]
        ],
        autoValue: [
          '',
          [ Validators.required, Validators.maxLength(20), Validators.minLength(15)]
        ],
      })
    }

    onNameValue() {

    }

    onAutoValue() {

    }

    onNameListRender() {

    }

    onAutoListRender() {

    }
}
