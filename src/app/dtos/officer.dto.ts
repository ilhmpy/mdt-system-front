import { StatusDTO } from "../officers/officers.dto";

export interface OfficerDTO {
    name: string;
    marking: string | null;
    markingNumber: number | null;
    status: StatusDTO | null;   
    rank?: string;
    role?: string;
    badgeNumber: string;
    shift: number;
}

export interface OfficerTableItem extends OfficerDTO {
    lastUpdate: Date;
    location: string;
}