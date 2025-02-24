import { Component, computed, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { MarkingInterface } from '../dtos/markings.dto';
import { UiInputComponent } from '../components/UI/input/ui-input.component';
import { StatusDTO } from '../components/status/status.dto';
import { ContextService } from '../services/context.service';
import { OfficerDTO } from '../dtos/officer.dto';
import { WebSocketsService } from '../services/websockets.service';
import { DataService } from '../services/data.service';
import { PresentationService } from '../services/presentation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-officers',
  standalone: false,
  templateUrl: './officers.component.html',
  styleUrl: './officers.component.scss'
})
export class OfficersComponent {
  readonly status: WritableSignal<StatusDTO> = signal<StatusDTO>(null);
  readonly marking: WritableSignal<MarkingInterface> = signal<MarkingInterface>({ id: 0, label: "", marking: "", pairedPatrolCrew: false  });
  readonly markings: WritableSignal<MarkingInterface[]> = signal<MarkingInterface[]>([]);
 
  readonly officersColumns: WritableSignal<string[]> = signal<string[]>([
    "lastUpdate", "badgeNumber", 
    "name", "marking", "status", 
    "location", "rank"
  ]);

  @ViewChild('inputRef') inputRef!: UiInputComponent;

  readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null);
  readonly officers: WritableSignal<OfficerDTO[]> = signal<OfficerDTO[]>([]);
  readonly defaultOfficers: WritableSignal<OfficerDTO[]> = signal<OfficerDTO[]>([]);
  readonly maskData: WritableSignal<string> = signal<string>("")
  readonly markingValidation: WritableSignal<string | null>  = signal<string | null>(null);

  form: FormGroup;
  markingTimeout: any = "";
  updateOfficersSubscription!: Subscription;
  getOfficerSubscription!: Subscription;
  getMarkingsSubscription!: Subscription;
  updateMarkingSubscription!: Subscription;

  constructor(private fb: FormBuilder, readonly ContextService: ContextService, private WebSocketsService: WebSocketsService, private DataService: DataService, private PresentationService: PresentationService) {
    this.form = this.fb.group({
      markingValue: [
        '',
        [ Validators.required, this.lastTwoCharValidator(2) ]
      ],
      notebookValue: [
        localStorage.getItem("notebook"),
        [ Validators.maxLength(400) ]
      ]
    })
  }

  async ngOnInit() {
    this.getOfficerSubscription = await this.ContextService.getOfficer().subscribe((data) => this.officer.set(data));
    this.getMarkingsSubscription = this.ContextService.getMarkings().subscribe((data) => {
       if (data) {
        const officer = this.officer();
        let newMaskData;

        if (officer !== null) {
          newMaskData = this.getNewMaskData(officer?.marking?.marking || "");
        } else {
          newMaskData = this.getNewMaskData(data[0].marking);
        }

        this.marking.set(data[0]);
        if (this.form.get("markingValue")?.value == "") {

        }

        this.markings.set(data);
        this.maskData.set(this.getNewMaskData(newMaskData));
        this.handleMarkingChange();
       }
    })

    this.updateOfficersSubscription = this.WebSocketsService.listen("updateOfficers").subscribe((data: any) => {
      if (data.id == this.officer()?.id) {
        this.ContextService.setOfficer(data);
      }

      const newOfficers = this.officers().map((officer) => {
        if (officer.id == data.id) {
          console.log("updateOfficer", data)
          return { ...data };
        }

        return { ...officer };
      });


      this.defaultOfficers.set(newOfficers)
      this.officers.set(newOfficers);
    })
    this.ContextService.getAllOfficers().subscribe((data) => {
      this.officers.set(this.PresentationService.defaultSort(data || [], this.officer()));
    });
  }

  ngOnDestroy(): void {
    if (this.updateOfficersSubscription) {
      this.updateOfficersSubscription.unsubscribe();
    }

    if (this.getOfficerSubscription) {
     // this.getOfficerSubscription.unsubscribe();
    }

    if (this.getMarkingsSubscription) {
    //  this.getMarkingsSubscription.unsubscribe();
    }

    if (this.updateMarkingSubscription) {
    //  this.updateMarkingSubscription.unsubscribe();
    }
  }

  getNewMaskData(marking: string) {
    return `${this.officer()?.["shift"].id}-${marking}-`;
  }

  getMaxInputCharactersByMarking() {
    return 5 + this.marking().marking.length;
  }

  lastTwoCharValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (typeof value !== 'string') {
        return null;
      }
  
      const lastTwoChars = value.slice(-2); 
      const actualLength = lastTwoChars.length;
  
      if (actualLength > maxLength) {
        return { lastTwoMaxLength: { requiredMax: maxLength, actualLength } };
      }
  
      return null;
    };
  }

  onMarkingValue = (markingNumber: number) => {
    const control = this.form.get("markingValue");
    
    if (
      !control?.errors && control?.value !== this.officer()?.markingNumber 
      && control?.value !== this.marking()?.marking
    ) {
      clearTimeout(this.markingTimeout);
      this.markingTimeout = setTimeout(() => {
        this.updateMarkingSubscription = this.DataService.updateMarking({ markingId: this.marking().id, markingNumber }).subscribe({
          error: ({ error: { message } }) => this.ContextService.setIsValidation(message)
        });
      }, 500);
    }
  }

  handleMarkingChange = () => {
    const newMaskData = this.getNewMaskData(this.marking().marking);

    if (this.inputRef) {
      this.inputRef.focus();
    }

    this.maskData.set(newMaskData);
    this.form.patchValue({
      markingValue: newMaskData
    })
  }

  setCurrentOfficer = (id: number) => {
    const officer = this.officers().find((officer) => officer.id == id);

    if (officer) {
      this.ContextService.setCurrentOfficer(officer);
    }
  }

  onNoteBookValue() {
    localStorage.setItem("notebook", this.form.get("notebookValue")?.value);
  }
}
