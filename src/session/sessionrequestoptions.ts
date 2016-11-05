/**
 * Created by hb on 27.06.16.
 */

import {Injectable} from "@angular/core";
import {
    BaseRequestOptions,
    Headers,
    RequestOptions,
    RequestOptionsArgs,
} from "@angular/http";

// wird beim Start vom IIS per NTLM geholt und als globale var eingetragen
declare var SESSION_ID: string;
export const SessionID = "SID"; // *DEBUG* SESSION_ID; // lokal speichern
// SESSION_ID = undefined; // globale var loeschen

export const SESSION_HEADER = "x-session-id";

/*
 custom header fuer das Session-Handling setzen

 s. source
 https://github.com/angular/angular/blob/master/modules/%40angular/http/src/base_request_options.ts

 fuer BaseRequestOptions funktioniert derzeit kein DI
 -> https://github.com/angular/angular/issues/8925

 */
@Injectable()
export class SessionRequestOptions extends BaseRequestOptions {
  // constructor() {
  // }

  public merge(options?: RequestOptionsArgs): RequestOptions {
    let headers: Headers = options.headers ? options.headers : this.headers;
    if (!headers) {
      headers = new Headers();
    }
    headers.set(SESSION_HEADER, SessionID);
    options.headers = headers;
    return super.merge(options);
  }

}
