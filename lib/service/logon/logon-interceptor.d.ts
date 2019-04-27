import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
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
export declare class LogonInterceptor implements HttpInterceptor {
    private logonService;
    private errorService;
    private whitelist;
    constructor(logonService: LogonService, errorService: ErrorService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private isWhitelisted;
    private errorHandling;
}
