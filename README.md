## My Github Page

Inside the source code you'll find the React w/ Redux App powering the github page. While it's a fairly small project to be using React & Redux, this is more of a proof of concept page for using things like Styled Components and Leaflet without the help of react-leaflet. Therefore files will be larger than usual production deployments to preserve file structures in sourcemaps and allow for a more pleasant experience debugging and explaining the stack.

### TODOs (in order of priority)

- upgrade to v5 bootstrap
- add Delete Buttons for drawn shapes
- convert it all to TS
- fix deployment warning 467 KiB main.js (webpack recommends 244 KiB and suggests [code splitting](https://webpack.js.org/guides/code-splitting/))
- add [legacy support](https://caniuse.com/download) for download button
- see if stripping useState out of home.jsx and using theme redux state makes it easier/harder to read
- fix hsl values being calculated for original theme colors (Alert variant="danger" in default v4 BS has value of #f8d7da and the hsl calculated is hsl(354deg, 36%, 77%, 1) seems it should be more like hsl(354deg, 50%, 85%, 1);
- fix nested-persists for root.map.leaflet key that isn't working for some reason following (this)[https://github.com/rt2zz/redux-persist#nested-persists] example.

### webpack & builds

While tsc can build js files, webpack helps bring the css, scss, svg, etc. together. So ts-loader is used inside webpack. For the dev server, the entrypoints are separated from the built javascript (`public` vs `dist` respectively) since the built `main.js` has a tendency to override the dev servers more up-to-date `main.js`

### gh-pages & deployment

Under the github repo's settings there's a tab "Pages" where the served files can be changed to the `gh-pages` branch instead of the default `main`. Also `cross-env NODE_DEBUG=gh-pages` is added before the gh-pages command to log more of what is actually taking place during deployment.

It might be worth it to connect to GitHub Action: https://github.com/tschaub/gh-pages#deploying-with-github-actions
