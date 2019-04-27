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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJzZXJ2aWNlL2FwcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QjNDLE1BQU0sT0FBTyxTQUFTOzs7OztJQUliLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBZ0I7UUFDakMsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2tCQUMvQixHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUU7WUFDaEMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxrQkFBa0I7OztZQUFHLEdBQUcsRUFBRTtnQkFDNUIsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtvQkFDeEIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTt3QkFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDN0MsT0FBTyxFQUFFLENBQUM7cUJBQ1g7eUJBQU07d0JBQ0wsTUFBTSxDQUFDLHdCQUF3QixRQUFRLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7cUJBQzVEO2lCQUNGO1lBQ0gsQ0FBQyxDQUFBLENBQUM7WUFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O0FBbkJhLGtCQUFRLEdBQVEsRUFBRSxDQUFDOztZQUhsQyxVQUFVOzs7O0lBR1QsbUJBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKlxuICogQXBwLUNvbmZpZ2ZpbGUgZGlyZWt0LCBvaG5lIEFuZ3VsYXItTWVjaGFuaXNtZW4uIGVpbmxlc2VuIHVuZFxuICogdmlhIEFwcENvbmZpZy5zZXR0aW5ncy54eHggaW4gZGVyIEFud2VuZHVuZyB2ZXJmdWVnYmFyIG1hY2hlbi5cbiAqXG4gKiBEYW1pdCBrYW5uIGVpbmUgbG9rYWxlIEtvbmZpZy1EYXRlaSBnZWxhZGVuIHdlcmRlbiwgYmV2b3JcbiAqIEFuZ3VsYXIgaW5pdGlhbGllcnQgd2lyZDpcbiAqXG4gKiA8cHJlPlxuICogICBBcHBDb25maWcubG9hZChlbnZpcm9ubWVudC5jb25maWdGaWxlKS50aGVuKCgpID0+IHtcbiAqICAgICBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSlcbiAqICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gKiAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlJ1bnRpbWUtRVJST1IgXCIgKyBlcnIpO1xuICogICAgICAgfSlcbiAqICB9KTtcbiAqICA8L3ByZT5cbiAqXG4gKiBGYWxscyBkZXIgQW5ndWxhci1Db21waWxlciBuZ2MgdWViZXIgZGllc2UgRGF0ZWkgc3RvbHBlcnQ6XG4gKiBpbiB0c2NvbmZpZy5qc29uIHVudGVyIFwiYW5ndWxhckNvbXBpbGVyT3B0aW9uc1wiIFwic3RyaWN0TWV0YWRhdGFFbWl0XCJcbiAqIGF1ZiBcImZhbHNlXCIgc2V0emVuLlxuICovXG4vLyBAZHluYW1pY1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcENvbmZpZyB7XG5cbiAgcHVibGljIHN0YXRpYyBzZXR0aW5nczogYW55ID0ge307XG5cbiAgcHVibGljIHN0YXRpYyBsb2FkKGpzb25GaWxlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICB4aHIub3BlbihcIkdFVFwiLCBqc29uRmlsZSwgdHJ1ZSk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KGBDb3VsZCBub3QgbG9hZCBmaWxlICcke2pzb25GaWxlfSc6ICR7eGhyLnN0YXR1c31gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIuc2VuZCgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=