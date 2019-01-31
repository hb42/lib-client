var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppConfig = class AppConfig {
    static load(jsonFile) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open("GET", jsonFile, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.settings = JSON.parse(xhr.responseText);
                        resolve();
                    }
                    else {
                        reject(`Could not load file '${jsonFile}': ${xhr.status}`);
                    }
                }
            };
            xhr.send();
        });
    }
};
AppConfig.settings = {};
AppConfig = __decorate([
    Injectable()
], AppConfig);
export { AppConfig };
//# sourceMappingURL=app.config.js.map