import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-table-item',
  standalone: false,
  templateUrl: './info-table-item.component.html',
  styleUrl: './info-table-item.component.scss'
})
export class InfoTableItemComponent {
  @Input() label: string = "";
  @Input() data: any = "";
  @Input() type: string = ""

  getValueByType() {
    switch(this.type) {
      case("date"): {
        return new Date(this.data).toLocaleString("en-US", { 
          year: "numeric", 
          month: "2-digit", 
          day: "2-digit" 
        });
      }

      case("phoneNumber"): {
        return `+1 ${this.data.toString().replace(/(\d{3})(?=\d)/g, "$1 ")}`;
      }
    }

    if (typeof this.data == 'boolean') {
      if (this.data) {
        return "avalaible"
      } else {
        return "not avalaible"
      }
    }

    return this.data;
  }
}
