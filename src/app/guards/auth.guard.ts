import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { map, catchError, of, Observable } from "rxjs";
import { ContextService } from "../services/context.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private AuthService: AuthService, private ContextService: ContextService) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.AuthService.isAuth().pipe(
            map((isAuth) => {
                this.ContextService.setIsAuth(isAuth);

                return isAuth;
            }),
            catchError(() => of(false))
        );
    }
}