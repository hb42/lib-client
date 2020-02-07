import { __decorate } from "tslib";
import { Pipe, } from "@angular/core";
var FileSizePipe = /** @class */ (function () {
    function FileSizePipe() {
        this.suffix = ["Bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    }
    FileSizePipe.prototype.transform = function (value /*, params: any[]*/) {
        var item = Number(value);
        return this.conv(item, 0);
    };
    FileSizePipe.prototype.conv = function (val, idx) {
        if (val < 1024) {
            return val + " " + this.suffix[idx];
        }
        else {
            return this.conv(Math.round(val / 1024), ++idx);
        }
    };
    FileSizePipe = __decorate([
        Pipe({
            name: "filesize",
        })
    ], FileSizePipe);
    return FileSizePipe;
}());
export { FileSizePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXNpemUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJwaXBlL2ZpbGVzaXplLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFLdkI7SUFHRTtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixLQUFVLENBQUMsbUJBQW1CO1FBQzdDLElBQU0sSUFBSSxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTywyQkFBSSxHQUFaLFVBQWEsR0FBVyxFQUFFLEdBQVc7UUFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ2QsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQWxCVSxZQUFZO1FBSHhCLElBQUksQ0FBQztZQUNFLElBQUksRUFBRSxVQUFVO1NBQ3ZCLENBQUM7T0FDVyxZQUFZLENBbUJ4QjtJQUFELG1CQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgICAgICAgbmFtZTogXCJmaWxlc2l6ZVwiLFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlU2l6ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1ZmZpeDogc3RyaW5nW107XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3VmZml4ID0gWyBcIkJ5dGVzXCIsIFwia0JcIiwgXCJNQlwiLCBcIkdCXCIsIFwiVEJcIiwgXCJQQlwiLCBcIkVCXCIsIFwiWkJcIiwgXCJZQlwiXTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IGFueSAvKiwgcGFyYW1zOiBhbnlbXSovKTogYW55IHtcbiAgICBjb25zdCBpdGVtOiBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgIHJldHVybiB0aGlzLmNvbnYoaXRlbSwgMCk7XG4gIH1cblxuICBwcml2YXRlIGNvbnYodmFsOiBudW1iZXIsIGlkeDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAodmFsIDwgMTAyNCkge1xuICAgICAgcmV0dXJuIHZhbCArIFwiIFwiICsgdGhpcy5zdWZmaXhbaWR4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29udihNYXRoLnJvdW5kKHZhbCAvIDEwMjQpLCArK2lkeCk7XG4gICAgfVxuICB9XG59XG4iXX0=