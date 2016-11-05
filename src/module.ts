/**
 * Created by hb on 23.10.16.
 */

import {
  CommonModule,
} from "@angular/common";
import {
  NgModule,
} from "@angular/core";

import {
  FlexboxSplitter,
} from "./component";
import {
  FileSizePipe,
} from "./pipe";

@NgModule({
            imports: [CommonModule],
            exports: [FlexboxSplitter, FileSizePipe],
            declarations: [FlexboxSplitter, FileSizePipe],
          })
export class LibngModule { }
