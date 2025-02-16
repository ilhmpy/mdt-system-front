import { Routes } from '@angular/router';
import { OfficersComponent } from './officers/officers.component';

export const routes: Routes = [
    { pathMatch: "full", path: "", redirectTo: "officers" },
    { path: "officers", component: OfficersComponent },
    { path: "reports", component: OfficersComponent },
    { path: "calls", component: OfficersComponent },
    { path: "control", component: OfficersComponent },
    { path: "forum", component: OfficersComponent },
];
