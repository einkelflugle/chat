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
			build: {
				files: {
					'client/build/js/react-bundle.min.js': [
						'bower_components/react/react.min.js',
						'bower_components/react/JSXTransformer.js'
					]
				}
			},
			dev: {
				files: {
					'client/build/js/components.min.js': ['tmp/components/**/*.js'],
					'client/build/js/app.min.js': ['tmp/app.js']
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
				tasks: ['sass:dev'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['client/src/js/**/*.js', 'client/src/js/**/*.jsx'],
				tasks: ['babel', 'uglify:dev', 'clean'],
				options: {
					livereload: true
				}
			},
			serverjs: {
				files: ['server.js'],
				options: {
					livereload: true
				}
			}
		},
		// Start the node server
		nodemon: {
			dev: {
				script: 'server.js'
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
			'uglify:build',
			'htmlmin:build',
			'sass:build',
			'clean'
		]
	)
	grunt.registerTask('dev', ['concurrent'])
}