import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { map, catchError, of, Observable } from "rxjs";
import { ContextService } from "../services/context.service";

@Injectable({
    providedIn: "root"
})
export class RolesGuard implements CanActivate {
    constructor(private ContextService: ContextService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.ContextService.getOfficer().pipe(
            map((data) => {
                const isAllowed = !!data.role?.permissions.find((item) => item.canActivateName  == route.url[0].path)?.get;

                if (!isAllowed) {
                    this.router.navigate(["/officers"]);
                }

                return isAllowed;
            }),
            catchError(() => of(false))
        );      
    }
}