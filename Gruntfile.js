module.exports = function(grunt) {

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
		// Uglify and condense js files
		uglify: {
			build: {
				files: {
					'client/build/js/react-bundle.min.js': [
						'bower_components/react/react.min.js',
						'bower_components/react/JSXTransformer.js'
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
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['uglify:build', 'htmlmin:build', 'sass:build']);
};