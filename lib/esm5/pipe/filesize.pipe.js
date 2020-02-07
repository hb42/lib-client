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
            name: "filesize"
        })
    ], FileSizePipe);
    return FileSizePipe;
}());
export { FileSizePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXNpemUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BoYjQyL2xpYi1jbGllbnQvIiwic291cmNlcyI6WyJwaXBlL2ZpbGVzaXplLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFLdkI7SUFHRTtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixLQUFVLENBQUMsbUJBQW1CO1FBQzdDLElBQU0sSUFBSSxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTywyQkFBSSxHQUFaLFVBQWEsR0FBVyxFQUFFLEdBQVc7UUFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ2QsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQWxCVSxZQUFZO1FBSHhCLElBQUksQ0FBQztZQUNFLElBQUksRUFBRSxVQUFVO1NBQ3ZCLENBQUM7T0FDVyxZQUFZLENBbUJ4QjtJQUFELG1CQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBQaXBlKHtcbiAgICAgICAgbmFtZTogXCJmaWxlc2l6ZVwiXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVTaXplUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3VmZml4OiBzdHJpbmdbXTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWZmaXggPSBbIFwiQnl0ZXNcIiwgXCJrQlwiLCBcIk1CXCIsIFwiR0JcIiwgXCJUQlwiLCBcIlBCXCIsIFwiRUJcIiwgXCJaQlwiLCBcIllCXCJdO1xuICB9XG5cbiAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogYW55IC8qLCBwYXJhbXM6IGFueVtdKi8pOiBhbnkge1xuICAgIGNvbnN0IGl0ZW06IG51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuY29udihpdGVtLCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udih2YWw6IG51bWJlciwgaWR4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmICh2YWwgPCAxMDI0KSB7XG4gICAgICByZXR1cm4gdmFsICsgXCIgXCIgKyB0aGlzLnN1ZmZpeFtpZHhdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb252KE1hdGgucm91bmQodmFsIC8gMTAyNCksICsraWR4KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==