import { Injectable } from "@angular/core";
import { first } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class PresentationService {
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
}