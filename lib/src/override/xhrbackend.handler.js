/**
 * Created by hb on 07.08.16.
 *
 * HTTP-Errors abfangen und withCredentials setzen
 *
 * s. http://stackoverflow.com/questions/34934009/handling-401s-globally-with-angular-2
 *
 * *** Fuer den Fall, dass so etwas mal gebraucht wird ... ***
 */
//
// import {
//   Injectable,
// } from "@angular/core";
// import {
//   BrowserXhr,
//   Request,
//   Response,
//   ResponseOptions,
//   XHRBackend,
//   XHRConnection,
//   XSRFStrategy,
// } from "@angular/http";
// import {
//     Observable,
// } from "rxjs";
// import "rxjs/add/operator/catch";
//
// /**
//  * -> https://dpopescu.me/2016/10/08/using-http-interceptors-in-angular-2/
//  *    (Ohne @Injectable und ohne c'tor funktioniert's allerdings nicht)
//  *
//  * -> https://github.com/angular/angular/issues/11178
//  *    (falls es Probleme mit AOT gibt)
//  *
//  */
//
// @Injectable()
// export class XHRBackendHandler extends XHRBackend {
//
//   constructor(private browserXhr: BrowserXhr, private baseResponseOptions: ResponseOptions,
//               private xsrfStrategy: XSRFStrategy) {
//     super(browserXhr, baseResponseOptions, xsrfStrategy);
//     console.info("c'tor HttpErrorHandler");
//   }
//
//   /**
//    * error handler
//    *
//    * "normale" Server-Fehler liefern den HTTP-Status in Response.status.
//    * Bei uncaught exception auf Serverseite kommen keine verwertbaren Daten, weil
//    * der x-allow-origin header fehlt, Status ist 200, type ist 3 "error"
//    * -> status 500 liefern
//    *
//    * (RFC 2616: A response has an associated type which is 0"basic", 1"cors", 2"default", 3"error", 4"opaque", or
//    *            5"opaqueredirect". Unless stated otherwise, it is "default". A response whose type is "error" is
//    *            known as a network error.)
//    *
//    * Server liefert 403 Forbidden, wenn Userberechtigung fehlt -> app reset, ein unberechtigter call haette schon
//    *                                                              auf app-Seite verhindert werden muessen
//    *
//    * Server liefert 401 Unauthorized wenn SessinID invalid -> reload, das duerfte i.d.R. ein Sessionablauf sein
//    *
//    * die restlichen 4xx und 5xx sollten auf einer Fehlerseite landen
//    */
//   public createConnection(request: Request): XHRConnection {
//     /*
//      * Fuer alle Requests "withCredentials" setzen, sonst wird der Session-Cookie
//      * nicht mitgeschickt.
//      * [ Alternativ fuer jeden Request setzen: .get(url, {withCredentials: true}) ]
//      */
//     request.withCredentials = true;
//     const xhrConnection: XHRConnection = super.createConnection(request);
//
//     xhrConnection.response = xhrConnection.response.catch((error: Response) => {
//       // base href -> wird zum vollstaendigen Pfad erweitert
//     //  const myurl = document.getElementsByTagName("base")[0]["href"];
//       // let myurl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port
//       //     + this.env.metadata.BASEURL;
//       console.info("HTTP error ", error.status, error.statusText);
//       console.dir(error);
//       if (error.status) {  // error is type Response -> Fehler auf Server-Seite
//         if (error.type === 3) {
//           error.status = 500;
//         }
//         // die Anwendung muss eine Fehlerseite mit zwei Parametern bereitstellen
//         window.location.assign("/#/error/" + error.status + "/"
//                                     + decodeURIComponent(error.statusText || "-"));
//         // switch (error.status) {  // hier ist kein return noetig
//         //   case 403 :
//         //     window.location.assign("/#/error/403"); // zum Start
//         //     break;
//         //   case 401 :
//         //     window.location.assign("/#/error/401"); // zum Start
//         //     // window.location.reload();      // aktuelle Seite neu laden
//         //     break;
//         //   default :
//         //     window.location.assign("/#/error/" + error.status + "/" + error.statusText);
//         //     // window.location.assign(myurl + "/error.html" + "?base=" + myurl + "&msg=" + error.statusText
//         //     //                        + "&stat=" + error.status);
//         //     break;
//         // }
//       }
//
//       // if (error.status === 401 || error.status === 403) {
//       //   console.info("HTTP error ", error.status, error.statusText);
//       //   window.location.href = window.location.href + '?' + new Date().getMilliseconds();
//       // }
//       return Observable.throw(error);
//     });
//     return xhrConnection;
//   }
//
// }
//# sourceMappingURL=xhrbackend.handler.js.map