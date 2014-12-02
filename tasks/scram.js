/*
 * scram
 * http://github.com/andreas-marschke/grunt-scram
 *
 * Copyright (c) 2014 Andreas Marschke <npm@andreas-marschke.name>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('scram', 'Scramble your Javascript', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join();

      var b = new Buffer(src);
      var array = b.toString("hex").match(/.{1,2}/g).map(function(x) { return '\\' + "x" + x; });
      var newSrc = "var data=" + JSON.stringify(array) + "; var x=\"\"; data.forEach(function(s){x += String.fromCharCode(parseInt(s.substr(2), 16));}); eval(x)\n";
      // Write the destination file.
      grunt.file.write(file.dest, newSrc);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
