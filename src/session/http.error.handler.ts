/**
 * Created by hb on 07.08.16.
 *
 * HTTP-Errors abfangen
 *
 * s. http://stackoverflow.com/questions/34934009/handling-401s-globally-with-angular-2
 */

import {
    BrowserXhr,
    Request,
    Response,
    ResponseOptions,
    XHRBackend,
    XSRFStrategy,
} from "@angular/http";
import "rxjs/add/operator/catch";
import {
    Observable,
} from "rxjs/Observable";

/**
 * Initialisieren via provide laeuft auf Fehler (anscheinend Parametertypen).
 * -> Klaeren, ob das Abfangen von HTTP-Fehlern hier richtig ist.
 */
export class HttpErrorHandler extends XHRBackend {

  constructor(browserXhr: BrowserXhr, baseResponseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
    console.info("HttpErrorHandler");
  }

  /**
   * error handler
   *
   * "normale" Server-Fehler liefern den HTTP-Status in Response.status.
   * Bei uncaught exception auf Serverseite kommen keine verwertbaren Daten, weil
   * der x-allow-origin header fehlt, Status ist 200, type ist 3 "error"
   * -> status 500 liefern
   *
   * (RFC 2616: A response has an associated type which is 0"basic", 1"cors", 2"default", 3"error", 4"opaque", or
   *            5"opaqueredirect". Unless stated otherwise, it is "default". A response whose type is "error" is
   *            known as a network error.)
   *
   * Server liefert 403 Forbidden, wenn Userberechtigung fehlt -> app reset, ein unberechtigter call haette schon
   *                                                              auf app-Seite verhindert werden muessen
   *
   * Server liefert 401 Unauthorized wenn SessinID invalid -> reload, das duerfte i.d.R. ein Sessionablauf sein
   *
   * die restlichen 4xx und 5xx sollten auf einer Fehlerseite landen
   */
  public createConnection(request: Request) {
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      // base href -> wird zum vollstaendigen Pfad erweitert
      let myurl = document.getElementsByTagName("base")[0]["href"];
      // let myurl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
      //     + this.env.metadata.BASEURL;
      console.info("HTTP error ", error.status, error.statusText);
      console.dir(error);
      if (error.status) {  // error is type Response -> Fehler auf Server-Seite
        if (error.type === 3) {
          error.status = 500;
        }
        switch (error.status) {  // hier ist kein return noetig
          case 403 :
            window.location.assign(myurl); // zum Start
            break;
          case 401 :
            window.location.assign(myurl); // zum Start
            // window.location.reload();      // aktuelle Seite neu laden
            break;
          default :
            window.location.assign(myurl + "/error.html" + "?base=" + myurl + "&msg=" + error.statusText
                                   + "&stat=" + error.status);
            break;
        }
      }

      // if (error.status === 401 || error.status === 403) {
      //   console.info("HTTP error ", error.status, error.statusText);
      //   window.location.href = window.location.href + '?' + new Date().getMilliseconds();
      // }
      return Observable.throw(error);
    });
    return xhrConnection;
  }

}
