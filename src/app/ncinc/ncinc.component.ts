import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListInterface } from '../components/UI/list/ui-list.dto';
import { Column, Value } from '../components/UI/table/ui-table.dto';
import { Car, Cevil, Weapon } from './ncinc.dto';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ContextService } from '../services/context.service';
import { DataService } from '../services/data.service';
import { Observable, Subscription } from 'rxjs';
import { NcincService } from './ncinc.service';
import { ContextMenuItem } from '../components/UI/ui-context-menu-container/ui-context-menu-container.component';
import { WebSocketsService } from '../services/websockets.service';

export type NCINCDataType = Car | Weapon | Cevil;
interface ValidationInterface {
  [key: string]: string;
}

@Component({
  selector: 'app-ncinc',
  standalone: false, 
  templateUrl: './ncinc.component.html',
  styleUrl: './ncinc.component.scss'
})
export class NcincComponent {
    readonly cevilTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Name", field: "name" },
      { label: "ID Card", field: "idCard" },
    ]);

    readonly carTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Plate", field: "plate" },
    ]);

    readonly weaponTypeOfData: InputSignal<ListInterface[]> = input<ListInterface[]>([
      { label: "Serial", field: "serial" },
    ]);

    readonly nameTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>(this.cevilTypeOfData()[0]);
    readonly autoTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>(this.carTypeOfData()[0]);
    readonly weaponTypeOfDataRenderField: WritableSignal<ListInterface> = signal<ListInterface>(this.weaponTypeOfData()[0]);
    readonly NcincDataArray: WritableSignal<NCINCDataType[]> = signal<NCINCDataType[]>([]);

    form: FormGroup;

    carsColumns: string[] = ["plate", "brand", "wanted"];
    weaponColumns: string[] = ["serial", "brand", "wanted"];
    cevilColumns: string[] = ["happened", "description", "type"];

    
    onDelete = (idx: number) => {
      this.NcincDataArray.set(this.NcincDataArray().filter((item, i) => {
        return i != idx;
      }));
    }

    contextMenuItems: ContextMenuItem[] = [ 
      {
        label: "Delete",
        onClick: this.onDelete,
        type: "delete"
      }
    ]

    constructor(
      private fb: FormBuilder, 
      private ContextService: ContextService, 
      private DataService: DataService,
      private NcincService: NcincService,
      private WebSocketsService: WebSocketsService
    ) {
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

    updateNCINCItemSubscription!: Subscription;

    ngOnInit() {
      this.updateNCINCItemSubscription = this.WebSocketsService.listen<{ data: NCINCDataType, type: "civil" | "car" | "weapon" }>("updateNCINCItem").subscribe(({ data, type }) => {  
        const ncincDataArray = [ ...this.NcincDataArray() ];

        if (type == "civil") {
          const oldCivil = this.NcincDataArray().find((item) => item.id == data.id && !!((item as Cevil).name));

          if (oldCivil) {
            const oldIdx = this.NcincDataArray().indexOf(oldCivil);
            ncincDataArray[oldIdx] = data;

            this.NcincDataArray.set(ncincDataArray);
          }
        }
      })
    }

    ngOnDestroy(): void { 
      if (this.updateNCINCItemSubscription) {        
        this.updateNCINCItemSubscription.unsubscribe(); 
      }     
    }

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
  
    onInputValue(
      event: KeyboardEvent,
      formControlName: string,
      dataServiceMethod: (label: string, value: string) => Observable<any[]>,
      typeOfDataRenderField: () => ListInterface,
      validation?: ValidationInterface,
      errors?: null | object,
    ) {
      if (event.key !== "Enter") return;
    
      const control = this.form.get(formControlName);
      const value = control?.value;
      errors = errors !== undefined ? errors : control?.errors;
      const arrayField = typeOfDataRenderField()?.field;
      const invalid = this.nameOrIdCardValidator(value, typeOfDataRenderField().label);
      
      if (arrayField) {
        const doesntExist = !this.NcincDataArray().find((item: any) => item?.[arrayField] == value);
        const lessThan4 = this.NcincDataArray().length <= this.NcincService.lessThan;

        if (!errors && doesntExist && lessThan4) {
          dataServiceMethod(typeOfDataRenderField().label, value).subscribe((data) => {
            console.log(`get-${formControlName}`, data);
            control?.reset();
            if (data.length > 1) {
  
            } else {
              this.NcincDataArray.set([...this.NcincDataArray(), ...data]);
              console.log("NCINCDataArray", this.NcincDataArray());
            }
          });
        } else {
          if (validation && !!invalid) {
            this.ContextService.setIsValidation(validation[arrayField]);
          } else {
            this.NcincService.validation(lessThan4, doesntExist);
          }

          this.form.get(formControlName)?.reset();
          window.scrollTo(0, 0);
        }
      }
    }
    
    onNameValue(e: KeyboardEvent) {
      const errors = this.nameOrIdCardValidator(this.form.get("nameValue")?.value, this.nameTypeOfDataRenderField().label);
      this.onInputValue(
        e, "nameValue", 
        this.DataService.getCevil.bind(this.DataService), 
        this.nameTypeOfDataRenderField, 
        { 
          idCard: "Your not allow to write letters at id card field", 
          name: "Your not allow to write numbers at name field",
          exist: "Your already have this data"
        }, 
        errors
      );
    }
    
    onAutoValue(e: KeyboardEvent) {
      this.onInputValue(
        e, "autoValue", this.DataService.getAuto.bind(this.DataService), 
        this.autoTypeOfDataRenderField,
        {}
      );
    }
    
    onWeaponValue(e: KeyboardEvent) {
      this.onInputValue(
        e, "weaponValue", this.DataService.getWeapon.bind(this.DataService), 
        this.weaponTypeOfDataRenderField,
        {}
      );
    }
    
    showOwner = (id: number, name: string) => {
      this.NcincService.showData(id, name, this.NcincDataArray);
    }

    showCar = (id: number) => {
      this.NcincService.showCar(id, this.NcincDataArray);
    }

    showWeapon = (id: number) => {
      this.NcincService.showWeapon(id, this.NcincDataArray);
    }
}
