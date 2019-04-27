/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { JwtToken, loginURL } from "@hb42/lib-common";
import { JwtHelperService } from "./jwt-helper.service";
import { LOGON_OPTIONS } from "./logonToken";
/**
 * Anmeldung am Server erledigen und JSONWebToken managen
 *
 * Die Anwendung muss die benoetigte Konfiguration als {\@link LOGON_OPTIONS}-Provider
 * bereitstellen.
 *
 * \@todo Handling fuer Form-Login
 *
 * @see {\@link LOGON_OPTIONS}
 * @see {\@link LogonParameter}
 * @see {\@link LogonInterceptor}
 */
export class LogonService {
    /**
     * @param {?} logonPar
     * @param {?} injector
     * @param {?} jwtHelper
     */
    constructor(logonPar, injector, jwtHelper) {
        this.injector = injector;
        this.jwtHelper = jwtHelper;
        this.dontcheck = false;
        this.urlswithouttoken = [];
        console.debug("c'tor LogonService appName=" + logonPar.appName);
        this.logonPar = logonPar;
        // Ausnahmen, bei denen keinToken geprueft wird
        this.ntlmURL = this.logonPar.NTLMserver + "?app=" + this.logonPar.appName;
        this.loginURL = this.logonPar.webserviceServer + loginURL + "/";
        this.urlswithouttoken.push(this.ntlmURL);
        this.urlswithouttoken.push(this.loginURL);
    }
    /**
     * @return {?}
     */
    get dontCheckNow() {
        return this.dontcheck;
    }
    /**
     * @return {?}
     */
    get active() {
        return this.logonPar.logon !== "NO";
    }
    /**
     * @return {?}
     */
    get ntlm() {
        return this.logonPar.logon === "NTLM";
    }
    /**
     * @return {?}
     */
    get urlsWithoutToken() {
        return this.urlswithouttoken;
    }
    /**
     * Fuer HttpInterceptor Autologin Token holen
     *
     * returns {Promise<string>}
     * @return {?}
     */
    getTokenWithCheck() {
        if (this.dontcheck) { // Token wird gerade geholt -> warten
            console.debug("LogonService: wait for new token");
            return this.waitForToken();
        }
        else if (this.tokenExpiresIn(30)) { // laeuft bald ab -> neues Token
            console.debug("LogonService: tokenExpires - do autologin");
            // wirft im Fehlerfall Error -> evtl. hier Fehlerhandling mit try catch & ErrorService
            // s. default-autologin-jwt-handler
            return this.autoLogin();
        }
        else { // Token als Promise liefern
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                resolve(this.getToken());
            }));
        }
    }
    /**
     * User auto login
     *
     * Fehler bei der Anmeldung wirft eine Exception, darum muss sich
     * die Anwendung kuemmern.
     *
     * returns {Promise<string>} JWT-Token
     * @return {?}
     */
    autoLogin() {
        this.dontcheck = true;
        if (!this.httphandler) {
            this.httphandler = this.getHttp();
        }
        console.debug(">>> AUTO LOGIN");
        console.debug(">>> 1 getting ntlm user");
        return (/** @type {?} */ (this.httphandler.get(this.ntlmURL) // NTLM-Server aufrufen
            .toPromise().then((/**
         * @param {?} tmp
         * @return {?}
         */
        (tmp) => {
            console.debug(">>> 2 success temp-token=" + tmp["token"]);
            console.debug(">>> 3 logging into REST API"); // mit Token webserviceServer aufrufen
            return this.httphandler.get(this.loginURL + tmp["token"])
                .toPromise().then((/**
             * @param {?} jwt
             * @return {?}
             */
            (jwt) => {
                console.debug(">>> 4 result jwt-token=" + jwt["jwt"]);
                if (jwt) {
                    this.setToken(jwt["jwt"]); // in local storage ablegen
                    this.dontcheck = false;
                    return jwt["jwt"];
                }
                else {
                    console.error("*** Login not successful");
                    this.dontcheck = false;
                    throw new Error("Login error - JWT is null");
                }
            }));
        }))));
    }
    /**
     * get JWT payload
     *
     * returns {any}
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const token = this.getToken();
        /** @type {?} */
        let jsonWebToken;
        if (token) {
            jsonWebToken = this.jwtHelper.decodeToken(token);
        }
        return (jsonWebToken ? jsonWebToken.data || {} : {});
    }
    /**
     * Expires token in x seconds?
     *
     * param {number} seconds
     * returns {boolean}
     * @param {?} seconds
     * @return {?}
     */
    tokenExpiresIn(seconds) {
        /** @type {?} */
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
     * returns {string}
     * @return {?}
     */
    getToken() {
        /** @type {?} */
        const token = localStorage.getItem(JwtToken);
        return token ? token : "";
    }
    /**
     * save token to storage
     *
     * param {string} token
     * @param {?} token
     * @return {?}
     */
    setToken(token) {
        // console.debug("save token ");
        localStorage.setItem(JwtToken, token);
    }
    /**
     * delete token
     * @return {?}
     */
    clearToken() {
        localStorage.removeItem(JwtToken);
    }
    /*
        HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
        Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    getHttp() {
        return this.injector.get(HttpClient);
    }
    // Promise erzeugen, das wartet bis ein Token verfuegbar ist
    /**
     * @private
     * @return {?}
     */
    waitForToken() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.timeoutfn(resolve, 10);
        }));
    }
    // rekursive Warteschleife
    /**
     * @private
     * @param {?} resolve
     * @param {?} ms
     * @return {?}
     */
    timeoutfn(resolve, ms) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.dontcheck) {
                this.timeoutfn(resolve, ms);
            }
            else {
                resolve(this.getToken());
            }
        }), ms);
    }
}
LogonService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LogonService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [LOGON_OPTIONS,] }] },
    { type: Injector },
    { type: JwtHelperService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.httphandler;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.logonPar;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.dontcheck;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.urlswithouttoken;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.ntlmURL;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.loginURL;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    LogonService.prototype.jwtHelper;
}
