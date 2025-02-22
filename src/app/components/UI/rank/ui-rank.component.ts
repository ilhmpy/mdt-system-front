import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'ui-rank',
  standalone: false,
  templateUrl: './ui-rank.component.html',
  styleUrl: './ui-rank.component.scss'
})
export class UiRankComponent {
  @Input() src: string = "";
  @Input() rankLabel: string = "";
  @Input() type: "big" | null = null;

  readonly isRankLabelActivated: WritableSignal<boolean> = signal<boolean>(false);

  getClass(src: string) {
    return [src?.replace(".svg", "") || "", this.type || ""];
  }

  mouseEnter() {
    if (!this.type) {
      this.isRankLabelActivated.set(true);
    }
  }

  mouseLeave() {
     if (!this.type) {
      this.isRankLabelActivated.set(false);
     }
  }
}
