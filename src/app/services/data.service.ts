import { HttpClient } from "@angular/common/http";
import { OfficerDTO } from "../dtos/officer.dto";
import { env } from "../../env";
import { Injectable } from "@angular/core";
import { StatusDTO } from "../components/status/status.dto";

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
    
    updateStatus(status: StatusDTO) {
        return this.http.put<OfficerDTO>(`${env.API_URL}/officers/update-status`, { status });
    }
}