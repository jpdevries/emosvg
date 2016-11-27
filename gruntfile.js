module.exports = function(grunt) {
  grunt.initConfig({
    dirs:{
      build:'_build/',
      theme:'./',
      assets:'assets/',
      js:'./js/',
    },
    bower: {
        install: {
            options: {
                targetDir: './lib',
                layout: 'byComponent'
            }
        }
    },
    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: {
                '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>emosvg.js': '<%= dirs.build %><%= dirs.js %>emosvg.js'
            }
        }
    },
    uglify: {
      js: {
        options:{report:"gzip"},
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>emosvg.min.js': '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>emosvg.js'
        }
      }
    },
    growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
      sass: {
          message: "Sass files created.",
          title: "grunt"
      },
      build: {
          title: "grunt",
          message: "Build complete."
      },
      watch: {
          title: "grunt",
          message: "Watching. Grunt has its eye on you."
      },
      concat: {
          title: "grunt",
          message: "JavaScript concatenated."
      },
      uglify: {
          title: "grunt",
          message: "JavaScript minified."
      }
    },
    watch: { /* trigger tasks on save */
      options: {
          livereload: true
      },
      js: {
          files: ['<%= dirs.build %><%= dirs.js %>**/*.js'],
          tasks: ['babel','uglify', 'growl:uglify']
      }
    },
  });



  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');

  grunt.registerTask('default', ['growl:watch', 'watch']);
  grunt.registerTask('build',['babel','uglify','growl:build']);
};
