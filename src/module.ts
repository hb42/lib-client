/**
 * Created by hb on 23.10.16.
 */

import {
  CommonModule,
} from "@angular/common";
import {
  APP_INITIALIZER,
  NgModule,
} from "@angular/core";

import {
  FlexboxSplitter,
} from "./component";
import {
  FileSizePipe,
  IEDatePipe,
} from "./pipe";
import {
  VersionService,
} from "./service";

// Versions-Resource beim App-Start holen:
export function initVersion(versionService: VersionService) {
  return () => versionService.load();
}

@NgModule({
            imports: [CommonModule],
            exports: [FlexboxSplitter, FileSizePipe, IEDatePipe],
            declarations: [FlexboxSplitter, FileSizePipe, IEDatePipe],
            providers: [
              VersionService,
              // Version aus package.json holen -> inject version: VersionService => version.ver
              //   useFactory ist eine fn, die eine fn liefert, die ein Promise liefert!
              // VersionService,
              { provide: APP_INITIALIZER,
                useFactory: initVersion,
                deps: [VersionService], multi: true },

            ],
          })
export class LibClientModule { }
