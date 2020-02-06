import { __decorate, __param } from "tslib";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector } from "@angular/core";
import { JwtToken, loginURL } from "@hb42/lib-common";
import { JwtHelperService } from "./jwt-helper.service";
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
let LogonService = class LogonService {
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
    get dontCheckNow() {
        return this.dontcheck;
    }
    get active() {
        return this.logonPar.logon !== "NO";
    }
    get ntlm() {
        return this.logonPar.logon === "NTLM";
    }
    get urlsWithoutToken() {
        return this.urlswithouttoken;
    }
    /**
     * Fuer HttpInterceptor Autologin Token holen
     *
     * returns {Promise<string>}
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
            return new Promise((resolve, reject) => {
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
     * returns {Promise<string>} JWT-Token
     */
    autoLogin() {
        this.dontcheck = true;
        if (!this.httphandler) {
            this.httphandler = this.getHttp();
        }
        console.debug(">>> AUTO LOGIN");
        console.debug(">>> 1 getting ntlm user");
        return this.httphandler.get(this.ntlmURL) // NTLM-Server aufrufen
            .toPromise().then((tmp) => {
            console.debug(">>> 2 success temp-token=" + tmp["token"]);
            console.debug(">>> 3 logging into REST API"); // mit Token webserviceServer aufrufen
            return this.httphandler.get(this.loginURL + tmp["token"])
                .toPromise().then((jwt) => {
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
            });
        });
    }
    /**
     * get JWT payload
     *
     * returns {any}
     */
    getData() {
        const token = this.getToken();
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
     */
    tokenExpiresIn(seconds) {
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
     */
    getToken() {
        const token = localStorage.getItem(JwtToken);
        return token ? token : "";
    }
    /**
     * save token to storage
     *
     * param {string} token
     */
    setToken(token) {
        // console.debug("save token ");
        localStorage.setItem(JwtToken, token);
    }
    /**
     * delete token
     */
    clearToken() {
        localStorage.removeItem(JwtToken);
    }
    /*
      HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
      Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    getHttp() {
        return this.injector.get(HttpClient);
    }
    // Promise erzeugen, das wartet bis ein Token verfuegbar ist
    waitForToken() {
        return new Promise((resolve) => {
            this.timeoutfn(resolve, 10);
        });
    }
    // rekursive Warteschleife
    timeoutfn(resolve, ms) {
        setTimeout(() => {
            if (this.dontcheck) {
                this.timeoutfn(resolve, ms);
            }
            else {
                resolve(this.getToken());
            }
        }, ms);
    }
};
LogonService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [LOGON_OPTIONS,] }] },
    { type: Injector },
    { type: JwtHelperService }
];
LogonService = __decorate([
    Injectable(),
    __param(0, Inject(LOGON_OPTIONS))
], LogonService);
export { LogonService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2xvZ29uL2xvZ29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTdDOzs7Ozs7Ozs7OztHQVdHO0FBRUgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQXVCdkIsWUFBbUMsUUFBd0IsRUFDdkMsUUFBa0IsRUFDbEIsU0FBMkI7UUFEM0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQXJCdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFxQnRDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLCtDQUErQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNoRSxJQUFJLENBQUMsZ0JBQWdC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Q0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBYSxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsNERBQTREO0lBQ3BELFlBQVk7UUFDbEIsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQWdDLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCwwQkFBMEI7SUFDbEIsU0FBUyxDQUFDLE9BQWdDLEVBQUUsRUFBVTtRQUM1RCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFVCxDQUFDO0NBRUYsQ0FBQTs7NENBdkpjLE1BQU0sU0FBQyxhQUFhO1lBQ0gsUUFBUTtZQUNQLGdCQUFnQjs7QUF6QnBDLFlBQVk7SUFEeEIsVUFBVSxFQUFFO0lBd0JFLFdBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0dBdkJ2QixZQUFZLENBOEt4QjtTQTlLWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEp3dFRva2VuLCBsb2dpblVSTCB9IGZyb20gXCJAaGI0Mi9saWItY29tbW9uXCI7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSBcIi4vand0LWhlbHBlci5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IExvZ29uUGFyYW1ldGVyIH0gZnJvbSBcIi4vbG9nb24ucGFyYW1ldGVyXCI7XG5pbXBvcnQgeyBMT0dPTl9PUFRJT05TIH0gZnJvbSBcIi4vbG9nb25Ub2tlblwiO1xuXG4vKipcbiAqIEFubWVsZHVuZyBhbSBTZXJ2ZXIgZXJsZWRpZ2VuIHVuZCBKU09OV2ViVG9rZW4gbWFuYWdlblxuICpcbiAqIERpZSBBbndlbmR1bmcgbXVzcyBkaWUgYmVub2V0aWd0ZSBLb25maWd1cmF0aW9uIGFscyB7QGxpbmsgTE9HT05fT1BUSU9OU30tUHJvdmlkZXJcbiAqIGJlcmVpdHN0ZWxsZW4uXG4gKlxuICogQHRvZG8gSGFuZGxpbmcgZnVlciBGb3JtLUxvZ2luXG4gKlxuICogQHNlZSB7QGxpbmsgTE9HT05fT1BUSU9OU31cbiAqIEBzZWUge0BsaW5rIExvZ29uUGFyYW1ldGVyfVxuICogQHNlZSB7QGxpbmsgTG9nb25JbnRlcmNlcHRvcn1cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ29uU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBodHRwaGFuZGxlcjogSHR0cENsaWVudDtcbiAgcHJpdmF0ZSBsb2dvblBhcjogTG9nb25QYXJhbWV0ZXI7XG4gIHByaXZhdGUgZG9udGNoZWNrID0gZmFsc2U7XG4gIHByaXZhdGUgdXJsc3dpdGhvdXR0b2tlbjogc3RyaW5nW10gPSBbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG50bG1VUkw6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBsb2dpblVSTDogc3RyaW5nO1xuXG4gIHB1YmxpYyBnZXQgZG9udENoZWNrTm93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRvbnRjaGVjaztcbiAgfVxuICBwdWJsaWMgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sb2dvblBhci5sb2dvbiAhPT0gXCJOT1wiO1xuICB9XG4gIHB1YmxpYyBnZXQgbnRsbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sb2dvblBhci5sb2dvbiA9PT0gXCJOVExNXCI7XG4gIH1cbiAgcHVibGljIGdldCB1cmxzV2l0aG91dFRva2VuKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy51cmxzd2l0aG91dHRva2VuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMT0dPTl9PUFRJT05TKSBsb2dvblBhcjogTG9nb25QYXJhbWV0ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcml2YXRlIGp3dEhlbHBlcjogSnd0SGVscGVyU2VydmljZSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJjJ3RvciBMb2dvblNlcnZpY2UgYXBwTmFtZT1cIiArIGxvZ29uUGFyLmFwcE5hbWUpO1xuICAgIHRoaXMubG9nb25QYXIgPSBsb2dvblBhcjtcbiAgICAvLyBBdXNuYWhtZW4sIGJlaSBkZW5lbiBrZWluVG9rZW4gZ2VwcnVlZnQgd2lyZFxuICAgIHRoaXMubnRsbVVSTCA9IHRoaXMubG9nb25QYXIuTlRMTXNlcnZlciArIFwiP2FwcD1cIiArIHRoaXMubG9nb25QYXIuYXBwTmFtZTtcbiAgICB0aGlzLmxvZ2luVVJMID0gdGhpcy5sb2dvblBhci53ZWJzZXJ2aWNlU2VydmVyICsgbG9naW5VUkwgKyBcIi9cIjtcbiAgICB0aGlzLnVybHN3aXRob3V0dG9rZW4ucHVzaCh0aGlzLm50bG1VUkwpO1xuICAgIHRoaXMudXJsc3dpdGhvdXR0b2tlbi5wdXNoKHRoaXMubG9naW5VUkwpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1ZXIgSHR0cEludGVyY2VwdG9yIEF1dG9sb2dpbiBUb2tlbiBob2xlblxuICAgKlxuICAgKiByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAqL1xuICBwdWJsaWMgZ2V0VG9rZW5XaXRoQ2hlY2soKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAodGhpcy5kb250Y2hlY2spIHsgIC8vIFRva2VuIHdpcmQgZ2VyYWRlIGdlaG9sdCAtPiB3YXJ0ZW5cbiAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2dvblNlcnZpY2U6IHdhaXQgZm9yIG5ldyB0b2tlblwiKTtcbiAgICAgIHJldHVybiB0aGlzLndhaXRGb3JUb2tlbigpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b2tlbkV4cGlyZXNJbigzMCkpIHsgIC8vIGxhZXVmdCBiYWxkIGFiIC0+IG5ldWVzIFRva2VuXG4gICAgICBjb25zb2xlLmRlYnVnKFwiTG9nb25TZXJ2aWNlOiB0b2tlbkV4cGlyZXMgLSBkbyBhdXRvbG9naW5cIik7XG4gICAgICAvLyB3aXJmdCBpbSBGZWhsZXJmYWxsIEVycm9yIC0+IGV2dGwuIGhpZXIgRmVobGVyaGFuZGxpbmcgbWl0IHRyeSBjYXRjaCAmIEVycm9yU2VydmljZVxuICAgICAgLy8gcy4gZGVmYXVsdC1hdXRvbG9naW4tand0LWhhbmRsZXJcbiAgICAgIHJldHVybiB0aGlzLmF1dG9Mb2dpbigpO1xuICAgIH0gZWxzZSB7ICAvLyBUb2tlbiBhbHMgUHJvbWlzZSBsaWVmZXJuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUodGhpcy5nZXRUb2tlbigpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIGF1dG8gbG9naW5cbiAgICpcbiAgICogRmVobGVyIGJlaSBkZXIgQW5tZWxkdW5nIHdpcmZ0IGVpbmUgRXhjZXB0aW9uLCBkYXJ1bSBtdXNzIHNpY2hcbiAgICogZGllIEFud2VuZHVuZyBrdWVtbWVybi5cbiAgICpcbiAgICogcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBKV1QtVG9rZW5cbiAgICovXG4gIHB1YmxpYyBhdXRvTG9naW4oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICB0aGlzLmRvbnRjaGVjayA9IHRydWU7XG4gICAgaWYgKCF0aGlzLmh0dHBoYW5kbGVyKSB7XG4gICAgICB0aGlzLmh0dHBoYW5kbGVyID0gdGhpcy5nZXRIdHRwKCk7XG4gICAgfVxuICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gQVVUTyBMT0dJTlwiKTtcbiAgICBjb25zb2xlLmRlYnVnKFwiPj4+IDEgZ2V0dGluZyBudGxtIHVzZXJcIik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cGhhbmRsZXIuZ2V0KHRoaXMubnRsbVVSTCkgIC8vIE5UTE0tU2VydmVyIGF1ZnJ1ZmVuXG4gICAgICAudG9Qcm9taXNlKCkudGhlbigodG1wOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIj4+PiAyIHN1Y2Nlc3MgdGVtcC10b2tlbj1cIiArIHRtcFtcInRva2VuXCJdKTtcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIj4+PiAzIGxvZ2dpbmcgaW50byBSRVNUIEFQSVwiKTsgICAgICAgICAgICAgICAgIC8vIG1pdCBUb2tlbiB3ZWJzZXJ2aWNlU2VydmVyIGF1ZnJ1ZmVuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBoYW5kbGVyLmdldCh0aGlzLmxvZ2luVVJMICsgdG1wW1widG9rZW5cIl0pXG4gICAgICAgICAgLnRvUHJvbWlzZSgpLnRoZW4oKGp3dDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiPj4+IDQgcmVzdWx0IGp3dC10b2tlbj1cIiArIGp3dFtcImp3dFwiXSk7XG4gICAgICAgICAgICBpZiAoand0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0VG9rZW4oand0W1wiand0XCJdKTsgICAgICAgICAgICAgICAgIC8vIGluIGxvY2FsIHN0b3JhZ2UgYWJsZWdlblxuICAgICAgICAgICAgICB0aGlzLmRvbnRjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gand0W1wiand0XCJdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIioqKiBMb2dpbiBub3Qgc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICAgICAgdGhpcy5kb250Y2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTG9naW4gZXJyb3IgLSBKV1QgaXMgbnVsbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH0pIGFzIFByb21pc2U8c3RyaW5nPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgSldUIHBheWxvYWRcbiAgICpcbiAgICogcmV0dXJucyB7YW55fVxuICAgKi9cbiAgcHVibGljIGdldERhdGEoKTogYW55IHtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICBsZXQganNvbldlYlRva2VuOiBhbnk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBqc29uV2ViVG9rZW4gPSB0aGlzLmp3dEhlbHBlci5kZWNvZGVUb2tlbih0b2tlbik7XG4gICAgfVxuICAgIHJldHVybiAoanNvbldlYlRva2VuID8ganNvbldlYlRva2VuLmRhdGEgfHwge30gOiB7fSk7XG4gIH1cblxuICAvKipcbiAgICogRXhwaXJlcyB0b2tlbiBpbiB4IHNlY29uZHM/XG4gICAqXG4gICAqIHBhcmFtIHtudW1iZXJ9IHNlY29uZHNcbiAgICogcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyB0b2tlbkV4cGlyZXNJbihzZWNvbmRzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIC8vIGNvbnN0IGp3dEhlbHBlciA9IG5ldyBKd3RIZWxwZXJTZXJ2aWNlKCk7XG4gICAgICByZXR1cm4gdGhpcy5qd3RIZWxwZXIuaXNUb2tlbkV4cGlyZWQodG9rZW4sIHNlY29uZHMpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgVG9rZW4gZnJvbSBzdG9yYWdlXG4gICAqXG4gICAqIHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHB1YmxpYyBnZXRUb2tlbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oSnd0VG9rZW4pO1xuICAgIHJldHVybiB0b2tlbiA/IHRva2VuIDogXCJcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBzYXZlIHRva2VuIHRvIHN0b3JhZ2VcbiAgICpcbiAgICogcGFyYW0ge3N0cmluZ30gdG9rZW5cbiAgICovXG4gIHB1YmxpYyBzZXRUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gICAgLy8gY29uc29sZS5kZWJ1ZyhcInNhdmUgdG9rZW4gXCIpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEp3dFRva2VuLCB0b2tlbik7XG4gIH1cblxuICAvKipcbiAgICogZGVsZXRlIHRva2VuXG4gICAqL1xuICBwdWJsaWMgY2xlYXJUb2tlbigpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShKd3RUb2tlbik7XG4gIH1cblxuICAvKlxuICAgIEh0dHBDbGllbnQga2FubiBuaWNodCBwZXIgREkgZ2Vob2x0IHdlcmRlbiwgZGEgZGFzIGVpbmUgenlrbGlzY2hlIEFiaGFlbmdpZ2tlaXQgaW0gQXBwTW9kdWxlIGF1c2xvZXN0XG4gICAgV2VubiBIdHRwQ2xpZW50IHNwYWV0ZXIgZ2Vob2x0IHdpcmQsIGdpYnQgZXMga2VpbmUgUHJvYmxlbWUuIEVudHNwcmljaHQgbmljaHQgZGVyIHJlaW5lbiBMZWhyZSAtPiB3ZW5uIG1hbCBaZWl0IGlzdFxuICAgIC0+IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM5NzY3MDE5XG4gICAqL1xuICBwcml2YXRlIGdldEh0dHAoKTogSHR0cENsaWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0PEh0dHBDbGllbnQ+KEh0dHBDbGllbnQpO1xuICB9XG5cbiAgLy8gUHJvbWlzZSBlcnpldWdlbiwgZGFzIHdhcnRldCBiaXMgZWluIFRva2VuIHZlcmZ1ZWdiYXIgaXN0XG4gIHByaXZhdGUgd2FpdEZvclRva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmU6ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgICB0aGlzLnRpbWVvdXRmbihyZXNvbHZlLCAxMCk7XG4gICAgfSk7XG4gIH1cbiAgLy8gcmVrdXJzaXZlIFdhcnRlc2NobGVpZmVcbiAgcHJpdmF0ZSB0aW1lb3V0Zm4ocmVzb2x2ZTogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQsIG1zOiBudW1iZXIpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRvbnRjaGVjaykge1xuICAgICAgICB0aGlzLnRpbWVvdXRmbihyZXNvbHZlLCBtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHRoaXMuZ2V0VG9rZW4oKSk7XG4gICAgICB9XG4gICAgfSwgbXMpO1xuXG4gIH1cblxufVxuIl19