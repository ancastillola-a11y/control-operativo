\# Guía para importar y conectar Firebase con la app Control Operativo



\## 1. Objetivo



Esta guía explica cómo instalar el proyecto \*\*Control Operativo\*\*, conectarlo con Firebase y resolver los errores más comunes que pueden aparecer al ejecutar la app en otra computadora.



El proyecto usa:



\* Angular / Ionic.

\* Firebase Authentication.

\* Cloud Firestore.

\* Firebase Storage está configurado en código, pero por ahora no se usará para fotos porque puede requerir activar facturación Blaze y configurar CORS.



---



\## 2. Requisitos previos



Antes de ejecutar el proyecto, la computadora debe tener instalado:



\* Visual Studio Code.

\* Node.js y npm.

\* Git, si se va a clonar desde GitHub.

\* Acceso al proyecto Firebase `comproy-sac`, para ello creamos una cuenta de prueba para consultas, por lo cual debera de logearse con esta cuenta de google de pruba: 
Correo:proyecto7cuentaprueba@gmail.com     
Contraseña:@ucvvirtual.edu.pe

\* Navegador Chrome o similar.

//Al mooemto de iniciar el software hay 2 cuentas: 
Administrador Usuario:nany   contraseña 1234567
Empleado   Ususario:alricaldiva   Contraseña:123456

http://localhost:8100/seleccion-usuario

Para verificar Node y npm, abrir PowerShell o la terminal de VS Code y ejecutar:



```powershell

node -v

npm -v

```



Si ambos comandos muestran versión, la instalación está correcta.



---



\## 3. Abrir correctamente el proyecto



Es importante abrir la carpeta correcta. El proyecto Angular real es la carpeta donde existen estos archivos:



```text

package.json

angular.json

src

```



Si el proyecto fue descargado como ZIP, puede quedar una carpeta dentro de otra, por ejemplo:



```text

control-operativo-main (2)

└── control-operativo-main

&nbsp;   ├── package.json

&nbsp;   ├── angular.json

&nbsp;   └── src

```



En ese caso, en VS Code se debe abrir la carpeta interna:



```text

control-operativo-main

```



No se debe ejecutar `npm install` en una carpeta donde no exista `package.json`.



Para verificarlo desde la terminal:



```powershell

dir

```



Debe aparecer:



```text

package.json

angular.json

src

```



---



\## 4. Instalar dependencias



Dentro de la carpeta correcta del proyecto, ejecutar:



```powershell

npm install --legacy-peer-deps

```



Se usa `--legacy-peer-deps` porque el proyecto puede tener versiones de Angular y AngularFire con dependencias estrictas. Sin ese parámetro puede aparecer el error:



```text

ERESOLVE unable to resolve dependency tree

```



Si aparecen mensajes como:



```text

npm warn deprecated

```



no significa que la instalación falló. Son advertencias de dependencias antiguas usadas internamente.



---



\## 5. Error común: no encuentra package.json



Si aparece este error:



```text

Could not read package.json

ENOENT no such file or directory

```



significa que la terminal está ubicada en una carpeta incorrecta.



Solución:



```powershell

cd Documents

cd "control-operativo-main (2)"

cd control-operativo-main

dir

npm install --legacy-peer-deps

```



La regla principal es:



```text

Los comandos npm se ejecutan donde está package.json.

```



---



\## 6. Error común: comando rm -rf no funciona



El comando:



```bash

rm -rf node\_modules package-lock.json

```



es para Linux o Mac.



En Windows PowerShell se debe usar:



```powershell

Remove-Item node\_modules -Recurse -Force

Remove-Item package-lock.json -Force

```



---



\## 7. Configurar Firebase en el proyecto



La configuración de Firebase se copia desde:



```text

Firebase Console

→ Proyecto comproy-sac

→ Configuración del proyecto

→ General

→ Tus apps

→ App web comproy-sac-web

→ Configuración del SDK

```



Firebase muestra un bloque parecido a este:



```typescript

const firebaseConfig = {

&nbsp; apiKey: "...",

&nbsp; authDomain: "...",

&nbsp; projectId: "...",

&nbsp; storageBucket: "...",

&nbsp; messagingSenderId: "...",

&nbsp; appId: "..."

};

```



En este proyecto, el archivo de configuración está en:



```text

src/configuracion/environment.ts

```



Debe quedar con esta estructura:



```typescript

export const environment = {

&nbsp; production: false,

&nbsp; firebaseConfig: {

&nbsp;   apiKey: "PEGAR\_API\_KEY",

&nbsp;   authDomain: "PEGAR\_AUTH\_DOMAIN",

&nbsp;   projectId: "comproy-sac",

&nbsp;   storageBucket: "PEGAR\_STORAGE\_BUCKET",

&nbsp;   messagingSenderId: "PEGAR\_MESSAGING\_SENDER\_ID",

&nbsp;   appId: "PEGAR\_APP\_ID"

&nbsp; }

};

```



También revisar:



```text

src/configuracion/environment.prod.ts

```



Debe tener la misma configuración, cambiando solo:



```typescript

production: true

```



---



\## 8. Verificar conexión Firebase en main.ts



El archivo:



```text

src/main.ts

```



debe tener proveedores de Firebase similares a estos:



```typescript

provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

provideAuth(() => getAuth()),

provideFirestore(() => getFirestore()),

provideStorage(() => getStorage()),

```



Aunque `provideStorage` esté presente, por ahora no se recomienda usar subida de fotos si no se activó Firebase Storage con facturación.



---



\## 9. Configurar reglas de Firestore para desarrollo



Si al entrar al login aparece:



```text

No tiene permisos para consultar usuarios en Firestore

```



el problema está en las reglas de Firestore.



Ir a:



```text

Firebase Console

→ Firestore Database

→ Reglas

```



Para desarrollo se puede usar temporalmente:



```javascript

rules\_version = '2';



service cloud.firestore {

&nbsp; match /databases/{database}/documents {

&nbsp;   match /{document=\*\*} {

&nbsp;     allow read, write: if true;

&nbsp;   }

&nbsp; }

}

```



Luego presionar:



```text

Publicar

```



Esta regla es solo para desarrollo y pruebas. No debe usarse así en producción porque deja la base de datos abierta.



---



\## 10. Diferencia entre permisos IAM y reglas Firestore



En Firebase existen dos tipos de permisos que no deben confundirse.



\### Usuarios y permisos del proyecto



Esto permite que una persona administre el proyecto en Firebase Console.



Ruta:



```text

Configuración del proyecto

→ Usuarios y permisos

```



\### Reglas de Firestore



Esto controla si la app puede leer o escribir datos en la base de datos.



Ruta:



```text

Firestore Database

→ Reglas

```



Aunque una persona sea propietaria del proyecto, la app puede seguir bloqueada si las reglas de Firestore no permiten lectura o escritura.



---



\## 11. Colecciones principales usadas por la app



El proyecto trabaja principalmente con estas colecciones:



```text

usuarios

trabajos

materiales

devoluciones

movimientos\_materiales

notificaciones\_admin

historial\_actividades

modulos\_admin

configuracion

```



La colección importante para empleados es:



```text

usuarios

```



No se debe usar una colección llamada `empleados`, porque en este proyecto los empleados se guardan dentro de `usuarios`.



---



\## 12. Estructura mínima de usuarios



Los administradores y empleados se guardan en:



```text

usuarios/{uid}

```



Un empleado debe tener como mínimo:



```text

uid

nombres

apellidos

nombreCompleto

usuario

correo

correoAuth

dni

telefono

cargo

rol: "empleado"

habilitado: true

activo: true

estado: true

eliminado: false

fotoUrl: ""

```



Un administrador debe tener:



```text

usuario

rol: "admin" o "administrador"

activo: true

```



Si un empleado aparece en Firebase Authentication pero no aparece en la app, revisar que también exista como documento en Firestore dentro de la colección `usuarios`.



Authentication solo guarda el acceso. La app muestra datos desde Firestore.



---



\## 13. Sobre las fotos de empleados



Por ahora no se usará subida de fotos.



El motivo es que Firebase Storage puede requerir:



\* Activar plan Blaze.

\* Configurar bucket.

\* Configurar reglas Storage.

\* Configurar CORS.



Si no se configura correctamente, aparece un error como:



```text

blocked by CORS policy

```



o la imagen queda sin guardarse.



Para continuar el desarrollo sin depender de Storage, la app puede funcionar con iniciales del empleado o una imagen local por defecto.



---



\## 14. Levantar el proyecto



Desde VS Code:



1\. Abrir la carpeta donde está `package.json`.

2\. Abrir terminal.

3\. Ejecutar:



```powershell

npm start

```



También se puede usar:



```powershell

ionic serve

```



Si todo está correcto, la terminal debe mostrar algo parecido a:



```text

Application bundle generation complete.

Local: http://localhost:4200/

Watch mode enabled.

```



Luego abrir en navegador:



```text

http://localhost:4200/

```



---



\## 15. Error común: localhost rechazó la conexión



Si al abrir `http://localhost:4200/` aparece:



```text

ERR\_CONNECTION\_REFUSED

```



significa que el servidor Angular no está corriendo.



Solución:



1\. Volver a VS Code.

2\. Abrir terminal.

3\. Entrar a la carpeta correcta del proyecto.

4\. Ejecutar:



```powershell

npm start

```



No cerrar la terminal mientras se usa la app.



---



\## 16. Login administrativo



Para ingresar como administrador, usar la ruta:



```text

http://localhost:4200/login-admin

```



Si aparece error de permisos, revisar reglas de Firestore.



Si aparece usuario incorrecto, revisar que el usuario exista en la colección:



```text

usuarios

```



y tenga rol:



```text

admin

```



o:



```text

administrador

```



---



\## 17. Problemas frecuentes y solución rápida



\### Error: ERESOLVE unable to resolve dependency tree



Solución:



```powershell

npm install --legacy-peer-deps

```



\### Error: Could not read package.json



Causa: terminal en carpeta incorrecta.



Solución: entrar a la carpeta donde están `package.json`, `src` y `angular.json`.



\### Error: No tiene permisos para consultar usuarios en Firestore



Causa: reglas Firestore restrictivas.



Solución en desarrollo: usar temporalmente `allow read, write: if true`.



\### Error: localhost rechazó la conexión



Causa: servidor apagado.



Solución:



```powershell

npm start

```



\### Error: la foto no sube



Causa: Firebase Storage no configurado, CORS o plan Blaze.



Solución actual: no usar fotos y continuar con datos de empleados.



\### Error: empleados no aparecen



Revisar:



```text

Firestore → usuarios

```



El empleado debe tener:



```text

rol: "empleado"

eliminado: false

```



---



\## 18. Recomendación para GitHub



No subir:



```text

node\_modules

```



Sí subir:



```text

package.json

package-lock.json

src

angular.json

capacitor.config.ts

README.md

instrucciones para importar app

```



Si se cambia la configuración de Firebase, verificar que no se suban archivos privados como cuentas de servicio o claves administrativas.



---



\## 19. Orden recomendado para instalar en otra PC



1\. Descargar o clonar el repositorio.

2\. Abrir en VS Code la carpeta donde está `package.json`.

3\. Ejecutar:



```powershell

npm install --legacy-peer-deps

```



4\. Verificar `src/configuracion/environment.ts`.

5\. Verificar reglas de Firestore.

6\. Ejecutar:



```powershell

npm start

```



7\. Abrir:



```text

http://localhost:4200/

```



8\. Probar login administrativo.

9\. Probar lectura de empleados, trabajos y materiales.



---



\## 20. Nota final



El proyecto depende de Firebase en la nube. Si la app compila pero no muestra datos, casi siempre el problema está en una de estas tres cosas:



```text

1\. environment.ts apunta a otro proyecto Firebase.

2\. Firestore Rules bloquean lectura/escritura.

3\. Los datos no están en las colecciones esperadas.

```



Antes de modificar código, revisar primero Firebase y la consola del navegador.



