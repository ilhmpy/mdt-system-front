import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http"
import { Observable } from "rxjs"

export const AuthInterceptor = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        return next(req.clone({
            headers: req.headers.set(
                'authorization', localStorage.getItem("token") || ""
            )
        }));
    }