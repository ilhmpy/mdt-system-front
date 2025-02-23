import { HttpClient } from "@angular/common/http";
import { OfficerDTO } from "../dtos/officer.dto";
import { env } from "../../env";
import { Injectable } from "@angular/core";
import { StatusDTO } from "../components/status/status.dto";
import { MarkingInterface } from "../dtos/markings.dto";
import { PanicDTO } from "../dtos/panic.dto";

@Injectable({
    providedIn: "root"
})
export class DataService {
    constructor(private http: HttpClient) {}

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

    panic({ id, name, badgeNumber, location }: OfficerDTO) {
        return this.http.put<PanicDTO>(`${env.API_URL}/panic/activate-signal`, { id, lastUpdate: new Date(), name, badgeNumber, location });
    }
}