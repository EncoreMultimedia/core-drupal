// Configuring Grunt tasks:
// http://gruntjs.com/configuring-tasks
module.exports = function (grunt) {

    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Optimizes the images from src/images and places them inside of images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/images',             // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}', "!sprites/**/*.{png,jpg,gif}", "!sprites2x/**/*.{png,jpg,gif}"],   // Actual patterns to match
          dest: 'images/'                // Destination path prefix
        }]
      }
    },

    // Compass task: https://npmjs.org/package/grunt-contrib-compass
    compass: {
      dist: {
        options: {
          // use default Compass config
          config: 'config.rb'
        }
      }
    },

     // Minifies CSS outputted by Compass
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css'],
        dest: 'css/',
      }
    },

    // Cleans the images and css directories
    clean: ["css/*", "images/*"],

    // Concatenates and minifies js files and movies them from src/js to js
    uglify: {
      options: {
        mangle: false // Doesn't modify the variable names
      },
      my_target: {
        files: {
          'js/script.js': ['src/js/*.js']
        }
      }
    },

    // Watch task: https://npmjs.org/package/grunt-contrib-watch
    watch: {
      images: {
        files: ['src/images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify'],
      },
      css: {
        // if Sass files change, run the compass task
        files: ['sass/**/*.scss'],
        tasks: ['compass'],
      },
      // LiveReload whenever specified files change,
      // using browser extension: http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
      livereload: {
        files: [
          'sass/**/*.scss',
          'js/*.js',
          'images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: 35729,
        },
      },
    },
  });

  // Load the plugin(s)
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Set base to main theme
  grunt.file.setBase('sites/all/themes/main/'),

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['clean', 'imagemin', 'compass', 'cssmin', 'uglify']);
};
