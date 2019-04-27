/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, } from "@angular/core";
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
IEDatePipe.decorators = [
    { type: Pipe, args: [{
                name: "iedate"
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWVkYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsicGlwZS9pZWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLElBQUksR0FFTCxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFZdkIsTUFBTSxPQUFPLFVBQVU7Ozs7O0lBRWQsU0FBUyxDQUFDLEtBQWE7O2NBQ3RCLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsT0FBTyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxHQUFHLEdBQUc7Y0FDbkYsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQzs7O1lBVEYsSUFBSSxTQUFDO2dCQUNFLElBQUksRUFBRSxRQUFRO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuLyoqXG4gKiBkYXRlIHBpcGUsIGRpZSBhdWNoIGltIElFIGZ1bmt0aW9uaWVydCwgbGllZmVydCBkYXRlOlwiZGQuTU0ueSBISDptbTpzc1wiXG4gKiAtPiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85NTI0XG4gKiAtPiBodHRwczovL21hcmNvc2NhY2VyZXMuZ2l0aHViLmlvL2pzaTE4bi9cbiAqXG4gKiAqKiogaGF0IHNpY2ggZXJsZWRpZ3QsIHNlaXQgQW5ndWxhcjUgZnVua3Rpb25pZXJ0J3MgKioqXG4gKi9cbkBQaXBlKHtcbiAgICAgICAgbmFtZTogXCJpZWRhdGVcIlxufSlcbmV4cG9ydCBjbGFzcyBJRURhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUodmFsdWUpO1xuICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZyhcImRlXCIsIHtkYXk6IFwiMi1kaWdpdFwiLCBtb250aDogXCIyLWRpZ2l0XCIsIHllYXI6IFwibnVtZXJpY1wifSkgKyBcIiBcIlxuICAgICAgICAgICArIGQudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gIH1cblxufVxuIl19