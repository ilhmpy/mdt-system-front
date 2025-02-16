import { Component, signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';

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
  readonly links: Link[] = [
    { label: "Officers", path: "/officers" },
    { label: "Reports", path: "/reports" },
    { label: "Calls", path: "/calls" },
    { label: "Control", path: "/control" },
    { label: "Forum", path: "/forum" },
  ]

  readonly isAlarmActivated: WritableSignal<boolean> = signal<boolean>(false);

  readonly runningLine: WritableSignal<string> = signal(
    "Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15.  Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15. v Auto is stoped in Vinewood ave at 15:13. Karl Johnson is arrested at 12:15."
  );

  onAlarm() {

  }
}
