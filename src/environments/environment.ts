// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyA9pudug9kb8tJN7luh-i9RHfeHPOEcCaE',
    authDomain: 'uj-respond.firebaseapp.com',
    databaseURL: 'https://uj-respond.firebaseio.com',
    projectId: 'uj-respond',
    storageBucket: 'uj-respond.appspot.com',
    messagingSenderId: '1096796455758'

  },
  googleMapsKey: 'AIzaSyBVeFj7F9RuheDXtqDPH5mHAxbWv0IRGhQ',
  libraries: ['places', 'geometry']
};
