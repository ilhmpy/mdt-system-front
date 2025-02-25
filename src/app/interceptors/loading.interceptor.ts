import { inject } from "@angular/core";
import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http"
import { finalize, Observable } from "rxjs"
import { ContextService } from "../services/context.service";

export const LoadingInterceptor = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const contextService = inject(ContextService);

        if (req.method == "GET" && !contextService.getIsLoading().getValue()) {
            contextService.setIsLoading(true); 
        }

        return next(req).pipe(
            finalize(() => {
                contextService.setIsLoading(false);
            })
        )
    }