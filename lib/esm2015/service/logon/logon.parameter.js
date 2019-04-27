/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Konfiguration der JWT-Logon-Mimik fuer REST-Aufrufe
 *
 * Muss im app.module definiert werden:
 * <pre>
 *            providers   : [
 *             {
 *               provide: LOGON_OPTIONS,
 *               useValue:  {
 *                 logon           : "NTLM",
 *                 appName         : environment.name,
 *                 NTLMserver      : environment.NTLMserver,
 *                 webserviceServer: environment.webserviceServer
 *               },
 *             },
 *             ...
 * </pre>
 * \@property {string} logon - Logon-Handling:<br>... NO = kein JWT-Handling,
 *                                           <br>... NTLM = Autologon via NTLM,
 *                                           <br>... FORM = Form-Login (noch nicht implementiert)
 * \@property {string} appName - App-Name fuer NTLM-Autologon
 * \@property {string} NTLMserver - Server fuer die NTLM-Anmeldung
 * \@property {string} webserviceServer - Hier laeuft der Autologon,<br>... an diesen Server werden JWT gesendet
 *
 * @see {\@link LOGON_OPTIONS}
 * @see {\@link LogonService}
 * @see {\@link LogonInterceptor}
 * @record
 */
export function LogonParameter() { }
if (false) {
    /** @type {?} */
    LogonParameter.prototype.logon;
    /** @type {?|undefined} */
    LogonParameter.prototype.appName;
    /** @type {?|undefined} */
    LogonParameter.prototype.NTLMserver;
    /** @type {?|undefined} */
    LogonParameter.prototype.webserviceServer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb24ucGFyYW1ldGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGhiNDIvbGliLWNsaWVudC8iLCJzb3VyY2VzIjpbInNlcnZpY2UvbG9nb24vbG9nb24ucGFyYW1ldGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxvQ0FLQzs7O0lBSkMsK0JBQWM7O0lBQ2QsaUNBQWlCOztJQUNqQixvQ0FBb0I7O0lBQ3BCLDBDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogS29uZmlndXJhdGlvbiBkZXIgSldULUxvZ29uLU1pbWlrIGZ1ZXIgUkVTVC1BdWZydWZlXG4gKlxuICogTXVzcyBpbSBhcHAubW9kdWxlIGRlZmluaWVydCB3ZXJkZW46XG4gKiA8cHJlPlxuICogICAgICAgICAgICBwcm92aWRlcnMgICA6IFtcbiAqICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgcHJvdmlkZTogTE9HT05fT1BUSU9OUyxcbiAqICAgICAgICAgICAgICAgdXNlVmFsdWU6ICB7XG4gKiAgICAgICAgICAgICAgICAgbG9nb24gICAgICAgICAgIDogXCJOVExNXCIsXG4gKiAgICAgICAgICAgICAgICAgYXBwTmFtZSAgICAgICAgIDogZW52aXJvbm1lbnQubmFtZSxcbiAqICAgICAgICAgICAgICAgICBOVExNc2VydmVyICAgICAgOiBlbnZpcm9ubWVudC5OVExNc2VydmVyLFxuICogICAgICAgICAgICAgICAgIHdlYnNlcnZpY2VTZXJ2ZXI6IGVudmlyb25tZW50LndlYnNlcnZpY2VTZXJ2ZXJcbiAqICAgICAgICAgICAgICAgfSxcbiAqICAgICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgICAuLi5cbiAqIDwvcHJlPlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGxvZ29uIC0gTG9nb24tSGFuZGxpbmc6PGJyPi4uLiBOTyA9IGtlaW4gSldULUhhbmRsaW5nLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPi4uLiBOVExNID0gQXV0b2xvZ29uIHZpYSBOVExNLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyPi4uLiBGT1JNID0gRm9ybS1Mb2dpbiAobm9jaCBuaWNodCBpbXBsZW1lbnRpZXJ0KVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwcE5hbWUgLSBBcHAtTmFtZSBmdWVyIE5UTE0tQXV0b2xvZ29uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gTlRMTXNlcnZlciAtIFNlcnZlciBmdWVyIGRpZSBOVExNLUFubWVsZHVuZ1xuICogQHByb3BlcnR5IHtzdHJpbmd9IHdlYnNlcnZpY2VTZXJ2ZXIgLSBIaWVyIGxhZXVmdCBkZXIgQXV0b2xvZ29uLDxicj4uLi4gYW4gZGllc2VuIFNlcnZlciB3ZXJkZW4gSldUIGdlc2VuZGV0XG4gKlxuICogQHNlZSB7QGxpbmsgTE9HT05fT1BUSU9OU31cbiAqIEBzZWUge0BsaW5rIExvZ29uU2VydmljZX1cbiAqIEBzZWUge0BsaW5rIExvZ29uSW50ZXJjZXB0b3J9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9nb25QYXJhbWV0ZXIge1xuICBsb2dvbjogc3RyaW5nO1xuICBhcHBOYW1lPzogc3RyaW5nO1xuICBOVExNc2VydmVyPzogc3RyaW5nO1xuICB3ZWJzZXJ2aWNlU2VydmVyPzogc3RyaW5nO1xufVxuIl19