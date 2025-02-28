import { Injectable, WritableSignal } from "@angular/core";
import { Car, CarHistoryItem, Cevil, CivilHistoryItem, Weapon, WeaponHistoryItem } from "./ncinc.dto";
import { ContextService } from "../services/context.service";
import { NCINCDataType } from "./ncinc.component";
import { DataService } from "../services/data.service";

type NcincArraysType = CivilHistoryItem[] | CarHistoryItem[] | WeaponHistoryItem[];

@Injectable({
    providedIn: "root" 
})
export class NcincService {
    constructor(private ContextService: ContextService, private DataService: DataService) {}

    readonly lessThan: number = 3;

    showHistoryItem(array: NcincArraysType, id: number) {
        const historyItem = array.find((item) => item.id == id);

        if (historyItem) {
            this.ContextService.setCurrentHistoryItem(historyItem);
        }
    }

    showData = (id: number, name: string, control: WritableSignal<NCINCDataType[]>) => {
        const exist = !!control().find((item) => item.id == id && (item as Cevil).name == name);
        const lessThan4 = control().length <= this.lessThan;

        if (!exist && lessThan4) {
            this.DataService.getCevil("id", id).subscribe((data) => {
                control.set([...data, ...control()]);
            });
        } else {
            if (!lessThan4) {
                this.ContextService.setIsValidation("More than 4 datas on the page is not allowed")
            } else if (!exist) {
                this.ContextService.setIsValidation("Your already have this data");
            }
        }

        return;
    }

    validation(lessThan4: boolean, exist: boolean) {
        if (!lessThan4) {
            this.ContextService.setIsValidation("More than 4 datas on the page is not allowed. You can delete data with right mouse button.")
        } else if (!exist) {
            this.ContextService.setIsValidation("Your already have this data");
        }        
    }

    showCar = (id: number, control: WritableSignal<NCINCDataType[]>) => {
        const exist = !!control().find((item) => item.id == id && !!(item as Car).plate);
        const lessThan4 = control().length <= this.lessThan;

        if (!exist && lessThan4) {
            this.DataService.getAuto("id", id).subscribe((data) => {
                control.set([...control(), ...data]);
            })
        } else {
            this.validation(lessThan4, exist);
        }
    }

    showWeapon = (id: number, control: WritableSignal<NCINCDataType[]>) => {
        const exist = !!control().find((item) => item.id == id && !!(item as Weapon).serial);
        const lessThan4 = control().length <= this.lessThan;

        if (!exist && lessThan4) {
            this.DataService.getWeapon("id", id).subscribe((data) => {
                control.set([...control(), ...data]);
            })
        } else {
            this.validation(lessThan4, exist);
        }
    }
}