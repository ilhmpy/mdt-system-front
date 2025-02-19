import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Column, Value } from './ui-table.dto';
import { ContextService } from '../../../services/context.service';
import { OfficerTableItem } from '../../../dtos/officer.dto';
import { filter } from 'rxjs';

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
  @Input() defaultSort: boolean | null = null;
  @Input() isTableHeadersNeed: boolean = false;

  readonly currentPagPage: WritableSignal<number> = signal<number>(1);
  readonly sortedAndFilteredValues: WritableSignal<Value[]> = signal<Value[]>([]);

  constructor(readonly ContextService: ContextService) {}

  ngOnInit() {
    if (this.sortedAndFilteredValues().length == 0) {
      this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues());
    }
  }

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

  getRealNumberOfItems(values: Value[]) {
    let realNumber = [];

    for (let i = 0; i < values.length; i++) {
      if (!!values[i]["0"] && !!values[i]["1"]) {
        console.log("JA")
        realNumber.push(i)
        realNumber.push(i)
      } else {
        realNumber.push(i);
      }
    }

    return realNumber.length;
  }

  paginationFilter = (values: Value[]) => {
    const firstItem = this.currentPagPage() == 1 ? 0 : this.currentPagPage() * this.itemsPerPage - this.itemsPerPage;
    const lastItem = this.currentPagPage() * this.itemsPerPage;

    if (this.defaultSort) {
      const realNumberOfItems = this.getRealNumberOfItems(values);
      let filteredValues = [];

      for (let i = 0; i < realNumberOfItems; i++) {
        if (i >= firstItem && i < lastItem) {
          filteredValues.push(values[i]);
        }
      }

      return filteredValues;
     } else {
      return values.filter((value, idx) => idx >= firstItem && idx < lastItem)
    }

  };

  crewSome(a: OfficerTableItem, index: number, arr: OfficerTableItem[]) {
    return arr.some((b: OfficerTableItem, idx: number) => idx !== index && this.isCrew(a, b))
  }

  isCrew(a: any, b: any) {
    return a["marking"] === b["marking"] && a["markingNumber"] === b["markingNumber"]
  }

  crewSort(arr: any[]) {
    return arr.sort((a, b) => {
      const isAPaired = this.ContextService.isMarkingPaired(a["marking"]);
      const isBPaired = this.ContextService.isMarkingPaired(b["marking"]);

      if (isAPaired && isBPaired) {
  
        if (isAPaired && !isBPaired) return -1;
        if (!isAPaired && isBPaired) return 1;
  
        if (this.isCrew(a, b)) {
          return 0;
        }
  
        if (a["marking"] === b["marking"]) {
          return a["markingNumber"] - b["markingNumber"];
        }
  
        return a["marking"] > b["marking"] ? 1 : -1;
      } else {
        return -1;
      }
  });
  }

  isCrewFilter = (valuesCopy: any[]) => {
    const withPairedCrew = valuesCopy.filter((a: any, index, arr: any) => {
      return this.crewSome(a, index, arr);
    });

    const withoutPairedCrew = valuesCopy.filter((a: any, index, arr: any) => {
      return !this.crewSome(a, index, arr);
    });

    const crewArray = [...withPairedCrew.map(
      (item, idx) => {
        const secondItem = withPairedCrew.find((i, index) => (idx + 1 == index) && this.isCrew(item, i));

        if (secondItem) {
          return { "0": item, "1": secondItem } 
        }

        return;
      }).filter((item) => !!item), ...withoutPairedCrew];

    return crewArray;
  }

  getSortedAndFilteredValues() {
    let valuesCopy = [...this.values()];
  
    if (this.defaultSort) {
      valuesCopy = this.crewSort(valuesCopy);
      valuesCopy = this.isCrewFilter(valuesCopy);
      valuesCopy = this.paginationFilter(valuesCopy);
    }

    return valuesCopy
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
    this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues());
  }
}
