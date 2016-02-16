/* use strict*/;
module.exports= function(grunt){

  grunt.initConfig({
    env:{
      test: grunt.file.readJSON('./config.json').test
    },
    mochaTest:{
      test:{
        quiet: false
      },
      src: ['test']
    }
  });
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.registerTask('test', ['env:test', 'mochaTest']);
};
