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
 * @property {string} logon - Logon-Handling:<br>... NO = kein JWT-Handling,
 *                                           <br>... NTLM = Autologon via NTLM,
 *                                           <br>... FORM = Form-Login (noch nicht implementiert)
 * @property {string} appName - App-Name fuer NTLM-Autologon
 * @property {string} NTLMserver - Server fuer die NTLM-Anmeldung
 * @property {string} webserviceServer - Hier laeuft der Autologon,<br>... an diesen Server werden JWT gesendet
 *
 * @see {@link LOGON_OPTIONS}
 * @see {@link LogonService}
 * @see {@link LogonInterceptor}
 */
export interface LogonParameter {
    logon: string;
    appName?: string;
    NTLMserver?: string;
    webserviceServer?: string;
}
