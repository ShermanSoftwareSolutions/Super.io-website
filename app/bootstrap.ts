import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app/app';
import {AuthHttp, AuthConfig} from './components/angular2-jwt/angular2-jwt';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  [
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(AuthConfig, {
      useFactory: () => {
        return new AuthConfig({
          tokenName: 'jwt'
        });
      }
    }),
    AuthHttp
  ]
]);
