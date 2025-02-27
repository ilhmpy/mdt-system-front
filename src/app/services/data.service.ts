import { HttpClient } from "@angular/common/http";
import { OfficerDTO } from "../dtos/officer.dto";
import { env } from "../../env";
import { Injectable } from "@angular/core";
import { StatusDTO } from "../components/status/status.dto";
import { MarkingInterface } from "../dtos/markings.dto";
import { PanicDTO } from "../dtos/panic.dto";
import { Car, Cevil, Weapon } from "../ncinc/ncinc.dto";

@Injectable({
    providedIn: "root"
})
export class DataService {
    constructor(private http: HttpClient) {}
    getParam(param: string) {
        return param.toLocaleLowerCase().replace(" ", "");
    } 

    getOfficer() {
        return this.http.get<OfficerDTO>(`${env.API_URL}/officers/get-officer`);
    }
    
    getOfficers() {
        return this.http.get<OfficerDTO[]>(`${env.API_URL}/officers/get-officers`);
    }

    getMarkings() {
        return this.http.get<MarkingInterface[]>(`${env.API_URL}/officers/get-markings`);
    }
    
    updateStatus(status: StatusDTO) {
        return this.http.put<null>(`${env.API_URL}/officers/update-status`, { status });
    }

    updateMarking(marking: { markingId: number; markingNumber: number; }) {
        return this.http.put<null>(`${env.API_URL}/officers/update-marking`, marking );
    }

    getPanics() {
        return this.http.get<PanicDTO[]>(`${env.API_URL}/panic/get-signals`);
    }

    panic({ id, name, badgeNumber, location }: OfficerDTO) {
        return this.http.put<PanicDTO>(`${env.API_URL}/panic/activate-signal`, { officerId: id, lastUpdate: new Date(), name, badgeNumber, location });
    }

    deactivatePanic(officerId: number) {
        return this.http.put<null>(`${env.API_URL}/panic/deactivate-signal`, { officerId });
    }

    getCevil(param: string, value: string) {
        param = this.getParam(param);
        return this.http.get<Cevil[]>(`${env.API_URL}/ncinc/get-civil?${param}=${value}`);
    }

    getAuto(param: string, value: string) {
        param = this.getParam(param);
        return this.http.get<Car[]>(`${env.API_URL}/ncinc/get-auto?${param}=${value}`);
    }

    getWeapon(param: string, value: string) {
        param = this.getParam(param);
        return this.http.get<Weapon[]>(`${env.API_URL}/ncinc/get-weapon?${param}=${value}`);
    }
}