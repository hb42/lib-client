/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, } from "@angular/core";
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
FileSizePipe.decorators = [
    { type: Pipe, args: [{
                name: "filesize"
            },] }
];
/** @nocollapse */
FileSizePipe.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileSizePipe.prototype.suffix;
}
