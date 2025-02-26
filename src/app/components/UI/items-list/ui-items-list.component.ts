import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'ui-items-list',
  standalone: false,
  templateUrl: './ui-items-list.component.html',
  styleUrl: './ui-items-list.component.scss'
})
export class UiItemsListComponent {
  readonly isListActivated: WritableSignal<boolean> = signal<boolean>(false);
  
  @Input() placeholder: string = "";
  @Input() paddings?: boolean = true;

  listEnter = () => {
    this.isListActivated.set(true)
  }

  listLeave = () => {
    this.isListActivated.set(false);
  }
}
