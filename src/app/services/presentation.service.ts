import { Injectable } from "@angular/core";
import { Column, Value } from "../components/UI/table/ui-table.dto";
import { ListInterface } from "../components/UI/list/ui-list.dto";
import { ContextService } from "./context.service";
import { OfficerDTO } from "../dtos/officer.dto";
import { CivilHistoryItemTypes } from "../ncinc/ncinc.dto";

@Injectable({
    providedIn: "root"
})
export class PresentationService {
        constructor(private ContextService: ContextService) {}

        getRoleNameFromServerView(role: string) {
            const elementsArray = role.replace("-", " ").replace("-", " ").split("");
            const idxsToDelete: number[] = [];

            let endElementsArray: string[] = [];

            endElementsArray = elementsArray.map((element, idx) => {
                if (element == ' ') {
                    idxsToDelete.push(idx + 1)
                    return ` ${elementsArray[idx + 1].toUpperCase()}`;
                }

                if (idx == 0) {
                    return element.toUpperCase();
                }

                return element;
            })

            return [...endElementsArray.filter((i, idx) => idx == 0 || !idxsToDelete.includes(idx))].join("");
        }

      
        defaultSort(arr: OfficerDTO[], data: OfficerDTO | null): OfficerDTO[] {
            const id = data?.id;
            let sortedArr: OfficerDTO[] = [];

            sortedArr = arr.sort((a, b) => {
                if (a["id"] == id) {
                    return -1;
                }

                return 1;
            })

            return sortedArr
        }

        handleSort(values: Value[], sortLabel: string, defaultValues: Value[], data?: Value) {
            let sortedArr = [...values];

                switch(sortLabel) {
                    case("Default"): {
                        if (data) {
                            const id = data["id"];

                            sortedArr = defaultValues.sort((a, b) => {
                                if (a["id"] == id) {
                                    return -1;
                                }

                                return 1;
                            })
                        } else {
                            sortedArr = defaultValues;
                        }

                        return sortedArr;
                    }

                    case("Crew"): {
                        return sortedArr;
                    }

                    case("Marking"): {
                        sortedArr = sortedArr.sort((a, b) => {
                            if ( 
                                a["marking"].pairedPatrolCrew &&
                                a?.["marking"] && a["markingNumber"]
                            ) {
                                return -1
                            }
                    
                            return 1;
                        })

                        break;
                    }

                    case("Status"): {
                        sortedArr = sortedArr.sort((a, b) => {
                            if (a?.["status"] == true) {
                                return -1;
                            }

                            if (a?.["status"] == false) {
                                return 0;
                            }

                            if (a?.["status"] == null) {
                                return 1;
                            }

                            return 0;
                        })
                    }
                }

                return sortedArr;
            }

        getPaginationsList(itemsPerPage: number, values: Value[]): number[] {
            const basedPag = itemsPerPage;
            const options = new Set<number>();
            const paginationsList: number[] = []
        
            let dozenLength: number = 0;
            let value = basedPag;
        
            dozenLength = Math.floor(values.length / 10) * 10;
        
            while(value < dozenLength) {
                options.add(value);
                value += basedPag;
            }
        
            paginationsList.push(3);
            options.forEach((option) => paginationsList.push(option));
            paginationsList.push(values.length)
        
            return paginationsList;
        }

        getNumberOfPages(values: Value[], itemsPerPage: number) {
            let numberOfPages = 0;
        
            numberOfPages = Math.ceil(values.length / itemsPerPage);
        
            const numberOfPagesArray = [];
        
            for (let i = 0; i < numberOfPages; i++) {
                numberOfPagesArray.push(i);
            }
        
            return numberOfPagesArray;
        }

        isCrew(a: any, b: any) {
            return !!a["markingNumber"] && !!b["markingNumber"] &&
                   a["marking"].marking === b["marking"].marking && 
                   a["markingNumber"] === b["markingNumber"] &&
                   a["marking"].pairedPatrolCrew && b["marking"].pairedPatrolCrew;
        }
    
        crewGroup(arr: any[]) {
            let groupedArr: any[] = [];
            let usedIndices = new Set<number>();
            
            for (let i = 0; i < arr.length; i++) {
                if (usedIndices.has(i)) continue;
            
                const current = arr[i];
                const pairItems = arr
                    .map((item, idx) => ({ item, idx }))
                    .filter(({ item, idx }) => 
                        idx !== i && this.isCrew(current, item) && !usedIndices.has(idx)
                    );
            
                if (pairItems.length > 0) {
                    let newPairObject: any = { "0": current };
                    usedIndices.add(i);
            
                    for (let j = 0; j < pairItems.length && j < 3; j++) { 
                        newPairObject[(j + 1).toString()] = pairItems[j].item;
                        usedIndices.add(pairItems[j].idx);
                    }
            
                    groupedArr.push(newPairObject);
                } else {
                    groupedArr.push(current);
                }
            }

            return groupedArr;
        }

        getYearMonthDay(date: Date) {
            return new Date(date).toLocaleString("en-US", { 
                year: "numeric", 
                month: "2-digit", 
                day: "2-digit" 
            });  
        }

        getHourMinute(date: Date) {
            return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        getType(data: any) {
            switch(data) {
                case ("fine"): {
                    return "Fine"
                }

                case ("prisonTerm"): {
                    return "Prison term"
                }

                case ("jailTerm"): {
                    return "Jail term"
                }

                case ("deprDrivingLicense"): {
                    return "Deprivation of Driving License"
                }

                case ("deprGunLicense"): {
                    return "Deprivation of Gun License"
                }
            }

            return data;
        }

        getValueByType(element: Value, column: string) {        
            switch(column) {
                case("lastUpdate"): {
                    return this.getHourMinute(element[column]);
                }

                case("happened"): {
                    return this.getYearMonthDay(element[column]);                   
                }

                case("freed"): {
                    if (element[column]) {
                        return this.getYearMonthDay(element[column])
                    }
                    return "N/A"
                }

                case("type"): {
                    return this.getType(element[column])
                }

                case ("bought"): {
                    return this.getYearMonthDay(element[column])
                }
                
                case("marking"): {
                    if (element?.["marking"] && element["markingNumber"]) {
                        return `${element["shiftId"]}-${element["marking"].marking}-${element["markingNumber"]}`
                    }
            
                    return "N/A"
                }
            
                case("status"): {
                    switch(element["status"]) {
                        case(true): {
                            return "Avalaible"
                        }
                
                        case(false): {
                            return "Busy"
                        }
                
                        case(null): {
                            return "N/A"
                        }
                
                        case("OS"): {
                            return element["status"]
                        }
                    }
            
                    break
                }

                case("violations"): {
                    if (element?.["violations"]) {
                        return "THERE ARE"
                    } else {
                        return "NOT"
                    }
                }
            }
            return element[column];
        }   
}