/**
 * Created by hb on 23.10.16.
 */

// import {
//   CommonModule,
// } from "@angular/common";
import {
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
  ElectronService,
  VersionService,
} from "./service";

@NgModule({
            // imports: [CommonModule],
            exports: [FlexboxSplitter, FileSizePipe, IEDatePipe],
            declarations: [FlexboxSplitter, FileSizePipe, IEDatePipe],
            providers: [
              ElectronService,
              VersionService,

            ],
          })
export class LibClientModule { }
