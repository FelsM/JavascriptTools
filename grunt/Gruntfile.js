module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: 'app/css/',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css/',
            ext: '.min.css'
            }]
         }
      },

      /*
        function minifyCss() {
  return src('dist/css/bundle.css')
    .pipe(cleanCSS({debug: true, compatibility: 'ie7'}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
  .pipe(rename('bundle.min.css'))
  .pipe(dest('dist/css/'));
}
      */

     uglify: {
       options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
          my_target: {
            files: {
            'dist/js/output.min.js': ['app/js/main.js']
            }
          }
        }
  });



  //const cleanCSS = require('gulp-clean-css');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-uglify');


  // grunt.registerTask('build', ['uglify']);



  grunt.registerTask('default', ['cssmin', 'uglify']);

};