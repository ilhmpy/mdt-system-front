import { Component, computed, effect, Input, signal, SimpleChanges, ViewChild, WritableSignal } from '@angular/core';
import { Column, Value } from './ui-table.dto';
import { ContextService } from '../../../services/context.service';
import { OfficerDTO, OfficerTableItem } from '../../../dtos/officer.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListInterface } from '../list/ui-list.dto';
import { PresentationService } from '../../../services/presentation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'ui-table',
  standalone: false,
  templateUrl: './ui-table.component.html',
  styleUrl: './ui-table.component.scss'
})
export class UiTableComponent {
  @Input() columns: string[] = [];
  @Input() values: Value[] = []
  @Input() sortBy: ListInterface[] | null = null;
  @Input() clickTriggerOnContainer: ((id: number) => void) = () => {};
  @Input() group: boolean = false;
  @Input() data: Value | null = null;
  @Input() paginationAndSearch: boolean = true;

  form: FormGroup;

  constructor(readonly ContextService: ContextService, private fb: FormBuilder, public PresentationService: PresentationService) {
    this.form = this.fb.group({
      searchValue: [
        '',
        [ Validators.required ]
      ]
    })
  }

  dataSource = new MatTableDataSource<any>(this.values);

  readonly sortedData = computed(() => {
    return this.PresentationService.handleSort(
      this.dataSource.data,
      this.sortRenderField().label,
      this.values,
      this.data || {}
    );
  });

  readonly sortRenderField: WritableSignal<ListInterface> = signal<ListInterface>({ label: "" })


  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    if (this.paginationAndSearch) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.PresentationService.handleSort(this.dataSource.data, "Default", this.values, this.data || {});

    if (this.group) {
      //this.dataSource.data = this.PresentationService.crewGroup(this.values)
      //console.log(this.dataSource.data);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['values'] && changes['values'].currentValue) {
        this.dataSource.data = changes['values'].currentValue;
    }
  }

  sortChange = (sort?: string) => {
    this.dataSource.data = this.PresentationService.handleSort(this.dataSource.data, sort ? sort : this.sortRenderField()["label"], this.values, this.data || {});
  } 

  clickTrigger(id: number) {
    this.clickTriggerOnContainer(id)
  }

  applyFilter = () => {
    const filterValue = this.form.get("searchValue")?.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filteredData.length)
  }

  ngOnInit() {
    if (this.sortBy) {
      this.sortRenderField.set({ label: this.sortBy?.[0].label ?? "" });
    }
  }
}
