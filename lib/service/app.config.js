/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
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
export class AppConfig {
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
if (false) {
    /** @type {?} */
    AppConfig.settings;
}