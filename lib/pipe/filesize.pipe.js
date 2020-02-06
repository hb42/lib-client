/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, } from "@angular/core";
import * as i0 from "@angular/core";
export class FileSizePipe {
    constructor() {
        this.suffix = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value /*, params: any[]*/) {
        /** @type {?} */
        const item = Number(value);
        return this.conv(item, 0);
    }
    /**
     * @private
     * @param {?} val
     * @param {?} idx
     * @return {?}
     */
    conv(val, idx) {
        if (val < 1024) {
            return val + " " + this.suffix[idx];
        }
        else {
            return this.conv(Math.round(val / 1024), ++idx);
        }
    }
}
/** @nocollapse */ FileSizePipe.ɵfac = function FileSizePipe_Factory(t) { return new (t || FileSizePipe)(); };
/** @nocollapse */ FileSizePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "filesize", type: FileSizePipe, pure: true });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FileSizePipe, [{
        type: Pipe,
        args: [{
                name: "filesize"
            }]
    }], function () { return []; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileSizePipe.prototype.suffix;
}
