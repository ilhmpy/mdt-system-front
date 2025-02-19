import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Column, Value } from './ui-table.dto';
import { ContextService } from '../../../services/context.service';
import { OfficerTableItem } from '../../../dtos/officer.dto';

@Component({
  selector: 'ui-table',
  standalone: false,
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent {
  @Input() columns: WritableSignal<Column[]> = signal<Column[]>([]);
  @Input() values: WritableSignal<Value[]> = signal<Value[]>([]);
  @Input() itemsPerPage: number = 6;
  @Input() defaultSortBy: "markings" | null = null;
  @Input() isTableHeadersNeed: boolean = false;

  readonly currentPagPage: WritableSignal<number> = signal<number>(1);

  constructor(readonly ContextService: ContextService) {}

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

  paginationFilter = (value: any, idx: number) => {
    const firstItem = this.currentPagPage() == 1 ? 0 : this.currentPagPage() * this.itemsPerPage - this.itemsPerPage;
    const lastItem = this.currentPagPage() * this.itemsPerPage;
    
    return idx >= firstItem && idx < lastItem
  };

  crewSome(a: OfficerTableItem, index: number, arr: OfficerTableItem[]) {
    return arr.some((b: OfficerTableItem, idx: number) => idx !== index && a["marking"] === b["marking"] && a["markingNumber"] === b["markingNumber"])
  }

  crewSort(arr: any[]) {
    return arr.sort((a, b) => {
      const isAPaired = this.ContextService.isMarkingPaired(a["marking"]);
      const isBPaired = this.ContextService.isMarkingPaired(b["marking"]);

      if (isAPaired && !isBPaired) return -1;
      if (!isAPaired && isBPaired) return 1;

      if (a["marking"] === b["marking"] && a["markingNumber"] === b["markingNumber"]) {
        return 0;
      }

      if (a["marking"] === b["marking"]) {
        return a["markingNumber"] - b["markingNumber"];
      }

      return a["marking"] > b["marking"] ? 1 : -1;
  });
  }

  isCrewFilter = (valuesCopy: any[]) => {
    const withPairedCrew = valuesCopy.filter((a: any, index, arr: any) => {
      return this.crewSome(a, index, arr);
    });

    const withoutPairedCrew = valuesCopy.filter((a: any, index, arr: any) => {
      return !this.crewSome(a, index, arr);
    });

    return [...withPairedCrew, ...withoutPairedCrew];
  }

  getSortedAndFilteredValues() {
    let valuesCopy = [...this.values()];
  
    if (this.defaultSortBy === "markings") {
      valuesCopy = this.crewSort(valuesCopy);
    }

    valuesCopy = this.isCrewFilter(valuesCopy);
    console.log(valuesCopy)

    return valuesCopy.filter(this.paginationFilter);
  }

  getNumberOfPages() {
    const numberOfPages = Math.ceil(this.values().length / this.itemsPerPage);
    const numberOfPagesArray = [];

    for (let i = 0; i < numberOfPages; i++) {
      numberOfPagesArray.push(i);
    }

    return numberOfPagesArray;
  }

  changeCurrentPage(index: number) {
    this.currentPagPage.set(index);
  }
}
