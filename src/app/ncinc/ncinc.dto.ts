export enum CivilHistoryItemTypes {
    fine = "Fine",
    prisonTerm = "Prison term",
    jailTerm = "Jail term",
    deprDrivingLicense = "Deprivation of driving License",
    deprGunLicense = "Deprivation of gun License"
  }
  
export interface CivilHistoryItem {
    id: number;
    happened: Date;
    freed: Date; 
    description: string;
    type: CivilHistoryItemTypes;
  }
  
export enum CarHistoryItemTypes {
    confiscated,
    fined,
    stoped,
    selled,
    wanted,
  }
  
export enum WeaponHistoryItemTypes {
    confiscated,
    bought,
    used,
    wanted // in crime
  }

export interface CarHistoryItem {
    id: number;
    happened: Date;
    freed: Date; 
    description: string;
    type: CarHistoryItemTypes;
  }
  
export interface WeaponHistoryItem {
    id: number;
    happened: Date;
    description: string;
    type: WeaponHistoryItemTypes;
  }
  
  
export interface Car {
    id: number;
    brand: string;
    plate: string;
    history: CarHistoryItem[];
    color: string;
    wanted: boolean;
    isRegistered: boolean;
}
  
export interface Weapon {
    id: number;
    serial: string;
    brand: string;
    wanted: boolean;
    history: WeaponHistoryItem[];
}
  
export interface Cevil {
    id: number;
    name: string;
    idCard: string;
    gunLicense: boolean;
    drivingLicense: boolean;
    workPlace: string;
    wanted: boolean;
    isOfficer: boolean;
    description: string;
    dateOfBirth: Date;
    sex: string;
    race: string;
    hair: string;
    eyes: string;
    phoneNumber: string;
    history: CivilHistoryItem[];
}