import { StatusDTO } from "../components/status/status.dto";
import { MarkingInterface } from "./markings.dto";

type RankType = 
    "officer" | "officerII" | "officerIII" | 
    "sergeant" | "lieutenant" | "captain" | "commander" |
    "divisionchief" | "deputychief" | "chiefofpolice"

export interface RankInterface {
    name: string;
    type: RankType;
    icon: string | null;
}

export interface Permission {
    canActivateName: string;
    get?: boolean;
    create?: boolean;
    delete?: boolean;
    selfUpdate?: boolean;
}

export interface RoleInterface {
    name: string;
    permissions: Permission[];
}

export interface OfficerDTO {
    id: number;
    name: string;
    marking: MarkingInterface | null;
    markingNumber: number | null;
    status: StatusDTO | null;   
    rank?: RankInterface;
    role?: RoleInterface;
    badgeNumber: string;
    shift: { id: number };
    location: string;
    lastUpdate: Date;
}

export interface OfficerTableItem extends OfficerDTO {
    lastUpdate: Date;
    location: string;
}