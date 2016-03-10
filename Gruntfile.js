'use strict';

module.exports = function(grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yo: {
      src: 'src',
      dist: 'dist'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= yo.dist %>/*', '!<%= yo.dist %>/.git*']
        }]
      },
      server: '.tmp'
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yo.src %>/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    ngmin: {
      dist: {
        src: ['<%= yo.dist %>/<%= pkg.name %>.js'],
        dest: '<%= yo.dist %>/<%= pkg.name %>.js'
      }
    },
    concat: {
      options: {
        stripBanners: true
      },
      js: {
        src: ['<%= yo.src %>/*module.js', '<%= yo.src %>/*service.js', '<%= yo.src %>/*.js'],
        dest: '<%= yo.dist %>/tpl-color.js'
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yo.dist %>/<%= pkg.name %>.min.js': ['<%= yo.dist %>/<%= pkg.name %>.js']
        }
      }
    }
  });

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['clean:dist', 'concat:js', 'ngmin:dist', 'uglify:dist']);
  grunt.registerTask('release', ['test', 'bump-only', 'build', 'bump-commit']);
  grunt.registerTask('default', ['build']);
};
