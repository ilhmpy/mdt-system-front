import { Injectable } from "@angular/core";
import { Column, Value } from "../components/UI/table/ui-table.dto";
import { ListInterface } from "../components/UI/list/ui-list.dto";
import { ContextService } from "./context.service";

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

        getRealNumberOfItems(values: Value[]) {
            let realNumber = [];
        
            for (let i = 0; i < values.length; i++) {
            if (!!values[i]["0"] && !!values[i]["1"]) {
                realNumber.push(i)
                realNumber.push(i)
            } else {
                realNumber.push(i);
            }
            }
        
            return realNumber.length;
        }

      
        handleSort(values: Value[], sortLabel: string, defaultValues: Value[]) {
            let sortedArr = [...values];

                switch(sortLabel) {
                    case("Default"): {
                        sortedArr = defaultValues;

                        return sortedArr;
                    }

                    case("Marking"): {
                        sortedArr = sortedArr.sort((a, b) => {
                            if ( 
                                a["marking"].pairedPatrolCrew && b["marking"].pairedPatrolCrew
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

        getValueByType(element: Value, column: string) {        
            switch(column) {
                case("lastUpdate"): {
                    return new Date(element[column]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
            }
            return element[column];
        }   
}