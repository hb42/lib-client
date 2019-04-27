/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, } from "@angular/core";
var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
        this.suffix = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FileSizePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value /*, params: any[]*/) {
        /** @type {?} */
        var item = Number(value);
        return this.conv(item, 0);
    };
    /**
     * @private
     * @param {?} val
     * @param {?} idx
     * @return {?}
     */
    FileSizePipe.prototype.conv = /**
     * @private
     * @param {?} val
     * @param {?} idx
     * @return {?}
     */
    function (val, idx) {
        if (val < 1024) {
            return val + " " + this.suffix[idx];
        }
        else {
            return this.conv(Math.round(val / 1024), ++idx);
        }
    };
    FileSizePipe.decorators = [
        { type: Pipe, args: [{
                    name: "filesize"
                },] }
    ];
    /** @nocollapse */
    FileSizePipe.ctorParameters = function () { return []; };
    return FileSizePipe;
}());
export { FileSizePipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileSizePipe.prototype.suffix;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXNpemUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJwaXBlL2ZpbGVzaXplLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUFNRTtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNFLENBQUM7Ozs7O0lBRU0sZ0NBQVM7Ozs7SUFBaEIsVUFBaUIsS0FBVSxDQUFDLG1CQUFtQjs7WUFDdkMsSUFBSSxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7Ozs7O0lBRU8sMkJBQUk7Ozs7OztJQUFaLFVBQWEsR0FBVyxFQUFFLEdBQVc7UUFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ2QsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQzs7Z0JBckJGLElBQUksU0FBQztvQkFDRSxJQUFJLEVBQUUsVUFBVTtpQkFDdkI7Ozs7SUFvQkQsbUJBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQW5CWSxZQUFZOzs7Ozs7SUFFdkIsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQFBpcGUoe1xuICAgICAgICBuYW1lOiBcImZpbGVzaXplXCJcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVNpemVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWZmaXg6IHN0cmluZ1tdO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN1ZmZpeCA9IFsgXCJCeXRlc1wiLCBcImtCXCIsIFwiTUJcIiwgXCJHQlwiLCBcIlRCXCIsIFwiUEJcIiwgXCJFQlwiLCBcIlpCXCIsIFwiWUJcIl07XG4gIH1cblxuICBwdWJsaWMgdHJhbnNmb3JtKHZhbHVlOiBhbnkgLyosIHBhcmFtczogYW55W10qLyk6IGFueSB7XG4gICAgY29uc3QgaXRlbTogbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5jb252KGl0ZW0sIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252KHZhbDogbnVtYmVyLCBpZHg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHZhbCA8IDEwMjQpIHtcbiAgICAgIHJldHVybiB2YWwgKyBcIiBcIiArIHRoaXMuc3VmZml4W2lkeF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnYoTWF0aC5yb3VuZCh2YWwgLyAxMDI0KSwgKytpZHgpO1xuICAgIH1cbiAgfVxufVxuIl19