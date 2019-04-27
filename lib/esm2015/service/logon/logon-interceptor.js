/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHeader } from "@hb42/lib-common";
import { EMPTY, from, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { ErrorService } from "../error.service";
import { LogonService } from "./logon.service";
/**
 * {\@link HttpInterceptor} fuer das Einfuegen eines JWT in die Aufrufe
 * zum REST-Server. Ausserdem werden HTTP-Fehler an den {\@link ErrorService}
 * uebergeben (ausser 401 + 403, da wird die Anwendung neu geladen).
 *
 * Uebernommen aus {\@link https://github.com/auth0/angular2-jwt}.
 *
 * @see {\@link LOGON_OPTIONS}
 * @see {\@link LogonService}
 * @see {\@link LogonParameter}
 * @see {\@link ErrorService}
 */
export class LogonInterceptor {
    /**
     * @param {?} logonService
     * @param {?} errorService
     */
    constructor(logonService, errorService) {
        this.logonService = logonService;
        this.errorService = errorService;
        this.whitelist = [];
        console.debug("c'tor LogonInterceptor");
        this.whitelist = logonService.urlsWithoutToken;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        // console.debug("INTERCEPT (1 check) " + request.url);
        if (!this.logonService.active || this.isWhitelisted(request)) {
            // console.debug("no token check " + request.url);
            request = request.clone();
            return this.errorHandling(request, next);
        }
        else {
            /** @type {?} */
            const token = this.logonService.getTokenWithCheck();
            return from(token).pipe(mergeMap((/**
             * @param {?} asyncToken
             * @return {?}
             */
            (asyncToken) => {
                // console.debug("insert token into request " + request.url);
                request = request.clone({ setHeaders: { [JwtHeader]: asyncToken } });
                return this.errorHandling(request, next);
            })));
        }
    }
    /**
     * @private
     * @param {?} request
     * @return {?}
     */
    isWhitelisted(request) {
        return (this.whitelist.findIndex((/**
         * @param {?} addr
         * @return {?}
         */
        (addr) => request.url.startsWith(addr))) > -1);
    }
    /**
     * @private
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    errorHandling(request, next) {
        // console.debug("INTERCEPT (2 call) " + request.url);
        return next.handle(request).pipe(catchError((/**
         * @param {?} err
         * @param {?} obs
         * @return {?}
         */
        (err, obs) => {
            console.debug("LogonInterceptor: errorHandling " + request.url);
            console.dir(err);
            if (err instanceof HttpErrorResponse) {
                if (err.status === 0 /*&& err.type === 3*/) { // network error (Server weg?)
                    console.debug("LogonInterceptor: network error");
                    this.errorService.newError("Network Error", "Der Server ist nicht erreichbar.");
                }
                else if (err.status >= 400) {
                    console.debug("LogonInterceptor: HTTP-Error " + err.status);
                    if (err.status === 401 || err.status === 403) {
                        this.errorService.resetApp();
                    }
                    else {
                        this.errorService.newError(err.status + " - " + err.statusText, err.message || "Server liefert ungueltige Daten.");
                    }
                }
                return EMPTY; // Observable.empty();
            }
            else {
                // this.errorService.newError("Error", JSON.stringify(err));
                console.error("LogonInterceptor: unhandled exception - rethrow");
                return throwError(err);
            }
        })));
    }
}
LogonInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LogonInterceptor.ctorParameters = () => [
    { type: LogonService },
    { type: ErrorService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    LogonInterceptor.prototype.whitelist;
    /**
     * @type {?}
     * @private
     */
    LogonInterceptor.prototype.logonService;
    /**
     * @type {?}
     * @private
     */
    LogonInterceptor.prototype.errorService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24taW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZS9sb2dvbi9sb2dvbi1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUF3RCxNQUFNLHNCQUFzQixDQUFDO0FBQy9HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFlL0MsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFJM0IsWUFBb0IsWUFBMEIsRUFBVSxZQUEwQjtRQUE5RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRjFFLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFHL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUVNLFNBQVMsQ0FBQyxPQUF5QixFQUFFLElBQWlCO1FBQzNELHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1RCxrREFBa0Q7WUFDbEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFDO2FBQU07O2tCQUNDLEtBQUssR0FBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtZQUNwRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUTs7OztZQUFDLENBQUMsVUFBa0IsRUFBRSxFQUFFO2dCQUN0RCw2REFBNkQ7Z0JBQzdELE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUMsRUFBQyxDQUFDLENBQUM7Z0JBQ2pFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNMO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sYUFBYSxDQUFDLE9BQXlCO1FBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7Ozs7Ozs7SUFFTyxhQUFhLENBQUMsT0FBeUIsRUFBRSxJQUFpQjtRQUNoRSxzREFBc0Q7UUFDdEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVOzs7OztRQUFDLENBQUMsR0FBUSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxHQUFHLFlBQVksaUJBQWlCLEVBQUU7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMscUJBQXFCLEVBQUUsRUFBRSw4QkFBOEI7b0JBQzFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7aUJBQ2pGO3FCQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM1RCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO3dCQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUM5Qjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxFQUMxRCxHQUFHLENBQUMsT0FBTyxJQUFJLGtDQUFrQyxDQUFDLENBQUM7cUJBQ3hEO2lCQUNGO2dCQUNELE9BQU8sS0FBSyxDQUFDLENBQUMsc0JBQXNCO2FBQ3JDO2lCQUFNO2dCQUNMLDREQUE0RDtnQkFDNUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2dCQUNqRSxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsRUFBQyxDQUFDLENBQUM7SUFDTixDQUFDOzs7WUF2REYsVUFBVTs7OztZQWRGLFlBQVk7WUFEWixZQUFZOzs7Ozs7O0lBa0JuQixxQ0FBaUM7Ozs7O0lBRXJCLHdDQUFrQzs7Ozs7SUFBRSx3Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBKd3RIZWFkZXIgfSBmcm9tIFwiQGhiNDIvbGliLWNvbW1vblwiO1xuaW1wb3J0IHsgRU1QVFksIGZyb20sIE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWVyZ2VNYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IEVycm9yU2VydmljZSB9IGZyb20gXCIuLi9lcnJvci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2dvblNlcnZpY2UgfSBmcm9tIFwiLi9sb2dvbi5zZXJ2aWNlXCI7XG5cbi8qKlxuICoge0BsaW5rIEh0dHBJbnRlcmNlcHRvcn0gZnVlciBkYXMgRWluZnVlZ2VuIGVpbmVzIEpXVCBpbiBkaWUgQXVmcnVmZVxuICogenVtIFJFU1QtU2VydmVyLiBBdXNzZXJkZW0gd2VyZGVuIEhUVFAtRmVobGVyIGFuIGRlbiB7QGxpbmsgRXJyb3JTZXJ2aWNlfVxuICogdWViZXJnZWJlbiAoYXVzc2VyIDQwMSArIDQwMywgZGEgd2lyZCBkaWUgQW53ZW5kdW5nIG5ldSBnZWxhZGVuKS5cbiAqXG4gKiBVZWJlcm5vbW1lbiBhdXMge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9hdXRoMC9hbmd1bGFyMi1qd3R9LlxuICpcbiAqIEBzZWUge0BsaW5rIExPR09OX09QVElPTlN9XG4gKiBAc2VlIHtAbGluayBMb2dvblNlcnZpY2V9XG4gKiBAc2VlIHtAbGluayBMb2dvblBhcmFtZXRlcn1cbiAqIEBzZWUge0BsaW5rIEVycm9yU2VydmljZX1cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ29uSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gIHByaXZhdGUgd2hpdGVsaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nb25TZXJ2aWNlOiBMb2dvblNlcnZpY2UsIHByaXZhdGUgZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiYyd0b3IgTG9nb25JbnRlcmNlcHRvclwiKTtcbiAgICB0aGlzLndoaXRlbGlzdCA9IGxvZ29uU2VydmljZS51cmxzV2l0aG91dFRva2VuO1xuICB9XG5cbiAgcHVibGljIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwiSU5URVJDRVBUICgxIGNoZWNrKSBcIiArIHJlcXVlc3QudXJsKTtcbiAgICBpZiAoIXRoaXMubG9nb25TZXJ2aWNlLmFjdGl2ZSB8fCB0aGlzLmlzV2hpdGVsaXN0ZWQocmVxdWVzdCkpIHtcbiAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJubyB0b2tlbiBjaGVjayBcIiArIHJlcXVlc3QudXJsKTtcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKCk7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsaW5nKHJlcXVlc3QsIG5leHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b2tlbjogUHJvbWlzZTxzdHJpbmc+ID0gdGhpcy5sb2dvblNlcnZpY2UuZ2V0VG9rZW5XaXRoQ2hlY2soKTtcbiAgICAgIHJldHVybiBmcm9tKHRva2VuKS5waXBlKG1lcmdlTWFwKChhc3luY1Rva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcImluc2VydCB0b2tlbiBpbnRvIHJlcXVlc3QgXCIgKyByZXF1ZXN0LnVybCk7XG4gICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtzZXRIZWFkZXJzOiB7W0p3dEhlYWRlcl06IGFzeW5jVG9rZW59fSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxpbmcocmVxdWVzdCwgbmV4dCk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1doaXRlbGlzdGVkKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMud2hpdGVsaXN0LmZpbmRJbmRleCgoYWRkcikgPT4gcmVxdWVzdC51cmwuc3RhcnRzV2l0aChhZGRyKSkgPiAtMSk7XG4gIH1cblxuICBwcml2YXRlIGVycm9ySGFuZGxpbmcocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgLy8gY29uc29sZS5kZWJ1ZyhcIklOVEVSQ0VQVCAoMiBjYWxsKSBcIiArIHJlcXVlc3QudXJsKTtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCkucGlwZShjYXRjaEVycm9yKChlcnI6IGFueSwgb2JzKSA9PiB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiTG9nb25JbnRlcmNlcHRvcjogZXJyb3JIYW5kbGluZyBcIiArIHJlcXVlc3QudXJsKTtcbiAgICAgIGNvbnNvbGUuZGlyKGVycik7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDAgLyomJiBlcnIudHlwZSA9PT0gMyovKSB7IC8vIG5ldHdvcmsgZXJyb3IgKFNlcnZlciB3ZWc/KVxuICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2dvbkludGVyY2VwdG9yOiBuZXR3b3JrIGVycm9yXCIpO1xuICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLm5ld0Vycm9yKFwiTmV0d29yayBFcnJvclwiLCBcIkRlciBTZXJ2ZXIgaXN0IG5pY2h0IGVycmVpY2hiYXIuXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGVyci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvZ29uSW50ZXJjZXB0b3I6IEhUVFAtRXJyb3IgXCIgKyBlcnIuc3RhdHVzKTtcbiAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxIHx8IGVyci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2UucmVzZXRBcHAoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2UubmV3RXJyb3IoZXJyLnN0YXR1cyArIFwiIC0gXCIgKyBlcnIuc3RhdHVzVGV4dCxcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSB8fCBcIlNlcnZlciBsaWVmZXJ0IHVuZ3VlbHRpZ2UgRGF0ZW4uXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRU1QVFk7IC8vIE9ic2VydmFibGUuZW1wdHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMuZXJyb3JTZXJ2aWNlLm5ld0Vycm9yKFwiRXJyb3JcIiwgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMb2dvbkludGVyY2VwdG9yOiB1bmhhbmRsZWQgZXhjZXB0aW9uIC0gcmV0aHJvd1wiKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxufVxuIl19