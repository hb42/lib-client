/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "./electron.service";
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
export class ErrorService {
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
if (false) {
    /** @type {?} */
    ErrorService.errorPage;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.router;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.errors;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    ErrorService.prototype.electronService;
}
