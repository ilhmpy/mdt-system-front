import { Routes } from '@angular/router';
import { OfficersComponent } from './officers/officers.component';
import { AuthGuard } from './guards/auth.guard';
import { NcincComponent } from './ncinc/ncinc.component';
import { RolesGuard } from './guards/roles.guard';

export const routes: Routes = [
    { pathMatch: "full", path: "", redirectTo: "officers" },
    { path: "officers", component: OfficersComponent, canActivate: [ AuthGuard, RolesGuard ] },
    { path: "ncinc", component: NcincComponent, canActivate: [ AuthGuard, RolesGuard ] },
    { path: "calls", component: OfficersComponent, canActivate: [ AuthGuard, RolesGuard ] },
    { path: "reports", component: OfficersComponent, canActivate: [ AuthGuard, RolesGuard ] },
    { path: "forum", component: OfficersComponent, canActivate: [ AuthGuard, RolesGuard ] },
    { path: "control", component: NcincComponent, canActivate: [ AuthGuard, RolesGuard ] },
];
