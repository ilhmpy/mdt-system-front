import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { OfficerDTO, OfficerTableItem } from "../dtos/officer.dto";
import { HttpClient } from "@angular/common/http";
import { MarkingInterface } from "../dtos/markings.dto";
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { DataService } from "./data.service";
import { PanicDTO } from "../dtos/panic.dto";

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
      private markingsObject = new BehaviorSubject<MarkingInterface[] | null>(null);
      private validationObject = new BehaviorSubject<string | null>(null);
      private isPanic = new BehaviorSubject<PanicDTO[] | null>(null);

      private isAuth$ = this.isAuthObject.asObservable();
      private isLoading$ = this.isLoadingObject.asObservable();
      private officer$ = this.officerObject.asObservable();
      private officers$ = this.officersObject.asObservable();
      private markings$ = this.markingsObject.asObservable();
      private isPanic$ = this.isPanic.asObservable();

      getIsAuth() {
        return this.isAuth$
      }

      getIsLoading() {
        return this.isLoadingObject;
      }

      getIsValidation() {
        return this.validationObject;
      }

      getCurrentOfficer() {
        return this.currentOfficerObject;
      }

      getIsPanic() {
        return this.isPanic;
      }

      setIsPanic(status: PanicDTO | number, get?: PanicDTO[]) {
        if (get) {
          this.isPanic.next([...get])
        } else {
          const panics = this.isPanic?.getValue();
          if (panics) {
            if (typeof status == "object") {
              this.isPanic.next([...panics, status]);
            } else {
              this.isPanic.next(panics.filter((item: PanicDTO) => item.officerId != status));
            }
          }
        }
      }

      getPanics() {
        const panics = this.isPanic.getValue();

        if (!panics) {
          this.DataService.getPanics().subscribe((data) => {
            this.isPanic.next(data);
          });
        }
        
        return this.isPanic$;
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

      setIsValidation(validation: string | null) {
        this.validationObject.next(validation);
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
          }), shareReplay(1)
        );
      }

      getAllOfficers() {
        const officers = this.officersObject.getValue();

        try {
          if (!officers) {
            this.DataService.getOfficers().subscribe((data) => {
              this.officersObject.next(data);
            })
          }
        } catch(e) {}
  
        
        return this.officers$;
      }

      getMarkings() {
        const markings = this.markingsObject.getValue();

        if (!markings) {
          this.DataService.getMarkings().subscribe((data: MarkingInterface[]) => {
            this.markingsObject.next(data);
          })
        }

        return this.markings$;
      }
}