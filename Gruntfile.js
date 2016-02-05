/* use strict*/;
module.exports= function(grunt){

  grunt.initConfig({
    shell: {
      options: {
        stderr: false
      },
      target: {
        command: 'mongod'
      }
    }
  });
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('default', ['shell']);
};
