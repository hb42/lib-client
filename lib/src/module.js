var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexboxSplitter } from "./component";
import { FileSizePipe, IEDatePipe } from "./pipe";
import { ElectronService, ErrorService, VersionService } from "./service";
import { JwtHelperService, LogonInterceptor, LogonService } from "./service/logon";
// Verhindern, dass ErrorService mehrfach instanziiert wird
export function initErrorHandler(errorService) {
    return errorService;
}
let LibClientModule = class LibClientModule {
};
LibClientModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [FlexboxSplitter, FileSizePipe, IEDatePipe],
        declarations: [FlexboxSplitter, FileSizePipe, IEDatePipe],
        providers: [
            ElectronService,
            ErrorService,
            VersionService,
            LogonService,
            JwtHelperService,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: LogonInterceptor,
                multi: true,
            },
            {
                provide: ErrorHandler,
                useFactory: initErrorHandler,
                deps: [ErrorService],
            },
        ],
    })
], LibClientModule);
export { LibClientModule };
//# sourceMappingURL=module.js.map