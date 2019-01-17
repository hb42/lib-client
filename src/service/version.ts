/**
 * Created by hb on 06.04.17.
 */

export interface Version {
  name: string;
  displayname: string;
  description: string;
  version: string;
  copyright: string;
  author: string;
  license: string;
  major: number;
  minor: number;
  patch: number;
  prerelease: string;
  build: number | null;
  githash: string;
  versions: string[]; // Versionen von Subsystemen etc.
}
