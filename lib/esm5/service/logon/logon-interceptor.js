import { __decorate } from "tslib";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHeader } from "@hb42/lib-common";
import { EMPTY, from, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { ErrorService } from "../error.service";
import { LogonService } from "./logon.service";
/**
 * {@link HttpInterceptor} fuer das Einfuegen eines JWT in die Aufrufe
 * zum REST-Server. Ausserdem werden HTTP-Fehler an den {@link ErrorService}
 * uebergeben (ausser 401 + 403, da wird die Anwendung neu geladen).
 *
 * Uebernommen aus {@link https://github.com/auth0/angular2-jwt}.
 *
 * @see {@link LOGON_OPTIONS}
 * @see {@link LogonService}
 * @see {@link LogonParameter}
 * @see {@link ErrorService}
 */
var LogonInterceptor = /** @class */ (function () {
    function LogonInterceptor(logonService, errorService) {
        this.logonService = logonService;
        this.errorService = errorService;
        this.whitelist = [];
        console.debug("c'tor LogonInterceptor");
        this.whitelist = logonService.urlsWithoutToken;
    }
    LogonInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (1 check) " + request.url);
        if (!this.logonService.active || this.isWhitelisted(request)) {
            // console.debug("no token check " + request.url);
            request = request.clone();
            return this.errorHandling(request, next);
        }
        else {
            var token = this.logonService.getTokenWithCheck();
            return from(token).pipe(mergeMap(function (asyncToken) {
                var _a;
                // console.debug("insert token into request " + request.url);
                request = request.clone({ setHeaders: (_a = {}, _a[JwtHeader] = asyncToken, _a) });
                return _this.errorHandling(request, next);
            }));
        }
    };
    LogonInterceptor.prototype.isWhitelisted = function (request) {
        return (this.whitelist.findIndex(function (addr) { return request.url.startsWith(addr); }) > -1);
    };
    LogonInterceptor.prototype.errorHandling = function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (2 call) " + request.url);
        return next.handle(request).pipe(catchError(function (err, obs) {
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
        }));
    };
    LogonInterceptor.ctorParameters = function () { return [
        { type: LogonService },
        { type: ErrorService }
    ]; };
    LogonInterceptor = __decorate([
        Injectable()
    ], LogonInterceptor);
    return LogonInterceptor;
}());
export { LogonInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24taW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsic2VydmljZS9sb2dvbi9sb2dvbi1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUF3RCxNQUFNLHNCQUFzQixDQUFDO0FBQy9HLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0M7Ozs7Ozs7Ozs7O0dBV0c7QUFFSDtJQUlFLDBCQUFvQixZQUEwQixFQUFVLFlBQTBCO1FBQTlELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGMUUsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUcvQixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDakQsQ0FBQztJQUVNLG9DQUFTLEdBQWhCLFVBQWlCLE9BQXlCLEVBQUUsSUFBaUI7UUFBN0QsaUJBY0M7UUFiQyx1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUQsa0RBQWtEO1lBQ2xELE9BQU8sR0FBRyxPQUFPLENB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cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSnd0SGVhZGVyIH0gZnJvbSBcIkBoYjQyL2xpYi1jb21tb25cIjtcbmltcG9ydCB7IEVNUFRZLCBmcm9tLCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1lcmdlTWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBFcnJvclNlcnZpY2UgfSBmcm9tIFwiLi4vZXJyb3Iuc2VydmljZVwiO1xuaW1wb3J0IHsgTG9nb25TZXJ2aWNlIH0gZnJvbSBcIi4vbG9nb24uc2VydmljZVwiO1xuXG4vKipcbiAqIHtAbGluayBIdHRwSW50ZXJjZXB0b3J9IGZ1ZXIgZGFzIEVpbmZ1ZWdlbiBlaW5lcyBKV1QgaW4gZGllIEF1ZnJ1ZmVcbiAqIHp1bSBSRVNULVNlcnZlci4gQXVzc2VyZGVtIHdlcmRlbiBIVFRQLUZlaGxlciBhbiBkZW4ge0BsaW5rIEVycm9yU2VydmljZX1cbiAqIHVlYmVyZ2ViZW4gKGF1c3NlciA0MDEgKyA0MDMsIGRhIHdpcmQgZGllIEFud2VuZHVuZyBuZXUgZ2VsYWRlbikuXG4gKlxuICogVWViZXJub21tZW4gYXVzIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vYXV0aDAvYW5ndWxhcjItand0fS5cbiAqXG4gKiBAc2VlIHtAbGluayBMT0dPTl9PUFRJT05TfVxuICogQHNlZSB7QGxpbmsgTG9nb25TZXJ2aWNlfVxuICogQHNlZSB7QGxpbmsgTG9nb25QYXJhbWV0ZXJ9XG4gKiBAc2VlIHtAbGluayBFcnJvclNlcnZpY2V9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dvbkludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICBwcml2YXRlIHdoaXRlbGlzdDogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvZ29uU2VydmljZTogTG9nb25TZXJ2aWNlLCBwcml2YXRlIGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcImMndG9yIExvZ29uSW50ZXJjZXB0b3JcIik7XG4gICAgdGhpcy53aGl0ZWxpc3QgPSBsb2dvblNlcnZpY2UudXJsc1dpdGhvdXRUb2tlbjtcbiAgfVxuXG4gIHB1YmxpYyBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgLy8gY29uc29sZS5kZWJ1ZyhcIklOVEVSQ0VQVCAoMSBjaGVjaykgXCIgKyByZXF1ZXN0LnVybCk7XG4gICAgaWYgKCF0aGlzLmxvZ29uU2VydmljZS5hY3RpdmUgfHwgdGhpcy5pc1doaXRlbGlzdGVkKHJlcXVlc3QpKSB7XG4gICAgICAvLyBjb25zb2xlLmRlYnVnKFwibm8gdG9rZW4gY2hlY2sgXCIgKyByZXF1ZXN0LnVybCk7XG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGluZyhyZXF1ZXN0LCBuZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9rZW46IFByb21pc2U8c3RyaW5nPiA9IHRoaXMubG9nb25TZXJ2aWNlLmdldFRva2VuV2l0aENoZWNrKCk7XG4gICAgICByZXR1cm4gZnJvbSh0b2tlbikucGlwZShtZXJnZU1hcCgoYXN5bmNUb2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJpbnNlcnQgdG9rZW4gaW50byByZXF1ZXN0IFwiICsgcmVxdWVzdC51cmwpO1xuICAgICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7c2V0SGVhZGVyczoge1tKd3RIZWFkZXJdOiBhc3luY1Rva2VufX0pO1xuICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsaW5nKHJlcXVlc3QsIG5leHQpO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNXaGl0ZWxpc3RlZChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLndoaXRlbGlzdC5maW5kSW5kZXgoKGFkZHIpID0+IHJlcXVlc3QudXJsLnN0YXJ0c1dpdGgoYWRkcikpID4gLTEpO1xuICB9XG5cbiAgcHJpdmF0ZSBlcnJvckhhbmRsaW5nKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIC8vIGNvbnNvbGUuZGVidWcoXCJJTlRFUkNFUFQgKDIgY2FsbCkgXCIgKyByZXF1ZXN0LnVybCk7XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoY2F0Y2hFcnJvcigoZXJyOiBhbnksIG9icykgPT4ge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvZ29uSW50ZXJjZXB0b3I6IGVycm9ySGFuZGxpbmcgXCIgKyByZXF1ZXN0LnVybCk7XG4gICAgICBjb25zb2xlLmRpcihlcnIpO1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvclJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChlcnIuc3RhdHVzID09PSAwIC8qJiYgZXJyLnR5cGUgPT09IDMqLykgeyAvLyBuZXR3b3JrIGVycm9yIChTZXJ2ZXIgd2VnPylcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9nb25JbnRlcmNlcHRvcjogbmV0d29yayBlcnJvclwiKTtcbiAgICAgICAgICB0aGlzLmVycm9yU2VydmljZS5uZXdFcnJvcihcIk5ldHdvcmsgRXJyb3JcIiwgXCJEZXIgU2VydmVyIGlzdCBuaWNodCBlcnJlaWNoYmFyLlwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcnIuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2dvbkludGVyY2VwdG9yOiBIVFRQLUVycm9yIFwiICsgZXJyLnN0YXR1cyk7XG4gICAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSB8fCBlcnIuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLnJlc2V0QXBwKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JTZXJ2aWNlLm5ld0Vycm9yKGVyci5zdGF0dXMgKyBcIiAtIFwiICsgZXJyLnN0YXR1c1RleHQsXG4gICAgICAgICAgICAgICAgZXJyLm1lc3NhZ2UgfHwgXCJTZXJ2ZXIgbGllZmVydCB1bmd1ZWx0aWdlIERhdGVuLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVNUFRZOyAvLyBPYnNlcnZhYmxlLmVtcHR5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzLmVycm9yU2VydmljZS5uZXdFcnJvcihcIkVycm9yXCIsIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTG9nb25JbnRlcmNlcHRvcjogdW5oYW5kbGVkIGV4Y2VwdGlvbiAtIHJldGhyb3dcIik7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbn1cbiJdfQ==