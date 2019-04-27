/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXNpemUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJwaXBlL2ZpbGVzaXplLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFLdkIsTUFBTSxPQUFPLFlBQVk7SUFHdkI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUVNLFNBQVMsQ0FBQyxLQUFVLENBQUMsbUJBQW1COztjQUN2QyxJQUFJLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7SUFFTyxJQUFJLENBQUMsR0FBVyxFQUFFLEdBQVc7UUFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ2QsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7O1lBckJGLElBQUksU0FBQztnQkFDRSxJQUFJLEVBQUUsVUFBVTthQUN2Qjs7Ozs7Ozs7O0lBR0MsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQFBpcGUoe1xuICAgICAgICBuYW1lOiBcImZpbGVzaXplXCJcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVNpemVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWZmaXg6IHN0cmluZ1tdO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN1ZmZpeCA9IFsgXCJCeXRlc1wiLCBcImtCXCIsIFwiTUJcIiwgXCJHQlwiLCBcIlRCXCIsIFwiUEJcIiwgXCJFQlwiLCBcIlpCXCIsIFwiWUJcIl07XG4gIH1cblxuICBwdWJsaWMgdHJhbnNmb3JtKHZhbHVlOiBhbnkgLyosIHBhcmFtczogYW55W10qLyk6IGFueSB7XG4gICAgY29uc3QgaXRlbTogbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5jb252KGl0ZW0sIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252KHZhbDogbnVtYmVyLCBpZHg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHZhbCA8IDEwMjQpIHtcbiAgICAgIHJldHVybiB2YWwgKyBcIiBcIiArIHRoaXMuc3VmZml4W2lkeF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnYoTWF0aC5yb3VuZCh2YWwgLyAxMDI0KSwgKytpZHgpO1xuICAgIH1cbiAgfVxufVxuIl19