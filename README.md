# generator-npm-wp-s-theme

[Yeoman](http://yeoman.io/) generator for a WordPress starter theme (using [Underscores](https://github.com/Automattic/_s)) with [npm](https://www.npmjs.com/) and other good stuff. This will install the last version of `_s` (Underscores) and optionally a npm package setup ready for development and production.

* [List of packages used](#list-of-packages-used)
* [Installation](#installation)
* [Usage](#usage)
* [List of main tasks](#list-of-main-tasks)
* [Need help?](#need-help)

## List of packages used:
#### for development theme:
[autoprefixer](https://github.com/postcss/autoprefixer), [browser-sync](https://github.com/Browsersync/browser-sync), [copyfiles](https://github.com/calvinmetcalf/copyfiles), [cssnano](https://github.com/cssnano/cssnano), [jshint](https://github.com/jshint/jshint), [make-dir-cli](https://github.com/sindresorhus/make-dir-cli),  [node-sass](https://github.com/sass/node-sass), [npm-run-all](https://github.com/mysticatea/npm-run-all), [onchange](https://github.com/Qard/onchange), [postcss-cli](https://github.com/code42day/postcss-cli), [rimraf](https://github.com/isaacs/rimraf), [uglify-js](https://github.com/mishoo/UglifyJS2), [wp-pot-cli](https://github.com/rasmusbe/wp-pot-cli), [@ffflorian/jszip-cli](https://github.com/ffflorian/jszip-cli).

#### for download and generation clean theme: 
[chalk](https://github.com/chalk/chalk), [copy](https://github.com/jonschlinkert/copy), [del](https://github.com/sindresorhus/del), [download](https://github.com/kevva/download), [lodash](https://github.com/lodash/lodash), [path](https://github.com/jinder/path), [walk](https://github.com/Daplie/node-walk), [yeoman-generator](https://github.com/yeoman/generator), [yosay](https://github.com/yeoman/yosay), [pretty-hrtime](https://github.com/robrich/pretty-hrtime).

## Installation

First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.

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
Requests for adding files `.gitignore`, `.editorconfig`, `.jshintignore`, `.stylelintrc` and `.npmrc` are better left by default, and if necessary, make settings in them after installation

## Usage

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `watch`. It will start a new server, open up a browser and watch for any SCSS, JS, PHP changes in the theme; once it compiles those changes, the browser will automatically  reload page with injected the changeds!

## List of main tasks
### `watch`
`npm run watch`

Run the following tasks simultaneously: `serve`, `watch:css`, `watch:js` & `watch:images`. When a .scss, .js, .php or image file changes, the task will compile .scss and .js files, and the server will be notified of the change. Any browser connected to the server will then inject the new file.

#### `build`
`npm run build`

Copies all the files necessary for the project to the "dist" directory. There are files in the theme catalog and in the archive.
Compiles SCSS to CSS & add vendor prefixes, updates the language file.

## List of useful tasks (one time)
#### `lang`
`npm run lang`

Updates the theme language file.

__*__First run add all options(textdomains, author, email..).
 
#### `css`
`npm run css`

Compiles SCSS to CSS, add vendor prefixes & minify/compress.

__*__ Minify files saving in "css" directory

#### `uglify`
`npm run uglify`

To parse/compress/minify/beautify JavaScript files to single files "app.min.js" in "dist/js/" directory.

## Need help?
Feel free to [create an issue](https://github.com/mnyorba/generator-npm-wp-s-theme/issues), [tweet me](http://twitter.com/m_nyorba), or [send me an email](mailto:mnyorba@gmail.com). I'd be glad to help where I can!

## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2017 [MNyorba]