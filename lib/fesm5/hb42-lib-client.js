import { __decorate, __param, __awaiter, __generator } from 'tslib';
import { Location, CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ElementRef, Input, Directive, Pipe, Injectable, Injector, InjectionToken, Inject, VERSION, NgModule, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { loginURL, JwtToken, JwtHeader, makeSseUrl } from '@hb42/lib-common';
import { from, EMPTY, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { prerelease, major, minor, patch } from 'semver';

/**
 * Attribut fb-splitter
 *
 * Splitter fuer Flexbox
 *
 * Die Voraussetzung ist, dass das Parent-Element mit display:flex ausgezeichnet ist.
 * Die Splitterausrichtung wird von der flexDirection-Eigenschaft des Parent abgeleitet
 * ("row" horizontaler Splitter, "column" vertikal).
 * Der Splitter muss zwischen den beiden Element plaziert werden, die veraendert werden
 * sollen, "order" funktioniert hier nicht. Mindestens eines der Elemente muss eine feste
 * Breite/Hoehe haben (flexGrow:0, bzw flex:0 0 auto + width:/height: XXpx). Sinnvoll
 * ist zudem min-width bzw. min-height. Das zweite Element kann flex:1 bzw. flex:auto
 * bekommen, dann kuemmert sich Flexbox ums Anpassen.
 *
 * Das parent-Element braucht ausserdem den Style "align-items: stretch" (ist default).
 * Damit overflow im inneren DIV funktioniert muessen die Flexbox-Items position:relative
 * und der innere DIV position:absolute bekommen.
 *
 * inputs: [storageId]  - Kennung fuer die Splitterposition in der localStorage
 *                        (leer -> nicht speichern)
 *
 * Quelle:
 * https://hacks.mozilla.org/2013/12/application-layout-with-css3-flexible-box-module/
 */
var FlexboxSplitter = /** @class */ (function () {
    function FlexboxSplitter(el) {
        this.el = el;
        // inputs
        this.storageId = "";
        this.lastPos = 0;
        console.debug("c'tor flexboxsplitter");
        this.splitter = el.nativeElement;
    }
    FlexboxSplitter_1 = FlexboxSplitter;
    FlexboxSplitter.prototype.ngOnInit = function () {
        // Umgebung holen
        this.prevEl = this.splitter.previousElementSibling;
        this.nextEl = this.splitter.nextElementSibling;
        var parent = this.splitter.parentElement;
        // parent muss flexbox sein
        // if (this.getProp(parent, "display") !== "flex") {
        //   throw "Error: parent element for splitter must have style display:flex.";
        // }
        // Richtung festlegen und passende Styles fuer den Splitter
        if (this.getProp(parent, "flexDirection") === "row") {
            this.dimension = "width";
            this.splitter.style["border-left"] = "1px solid gray";
            this.splitter.style["cursor"] = "col-resize";
        }
        else {
            this.dimension = "height";
            this.splitter.style["border-top"] = "1px solid gray";
            this.splitter.style["cursor"] = "row-resize";
        }
        this.splitter.style["background"] = "#eee";
        this.splitter.style[this.dimension] = "6px";
        // Elemente nur fuer fixe Groesse aendern, flexGrow >0 = auto
        // this.chgPrev = this.getProp(this.prevEl, "flexGrow") === 0;
        // this.chgNext = this.getProp(this.nextEl, "flexGrow") === 0;
        // los geht"s
        this.initSplitter();
    };
    FlexboxSplitter.prototype.getProp = function (elem, prop) {
        // window.getComputedStyle(elem).getPropertyValue(prop);
        // im *IE* fkt. getPropertyValue() nicht, alt. direkter Zugriff mit ["prop"]
        return window.getComputedStyle(elem)[prop];
    };
    FlexboxSplitter.prototype.initSplitter = function () {
        // let self: FlexboxSplitter = this;
        var _this = this;
        // var event = new Event("hb.splitter"); fkt. leider nicht im *IE*, statt dessen:
        var params = { bubbles: false, cancelable: false, detail: undefined };
        this.splitterEvent = document.createEvent("CustomEvent");
        this.splitterEvent
            .initCustomEvent(FlexboxSplitter_1.SPLITTER_EVENT, params.bubbles, params.cancelable, params.detail);
        var drag = function (evt) {
            _this.dimension === "width" ? calcSize(evt.clientX) : calcSize(evt.clientY);
        };
        var calcSize = function (pos) {
            var newsize;
            var diff = pos - _this.lastPos;
            // if (self.chgPrev) {
            newsize = parseInt(_this.getProp(_this.prevEl, _this.dimension), 10) + diff;
            _this.prevEl.style[_this.dimension] = newsize + "px";
            // }
            // if (self.chgNext) {
            newsize = parseInt(_this.getProp(_this.nextEl, _this.dimension), 10) - diff;
            _this.nextEl.style[_this.dimension] = newsize + "px";
            // }
            _this.lastPos = pos;
        };
        var endDrag = function () {
            window.removeEventListener("mousemove", drag);
            window.removeEventListener("mouseup", endDrag);
            // element bekommt list of listener als callbacks bei Aend
            // foreach listener listener()
            // -> Bsp eventService
            // fkt. nicht
            // var evt = document.createEvent("UIEvent");
            // evt.initUIEvent("resize", true, false,window,0);
            // window.dispatchEvent(evt);
            window.dispatchEvent(_this.splitterEvent);
            // import f. jquery??
            // $(window).resize();
            if (_this.storageId) {
                localStorage.setItem(_this.storageId, _this.lastPos.toString(10));
            }
        };
        this.splitter.addEventListener("mousedown", function (evt) {
            evt.preventDefault(); // prevent text selection
            _this.lastPos = _this.dimension === "width" ? evt.clientX : evt.clientY;
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);
        });
        // default pos setzen, oder ggf. letzten Stand holen
        this.lastPos = this.dimension === "width" ? this.splitter.getBoundingClientRect().left
            : this.splitter.getBoundingClientRect().top;
        if (this.storageId) {
            var state = localStorage.getItem(this.storageId);
            var laststate = parseInt(state ? state : "0", 10);
            if (laststate) {
                calcSize(laststate);
            }
        }
    };
    var FlexboxSplitter_1;
    FlexboxSplitter.SPLITTER_EVENT = "hbsplitter";
    FlexboxSplitter.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], FlexboxSplitter.prototype, "storageId", void 0);
    FlexboxSplitter = FlexboxSplitter_1 = __decorate([
        Directive({
            selector: "[fb-splitter]",
        })
    ], FlexboxSplitter);
    return FlexboxSplitter;
}());

var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
        this.suffix = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    }
    FileSizePipe.prototype.transform = function (value /*, params: any[]*/) {
        var item = Number(value);
        return this.conv(item, 0);
    };
    FileSizePipe.prototype.conv = function (val, idx) {
        if (val < 1024) {
            return val + " " + this.suffix[idx];
        }
        else {
            return this.conv(Math.round(val / 1024), ++idx);
        }
    };
    FileSizePipe = __decorate([
        Pipe({
            name: "filesize",
        })
    ], FileSizePipe);
    return FileSizePipe;
}());

/**
 * date pipe, die auch im IE funktioniert, liefert date:"dd.MM.y HH:mm:ss"
 * -> https://github.com/angular/angular/issues/9524
 * -> https://marcoscaceres.github.io/jsi18n/
 *
 * *** hat sich erledigt, seit Angular5 funktioniert's ***
 */
var IEDatePipe = /** @class */ (function () {
    function IEDatePipe() {
    }
    IEDatePipe.prototype.transform = function (value) {
        var d = new Date(value);
        return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" }) + " "
            + d.toLocaleTimeString();
    };
    IEDatePipe = __decorate([
        Pipe({
            name: "iedate"
        })
    ], IEDatePipe);
    return IEDatePipe;
}());

/**
 * Verbindung zur electron runtime
 *
 *  Verwendung:
 *  <pre>
 *   public testElectron(electronService.ipcRenderer) {
 *     console.info("### sync reply " + ipcRenderer.sendSync("synchronous-message", "ping"));
 *
 *     ipcRenderer.on("asynchronous-reply", (event, arg) => {
 *       console.info("### async reply " + arg);
 *     });
 *     ipcRenderer.send("asynchronous-message", "ping");
 *   }
 * </pre>
 */
var ElectronService = /** @class */ (function () {
    function ElectronService() {
        /*
         electron mit window.require holen, das wird nicht von webpack ueberschrieben. Dadurch
         ignoriert webpack electron und packt es nicht in vendor.js. Ausserdem wird so die vorhandene
         electron-Runtime verwendet. window.require ist nur in einer node/electron-Umgebung vorhanden.
         -> {@link https://github.com/electron/electron/issues/7300}
         */
        var win = window;
        if (typeof win.require === "function") {
            var electron = win.require("electron");
            if (electron) {
                this.ipcrenderer = electron.ipcRenderer;
            }
        }
        if (this.isElectron) {
            console.info("Running on electron runtime " + this.electronVersion);
            // console.dir(process.versions);
        }
    }
    Object.defineProperty(ElectronService.prototype, "ipcRenderer", {
        get: function () {
            return this.ipcrenderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isElectron", {
        get: function () {
            return typeof this.ipcrenderer !== "undefined";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "electronVersion", {
        get: function () {
            if (this.isElectron) {
                return this.ipcRenderer.sendSync("get-version", "");
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    ElectronService = __decorate([
        Injectable()
    ], ElectronService);
    return ElectronService;
}());

/**
 * Fehler-Behandlung
 *
 * Fuer allgemeine Fehler muss die Anwendung eine Route fuer "/error" bereitstellen.
 *
 * Wenn die Anwendung neu geladen werden soll, ist Folgendes zu beachten:
 *
 * Im Browser wird der Reload mit document.location.reload() erledigt.
 *
 * In electron wuerde das nicht funktionieren (zumindest nicht mit Angular-SPA).
 * Da muss der Reload auf der electron-Seite erfolgen. Im electron start-script
 * sieht das in etwa so aus:
 * <pre>
 *   ipcMain.on("reload-app", function(event, arg) {
 *     console.log("APP RELOAD " + arg);
 *     mainWindow.loadURL(url.format({
 *                           pathname: path.join(__dirname, 'index.html'),
 *                           protocol: 'file:',
 *                           slashes: true
 *                        }));
 *   });
 * </pre>
 *
 */
// @dynamic
var ErrorService = /** @class */ (function () {
    function ErrorService(injector, electronService) {
        this.injector = injector;
        this.electronService = electronService;
        console.debug("c'tor ErrorService");
        this.errors = [];
    }
    ErrorService_1 = ErrorService;
    /**
     * Fehlerseite anzeigen
     *
     * Die Anwendung muss eine Route fuer "/error" bereitstellen.
     *
     * param {string} short
     * param {string} desc
     */
    ErrorService.prototype.newError = function (short, desc) {
        if (!this.router) {
            this.router = this.getRouter();
        }
        this.errors.push({ title: short, message: desc });
        console.debug("** newError");
        console.debug(short + " - " + desc);
        this.router.navigate(["/" + ErrorService_1.errorPage]);
    };
    ErrorService.prototype.getLastError = function () {
        if (this.errors && this.errors.length > 0) {
            return this.errors.pop();
        }
        else {
            return {};
        }
    };
    /**
     * Anwendung neu laden
     *
     * Im Browser wird das mit document.location.reload() erledigt.
     *
     * In electron wuerde das nicht funktionieren (zumindest nicht mit Angular-SPA).
     * Da muss der Reload auf der electron-Seite erfolgen. Im electron start-script
     * sieht das in etwa so aus:
     * <pre>
     *   ipcMain.on("reload-app", function(event, arg) {
     *     console.log("APP RELOAD " + arg);
     *     mainWindow.loadURL(url.format({
     *                           pathname: path.join(__dirname, 'index.html'),
     *                           protocol: 'file:',
     *                           slashes: true
     *                        }));
     *   });
     * </pre>
     */
    ErrorService.prototype.resetApp = function () {
        if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.send("reload-app", "errorService");
        }
        else {
            document.location.reload(true);
        }
    };
    /**
     * Zentraler Exception-Handler
     *
     * in AppModule:
     *  providers: [{provide: ErrorHandler, useClass: ErrorService}]
     *
     * {@link https://angular.io/api/core/ErrorHandler}
     *
     * param error
     */
    ErrorService.prototype.handleError = function (error) {
        console.debug("** handleError");
        console.dir(error);
        this.newError("Anwendungsfehler", error);
    };
    /*
      Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
      Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    ErrorService.prototype.getRouter = function () {
        return this.injector.get(Router);
    };
    var ErrorService_1;
    ErrorService.errorPage = "error";
    ErrorService.ctorParameters = function () { return [
        { type: Injector },
        { type: ElectronService }
    ]; };
    ErrorService = ErrorService_1 = __decorate([
        Injectable()
    ], ErrorService);
    return ErrorService;
}());

/**
 * JsonWebToken-Handling
 *
 * payloadd aus dem JWT holen/ JWT -Ablauf ueberpruefen
 *
 * lifted from {@link https://github.com/auth0/angular2-jwt}
 */
var JwtHelperService = /** @class */ (function () {
    function JwtHelperService() {
    }
    JwtHelperService.prototype.urlBase64Decode = function (str) {
        var output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += "==";
                break;
            }
            case 3: {
                output += "=";
                break;
            }
            default: {
                throw new Error("Illegal base64url string!");
            }
        }
        return this.b64DecodeUnicode(output);
    };
    JwtHelperService.prototype.decodeToken = function (token) {
        var parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("The inspected token doesn\'t appear to be a JWT. " +
                "Check to make sure it has three parts and see https://jwt.io for more.");
        }
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token.");
        }
        return JSON.parse(decoded);
    };
    JwtHelperService.prototype.getTokenExpirationDate = function (token) {
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    JwtHelperService.prototype.isTokenExpired = function (token, offsetSeconds) {
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    JwtHelperService.prototype.b64decode = function (str) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        str = String(str).replace(/=+$/, "");
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
        // initialize result and counters
        var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
        // get next character
        (buffer = str.charAt(idx++)); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    };
    JwtHelperService.prototype.b64DecodeUnicode = function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(""));
    };
    JwtHelperService = __decorate([
        Injectable()
    ], JwtHelperService);
    return JwtHelperService;
}());

/**
 * Fuer das Einfuegen der LogonParameter als provider im app.module.
 * <pre>
 *            providers   : [
 *             {
 *               provide: LOGON_OPTIONS,
 *               useValue:  {
 *                 logon           : "NTLM",
 *            ...
 * </pre>
 * @see {@link LogonParameter}
 * @see {@link LogonService}
 * @see {@link LogonInterceptor}
 *
 * type {InjectionToken<LogonParameter>}
 */
var LOGON_OPTIONS = new InjectionToken("LOGON_OPTIONS");

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

/**
 * {@link HttpInterceptor} fuer das Einfuegen eines JWT in die Aufrufe
 * zum REST-Server. Ausserdem werden HTTP-Fehler an den {@link ErrorService}
 * uebergeben (ausser 401 + 403, da wird die Anwendung neu geladen).
 *
 * Uebernommen aus {@link https://github.com/auth0/angular2-jwt}.
 *
 * @see {@link LOGON_OPTIONS}
 * @see {@link LogonService}
 * @see {@link LogonParameter}
 * @see {@link ErrorService}
 */
var LogonInterceptor = /** @class */ (function () {
    function LogonInterceptor(logonService, errorService) {
        this.logonService = logonService;
        this.errorService = errorService;
        this.whitelist = [];
        console.debug("c'tor LogonInterceptor");
        this.whitelist = logonService.urlsWithoutToken;
    }
    LogonInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (1 check) " + request.url);
        if (!this.logonService.active || this.isWhitelisted(request)) {
            // console.debug("no token check " + request.url);
            request = request.clone();
            return this.errorHandling(request, next);
        }
        else {
            var token = this.logonService.getTokenWithCheck();
            return from(token).pipe(mergeMap(function (asyncToken) {
                var _a;
                // console.debug("insert token into request " + request.url);
                request = request.clone({ setHeaders: (_a = {}, _a[JwtHeader] = asyncToken, _a) });
                return _this.errorHandling(request, next);
            }));
        }
    };
    LogonInterceptor.prototype.isWhitelisted = function (request) {
        return (this.whitelist.findIndex(function (addr) { return request.url.startsWith(addr); }) > -1);
    };
    LogonInterceptor.prototype.errorHandling = function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (2 call) " + request.url);
        return next.handle(request).pipe(catchError(function (err, obs) {
            console.debug("LogonInterceptor: errorHandling " + request.url);
            console.dir(err);
            if (err instanceof HttpErrorResponse) {
                if (err.status === 0 /*&& err.type === 3*/) { // network error (Server weg?)
                    console.debug("LogonInterceptor: network error");
                    _this.errorService.newError("Network Error", "Der Server ist nicht erreichbar.");
                }
                else if (err.status >= 400) {
                    console.debug("LogonInterceptor: HTTP-Error " + err.status);
                    if (err.status === 401 || err.status === 403) {
                        _this.errorService.resetApp();
                    }
                    else {
                        _this.errorService.newError(err.status + " - " + err.statusText, err.message || "Server liefert ungueltige Daten.");
                    }
                }
                return EMPTY; // Observable.empty();
            }
            else {
                // this.errorService.newError("Error", JSON.stringify(err));
                console.error("LogonInterceptor: unhandled exception - rethrow");
                return throwError(err);
            }
        }));
    };
    LogonInterceptor.ctorParameters = function () { return [
        { type: LogonService },
        { type: ErrorService }
    ]; };
    LogonInterceptor = __decorate([
        Injectable()
    ], LogonInterceptor);
    return LogonInterceptor;
}());

var VersionService = /** @class */ (function () {
    function VersionService(http, electronService, location) {
        this.http = http;
        this.electronService = electronService;
        this.location = location;
    }
    Object.defineProperty(VersionService.prototype, "ver", {
        get: function () {
            return this.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionService.prototype, "serverVer", {
        get: function () {
            return this.serverversion;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     */
    VersionService.prototype.init = function (serverPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var webserver;
            var _this = this;
            return __generator(this, function (_a) {
                webserver = this.location.prepareExternalUrl("");
                return [2 /*return*/, this.http.get(webserver + "package.json").toPromise()
                        .then(function (r) { return __awaiter(_this, void 0, void 0, function () {
                        var gh, e_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    r["versions"] = ["Angular " + VERSION.full];
                                    if (this.electronService.isElectron) {
                                        r["versions"].push("Electron " + this.electronService.electronVersion);
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.http.get(webserver + "resource/git.txt", { responseType: "text" }).toPromise()];
                                case 2:
                                    gh = _a.sent();
                                    r["githash"] = gh.replace(/\n/, "").replace(/\r/, "");
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    console.error("Fehler beim Lesen von ./resource/git.txt");
                                    r["githash"] = "";
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.version = this.makeVer(r);
                                    if (serverPackage) {
                                        return [2 /*return*/, this.http.get(serverPackage).toPromise()
                                                .then(function (sr) {
                                                _this.serverversion = _this.makeVer(sr);
                                                return _this.version;
                                            }).catch(function (err) {
                                                console.error("Fehler beim Ermitteln der Server-Version: " + err);
                                                return _this.version;
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, this.version];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    VersionService.prototype.makeVer = function (pack) {
        var pre = prerelease(pack.version); // ['alpha', 10] || [10]
        var prerel = "";
        var prebuild = null;
        if (pre && pre.length > 0) {
            if (typeof pre[0] === "number") {
                prebuild = +pre[0];
                prerel = "beta";
            }
            else {
                prerel = pre[0];
                prebuild = typeof pre[1] === "number" ? +pre[1] : 0;
            }
        }
        var version = {
            name: pack.name,
            displayname: pack.displayname,
            description: pack.description,
            version: pack.version,
            copyright: pack.copyright,
            author: pack.author,
            license: pack.license,
            major: major(pack.version),
            minor: minor(pack.version),
            patch: patch(pack.version),
            prerelease: prerel,
            build: prebuild,
            githash: pack.githash ? pack.githash : "",
            versions: pack.versions,
        };
        return version;
    };
    VersionService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ElectronService },
        { type: Location }
    ]; };
    VersionService = __decorate([
        Injectable()
    ], VersionService);
    return VersionService;
}());

// Verhindern, dass ErrorService mehrfach instanziiert wird
function initErrorHandler(errorService) {
    return errorService;
}
var LibClientModule = /** @class */ (function () {
    function LibClientModule() {
    }
    LibClientModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [FlexboxSplitter, FileSizePipe, IEDatePipe],
            declarations: [FlexboxSplitter, FileSizePipe, IEDatePipe],
            providers: [
                ElectronService,
                ErrorService,
                VersionService,
                LogonService,
                JwtHelperService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LogonInterceptor,
                    multi: true,
                },
                {
                    provide: ErrorHandler,
                    useFactory: initErrorHandler,
                    deps: [ErrorService],
                },
            ],
        })
    ], LibClientModule);
    return LibClientModule;
}());

/**
 * App-Configfile direkt, ohne Angular-Mechanismen. einlesen und
 * via AppConfig.settings.xxx in der Anwendung verfuegbar machen.
 *
 * Damit kann eine lokale Konfig-Datei geladen werden, bevor
 * Angular initialiert wird:
 *
 * <pre>
 *   AppConfig.load(environment.configFile).then(() => {
 *     platformBrowserDynamic().bootstrapModule(AppModule)
 *       .catch((err) => {
 *         console.info("Runtime-ERROR " + err);
 *       })
 *  });
 *  </pre>
 *
 * Falls der Angular-Compiler ngc ueber diese Datei stolpert:
 * in tsconfig.json unter "angularCompilerOptions" "strictMetadataEmit"
 * auf "false" setzen.
 */
// @dynamic
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.load = function (jsonFile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open("GET", jsonFile, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        _this.settings = JSON.parse(xhr.responseText);
                        resolve();
                    }
                    else {
                        reject("Could not load file '" + jsonFile + "': " + xhr.status);
                    }
                }
            };
            xhr.send();
        });
    };
    AppConfig.settings = {};
    AppConfig = __decorate([
        Injectable()
    ], AppConfig);
    return AppConfig;
}());

/**
 * Auf SSE Events reagieren
 */
var SseHandler = /** @class */ (function () {
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param serverUrl - Server-Adresse
     * @param sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    function SseHandler(serverUrl, sseAddr) {
        var _this = this;
        var sseUrl = makeSseUrl("farc");
        this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });
        this.sse.onopen = function (event) {
            console.debug("SSE open readystate=" + _this.sse.readyState);
        };
        this.addEventListener("init", function (event) {
            console.debug("SSE received initialization message");
        });
        this.sse.onerror = function (event) {
            console.error("EventSource failed. ");
            console.dir(event);
        };
    }
    /**
     * Listener fuer SSE Events anhaengen
     *
     *   event.lastEventId -> id
     *   event.type -> event
     *   event.data -> data
     *
     * @param type - Name des Event
     * @param listener - Listener-Funktion -> (event) => {}
     */
    SseHandler.prototype.addEventListener = function (type, listener) {
        console.debug("SSE addEventListener " + type);
        this.sse.addEventListener(type, listener);
    };
    SseHandler.prototype.removeEventListener = function (type, listener) {
        this.sse.removeEventListener(type, listener);
    };
    return SseHandler;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { AppConfig, ElectronService, ErrorService, FileSizePipe, FlexboxSplitter, IEDatePipe, JwtHelperService, LOGON_OPTIONS, LibClientModule, LogonInterceptor, LogonService, SseHandler, VersionService, initErrorHandler as ɵa };
//# sourceMappingURL=hb42-lib-client.js.map
