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
 * todo Handling fuer Form-Login
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2xvZ29uL2xvZ29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBZTdDLE1BQU0sT0FBTyxZQUFZOzs7Ozs7SUF1QnZCLFlBQW1DLFFBQXdCLEVBQ3ZDLFFBQWtCLEVBQ2xCLFNBQTJCO1FBRDNCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFyQnZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBcUJ0QyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDaEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUks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UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFhLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUdPLFlBQVk7UUFDbEIsT0FBTyxJQUFJLE9BQU87Ozs7UUFBUyxDQUFDLE9BQWdDLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU8sU0FBUyxDQUFDLE9BQWdDLEVBQUUsRUFBVTtRQUM1RCxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQztJQUVULENBQUM7OztZQTdLRixVQUFVOzs7OzRDQXdCSSxNQUFNLFNBQUMsYUFBYTtZQTVDTixRQUFRO1lBRzVCLGdCQUFnQjs7Ozs7OztJQW9CdkIsbUNBQWdDOzs7OztJQUNoQyxnQ0FBaUM7Ozs7O0lBQ2pDLGlDQUEwQjs7Ozs7SUFDMUIsd0NBQXdDOzs7OztJQUV4QywrQkFBaUM7Ozs7O0lBQ2pDLGdDQUFrQzs7Ozs7SUFnQnRCLGdDQUEwQjs7Ozs7SUFDMUIsaUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEp3dFRva2VuLCBsb2dpblVSTCB9IGZyb20gXCJAaGI0Mi9saWItY29tbW9uXCI7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSBcIi4vand0LWhlbHBlci5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IExvZ29uUGFyYW1ldGVyIH0gZnJvbSBcIi4vbG9nb24ucGFyYW1ldGVyXCI7XG5pbXBvcnQgeyBMT0dPTl9PUFRJT05TIH0gZnJvbSBcIi4vbG9nb25Ub2tlblwiO1xuXG4vKipcbiAqIEFubWVsZHVuZyBhbSBTZXJ2ZXIgZXJsZWRpZ2VuIHVuZCBKU09OV2ViVG9rZW4gbWFuYWdlblxuICpcbiAqIERpZSBBbndlbmR1bmcgbXVzcyBkaWUgYmVub2V0aWd0ZSBLb25maWd1cmF0aW9uIGFscyB7QGxpbmsgTE9HT05fT1BUSU9OU30tUHJvdmlkZXJcbiAqIGJlcmVpdHN0ZWxsZW4uXG4gKlxuICogdG9kbyBIYW5kbGluZyBmdWVyIEZvcm0tTG9naW5cbiAqXG4gKiBAc2VlIHtAbGluayBMT0dPTl9PUFRJT05TfVxuICogQHNlZSB7QGxpbmsgTG9nb25QYXJhbWV0ZXJ9XG4gKiBAc2VlIHtAbGluayBMb2dvbkludGVyY2VwdG9yfVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nb25TZXJ2aWNlIHtcblxuICBwcml2YXRlIGh0dHBoYW5kbGVyOiBIdHRwQ2xpZW50O1xuICBwcml2YXRlIGxvZ29uUGFyOiBMb2dvblBhcmFtZXRlcjtcbiAgcHJpdmF0ZSBkb250Y2hlY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSB1cmxzd2l0aG91dHRva2VuOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbnRsbVVSTDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvZ2luVVJMOiBzdHJpbmc7XG5cbiAgcHVibGljIGdldCBkb250Q2hlY2tOb3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZG9udGNoZWNrO1xuICB9XG4gIHB1YmxpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxvZ29uUGFyLmxvZ29uICE9PSBcIk5PXCI7XG4gIH1cbiAgcHVibGljIGdldCBudGxtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxvZ29uUGFyLmxvZ29uID09PSBcIk5UTE1cIjtcbiAgfVxuICBwdWJsaWMgZ2V0IHVybHNXaXRob3V0VG9rZW4oKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnVybHN3aXRob3V0dG9rZW47XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPR09OX09QVElPTlMpIGxvZ29uUGFyOiBMb2dvblBhcmFtZXRlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgand0SGVscGVyOiBKd3RIZWxwZXJTZXJ2aWNlKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcImMndG9yIExvZ29uU2VydmljZSBhcHBOYW1lPVwiICsgbG9nb25QYXIuYXBwTmFtZSk7XG4gICAgdGhpcy5sb2dvblBhciA9IGxvZ29uUGFyO1xuICAgIC8vIEF1c25haG1lbiwgYmVpIGRlbmVuIGtlaW5Ub2tlbiBnZXBydWVmdCB3aXJkXG4gICAgdGhpcy5udGxtVVJMID0gdGhpcy5sb2dvblBhci5OVExNc2VydmVyICsgXCI/YXBwPVwiICsgdGhpcy5sb2dvblBhci5hcHBOYW1lO1xuICAgIHRoaXMubG9naW5VUkwgPSB0aGlzLmxvZ29uUGFyLndlYnNlcnZpY2VTZXJ2ZXIgKyBsb2dpblVSTCArIFwiL1wiO1xuICAgIHRoaXMudXJsc3dpdGhvdXR0b2tlbi5wdXNoKHRoaXMubnRsbVVSTCk7XG4gICAgdGhpcy51cmxzd2l0aG91dHRva2VuLnB1c2godGhpcy5sb2dpblVSTCk7XG4gIH1cblxuICAvKipcbiAgICogRnVlciBIdHRwSW50ZXJjZXB0b3IgQXV0b2xvZ2luIFRva2VuIGhvbGVuXG4gICAqXG4gICAqIHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbldpdGhDaGVjaygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICh0aGlzLmRvbnRjaGVjaykgeyAgLy8gVG9rZW4gd2lyZCBnZXJhZGUgZ2Vob2x0IC0+IHdhcnRlblxuICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvZ29uU2VydmljZTogd2FpdCBmb3IgbmV3IHRva2VuXCIpO1xuICAgICAgcmV0dXJuIHRoaXMud2FpdEZvclRva2VuKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRva2VuRXhwaXJlc0luKDMwKSkgeyAgLy8gbGFldWZ0IGJhbGQgYWIgLT4gbmV1ZXMgVG9rZW5cbiAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2dvblNlcnZpY2U6IHRva2VuRXhwaXJlcyAtIGRvIGF1dG9sb2dpblwiKTtcbiAgICAgIC8vIHdpcmZ0IGltIEZlaGxlcmZhbGwgRXJyb3IgLT4gZXZ0bC4gaGllciBGZWhsZXJoYW5kbGluZyBtaXQgdHJ5IGNhdGNoICYgRXJyb3JTZXJ2aWNlXG4gICAgICAvLyBzLiBkZWZhdWx0LWF1dG9sb2dpbi1qd3QtaGFuZGxlclxuICAgICAgcmV0dXJuIHRoaXMuYXV0b0xvZ2luKCk7XG4gICAgfSBlbHNlIHsgIC8vIFRva2VuIGFscyBQcm9taXNlIGxpZWZlcm5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmdldFRva2VuKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgYXV0byBsb2dpblxuICAgKlxuICAgKiBGZWhsZXIgYmVpIGRlciBBbm1lbGR1bmcgd2lyZnQgZWluZSBFeGNlcHRpb24sIGRhcnVtIG11c3Mgc2ljaFxuICAgKiBkaWUgQW53ZW5kdW5nIGt1ZW1tZXJuLlxuICAgKlxuICAgKiByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEpXVC1Ub2tlblxuICAgKi9cbiAgcHVibGljIGF1dG9Mb2dpbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRoaXMuZG9udGNoZWNrID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuaHR0cGhhbmRsZXIpIHtcbiAgICAgIHRoaXMuaHR0cGhhbmRsZXIgPSB0aGlzLmdldEh0dHAoKTtcbiAgICB9XG4gICAgY29uc29sZS5kZWJ1ZyhcIj4+PiBBVVRPIExPR0lOXCIpO1xuICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gMSBnZXR0aW5nIG50bG0gdXNlclwiKTtcbiAgICByZXR1cm4gdGhpcy5odHRwaGFuZGxlci5nZXQodGhpcy5udGxtVVJMKSAgLy8gTlRMTS1TZXJ2ZXIgYXVmcnVmZW5cbiAgICAgIC50b1Byb21pc2UoKS50aGVuKCh0bXA6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiPj4+IDIgc3VjY2VzcyB0ZW1wLXRva2VuPVwiICsgdG1wW1widG9rZW5cIl0pO1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiPj4+IDMgbG9nZ2luZyBpbnRvIFJFU1QgQVBJXCIpOyAgICAgICAgICAgICAgICAgLy8gbWl0IFRva2VuIHdlYnNlcnZpY2VTZXJ2ZXIgYXVmcnVmZW5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cGhhbmRsZXIuZ2V0KHRoaXMubG9naW5VUkwgKyB0bXBbXCJ0b2tlblwiXSlcbiAgICAgICAgICAudG9Qcm9taXNlKCkudGhlbigoand0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gNCByZXN1bHQgand0LXRva2VuPVwiICsgand0W1wiand0XCJdKTtcbiAgICAgICAgICAgIGlmIChqd3QpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRUb2tlbihqd3RbXCJqd3RcIl0pOyAgICAgICAgICAgICAgICAgLy8gaW4gbG9jYWwgc3RvcmFnZSBhYmxlZ2VuXG4gICAgICAgICAgICAgIHRoaXMuZG9udGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBqd3RbXCJqd3RcIl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiKioqIExvZ2luIG5vdCBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgICB0aGlzLmRvbnRjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBlcnJvciAtIEpXVCBpcyBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSkgYXMgUHJvbWlzZTxzdHJpbmc+O1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBKV1QgcGF5bG9hZFxuICAgKlxuICAgKiByZXR1cm5zIHthbnl9XG4gICAqL1xuICBwdWJsaWMgZ2V0RGF0YSgpOiBhbnkge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgIGxldCBqc29uV2ViVG9rZW46IGFueTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGpzb25XZWJUb2tlbiA9IHRoaXMuand0SGVscGVyLmRlY29kZVRva2VuKHRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIChqc29uV2ViVG9rZW4gPyBqc29uV2ViVG9rZW4uZGF0YSB8fCB7fSA6IHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBpcmVzIHRva2VuIGluIHggc2Vjb25kcz9cbiAgICpcbiAgICogcGFyYW0ge251bWJlcn0gc2Vjb25kc1xuICAgKiByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIHRva2VuRXhwaXJlc0luKHNlY29uZHM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgLy8gY29uc3Qgand0SGVscGVyID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICAgIHJldHVybiB0aGlzLmp3dEhlbHBlci5pc1Rva2VuRXhwaXJlZCh0b2tlbiwgc2Vjb25kcyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBUb2tlbiBmcm9tIHN0b3JhZ2VcbiAgICpcbiAgICogcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIGdldFRva2VuKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShKd3RUb2tlbik7XG4gICAgcmV0dXJuIHRva2VuID8gdG9rZW4gOiBcIlwiO1xuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgdG9rZW4gdG8gc3RvcmFnZVxuICAgKlxuICAgKiBwYXJhbSB7c3RyaW5nfSB0b2tlblxuICAgKi9cbiAgcHVibGljIHNldFRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwic2F2ZSB0b2tlbiBcIik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oSnd0VG9rZW4sIHRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWxldGUgdG9rZW5cbiAgICovXG4gIHB1YmxpYyBjbGVhclRva2VuKCk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEp3dFRva2VuKTtcbiAgfVxuXG4gIC8qXG4gICAgSHR0cENsaWVudCBrYW5uIG5pY2h0IHBlciBESSBnZWhvbHQgd2VyZGVuLCBkYSBkYXMgZWluZSB6eWtsaXNjaGUgQWJoYWVuZ2lna2VpdCBpbSBBcHBNb2R1bGUgYXVzbG9lc3RcbiAgICBXZW5uIEh0dHBDbGllbnQgc3BhZXRlciBnZWhvbHQgd2lyZCwgZ2lidCBlcyBrZWluZSBQcm9ibGVtZS4gRW50c3ByaWNodCBuaWNodCBkZXIgcmVpbmVuIExlaHJlIC0+IHdlbm4gbWFsIFplaXQgaXN0XG4gICAgLT4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzk3NjcwMTlcbiAgICovXG4gIHByaXZhdGUgZ2V0SHR0cCgpOiBIdHRwQ2xpZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQ8SHR0cENsaWVudD4oSHR0cENsaWVudCk7XG4gIH1cblxuICAvLyBQcm9taXNlIGVyemV1Z2VuLCBkYXMgd2FydGV0IGJpcyBlaW4gVG9rZW4gdmVyZnVlZ2JhciBpc3RcbiAgcHJpdmF0ZSB3YWl0Rm9yVG9rZW4oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZTogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICAgIHRoaXMudGltZW91dGZuKHJlc29sdmUsIDEwKTtcbiAgICB9KTtcbiAgfVxuICAvLyByZWt1cnNpdmUgV2FydGVzY2hsZWlmZVxuICBwcml2YXRlIHRpbWVvdXRmbihyZXNvbHZlOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCwgbXM6IG51bWJlcikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZG9udGNoZWNrKSB7XG4gICAgICAgIHRoaXMudGltZW91dGZuKHJlc29sdmUsIG1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodGhpcy5nZXRUb2tlbigpKTtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG5cbiAgfVxuXG59XG4iXX0=