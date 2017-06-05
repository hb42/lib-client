/**
 * Created by a0770007 on 07.04.2017.
 */

import {
  Pipe,
  PipeTransform,
} from "@angular/core";

/**
 * date pipe, die auch im IE funktioniert, liefert date:"dd.MM.y HH:mm:ss"
 * -> https://github.com/angular/angular/issues/9524
 * -> https://marcoscaceres.github.io/jsi18n/
 */
@Pipe({ name: "iedate" })
export class IEDatePipe implements PipeTransform {

  public transform(value: number): string {
    const d = new Date(value);
    return d.toLocaleDateString("de", {day: "2-digit", month: "2-digit", year: "numeric"}) + " "
           + d.toLocaleTimeString();
  }

}