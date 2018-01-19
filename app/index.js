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

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
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
				this.log('Proxy:', chalk.yellow(answers.proxy));
				this.log('Domain:', chalk.yellow(answers.domain));
				this.log('Theme name:', chalk.yellow(answers.themeName));
				this.log('Theme slug:', chalk.yellow(answers.themeSlug));
				this.log('Theme URI:', chalk.yellow(answers.themeURI));
				this.log('Author:', chalk.yellow(answers.author));
				this.log('Author URI:', chalk.yellow(answers.authorURI));
				this.log('Author email:', chalk.yellow(answers.authorEmail));
				this.log('Description:', chalk.yellow(answers.description));
				this.log('Bug report:', chalk.yellow(answers.bugreport));
				this.log('Add editorconfig file:', chalk.yellow(answers.editorconfig));
				this.log('Add gitignore file:', chalk.yellow(answers.gitignore));
				this.log('Add stylelintrc file:', chalk.yellow(answers.stylelintrc));
				this.log('Add npmrc file:', chalk.yellow(answers.npmrc));
				this.log('Add npm setup:', chalk.yellow(answers.npmsetup));

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
		var unusedFiles = ['.travis.yml', 'codesniffer.ruleset.xml', 'README.md'];

		// Download _s theme
		this.log(chalk.yellow('\nLet\'s download the latest version of Underscores...'));

		//		Promise.all([
		//			'github.com/Automattic/_s/archive/master.tar.gz'
		//		].map(x => download(x, '.', {
		//				extract: true,
		//				strip: 1
		//			})))
		//			.then(() => {
		//			console.log('files downloaded!');
		//			this.log(chalk.blue('End download1!'));
		//		});


		download('https://github.com/Automattic/_s/archive/master.tar.gz', '.', {
				extract: true,
				strip: 1
			})
			.then(() => {
				this.log(chalk.blue('End download!'));
			})
			.then(() => {
				// create custom catalogs & files
				this.log(chalk.yellow('\nAdd custom catalogs & files...'));

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
				this.log(chalk.blue('Done!'));
			})
			.then(() => {
				// Delete unused files
				this.log(chalk.yellow('\nDeleting some unused files...'));

				unusedFiles = _.map(unusedFiles, function (file) {
					return dir + '/' + file;
				});

				del(unusedFiles).catch(function (error) {
						done(error);
					})
					.then(paths => {
						this.log(chalk.cyan(paths.join('\n')));
						done();
					});
				this.log(chalk.blue('Done!'));
			})
			.then(() => {
				// Parsing theme files 
				var _this = this;
				var walker;

				this.log(chalk.yellow('\nParsing theme files...'));

				walker = walk.walk('.');

				this.log(chalk.white('	Please wait...'));

				walker.on("file", function (root, fileStats, next) {
					var filePath = root + '/' + fileStats.name;

					if (path.extname(fileStats.name) == '.php') {
						fs.readFile(filePath, 'utf8', function (err, data) {
							if (err) {
								done(error);
							}

							var result;

							result = data.replace(/'_s'/g, "'" + _this.themeSlug + "'");
							result = result.replace(/_s_/g, _this.prefix);
							result = result.replace(/ _s/g, ' ' + _this.themeName);
							result = result.replace(/_s-/g, _this.themeSlug + '-');


							fs.writeFile(filePath, result, 'utf8', function (err) {
								if (err) {
									done(error);
								}
							});

							next();
						});
						//				} else if (path.extname(fileStats.name) == '.css' || fileStats.name == 'style.scss' || fileStats.name == 'woocommerce.scss' || fileStats.name == 'theme.scss' || fileStats.name == 'gulpfile.js') {
					} else if (path.extname(fileStats.name) == '.css' || fileStats.name == '.scss') {
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
							result = result.replace(/\@import "media\/media";/g, '@import "media\/media";' + '\n\n/*--------------------------------------------------------------\n\n' + '# Theme\n' + '--------------------------------------------------------------*/\n' + '@import "theme";\n');

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

							fs.rename(filePath, './languages/' + _this.themeSlug + '.pot');

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

				this.log(chalk.blue('Parsing done!'));
			});
		//			.catch(error => {
		//				//				alert(error); 
		//				// Error: Not Found
		//				this.log(chalk.red('Error:', error));
		//			});

		// Copying configuration files
		this.log(chalk.yellow('\nCopying configuration files...'));
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
					theme_domain: this.themeSlug,
					package_name: this.themeName,
					theme_bugreport: this.bugreport,
					author_uri: this.authorURI,
					author_email: this.authorEmail
				}
			);

			this.fs.copyTpl(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js'), {
					theme_domain: this.themeSlug
				}
			);

		}
		this.log(chalk.blue('Done!'));
	}

	install() {
		if (this.npmsetup) {
			this.log(chalk.yellow('\nInstalling required packages...'));

			this.npmInstall(['autoprefixer'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('autoprefixer'));

			this.npmInstall(['browser-sync'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('browser-sync'));

			this.npmInstall(['imagemin-cli'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('imagemin-cli'));

			this.npmInstall(['jscs'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('jscs'));

			this.npmInstall(['mkdirp'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('mkdirp'));

			this.npmInstall(['node-sass'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('node-sass'));

			this.npmInstall(['npm-run-all'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('npm-run-all'));

			this.npmInstall(['onchange'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('onchange'));

			this.npmInstall(['postcss-cli'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('postcss-cli'));

			this.npmInstall(['rimraf'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('rimraf'));

			this.npmInstall(['gulp'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('gulp'));

			this.npmInstall(['uglify-js'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('uglify-js'));

			this.npmInstall(['wiredep-cli'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('wiredep-cli'));

			this.npmInstall(['bower'], {
				'saveDev': true,
				'global': true
			});
			this.log(chalk.blue('bower'));
		};
		this.installDependencies({
			npm: true,
			bower: true,
			yarn: false
		});
	}
	end() {
		if (this.npmsetup) {
			this.log(chalk.red('\nWarning! \nRun: ') + chalk.yellow('npm link gulp') + ' to start the development theme');
			this.log('\nRun ' + chalk.green('npm run watch ') + ' to start the development and ' + chalk.green('npm run build') + ' to create a file in ' + chalk.white('' + this.themeSlug) + ' ready for production.');
		}
		this.log(chalk.green('\nAll Done!!\n------------------------\n'));
	}
};
