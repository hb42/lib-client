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
var IEDatePipe = /** @class */ (function () {
    function IEDatePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    IEDatePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var d = new Date(value);
        return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" }) + " "
            + d.toLocaleTimeString();
    };
    IEDatePipe.decorators = [
        { type: Pipe, args: [{
                    name: "iedate"
                },] }
    ];
    return IEDatePipe;
}());
export { IEDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWVkYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsicGlwZS9pZWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLElBQUksR0FFTCxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFTdkI7SUFBQTtJQVdBLENBQUM7Ozs7O0lBTlEsOEJBQVM7Ozs7SUFBaEIsVUFBaUIsS0FBYTs7WUFDdEIsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDLEdBQUcsR0FBRztjQUNuRixDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNsQyxDQUFDOztnQkFURixJQUFJLFNBQUM7b0JBQ0UsSUFBSSxFQUFFLFFBQVE7aUJBQ3JCOztJQVNELGlCQUFDO0NBQUEsQUFYRCxJQVdDO1NBUlksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbi8qKlxuICogZGF0ZSBwaXBlLCBkaWUgYXVjaCBpbSBJRSBmdW5rdGlvbmllcnQsIGxpZWZlcnQgZGF0ZTpcImRkLk1NLnkgSEg6bW06c3NcIlxuICogLT4gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvOTUyNFxuICogLT4gaHR0cHM6Ly9tYXJjb3NjYWNlcmVzLmdpdGh1Yi5pby9qc2kxOG4vXG4gKlxuICogKioqIGhhdCBzaWNoIGVybGVkaWd0LCBzZWl0IEFuZ3VsYXI1IGZ1bmt0aW9uaWVydCdzICoqKlxuICovXG5AUGlwZSh7XG4gICAgICAgIG5hbWU6IFwiaWVkYXRlXCJcbn0pXG5leHBvcnQgY2xhc3MgSUVEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoXCJkZVwiLCB7ZGF5OiBcIjItZGlnaXRcIiwgbW9udGg6IFwiMi1kaWdpdFwiLCB5ZWFyOiBcIm51bWVyaWNcIn0pICsgXCIgXCJcbiAgICAgICAgICAgKyBkLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICB9XG5cbn1cbiJdfQ==