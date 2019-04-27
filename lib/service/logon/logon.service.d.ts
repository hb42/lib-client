import { Injector } from "@angular/core";
import { JwtHelperService } from "./jwt-helper.service";
import { LogonParameter } from "./logon.parameter";
/**
 * Anmeldung am Server erledigen und JSONWebToken managen
 *
 * Die Anwendung muss die benoetigte Konfiguration als {@link LOGON_OPTIONS}-Provider
 * bereitstellen.
 *
 * todo Handling fuer Form-Login
 *
 * @see {@link LOGON_OPTIONS}
 * @see {@link LogonParameter}
 * @see {@link LogonInterceptor}
 */
export declare class LogonService {
    private injector;
    private jwtHelper;
    private httphandler;
    private logonPar;
    private dontcheck;
    private urlswithouttoken;
    private readonly ntlmURL;
    private readonly loginURL;
    readonly dontCheckNow: boolean;
    readonly active: boolean;
    readonly ntlm: boolean;
    readonly urlsWithoutToken: string[];
    constructor(logonPar: LogonParameter, injector: Injector, jwtHelper: JwtHelperService);
    /**
     * Fuer HttpInterceptor Autologin Token holen
     *
     * returns {Promise<string>}
     */
    getTokenWithCheck(): Promise<string>;
    /**
     * User auto login
     *
     * Fehler bei der Anmeldung wirft eine Exception, darum muss sich
     * die Anwendung kuemmern.
     *
     * returns {Promise<string>} JWT-Token
     */
    autoLogin(): Promise<string>;
    /**
     * get JWT payload
     *
     * returns {any}
     */
    getData(): any;
    /**
     * Expires token in x seconds?
     *
     * param {number} seconds
     * returns {boolean}
     */
    tokenExpiresIn(seconds: number): boolean;
    /**
     * get Token from storage
     *
     * returns {string}
     */
    getToken(): string;
    /**
     * save token to storage
     *
     * param {string} token
     */
    setToken(token: string): void;
    /**
     * delete token
     */
    clearToken(): void;
    private getHttp;
    private waitForToken;
    private timeoutfn;
}
