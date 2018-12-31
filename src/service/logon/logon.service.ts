import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";

import { JwtToken, loginURL } from "@hb42/lib-common";
import { JwtHelperService } from "./jwt-helper.service";

import { LogonParameter } from "./logon.parameter";
import { LOGON_OPTIONS } from "./logonToken";

/**
 * Anmeldung am Server erledigen und JSONWebToken managen
 *
 * Die Anwendung muss die benoetigte Konfiguration als {@link LOGON_OPTIONS}-Provider
 * bereitstellen.
 *
 * @todo Handling fuer Form-Login
 *
 * @see {@link LOGON_OPTIONS}
 * @see {@link LogonParameter}
 * @see {@link LogonInterceptor}
 */
@Injectable()
export class LogonService {

  private httphandler: HttpClient;
  private logonPar: LogonParameter;
  private dontcheck = false;
  private urlswithouttoken: string[] = [];

  private readonly ntlmURL: string;
  private readonly loginURL: string;

  public get dontCheckNow(): boolean {
    return this.dontcheck;
  }
  public get active(): boolean {
    return this.logonPar.logon !== "NO";
  }
  public get ntlm(): boolean {
    return this.logonPar.logon === "NTLM";
  }
  public get urlsWithoutToken(): string[] {
    return this.urlswithouttoken;
  }

  constructor(@Inject(LOGON_OPTIONS) logonPar: LogonParameter,
              private injector: Injector,
              private jwtHelper: JwtHelperService) {
    console.debug("c'tor LogonService appName=" + logonPar.appName);
    this.logonPar = logonPar;
    // Ausnahmen, bei denen keinToken geprueft wird
    this.ntlmURL = this.logonPar.NTLMserver + "?app=" + this.logonPar.appName;
    this.loginURL = this.logonPar.webserviceServer + loginURL + "/";
    this.urlswithouttoken.push(this.ntlmURL);
    this.urlswithouttoken.push(this.loginURL);
  }

  /**
   * Fuer HttpInterceptor Autologin Token holen
   *
   * @returns {Promise<string>}
   */
  public getTokenWithCheck(): Promise<string> {
    // if (!this.ntlm) {
    //   return null;
    // }
    console.debug("LogonService: getTokenWithCheck");
    if (this.dontcheck) {  // Token wird gerade geholt -> warten
      console.debug("LogonService: wait for new token");
      return this.waitForToken();
    } else if (this.tokenExpiresIn(30)) {  // laeuft bald ab -> neues Token
      console.debug("LogonService: tokenExpires - do autologin");
      // wirft im Fehlerfall Error -> evtl. hier Fehlerhandling mit try catch & ErrorService
      // s. default-autologin-jwt-handler
      return this.autoLogin();
    } else {  // Token als Promise liefern
      return new Promise<string>((resolve, reject) => {
        resolve(this.getToken());
      });
    }
  }

  /**
   * User auto login
   *
   * Fehler bei der Anmeldung wirft eine Exception, darum muss sich
   * die Anwendung kuemmern.
   *
   * @returns {Promise<string>} JWT-Token
   */
  public autoLogin(): Promise<string> {
    this.dontcheck = true;
    if (!this.httphandler) {
      this.httphandler = this.getHttp();
    }
    console.debug(">>> AUTO LOGIN");
    console.debug(">>> 1 getting ntlm user");
    return this.httphandler.get(this.ntlmURL)  // NTLM-Server aufrufen
      .toPromise().then((tmp: any) => {
        console.debug(">>> 2 success temp-token=" + tmp["token"]);
        console.debug(">>> 3 logging into REST API");                 // mit Token webserviceServer aufrufen
        return this.httphandler.get(this.loginURL + tmp["token"])
          .toPromise().then((jwt: any) => {
            console.debug(">>> 4 result jwt-token=" + jwt["jwt"]);
            if (jwt) {
              this.setToken(jwt["jwt"]);                 // in local storage ablegen
              this.dontcheck = false;
              return jwt["jwt"];
            } else {
              console.error("*** Login not successful");
              this.dontcheck = false;
              throw new Error("Login error - JWT is null");
            }
          });
      }) as Promise<string>;
  }

  /**
   * get JWT payload
   *
   * @returns {any}
   */
  public getData(): any {
    const token = this.getToken();
    let jsonWebToken: any;
    if (token) {
      jsonWebToken = this.jwtHelper.decodeToken(token);
    }
    return (jsonWebToken ? jsonWebToken.data || {} : {});
  }

  /**
   * Expires token in x seconds?
   *
   * @param {number} seconds
   * @returns {boolean}
   */
  public tokenExpiresIn(seconds: number): boolean {
    const token = this.getToken();
    if (token) {
      // const jwtHelper = new JwtHelperService();
      return this.jwtHelper.isTokenExpired(token, seconds);
    }
    return true;
  }

  /**
   * get Token from storage
   *
   * @returns {string}
   */
  public getToken(): string {
    const token = localStorage.getItem(JwtToken);
    return token ? token : "";
  }

  /**
   * save token to storage
   *
   * @param {string} token
   */
  public setToken(token: string) {
    // console.debug("save token ");
    localStorage.setItem(JwtToken, token);
  }

  /**
   * delete token
   */
  public clearToken(): void {
    localStorage.removeItem(JwtToken);
  }

  /*
    HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
    Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
    -> https://stackoverflow.com/questions/39767019
   */
  private getHttp(): HttpClient {
    return this.injector.get<HttpClient>(HttpClient);
  }

  // Promise erzeugen, das wartet bis ein Token verfuegbar ist
  private waitForToken(): Promise<string> {
    return new Promise<string>((resolve: (token: string) => void) => {
      this.timeoutfn(resolve, 10);
    });
  }
  // rekursive Warteschleife
  private timeoutfn(resolve: (token: string) => void, ms: number) {
    setTimeout(() => {
      if (this.dontcheck) {
        this.timeoutfn(resolve, ms);
      } else {
        resolve(this.getToken());
      }
    }, ms);

  }

}
