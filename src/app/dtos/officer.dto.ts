import { StatusDTO } from "../officers/officers.dto";
import { Markings } from "./markings.dto";

export interface OfficerDTO {
    name: string;
    marking: Markings | null;
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

export interface MarkingsItem {
    label: string; 
    marking: Markings;
    pairedPatrolCrew: boolean,
}