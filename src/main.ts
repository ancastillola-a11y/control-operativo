// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules, RouteReuseStrategy } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { registrarIconosApp } from './app/config/ionicons-app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './configuracion/environment';

registrarIconosApp();
bootstrapApplication(AppComponent, {
  providers: [
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

    // Ionic
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimations() // Habilita animaciones globales
  ]
});