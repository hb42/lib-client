/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHeader } from "@hb42/lib-common";
import { EMPTY, from, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "./logon.service";
import * as i2 from "../";
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
/** @nocollapse */ LogonInterceptor.ɵfac = function LogonInterceptor_Factory(t) { return new (t || LogonInterceptor)(i0.ɵɵinject(i1.LogonService), i0.ɵɵinject(i2.ErrorService)); };
/** @nocollapse */ LogonInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: LogonInterceptor, factory: LogonInterceptor.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LogonInterceptor, [{
        type: Injectable
    }], function () { return [{ type: i1.LogonService }, { type: i2.ErrorService }]; }, null); })();
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
