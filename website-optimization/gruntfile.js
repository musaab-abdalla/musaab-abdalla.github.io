module.exports = function(grunt) {

    grunt.initConfig({

        imagemin: {
            png: {
              options: {
                optimizationLevel: 7
              },
              files: [
                {
                  // Set to true to enable the following options…
                  expand: true,
                  // cwd is 'current working directory'
                  cwd: 'src/views/images/',
                  src: ['**/*.png'],
                  // Could also match cwd line above. i.e. project-directory/img/
                  dest: 'dist/views/images/',
                  ext: '.png'
                }
              ]
            },
            jpg: {
              options: {
                progressive: true
              },
              files: [
                {
                  // Set to true to enable the following options…
                  expand: true,
                  // cwd is 'current working directory'
                  cwd: 'src/img/',
                  src: ['**/**/*.jpg'],
                  // Could also match cwd. i.e. project-directory/img/
                  dest: 'dist/img/',
                  ext: '.jpg'
                }
              ]
            }
        } // imagemin

    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');

};