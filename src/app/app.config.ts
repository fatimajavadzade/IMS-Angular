import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth.interceptor';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), //enable global error handling
    provideRouter(routes, withComponentInputBinding()), //enables routing
    provideHotToastConfig(), //enables toast notifications (hele saytda yoxdur elave edilecek)
    provideHttpClient(withInterceptors([authInterceptor])), //enables http through auth interceptor
  ],
};