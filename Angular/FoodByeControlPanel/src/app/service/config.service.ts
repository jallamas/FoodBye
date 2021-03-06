import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Config {
  serverUrl: string;
  loginUrl: string;
  signinUrl: string;
  pedidosUrl: string;
  clientId: string;
  clientSecret: string;
}

export function configServiceInitializerFactory(config: ConfigService): Function {
  return () => config.load();
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;

  constructor(private http: HttpClient) {}

  load(): Promise<any> {
    console.log('load resources');
    this.config = {
      serverUrl: environment.serverUrl,
      loginUrl: environment.loginUrl,
      signinUrl: environment.signinUrl,
      pedidosUrl: environment.pedidosUrl,
      clientId: environment.clientId,
      clientSecret: environment.clientSecret
    };
    return of().toPromise();
  }

}
