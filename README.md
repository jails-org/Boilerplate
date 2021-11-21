<h1 align="center">Front Static Boilerplate</h1>

<br />

<p align="center">
	<img width="200" src="https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/312/full/ImmuateableImmer_Final.png" />
</p>

<p align="center">
	<a href="https://github.com/pugjs">Pug</a> • <a href="https://github.com/stylus/stylus">Stylus</a> • <a href="https://github.com/Jails-org/Jails">Jails</a> • <a href="https://developers.google.com/web/fundamentals/web-components/customelements">Web Components</a> • <a href="https://webpack.js.org/">Webpack</a>
</p>
---

## Yarn/NPM commands

#### Development

`yarn && yarn start`

#### Production

`yarn build`

#### Local Test Production

`yarn server`

#### Run Unit Tests

`yarn test`

---

## apis

You can perform any api requests and let them available for your pug template by exporting that service in `apis/index.js`
If you export a function named as `mydata()`, it will be available as `API.mydata` on pug templates

---

## routes.js

You define your routes in the `routes.js` file in the root of the project. It gets the API's reference so you can generate dynamic paths.

The only required fields are:

-   `page` : Which is your entrypoint for Javascript and Css main file.
-   `file`: Here you need to define where your html file will be generated.

The routes object and its props will be available for pug templates in `routes` global variable and the current route will be available in `route` global variable.

---

## Tasks

Tasks folder has a node entry point file that will integrate `apis`, `global` and `routes` modules before calling webpack.

---

## Globals

There are some global variables and functions available on `pug` and `js` files:

#### Global Variables

All defined on `webpack.config.babel.js`:

-   `routes` : The collection result returned by the function exported in `routes.js`.
-   `route` : The current route from the `routes` collection.
-   `page` : The page entrypoint defined in the route definition file.

-   `process.env.NODE_ENV` : Environment variable from `package.json` script call.
-   `APPCONFIG` : The configuration props depending on which `ENV` variable was called on `package.json` script task, it will be either `production` or `development`.
-   `API` : A global variable containing all server-side api's calls
-   `environment`: Holds the same value as `process.env.NODE_ENV`, it can be used to set production or development keys for inline script for GA for instance, it is used in `layouts/modules.pug@third-party`.
-   `site`: It has build information for layout and modules:
    -   routes : The routes collection from `routes.js`.
    -   assetsFolder : The current folder for assets, Default is ''.
    -   version : Contains the `package.json` version.
    -   hash : A hash generated on build script that can be used to invalidate cache: E.g `layouts/modules.pug@js`

### Global Functions

Global functions to be used on `pug` files, all defined on `/tasks/globals.js`

-   **Boilerplate.toJSON( JSONObject )** : Transforms a json to string, useful to be used on `data` attribute on HTMLElements.
-   **Boilerplate.getData( String )** : Get the json object from a file.
-   **Boilerpate.getRoute( String )** : Get a route from a specific `page`. Ex. Boilerplate.getRoute('home')
