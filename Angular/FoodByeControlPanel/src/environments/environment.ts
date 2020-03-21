// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:3000/api',
  loginUrl: ' http://localhost:3000/api/login',
  signinUrl: 'http://localhost:3000/api/register',

  /*serverUrl: 'https://foodbye.herokuapp.com/api',
  loginUrl: ' https://foodbye.herokuapp.com/api/login',
  signinUrl: 'https://foodbye.herokuapp.com/api/register',*/

  clientId: 'cemapp',
  clientSecret: 'secret'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
