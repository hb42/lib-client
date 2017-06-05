/**
 * Created by a0770007 on 28.04.2017.
 */

import {
  Injectable,
} from "@angular/core";

/**
 * Verbindung zur electron runtime
 *
 *  Verwendung:
    public testElectron(electronService.ipcRenderer) {
      console.info("### sync reply " + ipcRenderer.sendSync("synchronous-message", "ping"));

      ipcRenderer.on("asynchronous-reply", (event, arg) => {
        console.info("### async reply " + arg);
      });
      ipcRenderer.send("asynchronous-message", "ping");
    }

 */
@Injectable()
export class ElectronService {

  private ipc_renderer;

  get ipcRenderer() {
    return this.ipc_renderer;
  }
  get isElectron() {
    return typeof this.ipc_renderer !== "undefined";
  }

  constructor() {
    /*
     electron mit window.require holen, das wird nicht von webpack ueberschrieben. Dadurch
     ignoriert webpack electron und packt es nicht in vendor.js. Ausserdem wird so die vorhandene
     electron-Runtime verwendet. window.require ist nur in einer node/electron-Umgebung vorhanden.
     -> https://github.com/electron/electron/issues/7300
     */
    if (typeof window["require"] === "function") {
      const electron = window["require"]("electron");
      if (electron) {
        this.ipc_renderer = electron.ipcRenderer;
      }
    }
  }

}
