/*
 * scram
 * http://github.com/andreas-marschke/grunt-scram
 *
 * Copyright (c) 2014 Andreas Marschke <npm@andreas-marschke.name>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    scram: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default');
};
