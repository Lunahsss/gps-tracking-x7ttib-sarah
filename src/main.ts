import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  //
  if (window['']) {
    window[''].destroy();
  }
  window[''] = ref;

  // 
}).catch(err => console.error(err));