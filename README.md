# generator-npm-wp-s-theme

[Yeoman](http://yeoman.io/) generator for a WordPress starter theme (using [Underscores](https://github.com/Automattic/_s)) with [npm](https://www.npmjs.com/) and other good stuff. This will install the last version of `_s` (Underscores) and optionally a npm package setup ready for development and production.

* [List of packages used](#list-of-packages-used)
* [Installation](#installation)
* [Usage](#usage)
* [List of available tasks](#list-of-available-tasks)
* [Need help?](#need-help)

## List of packages used
[autoprefixer](https://github.com/postcss/autoprefixer), [browser-sync](https://github.com/Browsersync/browser-sync), [eslint](https://github.com/eslint/eslint), [imagemin-cli](https://github.com/imagemin/imagemin-cli), [node-sass](https://github.com/sass/node-sass), [onchange](https://github.com/Qard/onchange), [npm-run-all](https://github.com/mysticatea/npm-run-all), [postcss-cli](https://github.com/code42day/postcss-cli), [svgo](https://github.com/svg/svgo), [svg-sprite-generator](https://github.com/frexy/svg-sprite-generator), [uglify-js](https://github.com/mishoo/UglifyJS2), [mkdirp](https://github.com/substack/node-mkdirp), [rimraf](https://github.com/isaacs/rimraf), [stylelint](https://github.com/stylelint/stylelint), [archiver](https://github.com/archiverjs/node-archiver), [del](https://github.com/sindresorhus/del), [wp-pot](https://github.com/rasmusbe/wp-pot), [wiredep-cli](https://github.com/taptapship/wiredep-cli), [output-file-sync](https://github.com/shinnn/output-file-sync).

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

If this a new project (without a package.json file), start by:

##### Create a new directory, and go into:

```bash
mkdir my-new-theme && cd $_
```

##### Run `yo npm-wp-s-theme`, and fill the info:

```bash
yo npm-wp-s-theme
```

Next, enter your project information.
To install theme and start generator You must input `Localhost address`, `domain site`, `theme name` and `theme slug`. 
`Theme URI`, `author`, `author URI`, `author Email`, `description` and `bug report` not required and are filled in at will.
Requests for adding files `.gitignore`, `.editorconfig`, `.eslintrc.json`, `.stylelintrc` and `.npmrc` are better left by default, and if necessary, make settings in them after installation

## Usage

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `watch`. It will start a new server, open up a browser and watch for any SCSS, JS, PHP changes in the theme; once it compiles those changes, the browser will automatically  reload page with injected the changeds!

## List of available tasks
### `watch`
  `run-p serve watch:*`

  Run the following tasks simultaneously: `serve`, `watch:css`, `watch:js` & `watch:images`. When a .scss, .js, .php or image file changes, the task will compile .scss and .js files, and the server will be notified of the change. Any browser connected to the server will then inject the new file.

#### `serve`
  `browser-sync start --proxy \"< host >/< theme >\" --files \"*.scss, js/*.js, **/*.php, !node_modules/**/*.html, !bower_components*.*\`

  Start a new server and watch for CSS & JS file changes

#### `build:css`
  `run-p scss:*`

  Alias to run the all `scss` tasks.

#### `build:js`
  `run-s lint concat uglify`

  Alias to run the `lint`, `concat` and `uglify` tasks. Lints JS, combines JS files & uglifies the output

#### `build:images`
  `run-s imagemin icons`

  Alias to run the `imagemin` and `icons` tasks. Compresses images, generates an SVG sprite from a folder of separate SVGs

#### `build`
  `run-s build:*`

  Alias to run all of the `build` commands

#### `watch:css`
  `onchange 'src/**/*.scss' -- run-s build:css autoprefixer`

  Watches for any .scss file in `scss` to change, then runs the `build:css` and `autoprefixer` tasks. Compiles SCSS to CSS & add vendor prefixes

#### `watch:js`
  `onchange 'src/**/*.js' -- run-s build:js`

  Watches for any .js file to change, then runs the `build:js` task

#### `watch:images`
  `onchange 'src/images/**/*' -- run-s build:images`

  Watches for any images in `images` to change, then runs the `build:images` task

## Bower usage
- Run `bower install --save <package>` to install frontend dependencies
- Run `wiredep` to include SCSS file in `/sass/style.scss`


## Need help?
Feel free to [create an issue](https://github.com/mnyorba/generator-npm-wp-s-theme/issues), [tweet me](http://twitter.com/m_nyorba), or [send me an email](mailto:mnyorba@gmail.com). I'd be glad to help where I can!

## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017 [MNyorba]
