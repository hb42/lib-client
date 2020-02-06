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
        get: function () {
            return this.dontcheck;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogonService.prototype, "active", {
        get: function () {
            return this.logonPar.logon !== "NO";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogonService.prototype, "ntlm", {
        get: function () {
            return this.logonPar.logon === "NTLM";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogonService.prototype, "urlsWithoutToken", {
        get: function () {
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
    LogonService.prototype.getTokenWithCheck = function () {
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
            return new Promise(function (resolve, reject) {
                resolve(_this.getToken());
            });
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
    LogonService.prototype.autoLogin = function () {
        var _this = this;
        this.dontcheck = true;
        if (!this.httphandler) {
            this.httphandler = this.getHttp();
        }
        console.debug(">>> AUTO LOGIN");
        console.debug(">>> 1 getting ntlm user");
        return this.httphandler.get(this.ntlmURL) // NTLM-Server aufrufen
            .toPromise().then(function (tmp) {
            console.debug(">>> 2 success temp-token=" + tmp["token"]);
            console.debug(">>> 3 logging into REST API"); // mit Token webserviceServer aufrufen
            return _this.httphandler.get(_this.loginURL + tmp["token"])
                .toPromise().then(function (jwt) {
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
            });
        });
    };
    /**
     * get JWT payload
     *
     * returns {any}
     */
    LogonService.prototype.getData = function () {
        var token = this.getToken();
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
    LogonService.prototype.tokenExpiresIn = function (seconds) {
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
    LogonService.prototype.getToken = function () {
        var token = localStorage.getItem(JwtToken);
        return token ? token : "";
    };
    /**
     * save token to storage
     *
     * param {string} token
     */
    LogonService.prototype.setToken = function (token) {
        // console.debug("save token ");
        localStorage.setItem(JwtToken, token);
    };
    /**
     * delete token
     */
    LogonService.prototype.clearToken = function () {
        localStorage.removeItem(JwtToken);
    };
    /*
      HttpClient kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit im AppModule ausloest
      Wenn HttpClient spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    LogonService.prototype.getHttp = function () {
        return this.injector.get(HttpClient);
    };
    // Promise erzeugen, das wartet bis ein Token verfuegbar ist
    LogonService.prototype.waitForToken = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.timeoutfn(resolve, 10);
        });
    };
    // rekursive Warteschleife
    LogonService.prototype.timeoutfn = function (resolve, ms) {
        var _this = this;
        setTimeout(function () {
            if (_this.dontcheck) {
                _this.timeoutfn(resolve, ms);
            }
            else {
                resolve(_this.getToken());
            }
        }, ms);
    };
    LogonService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [LOGON_OPTIONS,] }] },
        { type: Injector },
        { type: JwtHelperService }
    ]; };
    LogonService = __decorate([
        Injectable(),
        __param(0, Inject(LOGON_OPTIONS))
    ], LogonService);
    return LogonService;
}());
export { LogonService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2xvZ29uL2xvZ29uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTdDOzs7Ozs7Ozs7OztHQVdHO0FBRUg7SUF1QkUsc0JBQW1DLFFBQXdCLEVBQ3ZDLFFBQWtCLEVBQ2xCLFNBQTJCO1FBRDNCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFyQnZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBcUJ0QyxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QiwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDaEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQXZCRCxzQkFBVyxzQ0FBWTthQUF2QjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLGdDQUFNO2FBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyw4QkFBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVywwQ0FBZ0I7YUFBM0I7WUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQWNEOzs7O09BSUc7SUFDSSx3Q0FBaUIsR0FBeEI7UUFBQSxpQkFjQztRQWJDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFHLHFDQUFxQztZQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDNUI7YUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRyxnQ0FBZ0M7WUFDckUsT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBQzNELHNGQUFzRjtZQUN0RixtQ0FBbUM7WUFDbkMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDekI7YUFBTSxFQUFHLDRCQUE0QjtZQUNwQyxPQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxnQ0FBUyxHQUFoQjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUUsdUJBQXVCO2FBQy9ELFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7WUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBaUIsc0NBQXNDO1lBQ3BHLE9BQU8sS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RELFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksR0FBRyxFQUFFO29CQUNQLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBaUIsMkJBQTJCO29CQUN0RSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztpQkFDOUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBb0IsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDhCQUFPLEdBQWQ7UUFDRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxZQUFpQixDQUFDO1FBQ3RCLElBQUksS0FBSyxFQUFFO1lBQ1QsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHFDQUFjLEdBQXJCLFVBQXNCLE9BQWU7UUFDbkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsNENBQTRDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtCQUFRLEdBQWY7UUFDRSxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtCQUFRLEdBQWYsVUFBZ0IsS0FBYTtRQUMzQixnQ0FBZ0M7UUFDaEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUNBQVUsR0FBakI7UUFDRSxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssOEJBQU8sR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQWEsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDREQUE0RDtJQUNwRCxtQ0FBWSxHQUFwQjtRQUFBLGlCQUlDO1FBSEMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQWdDO1lBQzFELEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELDBCQUEwQjtJQUNsQixnQ0FBUyxHQUFqQixVQUFrQixPQUFnQyxFQUFFLEVBQVU7UUFBOUQsaUJBU0M7UUFSQyxVQUFVLENBQUM7WUFDVCxJQUFJLEtBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVULENBQUM7O2dEQXJKWSxNQUFNLFNBQUMsYUFBYTtnQkFDSCxRQUFRO2dCQUNQLGdCQUFnQjs7SUF6QnBDLFlBQVk7UUFEeEIsVUFBVSxFQUFFO1FBd0JFLFdBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO09BdkJ2QixZQUFZLENBOEt4QjtJQUFELG1CQUFDO0NBQUEsQUE5S0QsSUE4S0M7U0E5S1ksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBKd3RUb2tlbiwgbG9naW5VUkwgfSBmcm9tIFwiQGhiNDIvbGliLWNvbW1vblwiO1xuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSB9IGZyb20gXCIuL2p3dC1oZWxwZXIuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBMb2dvblBhcmFtZXRlciB9IGZyb20gXCIuL2xvZ29uLnBhcmFtZXRlclwiO1xuaW1wb3J0IHsgTE9HT05fT1BUSU9OUyB9IGZyb20gXCIuL2xvZ29uVG9rZW5cIjtcblxuLyoqXG4gKiBBbm1lbGR1bmcgYW0gU2VydmVyIGVybGVkaWdlbiB1bmQgSlNPTldlYlRva2VuIG1hbmFnZW5cbiAqXG4gKiBEaWUgQW53ZW5kdW5nIG11c3MgZGllIGJlbm9ldGlndGUgS29uZmlndXJhdGlvbiBhbHMge0BsaW5rIExPR09OX09QVElPTlN9LVByb3ZpZGVyXG4gKiBiZXJlaXRzdGVsbGVuLlxuICpcbiAqIEB0b2RvIEhhbmRsaW5nIGZ1ZXIgRm9ybS1Mb2dpblxuICpcbiAqIEBzZWUge0BsaW5rIExPR09OX09QVElPTlN9XG4gKiBAc2VlIHtAbGluayBMb2dvblBhcmFtZXRlcn1cbiAqIEBzZWUge0BsaW5rIExvZ29uSW50ZXJjZXB0b3J9XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dvblNlcnZpY2Uge1xuXG4gIHByaXZhdGUgaHR0cGhhbmRsZXI6IEh0dHBDbGllbnQ7XG4gIHByaXZhdGUgbG9nb25QYXI6IExvZ29uUGFyYW1ldGVyO1xuICBwcml2YXRlIGRvbnRjaGVjayA9IGZhbHNlO1xuICBwcml2YXRlIHVybHN3aXRob3V0dG9rZW46IHN0cmluZ1tdID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBudGxtVVJMOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9naW5VUkw6IHN0cmluZztcblxuICBwdWJsaWMgZ2V0IGRvbnRDaGVja05vdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kb250Y2hlY2s7XG4gIH1cbiAgcHVibGljIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubG9nb25QYXIubG9nb24gIT09IFwiTk9cIjtcbiAgfVxuICBwdWJsaWMgZ2V0IG50bG0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubG9nb25QYXIubG9nb24gPT09IFwiTlRMTVwiO1xuICB9XG4gIHB1YmxpYyBnZXQgdXJsc1dpdGhvdXRUb2tlbigpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMudXJsc3dpdGhvdXR0b2tlbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9HT05fT1BUSU9OUykgbG9nb25QYXI6IExvZ29uUGFyYW1ldGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBqd3RIZWxwZXI6IEp3dEhlbHBlclNlcnZpY2UpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiYyd0b3IgTG9nb25TZXJ2aWNlIGFwcE5hbWU9XCIgKyBsb2dvblBhci5hcHBOYW1lKTtcbiAgICB0aGlzLmxvZ29uUGFyID0gbG9nb25QYXI7XG4gICAgLy8gQXVzbmFobWVuLCBiZWkgZGVuZW4ga2VpblRva2VuIGdlcHJ1ZWZ0IHdpcmRcbiAgICB0aGlzLm50bG1VUkwgPSB0aGlzLmxvZ29uUGFyLk5UTE1zZXJ2ZXIgKyBcIj9hcHA9XCIgKyB0aGlzLmxvZ29uUGFyLmFwcE5hbWU7XG4gICAgdGhpcy5sb2dpblVSTCA9IHRoaXMubG9nb25QYXIud2Vic2VydmljZVNlcnZlciArIGxvZ2luVVJMICsgXCIvXCI7XG4gICAgdGhpcy51cmxzd2l0aG91dHRva2VuLnB1c2godGhpcy5udGxtVVJMKTtcbiAgICB0aGlzLnVybHN3aXRob3V0dG9rZW4ucHVzaCh0aGlzLmxvZ2luVVJMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdWVyIEh0dHBJbnRlcmNlcHRvciBBdXRvbG9naW4gVG9rZW4gaG9sZW5cbiAgICpcbiAgICogcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgcHVibGljIGdldFRva2VuV2l0aENoZWNrKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKHRoaXMuZG9udGNoZWNrKSB7ICAvLyBUb2tlbiB3aXJkIGdlcmFkZSBnZWhvbHQgLT4gd2FydGVuXG4gICAgICBjb25zb2xlLmRlYnVnKFwiTG9nb25TZXJ2aWNlOiB3YWl0IGZvciBuZXcgdG9rZW5cIik7XG4gICAgICByZXR1cm4gdGhpcy53YWl0Rm9yVG9rZW4oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudG9rZW5FeHBpcmVzSW4oMzApKSB7ICAvLyBsYWV1ZnQgYmFsZCBhYiAtPiBuZXVlcyBUb2tlblxuICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvZ29uU2VydmljZTogdG9rZW5FeHBpcmVzIC0gZG8gYXV0b2xvZ2luXCIpO1xuICAgICAgLy8gd2lyZnQgaW0gRmVobGVyZmFsbCBFcnJvciAtPiBldnRsLiBoaWVyIEZlaGxlcmhhbmRsaW5nIG1pdCB0cnkgY2F0Y2ggJiBFcnJvclNlcnZpY2VcbiAgICAgIC8vIHMuIGRlZmF1bHQtYXV0b2xvZ2luLWp3dC1oYW5kbGVyXG4gICAgICByZXR1cm4gdGhpcy5hdXRvTG9naW4oKTtcbiAgICB9IGVsc2UgeyAgLy8gVG9rZW4gYWxzIFByb21pc2UgbGllZmVyblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlKHRoaXMuZ2V0VG9rZW4oKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlciBhdXRvIGxvZ2luXG4gICAqXG4gICAqIEZlaGxlciBiZWkgZGVyIEFubWVsZHVuZyB3aXJmdCBlaW5lIEV4Y2VwdGlvbiwgZGFydW0gbXVzcyBzaWNoXG4gICAqIGRpZSBBbndlbmR1bmcga3VlbW1lcm4uXG4gICAqXG4gICAqIHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gSldULVRva2VuXG4gICAqL1xuICBwdWJsaWMgYXV0b0xvZ2luKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgdGhpcy5kb250Y2hlY2sgPSB0cnVlO1xuICAgIGlmICghdGhpcy5odHRwaGFuZGxlcikge1xuICAgICAgdGhpcy5odHRwaGFuZGxlciA9IHRoaXMuZ2V0SHR0cCgpO1xuICAgIH1cbiAgICBjb25zb2xlLmRlYnVnKFwiPj4+IEFVVE8gTE9HSU5cIik7XG4gICAgY29uc29sZS5kZWJ1ZyhcIj4+PiAxIGdldHRpbmcgbnRsbSB1c2VyXCIpO1xuICAgIHJldHVybiB0aGlzLmh0dHBoYW5kbGVyLmdldCh0aGlzLm50bG1VUkwpICAvLyBOVExNLVNlcnZlciBhdWZydWZlblxuICAgICAgLnRvUHJvbWlzZSgpLnRoZW4oKHRtcDogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gMiBzdWNjZXNzIHRlbXAtdG9rZW49XCIgKyB0bXBbXCJ0b2tlblwiXSk7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCI+Pj4gMyBsb2dnaW5nIGludG8gUkVTVCBBUElcIik7ICAgICAgICAgICAgICAgICAvLyBtaXQgVG9rZW4gd2Vic2VydmljZVNlcnZlciBhdWZydWZlblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwaGFuZGxlci5nZXQodGhpcy5sb2dpblVSTCArIHRtcFtcInRva2VuXCJdKVxuICAgICAgICAgIC50b1Byb21pc2UoKS50aGVuKChqd3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIj4+PiA0IHJlc3VsdCBqd3QtdG9rZW49XCIgKyBqd3RbXCJqd3RcIl0pO1xuICAgICAgICAgICAgaWYgKGp3dCkge1xuICAgICAgICAgICAgICB0aGlzLnNldFRva2VuKGp3dFtcImp3dFwiXSk7ICAgICAgICAgICAgICAgICAvLyBpbiBsb2NhbCBzdG9yYWdlIGFibGVnZW5cbiAgICAgICAgICAgICAgdGhpcy5kb250Y2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIGp3dFtcImp3dFwiXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCIqKiogTG9naW4gbm90IHN1Y2Nlc3NmdWxcIik7XG4gICAgICAgICAgICAgIHRoaXMuZG9udGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvZ2luIGVycm9yIC0gSldUIGlzIG51bGxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KSBhcyBQcm9taXNlPHN0cmluZz47XG4gIH1cblxuICAvKipcbiAgICogZ2V0IEpXVCBwYXlsb2FkXG4gICAqXG4gICAqIHJldHVybnMge2FueX1cbiAgICovXG4gIHB1YmxpYyBnZXREYXRhKCk6IGFueSB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XG4gICAgbGV0IGpzb25XZWJUb2tlbjogYW55O1xuICAgIGlmICh0b2tlbikge1xuICAgICAganNvbldlYlRva2VuID0gdGhpcy5qd3RIZWxwZXIuZGVjb2RlVG9rZW4odG9rZW4pO1xuICAgIH1cbiAgICByZXR1cm4gKGpzb25XZWJUb2tlbiA/IGpzb25XZWJUb2tlbi5kYXRhIHx8IHt9IDoge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGlyZXMgdG9rZW4gaW4geCBzZWNvbmRzP1xuICAgKlxuICAgKiBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzXG4gICAqIHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgdG9rZW5FeHBpcmVzSW4oc2Vjb25kczogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICAvLyBjb25zdCBqd3RIZWxwZXIgPSBuZXcgSnd0SGVscGVyU2VydmljZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuand0SGVscGVyLmlzVG9rZW5FeHBpcmVkKHRva2VuLCBzZWNvbmRzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IFRva2VuIGZyb20gc3RvcmFnZVxuICAgKlxuICAgKiByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgZ2V0VG9rZW4oKTogc3RyaW5nIHtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKEp3dFRva2VuKTtcbiAgICByZXR1cm4gdG9rZW4gPyB0b2tlbiA6IFwiXCI7XG4gIH1cblxuICAvKipcbiAgICogc2F2ZSB0b2tlbiB0byBzdG9yYWdlXG4gICAqXG4gICAqIHBhcmFtIHtzdHJpbmd9IHRva2VuXG4gICAqL1xuICBwdWJsaWMgc2V0VG9rZW4odG9rZW46IHN0cmluZykge1xuICAgIC8vIGNvbnNvbGUuZGVidWcoXCJzYXZlIHRva2VuIFwiKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShKd3RUb2tlbiwgdG9rZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlbGV0ZSB0b2tlblxuICAgKi9cbiAgcHVibGljIGNsZWFyVG9rZW4oKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oSnd0VG9rZW4pO1xuICB9XG5cbiAgLypcbiAgICBIdHRwQ2xpZW50IGthbm4gbmljaHQgcGVyIERJIGdlaG9sdCB3ZXJkZW4sIGRhIGRhcyBlaW5lIHp5a2xpc2NoZSBBYmhhZW5naWdrZWl0IGltIEFwcE1vZHVsZSBhdXNsb2VzdFxuICAgIFdlbm4gSHR0cENsaWVudCBzcGFldGVyIGdlaG9sdCB3aXJkLCBnaWJ0IGVzIGtlaW5lIFByb2JsZW1lLiBFbnRzcHJpY2h0IG5pY2h0IGRlciByZWluZW4gTGVocmUgLT4gd2VubiBtYWwgWmVpdCBpc3RcbiAgICAtPiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zOTc2NzAxOVxuICAgKi9cbiAgcHJpdmF0ZSBnZXRIdHRwKCk6IEh0dHBDbGllbnQge1xuICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldDxIdHRwQ2xpZW50PihIdHRwQ2xpZW50KTtcbiAgfVxuXG4gIC8vIFByb21pc2UgZXJ6ZXVnZW4sIGRhcyB3YXJ0ZXQgYmlzIGVpbiBUb2tlbiB2ZXJmdWVnYmFyIGlzdFxuICBwcml2YXRlIHdhaXRGb3JUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgICAgdGhpcy50aW1lb3V0Zm4ocmVzb2x2ZSwgMTApO1xuICAgIH0pO1xuICB9XG4gIC8vIHJla3Vyc2l2ZSBXYXJ0ZXNjaGxlaWZlXG4gIHByaXZhdGUgdGltZW91dGZuKHJlc29sdmU6ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkLCBtczogbnVtYmVyKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kb250Y2hlY2spIHtcbiAgICAgICAgdGhpcy50aW1lb3V0Zm4ocmVzb2x2ZSwgbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLmdldFRva2VuKCkpO1xuICAgICAgfVxuICAgIH0sIG1zKTtcblxuICB9XG5cbn1cbiJdfQ==