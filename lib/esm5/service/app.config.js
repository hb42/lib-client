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
export { AppConfig };
if (false) {
    /** @type {?} */
    AppConfig.settings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2FwcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QjNDO0lBQUE7SUF1QkEsQ0FBQzs7Ozs7SUFsQmUsY0FBSTs7OztJQUFsQixVQUFtQixRQUFnQjtRQUFuQyxpQkFpQkM7UUFoQkMsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7Z0JBQzNCLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRTtZQUNoQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLGtCQUFrQjs7O1lBQUc7Z0JBQ3ZCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7d0JBQ3RCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQzdDLE9BQU8sRUFBRSxDQUFDO3FCQUNYO3lCQUFNO3dCQUNMLE1BQU0sQ0FBQywwQkFBd0IsUUFBUSxXQUFNLEdBQUcsQ0FBQyxNQUFRLENBQUMsQ0FBQztxQkFDNUQ7aUJBQ0Y7WUFDSCxDQUFDLENBQUEsQ0FBQztZQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQW5CYSxrQkFBUSxHQUFRLEVBQUUsQ0FBQzs7Z0JBSGxDLFVBQVU7O0lBdUJYLGdCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0F0QlksU0FBUzs7O0lBRXBCLG1CQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKipcbiAqIEFwcC1Db25maWdmaWxlIGRpcmVrdCwgb2huZSBBbmd1bGFyLU1lY2hhbmlzbWVuLiBlaW5sZXNlbiB1bmRcbiAqIHZpYSBBcHBDb25maWcuc2V0dGluZ3MueHh4IGluIGRlciBBbndlbmR1bmcgdmVyZnVlZ2JhciBtYWNoZW4uXG4gKlxuICogRGFtaXQga2FubiBlaW5lIGxva2FsZSBLb25maWctRGF0ZWkgZ2VsYWRlbiB3ZXJkZW4sIGJldm9yXG4gKiBBbmd1bGFyIGluaXRpYWxpZXJ0IHdpcmQ6XG4gKlxuICogPHByZT5cbiAqICAgQXBwQ29uZmlnLmxvYWQoZW52aXJvbm1lbnQuY29uZmlnRmlsZSkudGhlbigoKSA9PiB7XG4gKiAgICAgcGxhdGZvcm1Ccm93c2VyRHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpXG4gKiAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICogICAgICAgICBjb25zb2xlLmluZm8oXCJSdW50aW1lLUVSUk9SIFwiICsgZXJyKTtcbiAqICAgICAgIH0pXG4gKiAgfSk7XG4gKiAgPC9wcmU+XG4gKlxuICogRmFsbHMgZGVyIEFuZ3VsYXItQ29tcGlsZXIgbmdjIHVlYmVyIGRpZXNlIERhdGVpIHN0b2xwZXJ0OlxuICogaW4gdHNjb25maWcuanNvbiB1bnRlciBcImFuZ3VsYXJDb21waWxlck9wdGlvbnNcIiBcInN0cmljdE1ldGFkYXRhRW1pdFwiXG4gKiBhdWYgXCJmYWxzZVwiIHNldHplbi5cbiAqL1xuLy8gQGR5bmFtaWNcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBDb25maWcge1xuXG4gIHB1YmxpYyBzdGF0aWMgc2V0dGluZ3M6IGFueSA9IHt9O1xuXG4gIHB1YmxpYyBzdGF0aWMgbG9hZChqc29uRmlsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgeGhyLm9wZW4oXCJHRVRcIiwganNvbkZpbGUsIHRydWUpO1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChgQ291bGQgbm90IGxvYWQgZmlsZSAnJHtqc29uRmlsZX0nOiAke3hoci5zdGF0dXN9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19