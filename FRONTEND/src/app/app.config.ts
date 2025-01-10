import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './shared/states/cart-state';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(), importProvidersFrom(NgxsModule.forRoot([CartState])), provideAnimationsAsync()]
};
