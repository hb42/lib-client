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
var LogonService = /** @class */ (function () {
    function LogonService(logonPar, injector, jwtHelper) {
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
    Object.defineProperty(LogonService.prototype, "dontCheckNow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dontcheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogonService.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this.logonPar.logon !== "NO";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogonService.prototype, "ntlm", {
        get: /**
         * @return {?}
         */
        function () {
            return this.logonPar.logon === "NTLM";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogonService.prototype, "urlsWithoutToken", {
        get: /**
         * @return {?}
         */
        function () {
            return this.urlswithouttoken;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Fuer HttpInterceptor Autologin Token holen
     *
     * returns {Promise<string>}
     */
    /**
     * Fuer HttpInterceptor Autologin Token holen
     *
     * returns {Promise<string>}
     * @return {?}
     */
    LogonService.prototype.getTokenWithCheck = /**
     * Fuer HttpInterceptor Autologin Token holen
     *
     * returns {Promise<string>}
     * @return {?}
     */
    function () {
        var _this = this;
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
            function (resolve, reject) {
                resolve(_this.getToken());
            }));
        }
    };
    /**
     * User auto login
     *
     * Fehler bei der Anmeldung wirft eine Exception, darum muss sich
     * die Anwendung kuemmern.
     *
     * returns {Promise<string>} JWT-Token
     */
    /**
     * User auto login
     *
     * Fehler bei der Anmeldung wirft eine Exception, darum muss sich
     * die Anwendung kuemmern.
     *
     * returns {Promise<string>} JWT-Token
     * @return {?}
     */
    LogonService.prototype.autoLogin = /**
     * User auto login
     *
     * Fehler bei der Anmeldung wirft eine Exception, darum muss sich
     * die Anwendung kuemmern.
     *
     * returns {Promise<string>} JWT-Token
     * @return {?}
     */
    function () {
        var _this = this;
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
        function (tmp) {
            console.debug(">>> 2 success temp-token=" + tmp["token"]);
            console.debug(">>> 3 logging into REST API"); // mit Token webserviceServer aufrufen
            return _this.httphandler.get(_this.loginURL + tmp["token"])
                .toPromise().then((/**
             * @param {?} jwt
             * @return {?}
             */
            function (jwt) {
                console.debug(">>> 4 result jwt-token=" + jwt["jwt"]);
                if (jwt) {
                    _this.setToken(jwt["jwt"]); // in local storage ablegen
                    _this.dontcheck = false;
                    return jwt["jwt"];
                }
                else {
                    console.error("*** Login not successful");
                    _this.dontcheck = false;
                    throw new Error("Login error - JWT is null");
                }
            }));
        }))));
    };
    /**
     * get JWT payload
     *
     * returns {any}
     */
    /**
     * get JWT payload
     *
     * returns {any}
     * @return {?}
     */
    LogonService.prototype.getData = /**
     * get JWT payload
     *
     * returns {any}
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = this.getToken();
        /** @type {?} */
        var jsonWebToken;
        if (token) {
            jsonWebToken = this.jwtHelper.decodeToken(token);
        }
        return (jsonWebToken ? jsonWebToken.data || {} : {});
    };
    /**
     * Expires token in x seconds?
     *
     * param {number} seconds
     * returns {boolean}
     */
    /**
     * Expires token in x seconds?
     *
     * param {number} seconds
     * returns {boolean}
     * @param {?} seconds
     * @return {?}
     */
    LogonService.prototype.tokenExpiresIn = /**
     * Expires token in x seconds?
     *
     * param {number} seconds
     * returns {boolean}
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        /** @type {?} */
        var token = this.getToken();
        if (token) {
            // const jwtHelper = new JwtHelperService();
            return this.jwtHelper.isTokenExpired(token, seconds);
        }
        return true;
    };
    /**
     * get Token from storage
     *
     * returns {string}
     */
    /**
     * get Token from storage
     *
     * returns {string}
     * @return {?}
     */
    LogonService.prototype.getToken = /**
     * get Token from storage
     *
     * returns {string}
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = localStorage.getItem(JwtToken);
        return token ? token : "";
    };
    /**
     * save token to storage
     *
     * param {string} token
     */
    /**
     * save token to storage
     *
     * param {string} token
     * @param {?} token
     * @return {?}
     */
    LogonService.prototype.setToken = /**
     * save token to storage
     *
     * param {string} token
     * @param {?} token
     * @return {?}
     */
    function (token) {
        // console.debug("save token ");
        localStorage.setItem(JwtToken, token);
    };
    /**
     * delete token
     */
    /**
     * delete token
     * @return {?}
     */
    LogonService.prototype.clearToken = /**
     * delete token
     * @return {?}
     */
    function () {
        localStorage.removeItem(JwtToken);
    };
    /*
      HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
      Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    /*
        HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
        Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    LogonService.prototype.getHttp = /*
        HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
        Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    function () {
        return this.injector.get(HttpClient);
    };
    // Promise erzeugen, das wartet bis ein Token verfuegbar ist
    // Promise erzeugen, das wartet bis ein Token verfuegbar ist
    /**
     * @private
     * @return {?}
     */
    LogonService.prototype.waitForToken = 
    // Promise erzeugen, das wartet bis ein Token verfuegbar ist
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.timeoutfn(resolve, 10);
        }));
    };
    // rekursive Warteschleife
    // rekursive Warteschleife
    /**
     * @private
     * @param {?} resolve
     * @param {?} ms
     * @return {?}
     */
    LogonService.prototype.timeoutfn = 
    // rekursive Warteschleife
    /**
     * @private
     * @param {?} resolve
     * @param {?} ms
     * @return {?}
     */
    function (resolve, ms) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.dontcheck) {
                _this.timeoutfn(resolve, ms);
            }
            else {
                resolve(_this.getToken());
            }
        }), ms);
    };
    LogonService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LogonService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [LOGON_OPTIONS,] }] },
        { type: Injector },
        { type: JwtHelperService }
    ]; };
    return LogonService;
}());
export { LogonService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2xvZ29uL2xvZ29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBYzdDO0lBd0JFLHNCQUFtQyxRQUF3QixFQUN2QyxRQUFrQixFQUNsQixTQUEyQjtRQUQzQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBckJ2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQXFCdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8s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Q2pDLGlDQUEwQjs7Ozs7SUFDMUIsd0NBQXdDOzs7OztJQUV4QywrQkFBaUM7Ozs7O0lBQ2pDLGdDQUFrQzs7Ozs7SUFnQnRCLGdDQUEwQjs7Ozs7SUFDMUIsaUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEp3dFRva2VuLCBsb2dpblVSTCB9IGZyb20gXCJAaGI0Mi9saWItY29tbW9uXCI7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSBcIi4vand0LWhlbHBlci5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IExvZ29uUGFyYW1ldGVyIH0gZnJvbSBcIi4vbG9nb24ucGFyYW1ldGVyXCI7XG5pbXBvcnQgeyBMT0dPTl9PUFRJT05TIH0gZnJvbSBcIi4vbG9nb25Ub2tlblwiO1xuXG4vKipcbiAqIEFubWVsZHVuZyBhbSBTZXJ2ZXIgZXJsZWRpZ2VuIHVuZCBKU09OV2ViVG9rZW4gbWFuYWdlblxuICpcbiAqIERpZSBBbndlbmR1bmcgbXVzcyBkaWUgYmVub2V0aWd0ZSBLb25maWd1cmF0aW9uIGFscyB7QGxpbmsgTE9HT05fT1BUSU9OU30tUHJvdmlkZXJcbiAqIGJlcmVpdHN0ZWxsZW4uXG4gKlxuICogdG9kbyBIYW5kbGluZyBmdWVyIEZvcm0tTG9naW5cbiAqXG4gKiBAc2VlIHtAbGluayBMT0dPTl9PUFRJT05TfVxuICogQHNlZSB7QGxpbmsgTG9nb25QYXJhbWV0ZXJ9XG4gKiBAc2VlIHtAbGluayBMb2dvbkludGVyY2VwdG9yfVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9nb25TZXJ2aWNlIHtcblxuICBwcml2YXRlIGh0dHBoYW5kbGVyOiBIdHRwQ2xpZW50O1xuICBwcml2YXRlIGxvZ29uUGFyOiBMb2dvblBhcmFtZXRlcjtcbiAgcHJpdmF0ZSBkb250Y2hlY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSB1cmxzd2l0aG91dHRva2VuOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbnRsbVVSTDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvZ2luVVJMOiBzdHJpbmc7XG5cbiAgcHVibGljIGdldCBkb250Q2hlY2tOb3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZG9udGNoZWNrO1xuICB9XG4gIHB1YmxpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxvZ29uUGFyLmxvZ29uICE9PSBcIk5PXCI7XG4gIH1cbiAgcHVibGljIGdldCBudGxtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxvZ29uUGFyLmxvZ29uID09PSBcIk5UTE1cIjtcbiAgfVxuICBwdWJsaWMgZ2V0IHVybHNXaXRob3V0VG9rZW4oKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnVybHN3aXRob3V0dG9rZW47XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPR09OX09QVElPTlMpIGxvZ29uUGFyOiBMb2dvblBhcmFtZXRlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHByaXZhdGUgand0SGVscGVyOiBKd3RIZWxwZXJTZXJ2aWNlKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcImMndG9yIExvZ29uU2VydmljZSBhcHBOYW1lPVwiICsgbG9nb25QYXIuYXBwTmFtZSk7XG4gICAgdGhpcy5sb2dvblBhciA9IGxvZ29uUGFyO1xuICAgIC8vIEF1c25haG1lbiwgYmVpIGRlbmVuIGtlaW5Ub2tlbiBnZXBydWVmdCB3aXJkXG4gICAgdGhpcy5udGxtVVJMID0gdGhpcy5sb2dvblBhci5OVExNc2VydmVyICsgXCI/YXBwPVwiICsgdGhpcy5sb2dvblBhci5hcHBOYW1lO1xuICAgIHRoaXMubG9naW5VUkwgPSB0aGlzLmxvZ29uUGFyLndlYnNlcnZpY2VTZXJ2ZXIgKyBsb2dpblVSTCArIFwiL1wiO1xuICAgIHRoaXMudXJsc3dpdGhvdXR0b2tlbi5wdXNoKHRoaXMubnRsbVVSTCk7XG4gICAgdGhpcy51cmxzd2l0aG91dHRva2VuLnB1c2godGhpcy5sb2dpblVSTCk7XG4gIH1cblxuICAvKipcbiAgICogRnVlciBIdHRwSW50ZXJjZXB0b3IgQXV0b2xvZ2luIFRva2VuIGhvbGVuXG4gICAqXG4gICAqIHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbldpdGhDaGVjaygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICh0aGlzLmRvbnRjaGVjaykgeyAgLy8gVG9rZW4gd2lyZCBnZXJhZGUgZ2Vob2x0IC0+IHdhcnRlblxuICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvZ29uU2VydmljZTogd2FpdCBmb3IgbmV3IHRva2VuXCIpO1xuICAgICAgcmV0dXJuIHRoaXMud2FpdEZvclRva2VuKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRva2VuRXhwaXJlc0luKDMwKSkgeyAgLy8gbGFldWZ0IGJhbGQgYWIgLT4gbmV1ZXMgVG9rZW5cbiAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2dvblNlcnZpY2U6IHRva2VuRXhwaXJlcyAtIGRvIGF1dG9sb2dpblwiKTtcbiAgICAgIC8vIHdpcmZ0IGltIEZlaGxlcmZhbGwgRXJyb3IgLT4gZXZ0bC4gaGllciBGZWhsZXJoYW5kbGluZyBtaXQgdHJ5IGNhdGNoICYgRXJyb3JTZXJ2aWNlXG4gICAgICAvLyBzLiBkZWZhdWx0LWF1dG9sb2dpbi1qd3QtaGFuZGxlclxuICAgICAgcmV0dXJuIHRoaXMuYXV0b0xvZ2luKCk7XG4gICAgfSBlbHNlIHsgIC8vIFRva2VuIGFscyBQcm9taXNlIGxpZWZlcm5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmdldFRva2VuKCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgYXV0byBsb2dpblxuICAgKlxuICAgKiBGZWhsZXIgYmVpIGRlciBBbm1lbGR1bmcgd2lyZnQgZWluZSBFeGNlcHRpb24sIGRhcnVtIG11c3Mgc2ljaFxuICAgKiBkaWUgQW53ZW5kdW5nIGt1ZW1tZXJuLlxuICAgKlxuICAgKiByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEpXVC1Ub2tlblxuICAgKi9cbiAgcHVibGljIGF1dG9Mb2dpbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRoaXMuZG9udGNoZWNrID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuaHR0cGhhbmRsZXIpIHtcbiAgICAgIHRoaXMuaHR0cGhhbmRsZXIgPSB0aGlzLmdldEh0dHAoKTtcbiAgICB9XG4gICAgY29uc29sZS5kZWJ1ZyhcIj4+PiBBVVRPIExPR0lOXCIpO1xuICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gMSBnZXR0aW5nIG50bG0gdXNlclwiKTtcbiAgICByZXR1cm4gdGhpcy5odHRwaGFuZGxlci5nZXQodGhpcy5udGxtVVJMKSAgLy8gTlRMTS1TZXJ2ZXIgYXVmcnVmZW5cbiAgICAgIC50b1Byb21pc2UoKS50aGVuKCh0bXA6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiPj4+IDIgc3VjY2VzcyB0ZW1wLXRva2VuPVwiICsgdG1wW1widG9rZW5cIl0pO1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiPj4+IDMgbG9nZ2luZyBpbnRvIFJFU1QgQVBJXCIpOyAgICAgICAgICAgICAgICAgLy8gbWl0IFRva2VuIHdlYnNlcnZpY2VTZXJ2ZXIgYXVmcnVmZW5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cGhhbmRsZXIuZ2V0KHRoaXMubG9naW5VUkwgKyB0bXBbXCJ0b2tlblwiXSlcbiAgICAgICAgICAudG9Qcm9taXNlKCkudGhlbigoand0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gNCByZXN1bHQgand0LXRva2VuPVwiICsgand0W1wiand0XCJdKTtcbiAgICAgICAgICAgIGlmIChqd3QpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRUb2tlbihqd3RbXCJqd3RcIl0pOyAgICAgICAgICAgICAgICAgLy8gaW4gbG9jYWwgc3RvcmFnZSBhYmxlZ2VuXG4gICAgICAgICAgICAgIHRoaXMuZG9udGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBqd3RbXCJqd3RcIl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiKioqIExvZ2luIG5vdCBzdWNjZXNzZnVsXCIpO1xuICAgICAgICAgICAgICB0aGlzLmRvbnRjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2dpbiBlcnJvciAtIEpXVCBpcyBudWxsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSkgYXMgUHJvbWlzZTxzdHJpbmc+O1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBKV1QgcGF5bG9hZFxuICAgKlxuICAgKiByZXR1cm5zIHthbnl9XG4gICAqL1xuICBwdWJsaWMgZ2V0RGF0YSgpOiBhbnkge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgIGxldCBqc29uV2ViVG9rZW46IGFueTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGpzb25XZWJUb2tlbiA9IHRoaXMuand0SGVscGVyLmRlY29kZVRva2VuKHRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIChqc29uV2ViVG9rZW4gPyBqc29uV2ViVG9rZW4uZGF0YSB8fCB7fSA6IHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBpcmVzIHRva2VuIGluIHggc2Vjb25kcz9cbiAgICpcbiAgICogcGFyYW0ge251bWJlcn0gc2Vjb25kc1xuICAgKiByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIHRva2VuRXhwaXJlc0luKHNlY29uZHM6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgLy8gY29uc3Qgand0SGVscGVyID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICAgIHJldHVybiB0aGlzLmp3dEhlbHBlci5pc1Rva2VuRXhwaXJlZCh0b2tlbiwgc2Vjb25kcyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBUb2tlbiBmcm9tIHN0b3JhZ2VcbiAgICpcbiAgICogcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIGdldFRva2VuKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShKd3RUb2tlbik7XG4gICAgcmV0dXJuIHRva2VuID8gdG9rZW4gOiBcIlwiO1xuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgdG9rZW4gdG8gc3RvcmFnZVxuICAgKlxuICAgKiBwYXJhbSB7c3RyaW5nfSB0b2tlblxuICAgKi9cbiAgcHVibGljIHNldFRva2VuKHRva2VuOiBzdHJpbmcpIHtcbiAgICAvLyBjb25zb2xlLmRlYnVnKFwic2F2ZSB0b2tlbiBcIik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oSnd0VG9rZW4sIHRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWxldGUgdG9rZW5cbiAgICovXG4gIHB1YmxpYyBjbGVhclRva2VuKCk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEp3dFRva2VuKTtcbiAgfVxuXG4gIC8qXG4gICAgSHR0cENsaWVudCBrYW5uIG5pY2h0IHBlciBESSBnZWhvbHQgd2VyZGVuLCBkYSBkYXMgZWluZSB6eWtsaXNjaGUgQWJoYWVuZ2lna2VpdCBpbSBBcHBNb2R1bGUgYXVzbG9lc3RcbiAgICBXZW5uIEh0dHBDbGllbnQgc3BhZXRlciBnZWhvbHQgd2lyZCwgZ2lidCBlcyBrZWluZSBQcm9ibGVtZS4gRW50c3ByaWNodCBuaWNodCBkZXIgcmVpbmVuIExlaHJlIC0+IHdlbm4gbWFsIFplaXQgaXN0XG4gICAgLT4gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzk3NjcwMTlcbiAgICovXG4gIHByaXZhdGUgZ2V0SHR0cCgpOiBIdHRwQ2xpZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQ8SHR0cENsaWVudD4oSHR0cENsaWVudCk7XG4gIH1cblxuICAvLyBQcm9taXNlIGVyemV1Z2VuLCBkYXMgd2FydGV0IGJpcyBlaW4gVG9rZW4gdmVyZnVlZ2JhciBpc3RcbiAgcHJpdmF0ZSB3YWl0Rm9yVG9rZW4oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZTogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICAgIHRoaXMudGltZW91dGZuKHJlc29sdmUsIDEwKTtcbiAgICB9KTtcbiAgfVxuICAvLyByZWt1cnNpdmUgV2FydGVzY2hsZWlmZVxuICBwcml2YXRlIHRpbWVvdXRmbihyZXNvbHZlOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCwgbXM6IG51bWJlcikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZG9udGNoZWNrKSB7XG4gICAgICAgIHRoaXMudGltZW91dGZuKHJlc29sdmUsIG1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodGhpcy5nZXRUb2tlbigpKTtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG5cbiAgfVxuXG59XG4iXX0=