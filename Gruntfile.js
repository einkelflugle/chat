module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// Watch for file changes during development
		watch: {
			files: [''],
			tasks: ['jshint']
		},
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
			}
		},
		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'tmp/app.js': 'client/src/js/app.js'
				}
			}
		},
		// Uglify and condense js files
		uglify: {
			build: {
				files: {
					'client/build/js/react-bundle.min.js': [
						'bower_components/react/react.min.js',
						'bower_components/react/JSXTransformer.js'
					],
					'client/build/js/app.min.js': 'tmp/app.js'
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
			}
		},
		// Finally, clear the temporary files and directories
		clean: ['tmp']
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['babel', 'uglify:build', 'htmlmin:build', 'sass:build', 'clean']);
};