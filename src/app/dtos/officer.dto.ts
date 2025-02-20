import { StatusDTO } from "../officers/officers.dto";

type RankType = 
    "officer" | "officerII" | "officerIII" | 
    "sergeant" | "lieutenant" | "captain" | "commander" |
    "divisionchief" | "deputychief" | "chiefofpolice"

export interface RankInterface {
    name: string;
    type: RankType;
    icon: string | null;
}

export interface OfficerDTO {
    name: string;
    marking: string | null;
    markingNumber: number | null;
    status: StatusDTO | null;   
    rank?: RankInterface;
    role?: string;
    badgeNumber: string;
    shift: number;
}

export interface OfficerTableItem extends OfficerDTO {
    lastUpdate: Date;
    location: string;
}