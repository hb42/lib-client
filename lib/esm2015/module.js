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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCwyREFBMkQ7QUFDM0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFlBQTBCO0lBQ3pELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUF3QkQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtDQUMzQixDQUFBO0FBRFksZUFBZTtJQXRCM0IsUUFBUSxDQUFDO1FBQ0UsT0FBTyxFQUFPLENBQUMsWUFBWSxDQUFDO1FBQzVCLE9BQU8sRUFBTyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO1FBQ3pELFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO1FBQ3pELFNBQVMsRUFBSztZQUNaLGVBQWU7WUFDZixZQUFZO1lBQ1osY0FBYztZQUNkLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEI7Z0JBQ0UsT0FBTyxFQUFHLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsS0FBSyxFQUFLLElBQUk7YUFDZjtZQUNEO2dCQUNFLE9BQU8sRUFBSyxZQUFZO2dCQUN4QixVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixJQUFJLEVBQVEsQ0FBQyxZQUFZLENBQUM7YUFDM0I7U0FDRjtLQUNGLENBQUM7R0FDQyxlQUFlLENBQzNCO1NBRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRmxleGJveFNwbGl0dGVyIH0gZnJvbSBcIi4vY29tcG9uZW50L3NwbGl0dGVyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgRmlsZVNpemVQaXBlIH0gZnJvbSBcIi4vcGlwZS9maWxlc2l6ZS5waXBlXCI7XG5pbXBvcnQgeyBJRURhdGVQaXBlIH0gZnJvbSBcIi4vcGlwZS9pZWRhdGUucGlwZVwiO1xuaW1wb3J0IHsgRWxlY3Ryb25TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZS9lbGVjdHJvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBFcnJvclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL2Vycm9yLnNlcnZpY2VcIjtcbmltcG9ydCB7IEp3dEhlbHBlclNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL2xvZ29uL2p3dC1oZWxwZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgTG9nb25JbnRlcmNlcHRvciB9IGZyb20gXCIuL3NlcnZpY2UvbG9nb24vbG9nb24taW50ZXJjZXB0b3JcIjtcbmltcG9ydCB7IExvZ29uU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2UvbG9nb24vbG9nb24uc2VydmljZVwiO1xuaW1wb3J0IHsgVmVyc2lvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL3ZlcnNpb24uc2VydmljZVwiO1xuXG4vLyBWZXJoaW5kZXJuLCBkYXNzIEVycm9yU2VydmljZSBtZWhyZmFjaCBpbnN0YW56aWllcnQgd2lyZFxuZXhwb3J0IGZ1bmN0aW9uIGluaXRFcnJvckhhbmRsZXIoZXJyb3JTZXJ2aWNlOiBFcnJvclNlcnZpY2UpIHtcbiAgcmV0dXJuIGVycm9yU2VydmljZTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICAgICAgICAgIGltcG9ydHMgICAgIDogW0NvbW1vbk1vZHVsZV0sXG4gICAgICAgICAgICBleHBvcnRzICAgICA6IFtGbGV4Ym94U3BsaXR0ZXIsIEZpbGVTaXplUGlwZSwgSUVEYXRlUGlwZV0sXG4gICAgICAgICAgICBkZWNsYXJhdGlvbnM6IFtGbGV4Ym94U3BsaXR0ZXIsIEZpbGVTaXplUGlwZSwgSUVEYXRlUGlwZV0sXG4gICAgICAgICAgICBwcm92aWRlcnMgICA6IFtcbiAgICAgICAgICAgICAgRWxlY3Ryb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBFcnJvclNlcnZpY2UsXG4gICAgICAgICAgICAgIFZlcnNpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICBMb2dvblNlcnZpY2UsXG4gICAgICAgICAgICAgIEp3dEhlbHBlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlIDogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICAgICAgICAgICAgdXNlQ2xhc3M6IExvZ29uSW50ZXJjZXB0b3IsXG4gICAgICAgICAgICAgICAgbXVsdGkgICA6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlICAgOiBFcnJvckhhbmRsZXIsXG4gICAgICAgICAgICAgICAgdXNlRmFjdG9yeTogaW5pdEVycm9ySGFuZGxlcixcbiAgICAgICAgICAgICAgICBkZXBzICAgICAgOiBbRXJyb3JTZXJ2aWNlXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSlcbmV4cG9ydCBjbGFzcyBMaWJDbGllbnRNb2R1bGUge1xufVxuIl19