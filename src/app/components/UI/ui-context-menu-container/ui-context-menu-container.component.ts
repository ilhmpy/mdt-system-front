import { Component, ElementRef, Input, signal, ViewChild, WritableSignal } from '@angular/core';

export interface ContextMenuItem {
  label: string;
  onClick: (idx: number) => void;
  type?: "delete";
}

interface ContextMenuPosition {
  x: number; 
  y: number;
}

@Component({
  selector: 'ui-context-menu-container',
  standalone: false,
  templateUrl: './ui-context-menu-container.component.html',
  styleUrl: './ui-context-menu-container.component.scss'
})
export class UiContextMenuContainerComponent {
  readonly isContextOn: WritableSignal<boolean> = signal<boolean>(false);
  readonly contextMenuPosition: WritableSignal<ContextMenuPosition> = signal<ContextMenuPosition>({ x: 0, y: 0 });

  @Input() contextMenuItems: ContextMenuItem[] = [];
  @Input() idx: number = 0;
  @Input() class: string = "";
  @ViewChild("container") containerRef!: ElementRef;
  @ViewChild("contextMenu") contextMenuRef!: ElementRef;

  ngOnInit() {
    document.addEventListener("click", () => this.isContextOn.set(false));
  }

  onContextMenu(e: MouseEvent) {
    e.preventDefault();

    const container = this.containerRef.nativeElement;
    const rect = container.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    this.contextMenuPosition.set({ y, x })
    this.isContextOn.set(!this.isContextOn());
  }
}
