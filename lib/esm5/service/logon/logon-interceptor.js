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
var LogonInterceptor = /** @class */ (function () {
    function LogonInterceptor(logonService, errorService) {
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
    LogonInterceptor.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (1 check) " + request.url);
        if (!this.logonService.active || this.isWhitelisted(request)) {
            // console.debug("no token check " + request.url);
            request = request.clone();
            return this.errorHandling(request, next);
        }
        else {
            /** @type {?} */
            var token = this.logonService.getTokenWithCheck();
            return from(token).pipe(mergeMap((/**
             * @param {?} asyncToken
             * @return {?}
             */
            function (asyncToken) {
                var _a;
                // console.debug("insert token into request " + request.url);
                request = request.clone({ setHeaders: (_a = {}, _a[JwtHeader] = asyncToken, _a) });
                return _this.errorHandling(request, next);
            })));
        }
    };
    /**
     * @private
     * @param {?} request
     * @return {?}
     */
    LogonInterceptor.prototype.isWhitelisted = /**
     * @private
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return (this.whitelist.findIndex((/**
         * @param {?} addr
         * @return {?}
         */
        function (addr) { return request.url.startsWith(addr); })) > -1);
    };
    /**
     * @private
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    LogonInterceptor.prototype.errorHandling = /**
     * @private
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (2 call) " + request.url);
        return next.handle(request).pipe(catchError((/**
         * @param {?} err
         * @param {?} obs
         * @return {?}
         */
        function (err, obs) {
            console.debug("LogonInterceptor: errorHandling " + request.url);
            console.dir(err);
            if (err instanceof HttpErrorResponse) {
                if (err.status === 0 /*&& err.type === 3*/) { // network error (Server weg?)
                    console.debug("LogonInterceptor: network error");
                    _this.errorService.newError("Network Error", "Der Server ist nicht erreichbar.");
                }
                else if (err.status >= 400) {
                    console.debug("LogonInterceptor: HTTP-Error " + err.status);
                    if (err.status === 401 || err.status === 403) {
                        _this.errorService.resetApp();
                    }
                    else {
                        _this.errorService.newError(err.status + " - " + err.statusText, err.message || "Server liefert ungueltige Daten.");
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
    };
    LogonInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LogonInterceptor.ctorParameters = function () { return [
        { type: LogonService },
        { type: ErrorService }
    ]; };
    return LogonInterceptor;
}());
export { LogonInterceptor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24taW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZS9sb2dvbi9sb2dvbi1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUF3RCxNQUFNLHNCQUFzQixDQUFDO0FBQy9HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFjL0M7SUFLRSwwQkFBb0IsWUFBMEIsRUFBVSxZQUEwQjtRQUE5RCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRjFFLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFHL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUVNLG9DQUFTOzs7OztJQUFoQixVQUFpQixPQUF5QixFQUFFLElBQWlCO1FBQTdELGlCQWNDO1FBYkMsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVELGtEQUFrRDtZQUNsRCxPQUFPLEdBQUcsT0FB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ImltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEp3dEhlYWRlciB9IGZyb20gXCJAaGI0Mi9saWItY29tbW9uXCI7XG5pbXBvcnQgeyBFTVBUWSwgZnJvbSwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtZXJnZU1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlIH0gZnJvbSBcIi4uL2Vycm9yLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvZ29uU2VydmljZSB9IGZyb20gXCIuL2xvZ29uLnNlcnZpY2VcIjtcblxuLyoqXG4gKiB7QGxpbmsgSHR0cEludGVyY2VwdG9yfSBmdWVyIGRhcyBFaW5mdWVnZW4gZWluZXMgSldUIGluIGRpZSBBdWZydWZlXG4gKiB6dW0gUkVTVC1TZXJ2ZXIuIEF1c3NlcmRlbSB3ZXJkZW4gSFRUUC1GZWhsZXIgYW4gZGVuIHtAbGluayBFcnJvclNlcnZpY2V9XG4gKiB1ZWJlcmdlYmVuIChhdXNzZXIgNDAxICsgNDAzLCBkYSB3aXJkIGRpZSBBbndlbmR1bmcgbmV1IGdlbGFkZW4pLlxuICpcbiAqIFVlYmVybm9tbWVuIGF1cyB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2F1dGgwL2FuZ3VsYXIyLWp3dH0uXG4gKlxuICogQHNlZSB7QGxpbmsgTE9HT05fT1BUSU9OU31cbiAqIEBzZWUge0BsaW5rIExvZ29uU2VydmljZX1cbiAqIEBzZWUge0BsaW5rIExvZ29uUGFyYW1ldGVyfVxuICogQHNlZSB7QGxpbmsgRXJyb3JTZXJ2aWNlfVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nb25JbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG5cbiAgcHJpdmF0ZSB3aGl0ZWxpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2dvblNlcnZpY2U6IExvZ29uU2VydmljZSwgcHJpdmF0ZSBlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJjJ3RvciBMb2dvbkludGVyY2VwdG9yXCIpO1xuICAgIHRoaXMud2hpdGVsaXN0ID0gbG9nb25TZXJ2aWNlLnVybHNXaXRob3V0VG9rZW47XG4gIH1cblxuICBwdWJsaWMgaW50ZXJjZXB0KHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIC8vIGNvbnNvbGUuZGVidWcoXCJJTlRFUkNFUFQgKDEgY2hlY2spIFwiICsgcmVxdWVzdC51cmwpO1xuICAgIGlmICghdGhpcy5sb2dvblNlcnZpY2UuYWN0aXZlIHx8IHRoaXMuaXNXaGl0ZWxpc3RlZChyZXF1ZXN0KSkge1xuICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcIm5vIHRva2VuIGNoZWNrIFwiICsgcmVxdWVzdC51cmwpO1xuICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoKTtcbiAgICAgIHJldHVybiB0aGlzLmVycm9ySGFuZGxpbmcocmVxdWVzdCwgbmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRva2VuOiBQcm9taXNlPHN0cmluZz4gPSB0aGlzLmxvZ29uU2VydmljZS5nZXRUb2tlbldpdGhDaGVjaygpO1xuICAgICAgcmV0dXJuIGZyb20odG9rZW4pLnBpcGUobWVyZ2VNYXAoKGFzeW5jVG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmRlYnVnKFwiaW5zZXJ0IHRva2VuIGludG8gcmVxdWVzdCBcIiArIHJlcXVlc3QudXJsKTtcbiAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe3NldEhlYWRlcnM6IHtbSnd0SGVhZGVyXTogYXN5bmNUb2tlbn19KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGluZyhyZXF1ZXN0LCBuZXh0KTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzV2hpdGVsaXN0ZWQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy53aGl0ZWxpc3QuZmluZEluZGV4KChhZGRyKSA9PiByZXF1ZXN0LnVybC5zdGFydHNXaXRoKGFkZHIpKSA+IC0xKTtcbiAgfVxuXG4gIHByaXZhdGUgZXJyb3JIYW5kbGluZyhyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwiSU5URVJDRVBUICgyIGNhbGwpIFwiICsgcmVxdWVzdC51cmwpO1xuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKGNhdGNoRXJyb3IoKGVycjogYW55LCBvYnMpID0+IHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2dvbkludGVyY2VwdG9yOiBlcnJvckhhbmRsaW5nIFwiICsgcmVxdWVzdC51cmwpO1xuICAgICAgY29uc29sZS5kaXIoZXJyKTtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBIdHRwRXJyb3JSZXNwb25zZSkge1xuICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gMCAvKiYmIGVyci50eXBlID09PSAzKi8pIHsgLy8gbmV0d29yayBlcnJvciAoU2VydmVyIHdlZz8pXG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvZ29uSW50ZXJjZXB0b3I6IG5ldHdvcmsgZXJyb3JcIik7XG4gICAgICAgICAgdGhpcy5lcnJvclNlcnZpY2UubmV3RXJyb3IoXCJOZXR3b3JrIEVycm9yXCIsIFwiRGVyIFNlcnZlciBpc3QgbmljaHQgZXJyZWljaGJhci5cIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9nb25JbnRlcmNlcHRvcjogSFRUUC1FcnJvciBcIiArIGVyci5zdGF0dXMpO1xuICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEgfHwgZXJyLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5yZXNldEFwcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5uZXdFcnJvcihlcnIuc3RhdHVzICsgXCIgLSBcIiArIGVyci5zdGF0dXNUZXh0LFxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlIHx8IFwiU2VydmVyIGxpZWZlcnQgdW5ndWVsdGlnZSBEYXRlbi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFTVBUWTsgLy8gT2JzZXJ2YWJsZS5lbXB0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhpcy5lcnJvclNlcnZpY2UubmV3RXJyb3IoXCJFcnJvclwiLCBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkxvZ29uSW50ZXJjZXB0b3I6IHVuaGFuZGxlZCBleGNlcHRpb24gLSByZXRocm93XCIpO1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG59XG4iXX0=