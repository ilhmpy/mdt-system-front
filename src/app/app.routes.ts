import { Routes } from '@angular/router';
import { OfficersComponent } from './officers/officers.component';
import { AuthGuard } from './guards/auth.guard';
import { NcincComponent } from './ncinc/ncinc.component';

export const routes: Routes = [
    { pathMatch: "full", path: "", redirectTo: "officers" },
    { path: "officers", component: OfficersComponent, canActivate: [ AuthGuard ] },
    { path: "ncinc", component: NcincComponent, canActivate: [ AuthGuard ] },
    { path: "calls", component: OfficersComponent, canActivate: [ AuthGuard ] },
    { path: "reports", component: OfficersComponent, canActivate: [ AuthGuard ] },
    { path: "forum", component: OfficersComponent, canActivate: [ AuthGuard ] },
    { path: "control", component: OfficersComponent, canActivate: [ AuthGuard ] },
];
