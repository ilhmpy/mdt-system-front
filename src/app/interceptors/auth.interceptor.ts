import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http"
import { Observable } from "rxjs"
import { Router } from '@angular/router';
import { inject } from "@angular/core";

export const AuthInterceptor = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const router = inject(Router);

        return next(req.clone({
            setHeaders: {
                'authorization': localStorage.getItem("token") || "",
                'X-Current-Url': router.url.replace("/", "")
            }
        }));
}