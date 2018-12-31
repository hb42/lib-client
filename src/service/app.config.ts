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
@Injectable()
export class AppConfig {

  public static settings: any = {};

  public static load(jsonFile: string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", jsonFile, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.settings = JSON.parse(xhr.responseText);
            resolve();
          } else {
            reject(`Could not load file '${jsonFile}': ${xhr.status}`);
          }
        }
      };
      xhr.send();
    });
  }
}
