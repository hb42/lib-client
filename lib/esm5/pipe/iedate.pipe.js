import { __decorate } from "tslib";
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
    IEDatePipe.prototype.transform = function (value) {
        var d = new Date(value);
        return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit", year: "numeric" }) + " "
            + d.toLocaleTimeString();
    };
    IEDatePipe = __decorate([
        Pipe({
            name: "iedate"
        })
    ], IEDatePipe);
    return IEDatePipe;
}());
export { IEDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWVkYXRlLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaGI0Mi9saWItY2xpZW50LyIsInNvdXJjZXMiOlsicGlwZS9pZWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLElBQUksR0FFTCxNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7Ozs7O0dBTUc7QUFJSDtJQUFBO0lBUUEsQ0FBQztJQU5RLDhCQUFTLEdBQWhCLFVBQWlCLEtBQWE7UUFDNUIsSUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsT0FBTyxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxHQUFHLEdBQUc7Y0FDbkYsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQU5VLFVBQVU7UUFIdEIsSUFBSSxDQUFDO1lBQ0UsSUFBSSxFQUFFLFFBQVE7U0FDckIsQ0FBQztPQUNXLFVBQVUsQ0FRdEI7SUFBRCxpQkFBQztDQUFBLEFBUkQsSUFRQztTQVJZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQaXBlLFxuICBQaXBlVHJhbnNmb3JtLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG4vKipcbiAqIGRhdGUgcGlwZSwgZGllIGF1Y2ggaW0gSUUgZnVua3Rpb25pZXJ0LCBsaWVmZXJ0IGRhdGU6XCJkZC5NTS55IEhIOm1tOnNzXCJcbiAqIC0+IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzk1MjRcbiAqIC0+IGh0dHBzOi8vbWFyY29zY2FjZXJlcy5naXRodWIuaW8vanNpMThuL1xuICpcbiAqICoqKiBoYXQgc2ljaCBlcmxlZGlndCwgc2VpdCBBbmd1bGFyNSBmdW5rdGlvbmllcnQncyAqKipcbiAqL1xuQFBpcGUoe1xuICAgICAgICBuYW1lOiBcImllZGF0ZVwiXG59KVxuZXhwb3J0IGNsYXNzIElFRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwdWJsaWMgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIGQudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZGVcIiwge2RheTogXCIyLWRpZ2l0XCIsIG1vbnRoOiBcIjItZGlnaXRcIiwgeWVhcjogXCJudW1lcmljXCJ9KSArIFwiIFwiXG4gICAgICAgICAgICsgZC50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgfVxuXG59XG4iXX0=