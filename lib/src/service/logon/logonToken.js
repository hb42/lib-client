import { InjectionToken } from "@angular/core";
/**
 * Fuer das Einfuegen der LogonParameter als provider im app.module.
 * <pre>
 *            providers   : [
 *             {
 *               provide: LOGON_OPTIONS,
 *               useValue:  {
 *                 logon           : "NTLM",
 *            ...
 * </pre>
 * @see {@link LogonParameter}
 * @see {@link LogonService}
 * @see {@link LogonInterceptor}
 *
 * @type {InjectionToken<LogonParameter>}
 */
export const LOGON_OPTIONS = new InjectionToken("LOGON_OPTIONS");
//# sourceMappingURL=logonToken.js.map