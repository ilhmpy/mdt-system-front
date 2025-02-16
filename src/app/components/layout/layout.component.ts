import { Component } from '@angular/core';

interface Link {
  label: string;
  path: string;
}

@Component({
  selector: 'layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  readonly links: Link[] = [
    { label: "Officers", path: "/officers" },
    { label: "Reports", path: "/reports" },
    { label: "Calls", path: "/calls" },
    { label: "Control", path: "/control" },
    { label: "Forum", path: "/forum" },
  ]
}
