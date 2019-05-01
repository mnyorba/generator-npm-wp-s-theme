'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const download = require('download');
var fs = require('fs');
var del = require('del');
var _ = require('lodash');
var walk = require('walk');
var path = require('path');
var prettyHrtime = require('pretty-hrtime');

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		console.log(yosay(
			'Welcome to the world-class ' + chalk.red('generator-npm-wp-s-theme') + ' generator!'
		));

		return this.prompt(
			[
					{
						type: 'input',
						name: 'proxy',
						message: 'Localhost address',
						default: 'localhost'
				},
					{
						type: 'input',
						name: 'domain',
						message: 'If you want to add a domain site',
						default: ''
				},
					{
						type: 'input',
						name: 'themeName',
						message: 'Theme Name',
						default: 'Theme Name'
				},
					{
						type: 'input',
						name: 'themeSlug',
						message: 'Theme slug',
						default: 'Theme slug'
				},
					{
						type: 'input',
						name: 'themeURI',
						message: 'Theme URI',
						default: 'https://example.com/themeURI/'
				},
					{
						type: 'input',
						name: 'author',
						message: 'Author',
						default: 'Author'
				},
					{
						type: 'input',
						name: 'authorURI',
						message: 'Author URI',
						default: 'https://example.com/authorURI/'
				},
					{
						type: 'input',
						name: 'authorEmail',
						message: 'Author email',
						default: 'info@example.com'
				},
					{
						type: 'input',
						name: 'description',
						message: 'Description',
						default: 'Description'
				},
					{
						type: 'input',
						name: 'bugreport',
						message: 'Bug Report',
						default: 'https://example.com/bugreport/'
				},
					{
						type: 'confirm',
						name: 'gitignore',
						message: 'Would you like to add a ' + chalk.white('.gitignore') + ' file?',
						default: true
				},
					{
						type: 'confirm',
						name: 'editorconfig',
						message: 'Would you like to add a ' + chalk.white('.editorconfig') + ' file?',
						default: true
				},
					{
						type: 'confirm',
						name: 'stylelintrc',
						message: 'Would you like to add a ' + chalk.white('.stylelintrc') + ' file?',
						default: true
				},
					{
						type: 'confirm',
						name: 'npmrc',
						message: 'Would you like to add a ' + chalk.white('.npmrc') + ' file?',
						default: true
				},
					{
						type: 'confirm',
						name: 'npmsetup',
						message: 'Would you like to setup a configuration ready to use?',
						default: true
				}
			]
			)
			.then((answers) => {
				this.proxy = answers.proxy;
				this.domain = answers.domain;
				this.themeName = answers.themeName;
				this.themeSlug = answers.themeSlug;
				this.themeURI = answers.themeURI;
				this.author = answers.author;
				this.authorURI = answers.authorURI;
				this.authorEmail = answers.authorEmail;
				this.description = answers.description;
				this.bugreport = answers.bugreport;
				this.gitignore = answers.gitignore;
				this.stylelintrc = answers.stylelintrc;
				this.npmrc = answers.npmrc;
				this.npmsetup = answers.npmsetup;
			});
	}

	writing() {
		// Download _s theme
		var done = this.async();
		var dir = this.destinationRoot();
		var unusedFiles = ['.travis.yml', '.jscsrc', 'README.md'];

		// Download _s theme
		console.log(chalk.yellow('\nLet\'s download the latest version of Underscores...'));
		var start = process.hrtime();

		Promise.all([
			'github.com/Automattic/_s/archive/master.tar.gz'
			].map(x => download(x, '.', {
				extract: true,
				strip: 1
			})))
			.then(() => {
				var end = process.hrtime(start);
				var words = prettyHrtime(end);
				console.log('End download in ' + words + '.');
			})
			.then(() => {
				// create custom catalogs & files
				console.log(chalk.yellow('\nAdd custom catalogs & files...'));
				var start = process.hrtime();

				if (!fs.existsSync('sass/theme.scss')) {
					fs.writeFileSync('sass/theme.scss', '/*!\n Theme Name: _s \n*/', 'utf-8');
				}
				if (!fs.existsSync('css')) {
					fs.mkdirSync('css');
				}
				if (!fs.existsSync('fonts')) {
					fs.mkdirSync('fonts');
				}
				if (!fs.existsSync('images')) {
					fs.mkdirSync('images');
				}
				var end = process.hrtime(start);
				var words = prettyHrtime(end);
				console.log('Done in ' + words + '.');
			})
			.then(() => {
				// Delete unused files
				console.log(chalk.yellow('\nDeleting some unused files...'));
				var start = process.hrtime();

				unusedFiles = _.map(unusedFiles, function (file) {
					return dir + '/' + file;
				});

				del(unusedFiles).catch(function (error) {
						done(error);
					})
					.then(paths => {
						console.log(chalk.cyan(paths.join('\n')));
						done();
					});
				var end = process.hrtime(start);
				var words = prettyHrtime(end);
				console.log('Done in ' + words + '.');
			})
			.then(() => {
				// Parsing theme files 
				var _this = this;
				var walker;
				var options;
				options = {
					followLinks: false
				};
				console.log(chalk.yellow('\nParsing theme files...'));
				var start = process.hrtime();

				walker = walk.walk('../');

				console.log(chalk.white('	Please wait...'));

				walker.on("file", function (root, fileStats, next) {
					var filePath = root + '/' + fileStats.name;

					console.log(chalk.yellow('\nRenaming theme files...'));

					if (path.extname(fileStats.name) == '.php') {
						fs.readFile(filePath, 'utf8', function (err, data) {
							if (err) {
								done(error);
							}

							var result;

							result = data.replace(/'_s'/g, "'" + _this.themeSlug + "'");
							result = result.replace(/_s_/g, _this.themeSlug + "_");
							result = result.replace(/ _s/g, ' ' + _this.themeName);
							result = result.replace(/_s-/g, _this.themeSlug + '-');


							fs.writeFile(filePath, result, 'utf8', function (err) {
								if (err) {
									done(error);
								}
							});

							next();
						});
					} else if (path.extname(fileStats.name) == '.css' || fileStats.name == 'style.scss' || fileStats.name == 'woocommerce.scss' || fileStats.name == 'theme.scss') {
						fs.readFile(filePath, 'utf8', function (err, data) {
							if (err) {
								done(error);
							}

							var result;

							result = data.replace(/(Theme Name: )(.+)/g, '$1' + _this.themeName);
							result = result.replace(/(Theme URI: )(.+)/g, '$1' + _this.themeURI);
							result = result.replace(/(Author: )(.+)/g, '$1' + _this.author);
							result = result.replace(/(Author URI: )(.+)/g, '$1' + _this.authorURI);
							result = result.replace(/(Description: )(.+)/g, '$1' + _this.description);
							result = result.replace(/(Text Domain: )(.+)/g, '$1' + _this.themeSlug);
							result = result.replace(/_s is based on Underscores/g, _this.themeName + ' is based on Underscores');
							result = result.replace(/\@import "variables-site\/variables-site";/g, '\n\n// bower:scss' + '\n\n// endbower' + '\n\n@import "variables-site\/variables-site";');
							result = result.replace(/\@import "media\/media";/g, '@import "media\/media";' + '\n\n/*--------------------------------------------------------------\n' + '# Theme\n' + '--------------------------------------------------------------*/\n' + '@import "theme";\n');

							fs.writeFile(filePath, result, 'utf8', function (err) {
								if (err) {
									done(error);
								}
							});

							next();
						});
					} else if (fileStats.name === 'readme.txt') {
						fs.readFile(filePath, 'utf8', function (err, data) {
							if (err) {
								done(error);
							}

							var result;

							result = data.replace(/=== _s ===/g, '=== ' + _this.themeName + ' ===');
							result = result.replace(/A starter theme called _s, or underscores./g, _this.description);
							result = result.replace(/(== Description ==\n\n)(.+)/g, '$1' + 'Long description here');
							result = result.replace(/== Frequently Asked Questions ==[\s\S]*?== Credits ==/g, '== Credits ==');

							fs.writeFile(filePath, result, 'utf8', function (err) {
								if (err) {
									done(error);
								}
							});

							next();
						});
					} else if (fileStats.name === '_s.pot') {
						fs.readFile(filePath, 'utf8', function (err, data) {
							if (err) {
								done(error);
							}

							var result;

							result = data.replace(/Copyright (C) 2016 Automattic/g, 'Copyright (C) 2017 ' + _this.author);
							result = result.replace(/Project-Id-Version: _s/g, 'Project-Id-Version: ' + _this.themeName);
							result = result.replace(/Report-Msgid-Bugs-To: https:\/\/wordpress.org\/tags\/_s/g, 'Report-Msgid-Bugs-To: ' + _this.bugreport);
							result = result.replace(/Language-Team: LANGUAGE <LL@li\.org>/g, 'Language-Team: ' + _this.author + '<' + _this.authorEmail + '>');
							result = result.replace(/@ _s/g, '@ ' + _this.themeSlug);

							fs.writeFile(filePath, result, 'utf8', function (err) {
								if (err) {
									done(error);
								}
							});

							fs.rename(filePath, './languages/' + _this.themeSlug + '.pot', (err) => {
								if (err) throw err;
								var end = process.hrtime(start);
								var words = prettyHrtime(end);
								console.log('Renamed complete in ' + words + '.');
							});

							next();
						});
					} else {
						next();
					}
				});

				walker.on("errors", function (root, nodeStatsArray, next) {
					done(error);
					next();
				});

				walker.on("end", function () {
					done();
				});

				var end = process.hrtime(start);
				var words = prettyHrtime(end);
				console.log('Parsing done in ' + words + '.');
			});
		
		// Copying configuration files
		console.log(chalk.yellow('\nCopying configuration files...'));
		var start = process.hrtime();

		if (this.gitignore) {
			this.fs.copy(
				this.templatePath('_gitignore'),
				this.destinationPath('.gitignore')
			);
		}
		if (this.editorconfig) {
			this.fs.copy(
				this.templatePath('_editorconfig'),
				this.destinationPath('.editorconfig')
			);
		}

		if (this.stylelintrc) {
			this.fs.copy(
				this.templatePath('_stylelintrc'),
				this.destinationPath('.stylelintrc')
			);
		}
		if (this.npmrc) {
			this.fs.copy(
				this.templatePath('_npmrc'),
				this.destinationPath('.npmrc')
			);
		}
		if (this.npmsetup) {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
					package_name: this.themeSlug,
					package_description: this.description,
					package_author: this.author,
					proxy_address: this.proxy,
					proxy_domain: this.domain,
					theme_name: this.themeName,
					theme_domain: this.themeSlug,
					theme_bugreport: this.bugreport,
					author_uri: this.authorURI,
					author_email: this.authorEmail
				}
			);
		}
		var end = process.hrtime(start);
		var words = prettyHrtime(end);
		console.log('Done in ' + words + '.');
	}

	install() {
		if (this.npmsetup) {
			console.log(chalk.yellow('\nInstalling required packages...'));

			this.npmInstall(['autoprefixer'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('autoprefixer'));

			this.npmInstall(['browser-sync'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('browser-sync'));

			this.npmInstall(['imagemin-cli'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('imagemin-cli'));

			this.npmInstall(['jscs'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('jscs'));

			this.npmInstall(['mkdirp'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('mkdirp'));

			this.npmInstall(['node-sass'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('node-sass'));

			this.npmInstall(['npm-run-all'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('npm-run-all'));

			this.npmInstall(['onchange'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('onchange'));

			this.npmInstall(['postcss-cli'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('postcss-cli'));

			this.npmInstall(['rimraf'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('rimraf'));

			this.npmInstall(['copyfiles'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('copyfiles'));

			this.npmInstall(['uglify-js'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('uglify-js'));

			this.npmInstall(['wiredep-cli'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('wiredep-cli'));
			
			this.npmInstall(['cross-zip-cli'], {
				'saveDev': true,
				'global': true
			});
			console.log(chalk.blue('cross-zip-cli'));
		};
	}
	end() {
		if (this.npmsetup) {
			
			console.log('\nRun ' + chalk.green('npm run watch ') + ' to start the development and ' + chalk.green('npm run build') + ' to create a files in /dist/' + chalk.white('' + this.themeSlug) + ' ready for production.');
			
		}
		console.log(chalk.green('\nAll Done!!\n------------------------\n'));
	}
};
