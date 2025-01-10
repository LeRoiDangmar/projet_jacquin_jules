import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CartState } from './shared/states/cart-state';
import { provideRouter } from '@angular/router';
import { provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS, } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiHttpInterceptor } from './core/http-interceptor';




export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptorsFromDi()),{ provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(), importProvidersFrom(NgxsModule.forRoot([CartState])), provideAnimationsAsync()]
};
