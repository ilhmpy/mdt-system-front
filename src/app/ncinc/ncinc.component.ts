import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListInterface } from '../components/UI/list/ui-list.dto';
import { Column, Value } from '../components/UI/table/ui-table.dto';
import { Car, Cevil, Weapon } from './ncinc.dto';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ContextService } from '../services/context.service';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

type NCINCDataType = Car | Weapon | Cevil;

@Component({
  selector: 'app-ncinc',
  standalone: false, 
  templateUrl: './ncinc.component.html',
  styleUrl: './ncinc.component.scss'
})
export class NcincComponent {
    readonly cevilTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Name" },
      { label: "ID Card" },
    ]);

    readonly carTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Plate" },
    ]);

    readonly weaponTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Serial" },
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

    readonly nameTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.cevilTypeOfData()[0].label });
    readonly autoTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.carTypeOfData()[0].label });
    readonly weaponTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: this.weaponTypeOfData()[0].label });
    
    carsColumns: string[] = ["plate", "brand", "violations", "bought"];
    gunsColumns: string[] = ["serial", "brand", "violations", "bought"];
    cevilColumns: string[] = ["freed", "description", "type"]

    readonly NcincDataArray: WritableSignal<NCINCDataType[]> = signal<NCINCDataType[]>([]);

    form: FormGroup;

    typeGuard(item: Cevil | Car | Weapon, type: "cevil" | "car" | "weapon"): boolean {
      switch(type) {
        case("cevil"): {
          return (item as Cevil).idCard !== undefined;
        }

        case("car"): {
          return (item as Car).plate !== undefined;
        }

        case("weapon"): {
          return (item as Weapon).serial !== undefined;
        }
      }

      return false;
    }

    resetForm = () => {
      this.form.reset();
      this.ContextService.setIsValidation(null);
    }

    nameOrIdCardValidator(value: string, renderField: string): null | Object {
        if (renderField.toLocaleLowerCase() == "name") {
          const chars = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value);

          if (!chars) {
            return { chars }
          }
        } else {
          const numbers = /^[0-9-]+$/.test(value);

          if (!numbers) {
            return { numbers };
          }
        }

        return null
      }

    constructor(private fb: FormBuilder, private ContextService: ContextService, private DataService: DataService) {
      this.form = this.fb.group({
        nameValue: [
          'Michael Smaith',
          [ Validators.required ]
        ],
        autoValue: [
          '8FH2A6',
          [ Validators.required ]
        ],
        weaponValue: [
          'CP-245235',
          [ Validators.required ]
        ]
      })
    }
  
    onInputValue(
      event: KeyboardEvent,
      formControlName: string,
      dataServiceMethod: (label: string, value: string) => Observable<any[]>,
      typeOfDataRenderField: () => { label: string },
      errors?: null | object
    ) {
      if (event.key !== "Enter") return;
    
      const control = this.form.get(formControlName);
      const value = control?.value;
      errors = errors !== undefined ? errors : control?.errors;
      const arrayField = this.DataService.getParam(typeOfDataRenderField().label);
      
      if (!errors && !this.NcincDataArray().find((item: any) => item?.[arrayField] == value)) {
        dataServiceMethod(typeOfDataRenderField().label, value).subscribe((data) => {
          console.log(`get-${formControlName}`, data);
          control?.reset();
          if (data.length > 1) {

          } else {
            this.NcincDataArray.set([...this.NcincDataArray(), ...data]);
            console.log("NCINCDataArray", this.NcincDataArray());
          }
        });
      }
    }
    
    onNameValue(e: KeyboardEvent) {
      const errors = this.nameOrIdCardValidator(this.form.get("nameValue")?.value, this.nameTypeOfDataRenderField().label);
      this.onInputValue(e, "nameValue", this.DataService.getCevil.bind(this.DataService), this.nameTypeOfDataRenderField, errors);
    }
    
    onAutoValue(e: KeyboardEvent) {
      this.onInputValue(e, "autoValue", this.DataService.getAuto.bind(this.DataService), this.autoTypeOfDataRenderField);
    }
    
    onWeaponValue(e: KeyboardEvent) {
      this.onInputValue(e, "weaponValue", this.DataService.getWeapon.bind(this.DataService), this.weaponTypeOfDataRenderField);
    }
    
}
