// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

import {config} from "config";

export const environment = {
    production: false,
    apiURL: config.apiUrl,
    rutasAngular:{
        login:{
            iniciarSession: "/login"
        },
        NotFound: '/404'
    },
    rutasLaravel: {
        modules: '/modules',
        login: {
            login: '/auth/login',
            me: '/auth/me',
            refresh: '/auth/refresh',
            logout: '/auth/logout'
        }
    }
};
