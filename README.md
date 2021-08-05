## My Github Page

Inside the source code you'll find the React w/ Redux App powering the github page. While it's a fairly small project to be using React & Redux, this is more of a proof of concept page for using things like Styled Components and Leaflet without the help of react-leaflet. Therefore files will be larger than usual production deployments to preserve file structures in sourcemaps and allow for a more pleasant experience debugging and explaining the stack.

### TODOs

- Add Delete Buttons for drawn shapes
- Add Download Buttons for GeoJSON of shapes
- Make location persistent with refreshes
- Find out why shape borders come out darker after converting from leaflet layer to GeoJSON back to layer
- Fix deployment warning 467 KiB main.js (webpack recommends 244 KiB and suggests https://webpack.js.org/guides/code-splitting/)

### webpack & builds

While tsc can build js files, webpack helps bring the css, scss, svg, etc. together. So ts-loader is used inside webpack. For the dev server, the entrypoints are separated from the built javascript (`public` vs `dist` respectively) since the built `main.js` has a tendency to override the dev servers more up-to-date `main.js`

### gh-pages & deployment

Under the github repo's settings there's a tab "Pages" where the served files can be changed to the `gh-pages` branch instead of the default `main`. Also `cross-env NODE_DEBUG=gh-pages` is added before the gh-pages command to log more of what is actually taking place during deployment.

It might be worth it to connect to GitHub Action: https://github.com/tschaub/gh-pages#deploying-with-github-actions
