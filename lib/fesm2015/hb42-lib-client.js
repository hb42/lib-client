import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { prerelease, major, minor, patch } from 'semver';
import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { makeSseUrl, JwtToken, loginURL, JwtHeader } from '@hb42/lib-common';
import { EMPTY, from, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Directive, ElementRef, Input, Pipe, Injectable, Injector, VERSION, InjectionToken, Inject, ErrorHandler, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FlexboxSplitter {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        // inputs
        this.storageId = "";
        this.lastPos = 0;
        console.debug("c'tor flexboxsplitter");
        this.splitter = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Umgebung holen
        this.prevEl = (/** @type {?} */ (this.splitter.previousElementSibling));
        this.nextEl = (/** @type {?} */ (this.splitter.nextElementSibling));
        /** @type {?} */
        const parent = (/** @type {?} */ (this.splitter.parentElement));
        // parent muss flexbox sein
        // if (this.getProp(parent, "display") !== "flex") {
        //   throw "Error: parent element for splitter must have style display:flex.";
        // }
        // Richtung festlegen und passende Styles fuer den Splitter
        if (this.getProp(parent, "flexDirection") === "row") {
            this.dimension = "width";
            this.splitter.style[(/** @type {?} */ ("border-left"))] = "1px solid gray";
            this.splitter.style["cursor"] = "col-resize";
        }
        else {
            this.dimension = "height";
            this.splitter.style[(/** @type {?} */ ("border-top"))] = "1px solid gray";
            this.splitter.style["cursor"] = "row-resize";
        }
        this.splitter.style["background"] = "#eee";
        this.splitter.style[(/** @type {?} */ (this.dimension))] = "6px";
        // Elemente nur fuer fixe Groesse aendern, flexGrow >0 = auto
        // this.chgPrev = this.getProp(this.prevEl, "flexGrow") === 0;
        // this.chgNext = this.getProp(this.nextEl, "flexGrow") === 0;
        // los geht"s
        this.initSplitter();
    }
    /**
     * @private
     * @param {?} elem
     * @param {?} prop
     * @return {?}
     */
    getProp(elem, prop) {
        // window.getComputedStyle(elem).getPropertyValue(prop);
        // im *IE* fkt. getPropertyValue() nicht, alt. direkter Zugriff mit ["prop"]
        return window.getComputedStyle(elem)[(/** @type {?} */ (prop))];
    }
    /**
     * @private
     * @return {?}
     */
    initSplitter() {
        // let self: FlexboxSplitter = this;
        // let self: FlexboxSplitter = this;
        // var event = new Event("hb.splitter"); fkt. leider nicht im *IE*, statt dessen:
        /** @type {?} */
        const params = { bubbles: false, cancelable: false, detail: undefined };
        this.splitterEvent = document.createEvent("CustomEvent");
        this.splitterEvent
            .initCustomEvent(FlexboxSplitter.SPLITTER_EVENT, params.bubbles, params.cancelable, params.detail);
        /** @type {?} */
        const drag = (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.dimension === "width" ? calcSize(evt.clientX) : calcSize(evt.clientY);
        });
        /** @type {?} */
        const calcSize = (/**
         * @param {?} pos
         * @return {?}
         */
        (pos) => {
            /** @type {?} */
            let newsize;
            /** @type {?} */
            const diff = pos - this.lastPos;
            // if (self.chgPrev) {
            newsize = parseInt(this.getProp(this.prevEl, this.dimension), 10) + diff;
            this.prevEl.style[(/** @type {?} */ (this.dimension))] = newsize + "px";
            // }
            // if (self.chgNext) {
            newsize = parseInt(this.getProp(this.nextEl, this.dimension), 10) - diff;
            this.nextEl.style[(/** @type {?} */ (this.dimension))] = newsize + "px";
            // }
            this.lastPos = pos;
        });
        /** @type {?} */
        const endDrag = (/**
         * @return {?}
         */
        () => {
            window.removeEventListener("mousemove", drag);
            window.removeEventListener("mouseup", endDrag);
            // element bekommt list of listener als callbacks bei Aend
            // foreach listener listener()
            // -> Bsp eventService
            // fkt. nicht
            // var evt = document.createEvent("UIEvent");
            // evt.initUIEvent("resize", true, false,window,0);
            // window.dispatchEvent(evt);
            window.dispatchEvent(this.splitterEvent);
            // import f. jquery??
            // $(window).resize();
            if (this.storageId) {
                localStorage.setItem(this.storageId, this.lastPos.toString(10));
            }
        });
        this.splitter.addEventListener("mousedown", (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            evt.preventDefault(); // prevent text selection
            this.lastPos = this.dimension === "width" ? evt.clientX : evt.clientY;
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);
        }));
        // default pos setzen, oder ggf. letzten Stand holen
        this.lastPos = this.dimension === "width" ? this.splitter.getBoundingClientRect().left
            : this.splitter.getBoundingClientRect().top;
        if (this.storageId) {
            /** @type {?} */
            const state = localStorage.getItem(this.storageId);
            /** @type {?} */
            const laststate = parseInt(state ? state : "0", 10);
            if (laststate) {
                calcSize(laststate);
            }
        }
    }
}
FlexboxSplitter.SPLITTER_EVENT = "hbsplitter";
FlexboxSplitter.decorators = [
    { type: Directive, args: [{
                selector: "[fb-splitter]",
            },] }
];
/** @nocollapse */
FlexboxSplitter.ctorParameters = () => [
    { type: ElementRef }
];
FlexboxSplitter.propDecorators = {
    storageId: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileSizePipe {
    constructor() {
        this.suffix = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value /*, params: any[]*/) {
        /** @type {?} */
        const item = Number(value);
        return this.conv(item, 0);
    }
    /**
     * @private
     * @param {?} val
     * @param {?} idx
     * @return {?}
     */
    conv(val, idx) {
        if (val < 1024) {
            return val + " " + this.suffix[idx];
        }
        else {
            return this.conv(Math.round(val / 1024), ++idx);
        }
    }
}
FileSizePipe.decorators = [
    { type: Pipe, args: [{
                name: "filesize"
            },] }
];
/** @nocollapse */
FileSizePipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date pipe, die auch im IE funktioniert, liefert date:"dd.MM.y HH:mm:ss"
 * -> https://github.com/angular/angular/issues/9524
 * -> https://marcoscaceres.github.io/jsi18n/
 *
 * *** hat sich erledigt, seit Angular5 funktioniert's ***
 */
class IEDatePipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        /** @type {?} */
        const d = new Date(value);
        return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" }) + " "
            + d.toLocaleTimeString();
    }
}
IEDatePipe.decorators = [
    { type: Pipe, args: [{
                name: "iedate"
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class ElectronService {
    constructor() {
        /*
             electron mit window.require holen, das wird nicht von webpack ueberschrieben. Dadurch
             ignoriert webpack electron und packt es nicht in vendor.js. Ausserdem wird so die vorhandene
             electron-Runtime verwendet. window.require ist nur in einer node/electron-Umgebung vorhanden.
             -> {@link https://github.com/electron/electron/issues/7300}
             */
        /** @type {?} */
        const win = window;
        if (typeof win.require === "function") {
            /** @type {?} */
            const electron = win.require("electron");
            if (electron) {
                this.ipcrenderer = electron.ipcRenderer;
            }
        }
        if (this.isElectron) {
            console.info("Running on electron runtime:");
            console.dir(process.versions);
        }
    }
    /**
     * @return {?}
     */
    get ipcRenderer() {
        return this.ipcrenderer;
    }
    /**
     * @return {?}
     */
    get isElectron() {
        return typeof this.ipcrenderer !== "undefined";
    }
    /**
     * @return {?}
     */
    get electronVersion() {
        if (this.isElectron) {
            return this.ipcRenderer.sendSync("get-version", "");
        }
        else {
            return null;
        }
    }
}
ElectronService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ElectronService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class ErrorService {
    /**
     * @param {?} injector
     * @param {?} electronService
     */
    constructor(injector, electronService) {
        this.injector = injector;
        this.electronService = electronService;
        console.debug("c'tor ErrorService");
        this.errors = [];
    }
    /**
     * Fehlerseite anzeigen
     *
     * Die Anwendung muss eine Route fuer "/error" bereitstellen.
     *
     * param {string} short
     * param {string} desc
     * @param {?} short
     * @param {?} desc
     * @return {?}
     */
    newError(short, desc) {
        if (!this.router) {
            this.router = this.getRouter();
        }
        this.errors.push({ title: short, message: desc });
        console.debug("** newError");
        console.debug(short + " - " + desc);
        this.router.navigate(["/" + ErrorService.errorPage]);
    }
    /**
     * @return {?}
     */
    getLastError() {
        if (this.errors && this.errors.length > 0) {
            return this.errors.pop();
        }
        else {
            return {};
        }
    }
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
     * @return {?}
     */
    resetApp() {
        if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.send("reload-app", "errorService");
        }
        else {
            (/** @type {?} */ (document.location)).reload(true);
        }
    }
    /**
     * Zentraler Exception-Handler
     *
     * in AppModule:
     *  providers: [{provide: ErrorHandler, useClass: ErrorService}]
     *
     * {\@link https://angular.io/api/core/ErrorHandler}
     *
     * param error
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        console.debug("** handleError");
        console.dir(error);
        this.newError("Anwendungsfehler", error);
    }
    /*
        Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
        Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    getRouter() {
        return this.injector.get(Router);
    }
}
ErrorService.errorPage = "error";
ErrorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ErrorService.ctorParameters = () => [
    { type: Injector },
    { type: ElectronService }
];

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class VersionService {
    /**
     * @param {?} http
     * @param {?} electronService
     * @param {?} location
     */
    constructor(http, electronService, location) {
        this.http = http;
        this.electronService = electronService;
        this.location = location;
    }
    /**
     * @return {?}
     */
    get ver() {
        return this.version;
    }
    /**
     * @return {?}
     */
    get serverVer() {
        return this.serverversion;
    }
    /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     * @param {?} serverPackage
     * @return {?}
     */
    init(serverPackage) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const webserver = this.location.prepareExternalUrl("");
            return this.http.get(webserver + "package.json").toPromise()
                .then((/**
             * @param {?} r
             * @return {?}
             */
            (r) => __awaiter(this, void 0, void 0, function* () {
                r["versions"] = ["Angular " + VERSION.full];
                if (this.electronService.isElectron) {
                    r["versions"].push("Electron " + this.electronService.electronVersion);
                }
                try {
                    /** @type {?} */
                    const gh = yield this.http.get(webserver + "resource/git.txt", { responseType: "text" }).toPromise();
                    r["githash"] = gh.replace(/\n/, "").replace(/\r/, "");
                }
                catch (e) {
                    console.error("Fehler beim Lesen von ./resource/git.txt");
                    r["githash"] = "";
                }
                this.version = this.makeVer(r);
                if (serverPackage) {
                    return this.http.get(serverPackage).toPromise()
                        .then((/**
                     * @param {?} sr
                     * @return {?}
                     */
                    (sr) => {
                        this.serverversion = this.makeVer(sr);
                        return this.version;
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    (err) => {
                        console.error("Fehler beim Ermitteln der Server-Version: " + err);
                        return this.version;
                    }));
                }
                else {
                    return this.version;
                }
            })));
        });
    }
    /**
     * @private
     * @param {?} pack
     * @return {?}
     */
    makeVer(pack) {
        /** @type {?} */
        const pre = prerelease(pack.version);
        // ~['alpha', 10]
        /** @type {?} */
        let prerel = "";
        /** @type {?} */
        let prebuild = null;
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
        /** @type {?} */
        const version = {
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
    }
}
VersionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VersionService.ctorParameters = () => [
    { type: HttpClient },
    { type: ElectronService },
    { type: Location }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Auf SSE Events reagieren
 */
class SseHandler {
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param {?} serverUrl - Server-Adresse
     * @param {?} sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    constructor(serverUrl, sseAddr) {
        /** @type {?} */
        const sseUrl = makeSseUrl("farc");
        this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });
        this.sse.onopen = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.debug("SSE open readystate=" + this.sse.readyState);
        });
        this.addEventListener("init", (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.debug("SSE received initialization message");
        }));
        this.sse.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            console.error("EventSource failed. ");
            console.dir(event);
        });
    }
    /**
     * Listener fuer SSE Events anhaengen
     *
     *   event.lastEventId -> id
     *   event.type -> event
     *   event.data -> data
     *
     * @param {?} type - Name des Event
     * @param {?} listener - Listener-Funktion -> (event) => {}
     * @return {?}
     */
    addEventListener(type, listener) {
        console.debug("SSE addEventListener " + type);
        this.sse.addEventListener(type, listener);
    }
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    removeEventListener(type, listener) {
        this.sse.removeEventListener(type, listener);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * JsonWebToken-Handling
 *
 * payloadd aus dem JWT holen/ JWT -Ablauf ueberpruefen
 *
 * lifted from {\@link https://github.com/auth0/angular2-jwt}
 */
class JwtHelperService {
    /**
     * @param {?} str
     * @return {?}
     */
    urlBase64Decode(str) {
        /** @type {?} */
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
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
    }
    /**
     * @param {?} token
     * @return {?}
     */
    decodeToken(token) {
        /** @type {?} */
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("The inspected token doesn\'t appear to be a JWT. " +
                "Check to make sure it has three parts and see https://jwt.io for more.");
        }
        /** @type {?} */
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token.");
        }
        return JSON.parse(decoded);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    getTokenExpirationDate(token) {
        /** @type {?} */
        let decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }
        /** @type {?} */
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    isTokenExpired(token, offsetSeconds) {
        /** @type {?} */
        const date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64decode(str) {
        /** @type {?} */
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        /** @type {?} */
        let output = "";
        str = String(str).replace(/=+$/, "");
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
        // initialize result and counters
        let bc = 0, bs, buffer, idx = 0; 
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
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (/**
         * @param {?} c
         * @return {?}
         */
        (c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }))
            .join(""));
    }
}
JwtHelperService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @see {\@link LogonParameter}
 * @see {\@link LogonService}
 * @see {\@link LogonInterceptor}
 *
 * type {InjectionToken<LogonParameter>}
 * @type {?}
 */
const LOGON_OPTIONS = new InjectionToken("LOGON_OPTIONS");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class LogonService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * {\@link HttpInterceptor} fuer das Einfuegen eines JWT in die Aufrufe
 * zum REST-Server. Ausserdem werden HTTP-Fehler an den {\@link ErrorService}
 * uebergeben (ausser 401 + 403, da wird die Anwendung neu geladen).
 *
 * Uebernommen aus {\@link https://github.com/auth0/angular2-jwt}.
 *
 * @see {\@link LOGON_OPTIONS}
 * @see {\@link LogonService}
 * @see {\@link LogonParameter}
 * @see {\@link ErrorService}
 */
class LogonInterceptor {
    /**
     * @param {?} logonService
     * @param {?} errorService
     */
    constructor(logonService, errorService) {
        this.logonService = logonService;
        this.errorService = errorService;
        this.whitelist = [];
        console.debug("c'tor LogonInterceptor");
        this.whitelist = logonService.urlsWithoutToken;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        // console.debug("INTERCEPT (1 check) " + request.url);
        if (!this.logonService.active || this.isWhitelisted(request)) {
            // console.debug("no token check " + request.url);
            request = request.clone();
            return this.errorHandling(request, next);
        }
        else {
            /** @type {?} */
            const token = this.logonService.getTokenWithCheck();
            return from(token).pipe(mergeMap((/**
             * @param {?} asyncToken
             * @return {?}
             */
            (asyncToken) => {
                // console.debug("insert token into request " + request.url);
                request = request.clone({ setHeaders: { [JwtHeader]: asyncToken } });
                return this.errorHandling(request, next);
            })));
        }
    }
    /**
     * @private
     * @param {?} request
     * @return {?}
     */
    isWhitelisted(request) {
        return (this.whitelist.findIndex((/**
         * @param {?} addr
         * @return {?}
         */
        (addr) => request.url.startsWith(addr))) > -1);
    }
    /**
     * @private
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    errorHandling(request, next) {
        // console.debug("INTERCEPT (2 call) " + request.url);
        return next.handle(request).pipe(catchError((/**
         * @param {?} err
         * @param {?} obs
         * @return {?}
         */
        (err, obs) => {
            console.debug("LogonInterceptor: errorHandling " + request.url);
            console.dir(err);
            if (err instanceof HttpErrorResponse) {
                if (err.status === 0 /*&& err.type === 3*/) { // network error (Server weg?)
                    console.debug("LogonInterceptor: network error");
                    this.errorService.newError("Network Error", "Der Server ist nicht erreichbar.");
                }
                else if (err.status >= 400) {
                    console.debug("LogonInterceptor: HTTP-Error " + err.status);
                    if (err.status === 401 || err.status === 403) {
                        this.errorService.resetApp();
                    }
                    else {
                        this.errorService.newError(err.status + " - " + err.statusText, err.message || "Server liefert ungueltige Daten.");
                    }
                }
                return EMPTY; // Observable.empty();
            }
            else {
                // this.errorService.newError("Error", JSON.stringify(err));
                console.error("LogonInterceptor: unhandled exception - rethrow");
                return throwError(err);
            }
        })));
    }
}
LogonInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LogonInterceptor.ctorParameters = () => [
    { type: LogonService },
    { type: ErrorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class AppConfig {
    /**
     * @param {?} jsonFile
     * @return {?}
     */
    static load(jsonFile) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open("GET", jsonFile, true);
            xhr.onreadystatechange = (/**
             * @return {?}
             */
            () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.settings = JSON.parse(xhr.responseText);
                        resolve();
                    }
                    else {
                        reject(`Could not load file '${jsonFile}': ${xhr.status}`);
                    }
                }
            });
            xhr.send();
        }));
    }
}
AppConfig.settings = {};
AppConfig.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Verhindern, dass ErrorService mehrfach instanziiert wird
/**
 * @param {?} errorService
 * @return {?}
 */
function initErrorHandler(errorService) {
    return errorService;
}
class LibClientModule {
}
LibClientModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { LibClientModule, ElectronService, ErrorService, VersionService, SseHandler, JwtHelperService, LogonService, LogonInterceptor, LOGON_OPTIONS, AppConfig, FlexboxSplitter, FileSizePipe, IEDatePipe, FlexboxSplitter as ɵb, initErrorHandler as ɵa, FileSizePipe as ɵc, IEDatePipe as ɵd, JwtHelperService as ɵf, LogonInterceptor as ɵg, LogonService as ɵe };

//# sourceMappingURL=hb42-lib-client.js.map