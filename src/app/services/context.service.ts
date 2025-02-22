import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { OfficerDTO, OfficerTableItem } from "../dtos/officer.dto";
import { HttpClient } from "@angular/common/http";
import { MarkingInterface } from "../dtos/markings.dto";
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from "./data.service";

interface ConfigInterface {
  markings: MarkingInterface[];
}

@Injectable({
    providedIn: "root"
})
export class ContextService {
      constructor(private DataService: DataService) {}

      private isAuthObject = new BehaviorSubject<boolean>(false);
      private isLoadingObject = new BehaviorSubject<boolean>(false);
      private officerObject = new BehaviorSubject<OfficerDTO | null>(null);
      private officersObject = new BehaviorSubject<OfficerDTO[] | null>(null);
      readonly profileShow = new BehaviorSubject<boolean>(false);
      private currentOfficerObject = new BehaviorSubject<OfficerDTO | null>(null);

      private isAuth$ = this.isAuthObject.asObservable();
      private isLoading$ = this.isLoadingObject.asObservable();
      private officer$ = this.officerObject.asObservable();
      private officers$ = this.officersObject.asObservable();
      private currentOfficer$ = this.currentOfficerObject.asObservable();

      private Config: WritableSignal<ConfigInterface> = signal<ConfigInterface>({
        markings: [ 
          { label: "Linkoln", marking: "L", pairedPatrolCrew: false, },
          { label: "Adam", marking: "A", pairedPatrolCrew: true, },
          { label: "Mary", marking: "M", pairedPatrolCrew: false,},
          { label: "Henry", marking: "H", pairedPatrolCrew: true, },
          { label: "Air", marking: "AIR", pairedPatrolCrew: true,},
          { label: "King", marking: "K", pairedPatrolCrew: true, },
          { label: "Robert", marking: "R", pairedPatrolCrew: true, },
        ]
      })

      getIsAuth() {
        return this.isAuth$
      }

      getIsLoading() {
        return this.isLoading$;
      }

      getCurrentOfficer() {
        return this.currentOfficerObject;
      }

      setIsAuth(status: boolean) {
        this.isAuthObject.next(status);
      }

      setIsLoading(status: boolean) {
        this.isLoadingObject.next(status);
      }

      setCurrentOfficer(officer: OfficerDTO | null) {
        this.currentOfficerObject.next(officer);
      }

      setOfficer(newOfficer: OfficerDTO) {
        this.officerObject.next(newOfficer);
      }

      getOfficer() {
        return this.officer$.pipe(
          switchMap((officer) => {
            if (officer) {
              return of(officer);
            } else {
              return this.DataService.getOfficer().pipe(
                tap((data) => this.officerObject.next(data))
              );
            }
          })
        );
      }

      getAllOfficers() {
        const officers = this.officersObject.getValue();

        if (!officers) {
          this.DataService.getOfficers().subscribe((data) => {
            this.officersObject.next(data);
          })
        }

        return this.officers$;
      }


      ///////////////////////////////////////////////

      getMarkingsList() {
        return this.Config().markings;
      }

      isMarkingPaired(marking: string) {
        return this.Config().markings.find((item: any) => item.marking == marking)?.pairedPatrolCrew;
      }
}