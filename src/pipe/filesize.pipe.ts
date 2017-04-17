/**
 * Created by hb on 04.10.16.
 */

import {
  Pipe,
  PipeTransform,
} from "@angular/core";

@Pipe({name: "filesize"})
export class FileSizePipe implements PipeTransform {

  private static suffix = [ "Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  public transform(value: any[]/*, params: any[]*/): any {
    const item: number = Number(value);
    return this.conv(item, 0);
  }

  private conv(val: number, idx: number): string {
    if (val < 1024) {
      return val + " " + FileSizePipe.suffix[idx];
    } else {
      return this.conv(Math.round(val / 1024), ++idx);
    }
  }
}
