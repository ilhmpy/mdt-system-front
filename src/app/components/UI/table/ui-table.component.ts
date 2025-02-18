import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Column, Value } from './ui-table.dto';
import { last } from 'rxjs';

@Component({
  selector: 'ui-table',
  standalone: false,
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent {
  @Input() columns: WritableSignal<Column[]> = signal<Column[]>([]);
  @Input() values: WritableSignal<Value[]> = signal<Value[]>([]);
  @Input() itemsPerPage: number = 5;

  readonly currentPagPage: WritableSignal<number> = signal<number>(1);

  getValueByTape(value: Value, column: Column) {
    column.field = column.field || "";

    switch(column.type) {
      case("date"): {
        return value[column.field].toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      
      case("marking"): {
        return `${value["shift"]}-${value["marking"]}-${value["markingNumber"]}`
      }

      case("status"): {
        switch(value["status"]) {
          case(true): {
            return "Avalaible"
          }

          case(false): {
            return "Busy"
          }

          case(null): {
            return "N/A"
          }

          case("OS"): {
            return value["status"]
          }
        }
      }
    }

    return value[column.field];
  }

  getChangedValues() {
    const firstItem = this.currentPagPage() == 1 ? 0 : this.currentPagPage() * this.itemsPerPage - this.itemsPerPage;
    const lastItem = this.currentPagPage() * this.itemsPerPage;

    this.values().sort((a, b) => {
      console.log(a, b)
      return 0
    })

    return this.values().filter((value, idx) => idx >= firstItem && idx < lastItem);
  }

  getNumberOfPages() {
    const numberOfPages = Math.ceil(this.values().length / this.itemsPerPage);
    const numberofPagesArray = [];

    for (let i = 0; i < numberOfPages; i++) {
      numberofPagesArray.push(i);
    }

    return numberofPagesArray;
  }

  changeCurrentPage(index: number) {
    this.currentPagPage.set(index);
  }
}
