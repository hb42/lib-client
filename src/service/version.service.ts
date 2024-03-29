import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, VERSION } from "@angular/core";
import * as semver from "semver";

import { ElectronService } from "./electron.service";
import { Version } from "./version";

@Injectable()
export class VersionService {
  private version: Version;
  private serverversion: Version;

  constructor(
    private http: HttpClient,
    private electronService: ElectronService,
    private location: Location
  ) {}

  public get ver(): Version {
    return this.version;
  }
  public get serverVer(): Version {
    return this.serverversion;
  }

  /**
   * Versions-Resource aus package.json initialisieren.
   * Der String serverPackage muss eine URL fuer die Server-REST-API enthalten,
   * deren Aufruf die package.json des Servers liefert.
   *
   * param {string} serverPackage
   * returns {Promise<Version>}
   */
  public async init(serverPackage: string): Promise<Version> {
    const webserver = this.location.prepareExternalUrl("");
    // deepcode ignore Ssrf: url-string is checked
    return this.http
      .get(webserver + "package.json")
      .toPromise()
      .then(async (r: any) => {
        r["versions"] = ["Angular " + VERSION.full];
        if (this.electronService.isElectron) {
          r["versions"].push("Electron " + this.electronService.electronVersion);
        }
        // try {
        //   const gh = await this.http
        //     .get(webserver + "resource/git.txt", { responseType: "text" })
        //     .toPromise();
        //   r["githash"] = gh.replace(/\n/, "").replace(/\r/, "");
        // } catch (e) {
        //   console.error("Fehler beim Lesen von ./resource/git.txt");
        //   r["githash"] = "";
        // }
        this.version = this.makeVer(r);
        if (serverPackage) {
          return this.http
            .get(serverPackage)
            .toPromise()
            .then((sr) => {
              this.serverversion = this.makeVer(sr);
              return this.version;
            })
            .catch((err) => {
              console.error("Fehler beim Ermitteln der Server-Version: " + err);
              return this.version;
            });
        } else {
          return this.version;
        }
      });
  }

  private makeVer(pack: any): Version {
    const pre = semver.prerelease(pack.version); // ['alpha', 10] || [10]
    let prerel = "";
    let prebuild: number | null = null;
    if (pre && pre.length > 0) {
      if (typeof pre[0] === "number") {
        prebuild = +pre[0];
        prerel = "beta";
      } else {
        prerel = pre[0];
        prebuild = typeof pre[1] === "number" ? +pre[1] : 0;
      }
    }
    pack.version = pack.version ?? "0.0.0";
    const ver = {
      name: pack.name ?? "",
      displayname: pack.displayname ?? "",
      description: pack.description ?? "",
      version: pack.version,
      copyright: pack.copyright ?? "",
      author: pack.author ?? "",
      license: pack.license ?? "",
      major: semver.major(pack.version),
      minor: semver.minor(pack.version),
      patch: semver.patch(pack.version),
      prerelease: prerel ?? "",
      build: prebuild ?? 0,
      versions: pack.versions ?? [],
    };
    return ver;
  }
}
