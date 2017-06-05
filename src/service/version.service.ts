/**
 * Created by hb on 06.04.17.
 */

import * as semver from "semver";

import {
  Injectable,
} from "@angular/core";
import {
  Http,
} from "@angular/http";
import {
  Observable,
} from "rxjs/Rx";

import {
  Version,
} from "./";

@Injectable()
export class VersionService {
  private version: Version = null;

  constructor(private http: Http) {
  }

  public get ver(): Version {
    return this.version;
  }

  public init(): Promise<Version> {
    return this.http.get("./package.json").map( (res) => res.json() ).toPromise()
        .then( (r) => this.makeVer(r));
  }

  private makeVer(pack): Version {
    const pre = semver.prerelease(pack.version); // ~['alpha', 10]
    let prerel = "";
    let prebuild: number | null = null;
    if (pre.length > 0) {
      if (typeof pre[0] === "number") {
        prebuild = +pre[0];
        prerel = "beta";
      } else {
        prerel = pre[0];
        if (typeof pre[1] === "number") {
          prebuild = +pre[1];
        } else {
          prebuild = 0;
        }
      }
    }
    this.version = {
      name: pack.name,
      displayname: pack.displayname,
      description: pack.description,
      version: pack.version,
      copyright: pack.copyright,
      author: pack.author,
      license: pack.license,
      major: semver.major(pack.version),
      minor: semver.minor(pack.version),
      patch: semver.patch(pack.version),
      prerelease: prerel,
      build: prebuild,
    };
    return this.version;
  }

}
