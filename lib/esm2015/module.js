import { __decorate } from "tslib";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRiwyREFBMkQ7QUFDM0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFlBQTBCO0lBQ3pELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUF3QkQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtDQUMzQixDQUFBO0FBRFksZUFBZTtJQXRCM0IsUUFBUSxDQUFDO1FBQ0UsT0FBTyxFQUFPLENBQUMsWUFBWSxDQUFDO1FBQzVCLE9BQU8sRUFBTyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO1FBQ3pELFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO1FBQ3pELFNBQVMsRUFBSztZQUNaLGVBQWU7WUFDZixZQUFZO1lBQ1osY0FBYztZQUNkLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEI7Z0JBQ0UsT0FBTyxFQUFHLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsS0FBSyxFQUFLLElBQUk7YUFDZjtZQUNEO2dCQUNFLE9BQU8sRUFBSyxZQUFZO2dCQUN4QixVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixJQUFJLEVBQVEsQ0FBQyxZQUFZLENBQUM7YUFDM0I7U0FDRjtLQUNGLENBQUM7R0FDQyxlQUFlLENBQzNCO1NBRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBFcnJvckhhbmRsZXIsIE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRmxleGJveFNwbGl0dGVyIH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGaWxlU2l6ZVBpcGUsIElFRGF0ZVBpcGUgfSBmcm9tIFwiLi9waXBlXCI7XG5pbXBvcnQgeyBFbGVjdHJvblNlcnZpY2UsIEVycm9yU2VydmljZSwgVmVyc2lvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlXCI7XG5pbXBvcnQgeyBKd3RIZWxwZXJTZXJ2aWNlLCBMb2dvbkludGVyY2VwdG9yLCBMb2dvblNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlL2xvZ29uXCI7XG5cbi8vIFZlcmhpbmRlcm4sIGRhc3MgRXJyb3JTZXJ2aWNlIG1laHJmYWNoIGluc3RhbnppaWVydCB3aXJkXG5leHBvcnQgZnVuY3Rpb24gaW5pdEVycm9ySGFuZGxlcihlcnJvclNlcnZpY2U6IEVycm9yU2VydmljZSkge1xuICByZXR1cm4gZXJyb3JTZXJ2aWNlO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgICAgICAgICAgaW1wb3J0cyAgICAgOiBbQ29tbW9uTW9kdWxlXSxcbiAgICAgICAgICAgIGV4cG9ydHMgICAgIDogW0ZsZXhib3hTcGxpdHRlciwgRmlsZVNpemVQaXBlLCBJRURhdGVQaXBlXSxcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW0ZsZXhib3hTcGxpdHRlciwgRmlsZVNpemVQaXBlLCBJRURhdGVQaXBlXSxcbiAgICAgICAgICAgIHByb3ZpZGVycyAgIDogW1xuICAgICAgICAgICAgICBFbGVjdHJvblNlcnZpY2UsXG4gICAgICAgICAgICAgIEVycm9yU2VydmljZSxcbiAgICAgICAgICAgICAgVmVyc2lvblNlcnZpY2UsXG4gICAgICAgICAgICAgIExvZ29uU2VydmljZSxcbiAgICAgICAgICAgICAgSnd0SGVscGVyU2VydmljZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByb3ZpZGUgOiBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICAgICAgICAgICAgICB1c2VDbGFzczogTG9nb25JbnRlcmNlcHRvcixcbiAgICAgICAgICAgICAgICBtdWx0aSAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHByb3ZpZGUgICA6IEVycm9ySGFuZGxlcixcbiAgICAgICAgICAgICAgICB1c2VGYWN0b3J5OiBpbml0RXJyb3JIYW5kbGVyLFxuICAgICAgICAgICAgICAgIGRlcHMgICAgICA6IFtFcnJvclNlcnZpY2VdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuZXhwb3J0IGNsYXNzIExpYkNsaWVudE1vZHVsZSB7XG59XG4iXX0=