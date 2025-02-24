import { Component, signal, WritableSignal } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { OfficerDTO } from '../../dtos/officer.dto';
import { WebSocketsService } from '../../services/websockets.service';
import { DataService } from '../../services/data.service';
import { AudioService } from '../../services/audio.service';
import { PresentationService } from '../../services/presentation.service';
import { Subscription } from 'rxjs';
import { PanicDTO } from '../../dtos/panic.dto';

interface Link {
  label: string;
  path: string;
}

@Component({
  selector: 'layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(
    private AudioService: AudioService, 
    public ContextService: ContextService, 
    private WebSocketsService: WebSocketsService, 
    private DataService: DataService,
    public PresentationService: PresentationService
  ) {}

  readonly links: Link[] = [
    { label: "Officers", path: "/officers" },
    { label: "NCINC", path: "/ncinc" },
    { label: "Calls", path: "/calls" },
    { label: "Reports", path: "/reports" },
    // { label: "Control", path: "/control" },
    //{ label: "Forum", path: "/forum" },
  ];

  readonly officer: WritableSignal<OfficerDTO | null> = signal<OfficerDTO | null>(null);
  readonly isAlarmActivated: WritableSignal<boolean> = signal<boolean>(false);
  readonly isCode4: WritableSignal<boolean> = signal<boolean>(false);

  panicSubscription!: Subscription;
  panicsSubscription!: Subscription;

  soundCount: number = 0;
  panicInterval: any;

  readonly runningLine: WritableSignal<string> = signal(
    "Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15.  Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. v Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15."
  );

  clearPanicInterval = (interval: any) => {
    clearInterval(interval);
  }

  clearPanic() {
    this.clearPanicInterval(this.panicInterval);
    this.AudioService.stopAudio();
    this.soundCount = 0;
  }

  ngAfterViewInit() {
    this.panicsSubscription = this.ContextService.getPanics().subscribe((data) => {
      if (data && data.length > 0) {
        this.isAlarmActivated.set(true);
        this.handlePanic();
        this.isCode4.set(!!data.find((item) => item.officerId == this.officer()?.id))
      }
    })
    
    this.panicSubscription = this.WebSocketsService.listen<PanicDTO | number>("panicStatusIsChanged").subscribe(data => {
      console.log("PanicButtonisChanged", data)
      const panics = this.ContextService.getIsPanic().getValue();

      if (typeof data == "object") {
        this.isAlarmActivated.set(true);

        if (panics) {
          this.isCode4.set(this.officer()?.id == data.officerId || !!panics.find((item) => item.officerId == this.officer()?.id));
        }
        
        if (this.soundCount == 0) {
          this.handlePanic
          } else {
            this.clearPanic();
          }
       } else {
        this.clearPanic();
       }

       this.ContextService.setIsPanic(data);
    })
  }

  handlePanic() {
    this.panicInterval = setInterval(() => {
      if (this.soundCount < 5) {
        this.AudioService.playPanicAudio(0.5);
        this.soundCount += 1;
      } else {
        this.clearPanic()
      }
    }, 3000);
  }

  ngOnDestroy() {
    if (this.panicsSubscription) {
      this.panicsSubscription.unsubscribe();
    }

    if (this.panicSubscription) {
      this.panicSubscription.unsubscribe();
    }
  }

  ngOnInit() {
      document.body.addEventListener("click", () => {}, { once: true });
      this.isAlarmActivated.set(!!this.ContextService.getIsPanic().getValue());
      this.ContextService.getOfficer().subscribe(data => {
        if (data) {
          this.officer.set(data);
        }
      });
  }

  onProfile = () => {
    const officer = this.officer();
     
    if (officer) {
      this.ContextService.setCurrentOfficer(officer)
    }
  }

  onAlarm = () => {
    const officer = this.officer();
    if (officer && !this.ContextService.getIsPanic().getValue()?.find((item: PanicDTO) => item.officerId == officer.id)) {
      this.DataService.panic(officer).subscribe();
    }
  }

  handleCode4() {
    const officer = this.officer();

    this.clearPanic();
    this.isAlarmActivated.set(false);
    this.isCode4.set(false);

    if (officer) {
      this.DataService.deactivatePanic(officer.id).subscribe();
    }
  }
}
