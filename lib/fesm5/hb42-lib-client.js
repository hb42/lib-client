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
var FlexboxSplitter = /** @class */ (function () {
    function FlexboxSplitter(el) {
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
    FlexboxSplitter.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Umgebung holen
        this.prevEl = (/** @type {?} */ (this.splitter.previousElementSibling));
        this.nextEl = (/** @type {?} */ (this.splitter.nextElementSibling));
        /** @type {?} */
        var parent = (/** @type {?} */ (this.splitter.parentElement));
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
    };
    /**
     * @private
     * @param {?} elem
     * @param {?} prop
     * @return {?}
     */
    FlexboxSplitter.prototype.getProp = /**
     * @private
     * @param {?} elem
     * @param {?} prop
     * @return {?}
     */
    function (elem, prop) {
        // window.getComputedStyle(elem).getPropertyValue(prop);
        // im *IE* fkt. getPropertyValue() nicht, alt. direkter Zugriff mit ["prop"]
        return window.getComputedStyle(elem)[(/** @type {?} */ (prop))];
    };
    /**
     * @private
     * @return {?}
     */
    FlexboxSplitter.prototype.initSplitter = /**
     * @private
     * @return {?}
     */
    function () {
        // let self: FlexboxSplitter = this;
        var _this = this;
        // let self: FlexboxSplitter = this;
        // var event = new Event("hb.splitter"); fkt. leider nicht im *IE*, statt dessen:
        /** @type {?} */
        var params = { bubbles: false, cancelable: false, detail: undefined };
        this.splitterEvent = document.createEvent("CustomEvent");
        this.splitterEvent
            .initCustomEvent(FlexboxSplitter.SPLITTER_EVENT, params.bubbles, params.cancelable, params.detail);
        /** @type {?} */
        var drag = (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.dimension === "width" ? calcSize(evt.clientX) : calcSize(evt.clientY);
        });
        /** @type {?} */
        var calcSize = (/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) {
            /** @type {?} */
            var newsize;
            /** @type {?} */
            var diff = pos - _this.lastPos;
            // if (self.chgPrev) {
            newsize = parseInt(_this.getProp(_this.prevEl, _this.dimension), 10) + diff;
            _this.prevEl.style[(/** @type {?} */ (_this.dimension))] = newsize + "px";
            // }
            // if (self.chgNext) {
            newsize = parseInt(_this.getProp(_this.nextEl, _this.dimension), 10) - diff;
            _this.nextEl.style[(/** @type {?} */ (_this.dimension))] = newsize + "px";
            // }
            _this.lastPos = pos;
        });
        /** @type {?} */
        var endDrag = (/**
         * @return {?}
         */
        function () {
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
        });
        this.splitter.addEventListener("mousedown", (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            evt.preventDefault(); // prevent text selection
            _this.lastPos = _this.dimension === "width" ? evt.clientX : evt.clientY;
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);
        }));
        // default pos setzen, oder ggf. letzten Stand holen
        this.lastPos = this.dimension === "width" ? this.splitter.getBoundingClientRect().left
            : this.splitter.getBoundingClientRect().top;
        if (this.storageId) {
            /** @type {?} */
            var state = localStorage.getItem(this.storageId);
            /** @type {?} */
            var laststate = parseInt(state ? state : "0", 10);
            if (laststate) {
                calcSize(laststate);
            }
        }
    };
    FlexboxSplitter.SPLITTER_EVENT = "hbsplitter";
    FlexboxSplitter.decorators = [
        { type: Directive, args: [{
                    selector: "[fb-splitter]",
                },] }
    ];
    /** @nocollapse */
    FlexboxSplitter.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FlexboxSplitter.propDecorators = {
        storageId: [{ type: Input }]
    };
    return FlexboxSplitter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
        this.suffix = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FileSizePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value /*, params: any[]*/) {
        /** @type {?} */
        var item = Number(value);
        return this.conv(item, 0);
    };
    /**
     * @private
     * @param {?} val
     * @param {?} idx
     * @return {?}
     */
    FileSizePipe.prototype.conv = /**
     * @private
     * @param {?} val
     * @param {?} idx
     * @return {?}
     */
    function (val, idx) {
        if (val < 1024) {
            return val + " " + this.suffix[idx];
        }
        else {
            return this.conv(Math.round(val / 1024), ++idx);
        }
    };
    FileSizePipe.decorators = [
        { type: Pipe, args: [{
                    name: "filesize"
                },] }
    ];
    /** @nocollapse */
    FileSizePipe.ctorParameters = function () { return []; };
    return FileSizePipe;
}());

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
var IEDatePipe = /** @class */ (function () {
    function IEDatePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    IEDatePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var d = new Date(value);
        return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" }) + " "
            + d.toLocaleTimeString();
    };
    IEDatePipe.decorators = [
        { type: Pipe, args: [{
                    name: "iedate"
                },] }
    ];
    return IEDatePipe;
}());

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
var ElectronService = /** @class */ (function () {
    function ElectronService() {
        /*
             electron mit window.require holen, das wird nicht von webpack ueberschrieben. Dadurch
             ignoriert webpack electron und packt es nicht in vendor.js. Ausserdem wird so die vorhandene
             electron-Runtime verwendet. window.require ist nur in einer node/electron-Umgebung vorhanden.
             -> {@link https://github.com/electron/electron/issues/7300}
             */
        /** @type {?} */
        var win = window;
        if (typeof win.require === "function") {
            /** @type {?} */
            var electron = win.require("electron");
            if (electron) {
                this.ipcrenderer = electron.ipcRenderer;
            }
        }
        if (this.isElectron) {
            console.info("Running on electron runtime:");
            console.dir(process.versions);
        }
    }
    Object.defineProperty(ElectronService.prototype, "ipcRenderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ipcrenderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "isElectron", {
        get: /**
         * @return {?}
         */
        function () {
            return typeof this.ipcrenderer !== "undefined";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectronService.prototype, "electronVersion", {
        get: /**
         * @return {?}
         */
        function () {
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
    ElectronService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ElectronService.ctorParameters = function () { return []; };
    return ElectronService;
}());

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
var ErrorService = /** @class */ (function () {
    function ErrorService(injector, electronService) {
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
     */
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
    ErrorService.prototype.newError = /**
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
    function (short, desc) {
        if (!this.router) {
            this.router = this.getRouter();
        }
        this.errors.push({ title: short, message: desc });
        console.debug("** newError");
        console.debug(short + " - " + desc);
        this.router.navigate(["/" + ErrorService.errorPage]);
    };
    /**
     * @return {?}
     */
    ErrorService.prototype.getLastError = /**
     * @return {?}
     */
    function () {
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
    ErrorService.prototype.resetApp = /**
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
    function () {
        if (this.electronService.isElectron) {
            this.electronService.ipcRenderer.send("reload-app", "errorService");
        }
        else {
            (/** @type {?} */ (document.location)).reload(true);
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
    ErrorService.prototype.handleError = /**
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
    function (error) {
        console.debug("** handleError");
        console.dir(error);
        this.newError("Anwendungsfehler", error);
    };
    /*
      Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
      Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
      -> https://stackoverflow.com/questions/39767019
     */
    /*
        Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
        Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    ErrorService.prototype.getRouter = /*
        Router kann nicht per DI geholt werden, da das eine zyklische Abhaengigkeit ausloest (Http -> Router-> Http)
        Wenn Router spaeter geholt wird, gibt es keine Probleme. Entspricht nicht der reinen Lehre -> wenn mal Zeit ist
        -> https://stackoverflow.com/questions/39767019
       */
    /**
     * @private
     * @return {?}
     */
    function () {
        return this.injector.get(Router);
    };
    ErrorService.errorPage = "error";
    ErrorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ErrorService.ctorParameters = function () { return [
        { type: Injector },
        { type: ElectronService }
    ]; };
    return ErrorService;
}());

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var VersionService = /** @class */ (function () {
    function VersionService(http, electronService, location) {
        this.http = http;
        this.electronService = electronService;
        this.location = location;
    }
    Object.defineProperty(VersionService.prototype, "ver", {
        get: /**
         * @return {?}
         */
        function () {
            return this.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionService.prototype, "serverVer", {
        get: /**
         * @return {?}
         */
        function () {
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
    VersionService.prototype.init = /**
     * Versions-Resource aus package.json initialisieren.
     * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
     * deren Aufruf die package.json des Servers liefert.
     *
     * param {string} serverPackage
     * returns {Promise<Version>}
     * @param {?} serverPackage
     * @return {?}
     */
    function (serverPackage) {
        return __awaiter(this, void 0, void 0, function () {
            var webserver;
            var _this = this;
            return __generator(this, function (_a) {
                webserver = this.location.prepareExternalUrl("");
                return [2 /*return*/, this.http.get(webserver + "package.json").toPromise()
                        .then((/**
                     * @param {?} r
                     * @return {?}
                     */
                    function (r) { return __awaiter(_this, void 0, void 0, function () {
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
                                                .then((/**
                                             * @param {?} sr
                                             * @return {?}
                                             */
                                            function (sr) {
                                                _this.serverversion = _this.makeVer(sr);
                                                return _this.version;
                                            })).catch((/**
                                             * @param {?} err
                                             * @return {?}
                                             */
                                            function (err) {
                                                console.error("Fehler beim Ermitteln der Server-Version: " + err);
                                                return _this.version;
                                            }))];
                                    }
                                    else {
                                        return [2 /*return*/, this.version];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            });
        });
    };
    /**
     * @private
     * @param {?} pack
     * @return {?}
     */
    VersionService.prototype.makeVer = /**
     * @private
     * @param {?} pack
     * @return {?}
     */
    function (pack) {
        /** @type {?} */
        var pre = prerelease(pack.version);
        // ~['alpha', 10]
        /** @type {?} */
        var prerel = "";
        /** @type {?} */
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
        /** @type {?} */
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
    VersionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    VersionService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ElectronService },
        { type: Location }
    ]; };
    return VersionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Auf SSE Events reagieren
 */
var  /**
 * Auf SSE Events reagieren
 */
SseHandler = /** @class */ (function () {
    /**
     * EventSource fuer den Empfang von Server Sent Events erzeugen
     *
     * @param serverUrl - Server-Adresse
     * @param sseAddr - SSE-Aufruf (wird intern auf /sse/<sseAddr> umgesetzt)
     */
    function SseHandler(serverUrl, sseAddr) {
        var _this = this;
        /** @type {?} */
        var sseUrl = makeSseUrl("farc");
        this.sse = new EventSource(serverUrl + sseUrl, { withCredentials: true });
        this.sse.onopen = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            console.debug("SSE open readystate=" + _this.sse.readyState);
        });
        this.addEventListener("init", (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            console.debug("SSE received initialization message");
        }));
        this.sse.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
     * @param type - Name des Event
     * @param listener - Listener-Funktion -> (event) => {}
     */
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
    SseHandler.prototype.addEventListener = /**
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
    function (type, listener) {
        console.debug("SSE addEventListener " + type);
        this.sse.addEventListener(type, listener);
    };
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    SseHandler.prototype.removeEventListener = /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    function (type, listener) {
        this.sse.removeEventListener(type, listener);
    };
    return SseHandler;
}());

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
var JwtHelperService = /** @class */ (function () {
    function JwtHelperService() {
    }
    /**
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.urlBase64Decode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
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
    /**
     * @param {?} token
     * @return {?}
     */
    JwtHelperService.prototype.decodeToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("The inspected token doesn\'t appear to be a JWT. " +
                "Check to make sure it has three parts and see https://jwt.io for more.");
        }
        /** @type {?} */
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("Cannot decode the token.");
        }
        return JSON.parse(decoded);
    };
    /**
     * @param {?} token
     * @return {?}
     */
    JwtHelperService.prototype.getTokenExpirationDate = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        /** @type {?} */
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty("exp")) {
            return null;
        }
        /** @type {?} */
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    JwtHelperService.prototype.isTokenExpired = /**
     * @param {?} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    function (token, offsetSeconds) {
        /** @type {?} */
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.b64decode = /* tslint:disable: no-conditional-assignment no-bitwise ban-comma-operator */
    // credits for decoder goes to https://github.com/atk
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        /** @type {?} */
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
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.b64DecodeUnicode = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), (/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }))
            .join(""));
    };
    JwtHelperService.decorators = [
        { type: Injectable }
    ];
    return JwtHelperService;
}());

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
var LOGON_OPTIONS = new InjectionToken("LOGON_OPTIONS");

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
var LogonInterceptor = /** @class */ (function () {
    function LogonInterceptor(logonService, errorService) {
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
    LogonInterceptor.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (1 check) " + request.url);
        if (!this.logonService.active || this.isWhitelisted(request)) {
            // console.debug("no token check " + request.url);
            request = request.clone();
            return this.errorHandling(request, next);
        }
        else {
            /** @type {?} */
            var token = this.logonService.getTokenWithCheck();
            return from(token).pipe(mergeMap((/**
             * @param {?} asyncToken
             * @return {?}
             */
            function (asyncToken) {
                var _a;
                // console.debug("insert token into request " + request.url);
                request = request.clone({ setHeaders: (_a = {}, _a[JwtHeader] = asyncToken, _a) });
                return _this.errorHandling(request, next);
            })));
        }
    };
    /**
     * @private
     * @param {?} request
     * @return {?}
     */
    LogonInterceptor.prototype.isWhitelisted = /**
     * @private
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return (this.whitelist.findIndex((/**
         * @param {?} addr
         * @return {?}
         */
        function (addr) { return request.url.startsWith(addr); })) > -1);
    };
    /**
     * @private
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    LogonInterceptor.prototype.errorHandling = /**
     * @private
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        var _this = this;
        // console.debug("INTERCEPT (2 call) " + request.url);
        return next.handle(request).pipe(catchError((/**
         * @param {?} err
         * @param {?} obs
         * @return {?}
         */
        function (err, obs) {
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
        })));
    };
    LogonInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LogonInterceptor.ctorParameters = function () { return [
        { type: LogonService },
        { type: ErrorService }
    ]; };
    return LogonInterceptor;
}());

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
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    /**
     * @param {?} jsonFile
     * @return {?}
     */
    AppConfig.load = /**
     * @param {?} jsonFile
     * @return {?}
     */
    function (jsonFile) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open("GET", jsonFile, true);
            xhr.onreadystatechange = (/**
             * @return {?}
             */
            function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        _this.settings = JSON.parse(xhr.responseText);
                        resolve();
                    }
                    else {
                        reject("Could not load file '" + jsonFile + "': " + xhr.status);
                    }
                }
            });
            xhr.send();
        }));
    };
    AppConfig.settings = {};
    AppConfig.decorators = [
        { type: Injectable }
    ];
    return AppConfig;
}());

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
var LibClientModule = /** @class */ (function () {
    function LibClientModule() {
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
    return LibClientModule;
}());

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