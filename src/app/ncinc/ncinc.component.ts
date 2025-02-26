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
    readonly civilTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Name" },
      { label: "ID Card" },
    ]);

    readonly carTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Plate" },
      { label: "Owner" },
    ]);

    // написать поиск так же и для Weapon
    readonly weaponTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Serial" },
      { label: "Owner" },
    ]);

    /*
      начинать поиск конкретного элемента только в случае если пользователь нажал на enter
      если находится несколько элементов, то показать таблицу (для каждых данных свои таблицы)
      сделать массив где одновременно могут находится четыре любых элемента, то есть допустим человек может написать четыре разных человека
      или два разных оружия и два разных автомобиля или один человек то есть не важно, просто сделать массив в который попадают все эти данные и все меняется динамически
      на каждую таку модалку добавить крестик для удаления ее, то есть очистки с массива
      
      на civil при нажатии на VIOLATIONS(на конкретный из них) показывать в модальном окне

      в общем надо просто подумать и сделать все максимально логично и удобно для использования

      но в первую очередь реализовать получение данных пока что
    */

    readonly nameTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.civilTypeOfData()[0].label });
    readonly autoTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.carTypeOfData()[0].label });

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
