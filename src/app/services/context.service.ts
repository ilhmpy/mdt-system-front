import { Injectable } from "@angular/core";
import { OfficerDTO, OfficerTableItem } from "../dtos/officer.dto";
import { MarkingInterface } from "../dtos/markings.dto";
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { DataService } from "./data.service";
import { PanicDTO } from "../dtos/panic.dto";
import { WebSocketsService } from "./websockets.service";

@Injectable({
    providedIn: "root"
})
export class ContextService {
      constructor(private DataService: DataService, private WebSocketsService: WebSocketsService) {
        setTimeout(() => {
          this.WebSocketsService.listen("updateOfficers").subscribe((data: any) => {
            console.log("updateOfficers")
            if (data.id == this.officerObject.getValue()?.id) {
              this.setOfficer(data);
            }
      
            const newOfficers = this.officersObject.getValue()?.map((officer) => {
              if (officer.id == data.id) {
                return { ...data };
              }
      
              return { ...officer };
            });
  
            this.officersObject.next(newOfficers || []);
          })
        }, 1000);
      }

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
        return this.officers$.pipe(
          switchMap((officers) => {
            if (officers) {
              return of(officers);
            } else {
              return this.DataService.getOfficers().pipe(
                tap((data) => {
                  console.log("getallofficers request");
                  this.officersObject.next(data)
                })
              );
            }
          }), shareReplay(1)
        );
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