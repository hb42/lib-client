/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        // const win: any = window;
        // if (typeof win.require === "function") {
        //   const electron = win.require("electron");
        //   if (electron) {
        //     this.ipcrenderer = electron.ipcRenderer;
        //   }
        // }
        if (this.isElectron) {
            console.info("Running on electron runtime " + this.electronVersion);
            // console.dir(process.versions); // Angular cli ab v6 unterstuetzt keine libs mit Abhaengikeiten zu node
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3Ryb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2VsZWN0cm9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxVQUFVLEdBQ1gsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQnZCLE1BQU0sT0FBTyxlQUFlO0lBa0IxQjtRQUNFOzs7OztXQUtHO1FBQ0gsMkJBQTJCO1FBQzNCLDJDQUEyQztRQUMzQyw4Q0FBOEM7UUFDOUMsb0JBQW9CO1FBQ3BCLCtDQUErQztRQUMvQyxNQUFNO1FBQ04sSUFBSTtRQUNKLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRSx5R0FBeUc7U0FDMUc7SUFDSCxDQUFDOzs7O0lBaENELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDOzs7O0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFDRCxJQUFJLGVBQWU7UUFDakIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7O1lBakJGLFVBQVU7Ozs7Ozs7OztJQUdULHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdGFibGUsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKlxuICogVmVyYmluZHVuZyB6dXIgZWxlY3Ryb24gcnVudGltZVxuICpcbiAqICBWZXJ3ZW5kdW5nOlxuICogIDxwcmU+XG4gKiAgIHB1YmxpYyB0ZXN0RWxlY3Ryb24oZWxlY3Ryb25TZXJ2aWNlLmlwY1JlbmRlcmVyKSB7XG4gKiAgICAgY29uc29sZS5pbmZvKFwiIyMjIHN5bmMgcmVwbHkgXCIgKyBpcGNSZW5kZXJlci5zZW5kU3luYyhcInN5bmNocm9ub3VzLW1lc3NhZ2VcIiwgXCJwaW5nXCIpKTtcbiAqXG4gKiAgICAgaXBjUmVuZGVyZXIub24oXCJhc3luY2hyb25vdXMtcmVwbHlcIiwgKGV2ZW50LCBhcmcpID0+IHtcbiAqICAgICAgIGNvbnNvbGUuaW5mbyhcIiMjIyBhc3luYyByZXBseSBcIiArIGFyZyk7XG4gKiAgICAgfSk7XG4gKiAgICAgaXBjUmVuZGVyZXIuc2VuZChcImFzeW5jaHJvbm91cy1tZXNzYWdlXCIsIFwicGluZ1wiKTtcbiAqICAgfVxuICogPC9wcmU+XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbGVjdHJvblNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaXBjcmVuZGVyZXI6IGFueTtcblxuICBnZXQgaXBjUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXBjcmVuZGVyZXI7XG4gIH1cbiAgZ2V0IGlzRWxlY3Ryb24oKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLmlwY3JlbmRlcmVyICE9PSBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGdldCBlbGVjdHJvblZlcnNpb24oKSB7XG4gICAgaWYgKHRoaXMuaXNFbGVjdHJvbikge1xuICAgICAgcmV0dXJuIHRoaXMuaXBjUmVuZGVyZXIuc2VuZFN5bmMoXCJnZXQtdmVyc2lvblwiLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLypcbiAgICAgZWxlY3Ryb24gbWl0IHdpbmRvdy5yZXF1aXJlIGhvbGVuLCBkYXMgd2lyZCBuaWNodCB2b24gd2VicGFjayB1ZWJlcnNjaHJpZWJlbi4gRGFkdXJjaFxuICAgICBpZ25vcmllcnQgd2VicGFjayBlbGVjdHJvbiB1bmQgcGFja3QgZXMgbmljaHQgaW4gdmVuZG9yLmpzLiBBdXNzZXJkZW0gd2lyZCBzbyBkaWUgdm9yaGFuZGVuZVxuICAgICBlbGVjdHJvbi1SdW50aW1lIHZlcndlbmRldC4gd2luZG93LnJlcXVpcmUgaXN0IG51ciBpbiBlaW5lciBub2RlL2VsZWN0cm9uLVVtZ2VidW5nIHZvcmhhbmRlbi5cbiAgICAgLT4ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvNzMwMH1cbiAgICAgKi9cbiAgICAvLyBjb25zdCB3aW46IGFueSA9IHdpbmRvdztcbiAgICAvLyBpZiAodHlwZW9mIHdpbi5yZXF1aXJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyAgIGNvbnN0IGVsZWN0cm9uID0gd2luLnJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbiAgICAvLyAgIGlmIChlbGVjdHJvbikge1xuICAgIC8vICAgICB0aGlzLmlwY3JlbmRlcmVyID0gZWxlY3Ryb24uaXBjUmVuZGVyZXI7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIGlmICh0aGlzLmlzRWxlY3Ryb24pIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhcIlJ1bm5pbmcgb24gZWxlY3Ryb24gcnVudGltZSBcIiArIHRoaXMuZWxlY3Ryb25WZXJzaW9uKTtcbiAgICAgIC8vIGNvbnNvbGUuZGlyKHByb2Nlc3MudmVyc2lvbnMpOyAvLyBBbmd1bGFyIGNsaSBhYiB2NiB1bnRlcnN0dWV0enQga2VpbmUgbGlicyBtaXQgQWJoYWVuZ2lrZWl0ZW4genUgbm9kZVxuICAgIH1cbiAgfVxuXG59XG4iXX0=