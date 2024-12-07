import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgIconsModule } from '@ng-icons/core';
import { matArrowBack, matPlace, matWarning } from '@ng-icons/material-icons/baseline';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './interceptors/error.interceptor';
import { provideClientHydration, withI18nSupport } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgIconsModule.withIcons({ matPlace, matWarning, matArrowBack })),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([errorInterceptor]),
      withFetch(),
    ),
    provideClientHydration(withI18nSupport())
  ]
};
