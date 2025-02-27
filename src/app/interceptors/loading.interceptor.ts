import { inject } from "@angular/core";
import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http"
import { finalize, Observable } from "rxjs"
import { ContextService } from "../services/context.service";

const notLoadingArray = [
    "get-civil", "get-auto", "get-weapon"
]

export const LoadingInterceptor = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
        const contextService = inject(ContextService);
        const isLoadingUrl = req.url.split("/")[4].split("?")[0];

        if (req.method == "GET" && !contextService.getIsLoading().getValue() && !notLoadingArray.includes(isLoadingUrl)) {
            contextService.setIsLoading(true); 
        }

        return next(req).pipe(
            finalize(() => {
                contextService.setIsLoading(false);
            })
        )
    }