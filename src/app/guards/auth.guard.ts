import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { map, catchError, of, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private AuthService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.AuthService.isAuth().pipe(
            map((isAuth) => {
                console.log(isAuth);
                if (!isAuth) {

                }
                return isAuth;
            }),
            catchError(() => of(false))
        );
    }
}