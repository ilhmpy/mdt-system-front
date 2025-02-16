import { Routes } from '@angular/router';
import { OfficersComponent } from './officers/officers.component';

export const routes: Routes = [
    { pathMatch: "full", path: "", redirectTo: "officers" },
    { path: "officers", component: OfficersComponent }
];
