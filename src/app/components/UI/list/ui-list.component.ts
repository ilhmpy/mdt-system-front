import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ListInterface } from './ui-list.dto';

@Component({
  selector: 'ui-list',
  standalone: false,
  templateUrl: './ui-list.component.html',
  styleUrl: './ui-list.component.scss',
})
export class UiListComponent {
  @Input() list: ListInterface[] = [];
  @Input() renderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: "" });
  @Input() handleRender: (...args: any[]) => void = () => {}
  @Input() class: string = "";

  readonly renderFieldIdx: WritableSignal<number> = signal<number>(0);
  readonly isListActivated: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit() {
    const index = this.list.indexOf(this.renderField());

    if (index !== this.renderFieldIdx()) {
      this.renderFieldIdx.set(index);
    }
  }

  handleRenderField(index: number) {
    if (index !== this.renderFieldIdx()) {
      console.log("DA")
      this.renderField.set(this.list[index]);
      this.renderFieldIdx.set(index);
      this.handleRender();
    }

    return;
  }

  mouseLeave() {
    this.isListActivated.set(false);
  }

  mouseEnter() {
    this.isListActivated.set(true);
  }
}
