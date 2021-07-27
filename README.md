## My Github Page

Inside the source code you'll find the React w/ Redux App powering the github page. While it's a fairly small project to be using React & Redux, this is more of a proof of concept page for using things like Styled Components and Leaflet without the help of react-leaflet.

### gh-pages

The structure can be a bit confusing due to trying to make changes, the deployment taking awhile to take affect, and then not knowing which changes fixed the page. So far it looks like `master` /index.html should point to dist/main.js which is actually on the `gh-pages` branch /main.js since that's where the `gh-pages` module commits to.

TODO:

- see if it's necessary in dist/index.html
- if it still doesn't work add dist/main.js back

### TODOs

- Add Delete Buttons for drawn shapes
- Add Download Buttons for GeoJSON of shapes
- Make location persistent with refreshes
- Find out why shape borders come out darker after converting from leaflet layer to GeoJSON back to layer
- Fix deployment warning 467 KiB main.js (webpack recommends 244 KiB and suggests https://webpack.js.org/guides/code-splitting/)
