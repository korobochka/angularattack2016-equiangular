// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { API } from './services/api.service';

// Application wide providers
export const APP_PROVIDERS = [
    AppState,
    API
];