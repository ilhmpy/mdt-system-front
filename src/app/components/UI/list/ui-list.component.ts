import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ListInterface } from './ui-list.dto';

@Component({
  selector: 'ui-list',
  standalone: false,
  templateUrl: './ui-list.component.html',
  styleUrl: './ui-list.component.scss',
})
export class UiListComponent {
  @Input() list: WritableSignal<ListInterface[]> = signal<ListInterface[]>([]);
  @Input() renderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: "" });
  @Input() handleRender: (...args: any[]) => void = () => {}
  @Input() controlField: string = "";

  readonly renderFieldIdx: WritableSignal<number> = signal<number>(0);
  readonly isListActivated: WritableSignal<boolean> = signal<boolean>(false);

  handleActivateList() {
    this.isListActivated.set(!this.isListActivated());
  }

  handleRenderField(index: number) {
    if (index !== this.renderFieldIdx()) {
      this.renderField.set(this.list()[index]);
      this.renderFieldIdx.set(index);
      this.handleRender();
    }

    return;
  }

  mouseLeave() {
    this.isListActivated.set(false);
  }
}
