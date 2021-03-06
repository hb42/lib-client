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
 *
 * @param logon - Logon-Handling:<br>... NO = kein JWT-Handling,
 *                               <br>... NTLM = Autologon via NTLM,
 *                               <br>... FORM = Form-Login (noch nicht implementiert)
 * @param appName - App-Name fuer NTLM-Autologon
 * @param NTLMserver - Server fuer die NTLM-Anmeldung
 * @param webserviceServer - Hier laeuft der Autologon,<br>... an diesen Server werden JWT gesendet
 *
 * @see {@link LOGON_OPTIONS}
 * @see {@link LogonService}
 * @see {@link LogonInterceptor}
 */

export interface LogonParameter {
  logon: string;
  appName?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NTLMserver?: string;
  webserviceServer?: string;
}
