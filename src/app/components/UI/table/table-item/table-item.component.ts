import { Component, Input } from '@angular/core';
import { Column } from '../ui-table.dto';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'table-item',
  standalone: false,
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.scss'
})
export class TableItemComponent {
  @Input() columns: Column[] = [];
  @Input() contentTemplate!: TemplateRef<any>; 
  @Input() class: string = "";
}
