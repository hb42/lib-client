import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHeader } from "@hb42/lib-common";
import { EMPTY, from, Observable, throwError } from "rxjs";
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
@Injectable()
export class LogonInterceptor implements HttpInterceptor {
  private whitelist: string[] = [];

  constructor(private logonService: LogonService, private errorService: ErrorService) {
    console.debug("c'tor lib-client#LogonInterceptor");
    this.whitelist = logonService.urlsWithoutToken;
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.debug("INTERCEPT (1 check) " + request.url);
    if (!this.logonService.active || this.isWhitelisted(request)) {
      // console.debug("no token check " + request.url);
      request = request.clone();
      return this.errorHandling(request, next);
    } else {
      const token: Promise<string> = this.logonService.getTokenWithCheck();
      return from(token).pipe(
        mergeMap((asyncToken: string) => {
          // console.debug("insert token into request " + request.url);
          request = request.clone({ setHeaders: { [JwtHeader]: asyncToken } });
          return this.errorHandling(request, next);
        })
      );
    }
  }

  private isWhitelisted(request: HttpRequest<any>): boolean {
    return this.whitelist.findIndex((addr) => request.url.startsWith(addr)) > -1;
  }

  private errorHandling(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.debug("INTERCEPT (2 call) " + request.url);
    return next.handle(request).pipe(
      catchError((err: any, obs) => {
        console.debug("LogonInterceptor: errorHandling " + request.url);
        console.dir(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0 /*&& err.type === 3*/) {
            // network error (Server weg?)
            console.debug("LogonInterceptor: network error");
            this.errorService.newError("Network Error", "Der Server ist nicht erreichbar.");
          } else if (err.status >= 400) {
            console.debug("LogonInterceptor: HTTP-Error " + err.status);
            if (err.status === 401 || err.status === 403) {
              this.errorService.resetApp();
            } else {
              this.errorService.newError(
                err.status + " - " + err.statusText,
                err.message || "Server liefert ungueltige Daten."
              );
            }
          }
          return EMPTY; // Observable.empty();
        } else {
          // this.errorService.newError("Error", JSON.stringify(err));
          console.error("LogonInterceptor: unhandled exception - rethrow");
          return throwError(err);
        }
      })
    );
  }
}
