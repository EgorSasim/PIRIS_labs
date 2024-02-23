import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@angular/fire/remote-config';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const OPTIONS = {
  projectId: 'pirislabs-b82eb',
  appId: '1:696377266213:web:e3f7496bb5ec2538586fcc',
  storageBucket: 'pirislabs-b82eb.appspot.com',
  apiKey: 'AIzaSyBqP3BUXwILq9M8no8aOR2NTTXmKMNiWoQ',
  authDomain: 'pirislabs-b82eb.firebaseapp.com',
  messagingSenderId: '696377266213',
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: OPTIONS,
    },
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideNativeDateAdapter(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(OPTIONS))),
    ScreenTrackingService,
    UserTrackingService,
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideMessaging(() => getMessaging())),
    importProvidersFrom(providePerformance(() => getPerformance())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())),
  ],
};
