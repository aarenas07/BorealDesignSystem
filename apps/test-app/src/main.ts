import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // 1. Importa el nombre correcto (AppComponent) y el archivo correcto (.component)

bootstrapApplication(AppComponent, appConfig) // 2. Arranca AppComponent
  .catch((err) => console.error(err));