/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, } from "@angular/core";
import * as i0 from "@angular/core";
/**
 * date pipe, die auch im IE funktioniert, liefert date:"dd.MM.y HH:mm:ss"
 * -> https://github.com/angular/angular/issues/9524
 * -> https://marcoscaceres.github.io/jsi18n/
 *
 * *** hat sich erledigt, seit Angular5 funktioniert's ***
 */
export class IEDatePipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        /** @type {?} */
        const d = new Date(value);
        return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" }) + " "
            + d.toLocaleTimeString();
    }
}
/** @nocollapse */ IEDatePipe.ɵfac = function IEDatePipe_Factory(t) { return new (t || IEDatePipe)(); };
/** @nocollapse */ IEDatePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "iedate", type: IEDatePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IEDatePipe, [{
        type: Pipe,
        args: [{
                name: "iedate"
            }]
    }], null, null); })();
