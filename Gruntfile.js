module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt)

	grunt.initConfig({
		// Minify html for speedy loading
		htmlmin: {
			build: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'client/build/index.html': 'client/src/index.html',
				}
			},
			dev: {
				files: {
					'client/build/index.html': 'client/src/index.html',
				}
			}
		},
		// Convert to ES6
		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'client/src/js',
					src: ['**/*.jsx'],
					dest: 'tmp',
					ext: '.js'
				}]
			}
		},
		// Uglify and condense js files
		uglify: {
			// The 'build' task also includes the 'dev' and 'serverDev'
			// tasks during a grunt build.
			build: {
				files: {
					'client/build/js/react-bundle.min.js':
						'bower_components/react/react.min.js'
				}
			},
			dev: {
				files: {
					'client/build/js/vendor.min.js': ['client/src/js/vendor/**/*.js'],
					'client/build/js/components.min.js': ['tmp/components/**/*.js'],
					'client/build/js/app.min.js': [
						'config/**/*.js',
						'shared/**/*.js',
						'tmp/app.js'
					]
				}
			},
			serverDev: {
				files: {
					'server/build/server.min.js': [
						'config/**/*.js',
						'shared/**/*.js',
						'server/src/server.js'
					]
				}
			}
		},
		// Convert .sass to .css and use compass
		sass: {
			build: {
				files: {
					'client/build/css/main.css': 'client/src/sass/main.sass'
				},
				options: {
					compass: true,
					style: 'compressed'
				}
			},
			dev: {
				files: {
					'client/build/css/main.css': 'client/src/sass/main.sass'
				},
				options: {
					compass: true,
					style: 'expanded'
				}
			}
		},
		// Use autoprefixer for browser compatability
		postcss: {
			options: {
				processors: [
					require('autoprefixer-core')({
						browsers: 'last 2 versions'
					})
				]
			},
			dist: {
				src: 'client/build/css/main.css',
				dest: 'client/build/css/main-prefixed.css'
			}
		},
		// Watch for file changes and live-reload the browser
		watch: {
			html: {
				files: ['client/src/index.html'],
				tasks: ['htmlmin:dev'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['client/src/sass/main.sass', 'client/src/sass/**/*.sass'],
				tasks: ['sass:dev', 'postcss'],
				options: {
					livereload: true
				}
			},
			js: {
				files: [
					'client/src/js/**/*.js',
					'client/src/js/**/*.jsx',
					'shared/**/*.js'
				],
				tasks: ['babel', 'uglify:dev', 'clean'],
				options: {
					livereload: true
				}
			},
			config: {
				files: ['config/**/*.js'],
				tasks: ['uglify:serverDev', 'uglify:dev']
			},
			serverjs: {
				files: ['server/src/server.js'],
				tasks: ['uglify:serverDev'],
				options: {
					livereload: true
				}
			}
		},
		// Start the node server
		nodemon: {
			dev: {
				script: 'server/build/server.min.js'
			}
		},
		// Run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		},
		// Finally, clear the temporary files and directories
		clean: ['tmp']
	});

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-htmlmin')
	grunt.loadNpmTasks('grunt-react')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-compass')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default',
		[
			'babel',
			'uglify:dev',
			'uglify:serverDev',
			'uglify:build',
			'htmlmin:build',
			'sass:build',
			'postcss',
			'clean'
		]
	)
	grunt.registerTask('dev', ['concurrent'])
}