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

  readonly isRankLabelActivated: WritableSignal<boolean> = signal<boolean>(false);

  // при наведении показывать ранг
  getClass(src: string) {
    return src?.replace(".svg", "") || "";
  }

  mouseEnter() {
    this.isRankLabelActivated.set(true);
  }

  mouseLeave() {
    this.isRankLabelActivated.set(false);
  }
}
