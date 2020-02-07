import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FlexboxSplitter } from "./component/splitter.directive";
import { FileSizePipe } from "./pipe/filesize.pipe";
import { IEDatePipe } from "./pipe/iedate.pipe";
import { ElectronService } from "./service/electron.service";
import { ErrorService } from "./service/error.service";
import { JwtHelperService } from "./service/logon/jwt-helper.service";
import { LogonInterceptor } from "./service/logon/logon-interceptor";
import { LogonService } from "./service/logon/logon.service";
import { VersionService } from "./service/version.service";
// Verhindern, dass ErrorService mehrfach instanziiert wird
export function initErrorHandler(errorService) {
    return errorService;
}
var LibClientModule = /** @class */ (function () {
    function LibClientModule() {
    }
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
    return LibClientModule;
}());
export { LibClientModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCwyREFBMkQ7QUFDM0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFlBQTBCO0lBQ3pELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUF3QkQ7SUFBQTtJQUNBLENBQUM7SUFEWSxlQUFlO1FBdEIzQixRQUFRLENBQUM7WUFDRSxPQUFPLEVBQU8sQ0FBQyxZQUFZLENBQUM7WUFDNUIsT0FBTyxFQUFPLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUM7WUFDekQsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxVQUFVLENBQUM7WUFDekQsU0FBUyxFQUFLO2dCQUNaLGVBQWU7Z0JBQ2YsWUFBWTtnQkFDWixjQUFjO2dCQUNkLFlBQVk7Z0JBQ1osZ0JBQWdCO2dCQUNoQjtvQkFDRSxPQUFPLEVBQUcsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixLQUFLLEVBQUssSUFBSTtpQkFDZjtnQkFDRDtvQkFDRSxPQUFPLEVBQUssWUFBWTtvQkFDeEIsVUFBVSxFQUFFLGdCQUFnQjtvQkFDNUIsSUFBSSxFQUFRLENBQUMsWUFBWSxDQUFDO2lCQUMzQjthQUNGO1NBQ0YsQ0FBQztPQUNDLGVBQWUsQ0FDM0I7SUFBRCxzQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgRXJyb3JIYW5kbGVyLCBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEZsZXhib3hTcGxpdHRlciB9IGZyb20gXCIuL2NvbXBvbmVudC9zcGxpdHRlci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IEZpbGVTaXplUGlwZSB9IGZyb20gXCIuL3BpcGUvZmlsZXNpemUucGlwZVwiO1xuaW1wb3J0IHsgSUVEYXRlUGlwZSB9IGZyb20gXCIuL3BpcGUvaWVkYXRlLnBpcGVcIjtcbmltcG9ydCB7IEVsZWN0cm9uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvZWxlY3Ryb24uc2VydmljZVwiO1xuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9lcnJvci5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9sb2dvbi9qd3QtaGVscGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvZ29uSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9zZXJ2aWNlL2xvZ29uL2xvZ29uLWludGVyY2VwdG9yXCI7XG5pbXBvcnQgeyBMb2dvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL2xvZ29uL2xvZ29uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFZlcnNpb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS92ZXJzaW9uLnNlcnZpY2VcIjtcblxuLy8gVmVyaGluZGVybiwgZGFzcyBFcnJvclNlcnZpY2UgbWVocmZhY2ggaW5zdGFuemlpZXJ0IHdpcmRcbmV4cG9ydCBmdW5jdGlvbiBpbml0RXJyb3JIYW5kbGVyKGVycm9yU2VydmljZTogRXJyb3JTZXJ2aWNlKSB7XG4gIHJldHVybiBlcnJvclNlcnZpY2U7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgICAgICAgICBpbXBvcnRzICAgICA6IFtDb21tb25Nb2R1bGVdLFxuICAgICAgICAgICAgZXhwb3J0cyAgICAgOiBbRmxleGJveFNwbGl0dGVyLCBGaWxlU2l6ZVBpcGUsIElFRGF0ZVBpcGVdLFxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbRmxleGJveFNwbGl0dGVyLCBGaWxlU2l6ZVBpcGUsIElFRGF0ZVBpcGVdLFxuICAgICAgICAgICAgcHJvdmlkZXJzICAgOiBbXG4gICAgICAgICAgICAgIEVsZWN0cm9uU2VydmljZSxcbiAgICAgICAgICAgICAgRXJyb3JTZXJ2aWNlLFxuICAgICAgICAgICAgICBWZXJzaW9uU2VydmljZSxcbiAgICAgICAgICAgICAgTG9nb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBKd3RIZWxwZXJTZXJ2aWNlLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZSA6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICAgICAgICAgIHVzZUNsYXNzOiBMb2dvbkludGVyY2VwdG9yLFxuICAgICAgICAgICAgICAgIG11bHRpICAgOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZSAgIDogRXJyb3JIYW5kbGVyLFxuICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IGluaXRFcnJvckhhbmRsZXIsXG4gICAgICAgICAgICAgICAgZGVwcyAgICAgIDogW0Vycm9yU2VydmljZV0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pXG5leHBvcnQgY2xhc3MgTGliQ2xpZW50TW9kdWxlIHtcbn1cbiJdfQ==