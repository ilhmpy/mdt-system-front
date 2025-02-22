import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Column, Value } from './ui-table.dto';
import { ContextService } from '../../../services/context.service';
import { OfficerTableItem } from '../../../dtos/officer.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListInterface } from '../list/ui-list.dto';

@Component({
  selector: 'ui-table',
  standalone: false,
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent {
  @Input() columns: WritableSignal<Column[]> = signal<Column[]>([]);
  @Input() values: WritableSignal<Value[]> = signal<Value[]>([]);
  @Input() itemsPerPage: WritableSignal<number> = signal<number>(5);
  @Input() group: boolean | null = null;
  @Input() isTableHeadersNeed: boolean = false;
  @Input() isSearchAndSortNeed: boolean = false;
  @Input() sortByFields: Value[] = [];
  @Input() searchFields: string[] = [];
  @Input() searchPlaceholder: string = "";
  @Input() sortBy: ListInterface[] | null = null;
  @Input() clickTriggerOnContainer: ((id: number) => void) = () => {};

  readonly currentPagPage: WritableSignal<number> = signal<number>(1);
  readonly sortedAndFilteredValues: WritableSignal<Value[]> = signal<Value[]>([]);
  readonly sortedAndFilteredDefaultValues: WritableSignal<Value[]> = signal<Value[]>([]);
  readonly groupedValuesDefault: WritableSignal<Value[]> = signal<Value[]>([]);
  readonly searchDefault: WritableSignal<Value[] | null> = signal<Value[] | null>(null);
  readonly sortRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: "" })
  readonly paginationRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: "" })
  readonly paginationsList: WritableSignal<ListInterface[]> = signal<ListInterface[]>([])

  form: FormGroup;

  constructor(readonly ContextService: ContextService, private fb: FormBuilder) {
    this.form = this.fb.group({
      searchValue: [
        '',
        [ Validators.required ]
      ]
    })
  }

  clickTrigger(id: number) {
    this.clickTriggerOnContainer(id);
  }

  ngOnInit() {
    if (this.sortBy) {
      this.sortRenderField.set({ label: this.sortBy?.[0].label ?? "" });
    }

    this.paginationRenderField.set({ label: this.itemsPerPage().toString() });

    if (this.sortedAndFilteredValues().length == 0) {
      this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues());
    }

    this.paginationsList.set(this.getPaginationsList());
  }

  getPaginationsList(): ListInterface[] {
    const basedPag = this.itemsPerPage();
    const options = new Set<number>();
    const paginationsList: ListInterface[] = []
   
    let dozenLength: number = 0;
    let value = basedPag;

    if (this.group) {
      dozenLength = Math.floor(this.groupedValuesDefault().length / 10) * 10;
    } else {
      dozenLength = Math.floor(this.sortedAndFilteredDefaultValues().length / 10) * 10;
    }

    while(value < dozenLength) {
      options.add(value);
      value += basedPag;
    }

    paginationsList.push({ label: "3" })
    options.forEach((label) => paginationsList.push({ label: label.toString() }))
    paginationsList.push({ label: "max" })

    return paginationsList;
  }

  handleSortRender = () => {
    if (this.group) {
      this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues(this.groupedValuesDefault()));
    } else {
      this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues())
    }
  }

  handlePaginationRender = () => {
    const label = this.paginationRenderField().label
    
    if (label == "max") {
      this.changeCurrentPage(1);
    }

    if (this.group) {
      this.itemsPerPage.set(label == "max" ? this.groupedValuesDefault().length : Number(label));
      this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues(this.groupedValuesDefault()));
    } else {
      this.itemsPerPage.set(label == "max" ? this.sortedAndFilteredDefaultValues().length : Number(label));
      this.sortedAndFilteredValues.set(this.getSortedAndFilteredValues());
    }
  }

  handleSort(values: Value[]) {
    let sortedArr = [...values];

    switch(this.sortRenderField().label) {
      case("Default"): {
        if (this.group) {
          sortedArr = sortedArr.sort((a, b) => {
            if (a?.["0"]) {
              return -1
            }
      
            return 1;
          })
        }

        break;
      }

      case("Status"): {
        sortedArr = sortedArr.sort((a, b) => {
          if (a?.["status"] == true) {
            return -1;
          }

          if (a?.["status"] == false) {
            return 0;
          }

          if (a?.["status"] == null) {
            return 1;
          }

          return 0;
        })
      }
    }

    return sortedArr;
  }

  resetSearch() {
    this.sortedAndFilteredValues.set(this.searchDefault() || []);
    this.searchDefault.set(null);
    this.changeCurrentPage(1);
    this.form.reset();
  }

  onSearchValue = () => {
    const searchValue = this.form.get("searchValue")?.value;

    const search = (item: Value) => {
      let resultArray: boolean[] = [];

      if (this.group && item?.["0"] && item?.["1"]) {
        resultArray = this.searchFields.map((searchField: string) => {
          return item["0"][searchField]?.includes(searchValue) || item["1"][searchField]?.includes(searchValue)
        })
      } else {
        resultArray = this.searchFields.map((searchField: string) => item[searchField]?.includes(searchValue))
      }

      return resultArray.some(Boolean);
    }

    if (searchValue.length !== 0 || !this.searchDefault()) {
      this.searchDefault.set(this.group ? this.groupedValuesDefault() : this.sortedAndFilteredValues());
      
      if (this.group) {
        this.sortedAndFilteredValues.set(
          this.groupedValuesDefault().filter((item) => search(item))
        )
      } else {
        this.sortedAndFilteredValues.set(
          this.sortedAndFilteredValues().filter((item) => search(item))
        )
      }
    } else {
      this.resetSearch();
    }
  }

  getValueByTape(value: Value, column: Column) {
    column.field = column.field || "";

    switch(column.type) {
      case("date"): {
        return new Date(value[column.field]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      
      case("marking"): {
        if (value["marking"].marking && value["markingNumber"]) {
          return `${value["shiftId"]}-${value["marking"].marking}-${value["markingNumber"]}`
        }

        return "N/A"
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

        break
      }
    }

    return value[column.field];
  }

  getRealNumberOfItems(values: Value[]) {
    let realNumber = [];

    for (let i = 0; i < values.length; i++) {
      if (!!values[i]["0"] && !!values[i]["1"]) {
        realNumber.push(i)
        realNumber.push(i)
      } else {
        realNumber.push(i);
      }
    }

    return realNumber.length;
  }

  paginationFilter = (values: Value[]) => {
    const firstItem = this.currentPagPage() == 1 ? 0 : this.currentPagPage() * this.itemsPerPage() - this.itemsPerPage();
    const lastItem = this.currentPagPage() * this.itemsPerPage();

    if (this.group) {
      const realNumberOfItems = this.getRealNumberOfItems(values);
      let filteredValues = [];

      for (let i = 0; i < realNumberOfItems; i++) {
        if (i >= firstItem && i < lastItem) {
          filteredValues.push(values[i]);
        }
      }

      return filteredValues.filter((item) => !!item);
     } else {
      return values.filter((value, idx) => idx >= firstItem && idx < lastItem)
    }

  };

  crewSome(a: OfficerTableItem, index: number, arr: OfficerTableItem[]) {
    return arr.some((b: OfficerTableItem, idx: number) => idx !== index && this.isCrew(a, b))
  }

  isCrew(a: any, b: any) {
    return a["marking"].marking === b["marking"].marking && a["markingNumber"] === b["markingNumber"]
  }

  crewGroup(arr: any[]) {
    let groupedArr: any[] = [];
    let usedIndices = new Set(); 
  
    for (let i = 0; i < arr.length; i++) {
      if (usedIndices.has(i)) continue;
  
      const current = arr[i];
      const pair = arr.find((item, idx) => 
        idx !== i && this.isCrew(current, item) && !usedIndices.has(idx)
      );

      const isCurrentPaired = current?.["marking"].marking && current?.["markingNumber"] ? this.ContextService.isMarkingPaired(current["marking"].marking) : false;
      const isPairPaired = pair?.["marking"].marking && pair?.["markingNumber"] ? this.ContextService.isMarkingPaired(pair["marking"].marking) : false;
  
      if (pair && isCurrentPaired && isPairPaired) {
        groupedArr.push({ "0": current, "1": pair });
        usedIndices.add(i);
        usedIndices.add(arr.indexOf(pair));
      } else {
        groupedArr.push(current);
      }
    }
  
    this.groupedValuesDefault.set(groupedArr);
    return groupedArr;
  }

  getSortedAndFilteredValues(canValues?: Value[]) {
    let valuesCopy = canValues ? [...canValues] : [ ...this.values() ];
    
    if (this.group && !this.groupedValuesDefault().find(item => item["0"])) {
      valuesCopy = this.crewGroup(valuesCopy); 
    }

    valuesCopy = this.handleSort(valuesCopy);

    if (this.sortedAndFilteredDefaultValues().length == 0) {
      this.sortedAndFilteredDefaultValues.set(valuesCopy);
    }

    valuesCopy = this.paginationFilter(valuesCopy); 
  
    return valuesCopy;
  }

  getNumberOfPages() {
    let numberOfPages = 0;

    if (this.group) {
      numberOfPages = Math.ceil(this.groupedValuesDefault().length / this.itemsPerPage());
    } else {
      numberOfPages = Math.ceil(this.values().length / this.itemsPerPage());
    }

    const numberOfPagesArray = [];

    for (let i = 0; i < numberOfPages; i++) {
      numberOfPagesArray.push(i);
    }

    return numberOfPagesArray;
  }

  changeCurrentPage(index: number) {
    this.currentPagPage.set(index);

    if (this.group) {
      this.sortedAndFilteredValues.set(
        this.getSortedAndFilteredValues(this.groupedValuesDefault())
      );
    } else {
      this.sortedAndFilteredValues.set(
        this.getSortedAndFilteredValues()
      );
    }
  }
}
