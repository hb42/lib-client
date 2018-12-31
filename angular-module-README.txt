beim Bauen eines Angular Modules sind einige Dinge zu beachten:

-> https://medium.com/@cyrilletuzi/how-to-build-and-publish-an-angular-module-7ad19c0b4464
-> https://github.com/davguij/angular-npm-module-seed

Hier nicht vollstaendig umgesetzt, da das Package nur lokal verwendet wird
(npm install ../shared/lib-client). Dafuer genuegt es, das Modul mit dem Angular-Compiler
ngc zu uebersetzen (zumindest sieht es momentan so aus). Zusaetzlich wird das Paket
nicht unterhalb des Projekt-Verzeichnisses angelegt, damit das lokale node_modules
nicht im verwendenten Projekt sichtbar ist.
Es ist hier auch sinnvoller in tsconfig.json mit "include" zu arbeiten, weil dann die
compilierten Dateien unterhalb /lib liegen und nicht unter /lib/src
(mit einer index.ts im root).


Als zusaetzliche Pakete werden gebraucht
  @angular/compiler, @angular/complier-client, rimraf, copyfiles

Scripts in package.json
  "scripts": {
    "clean:lib": "./node_modules/.bin/rimraf ../shared/lib-client/lib",
    "clean:tmp": "./node_modules/.bin/rimraf tmp",
    "clean": "npm run clean:lib && npm run clean:tmp",
    "ngc": "./node_modules/.bin/ngc",
    "copy": "./node_modules/.bin/cpx '{package.json,LICENSE,README.md}' ../shared/lib-client",
    "build": "npm run clean && npm --no-git-tag-version version patch && npm run ngc && npm run copy"

Die tsconfig.json mit eigenen Anpassungen:
{
  "compilerOptions": {
    "baseUrl": "./src",  // geaendert
    "declaration": true,
    "stripInternal": true,
    "experimentalDecorators": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "module": "es2015",
    "moduleResolution": "node",
    "outDir": "./lib",  // geaendert
    "sourceMap": true,
    "inlineSources": true,
    "target": "es6",  // statt es5
    "skipLibCheck": true,
    "lib": [
      "es2015",
      "dom"
    ]
  },
  "include": [  // anstelle "files: [ index.ts ]"
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "div",
    "dist",
    "lib"
  ],

  "angularCompilerOptions": {
    "strictMetadataEmit": true,
        "genDir": "tmp"  // tmp files hier erstellen
  }
}
