// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAnOOj3K98CE7KgjrSnkVDVEXTxJDaS40s',
    authDomain: 'httppostexample-c100f.firebaseapp.com',
    databaseURL: 'https://httppostexample-c100f.firebaseio.com',
    projectId: 'httppostexample-c100f',
    storageBucket: 'httppostexample-c100f.appspot.com',
    messagingSenderId: '316899103214'

  },
  googleMapsKey: 'AIzaSyBVeFj7F9RuheDXtqDPH5mHAxbWv0IRGhQ',
  libraries: ['places', 'geometry']
};
