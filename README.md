# generator-npm-wp-s-theme

[Yeoman](http://yeoman.io/) generator for a WordPress starter theme (using [Underscores](https://github.com/Automattic/_s)) with [npm](https://www.npmjs.com/) and other good stuff. This will install the last version of `_s` (Underscores) and optionally a npm package setup ready for development and production.

## List of packages used
[autoprefixer](https://github.com/postcss/autoprefixer), [browser-sync](https://github.com/Browsersync/browser-sync), [eslint](https://github.com/eslint/eslint), [imagemin-cli](https://github.com/imagemin/imagemin-cli), [node-sass](https://github.com/sass/node-sass), [onchange](https://github.com/Qard/onchange).

## Installation

* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.

##### Install required tools `yo`:

```bash
npm install -g yo
```

##### Install `generator-npm-wp-s-theme`:

```bash
npm install -g generator-npm-wp-s-theme
```

### Run

##### Create a new directory, and go into:

```bash
mkdir my-new-theme && cd $_
```

##### Run `yo npm-wp-s-theme`, and fill the info:

```bash
yo npm-wp-s-theme
```

## Usage
### `watch`
  `run-p serve watch:*`

  Run the following tasks simultaneously: `serve`, `watch:css`, `watch:js` & `watch:images`. When a .scss or .js file changes, the task will compile .scss and .js files, and the server will be notified of the change. Any browser connected to the server will then inject the new file

#### `serve`
  `browser-sync start --proxy \"< host >/< theme >\" --files \"*.scss, js/*.js, **/*.php, !node_modules/**/*.html, !bower_components*.*\`

  Start a new server and watch for CSS & JS file changes in the `dist` folder

#### `build:css`
  `run-p scss:*`

  Alias to run the all `scss` tasks.

#### `build:js`
  `run-s lint concat uglify`

  Alias to run the `lint`, `concat` and `uglify` tasks. Lints JS, combines `src` JS files & uglifies the output

#### `build:images`
  `run-s imagemin icons`

  Alias to run the `imagemin` and `icons` tasks. Compresses images, generates an SVG sprite from a folder of separate SVGs

#### `build`
  `run-s build:*`

  Alias to run all of the `build` commands

#### `watch:css`
  `onchange 'src/**/*.scss' -- run-s build:css autoprefixer`

  Watches for any .scss file in `src` to change, then runs the `build:css` and `autoprefixer` tasks. Compiles Scss to CSS & add vendor prefixes

#### `watch:js`
  `onchange 'src/**/*.js' -- run-s build:js`

  Watches for any .js file in `src` to change, then runs the `build:js` task

#### `watch:images`
  `onchange 'src/images/**/*' -- run-s build:images`

  Watches for any images in `src` to change, then runs the `build:images` task

## Bower usage
- Run `bower install --save <package>` to install frontend dependencies
- Run `wiredep` to include SCSS file in `/sass/style.scss`

## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017 [MNyorba]
