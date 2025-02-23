import { Component, signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { ContextService } from '../../services/context.service';
import { finalize } from 'rxjs';
import { OfficerDTO } from '../../dtos/officer.dto';
import { WebSocketsService } from '../../services/websockets.service';
import { DataService } from '../../services/data.service';
import { AudioService } from '../../services/audio.service';

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
  constructor(private AudioService: AudioService, public ContextService: ContextService, private WebSocketsService: WebSocketsService, private DataService: DataService) {}

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

  readonly runningLine: WritableSignal<string> = signal(
    "Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15.  Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. v Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15."
  );

  ngOnInit() {
      this.WebSocketsService.listen("panicIsActivated").subscribe((data: any) => {
        console.log("isActivated", data);
        this.ContextService.setIsPanic(data);
        this.isAlarmActivated.set(true);

        setInterval(() => {
          this.AudioService.playPanicAudio(0.5);
        }, 3000);
      })
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
    if (officer) {
      this.DataService.panic(officer).subscribe();
    }
  }
}
