/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, } from "@angular/core";
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
export class ElectronService {
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
            console.info("Running on electron runtime " + this.electronVersion);
            // console.dir(process.versions);
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ElectronService.prototype.ipcrenderer;
}
