module.exports = function(grunt) {
  const webpackConfig = require('./webpack.config.js');
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    dirs: {
      build:'_build/',
      theme:'./',
      dist:'dist/',
      js:'./js/',
      lib:'./lib/',
      test:'./test/'
    },
    bower: {
      install: {
        options: {
          targetDir: './lib',
          layout: 'byComponent'
        }
      }
    },
    copy:{
      'fontawesome': {
        src: './**/*',
        cwd: '<%= dirs.lib %>/svgsprite/fontawesome/src',
        dest: '<%= dirs.test %>assets/icons/fontawesome',
        expand: true
      },
      'fontawesome-sprite': {
        src: '<%= dirs.lib %>/svgsprite/fontawesome/icons.svg',
        dest: '<%= dirs.test %>assets/icons/fontawesome/fontawesome.svg'
      },
      'emosvg': {
        src: './**/*',
        cwd: '<%= dirs.dist %>',
        dest: '<%= dirs.test %>emosvg',
        expand: true
      },
      'qunit': {
        src: './qunit/**/*',
        cwd: '<%= dirs.lib %>',
        dest: '<%= dirs.test %>assets/',
        expand: true
      },
      'fetch': {
        src: '<%= dirs.lib %>fetch/fetch.js',
        dest: '<%= dirs.dist %>polyfill/fetch/',
        flatten: true,
        expand: true
      },
      'svg4everybody': {
        src: '*.js',
        cwd: '<%= dirs.lib %>svg4everybody/',
        dest: '<%= dirs.dist %>polyfill/svg4everybody/',
        flatten: true,
        expand: true
      },
      'promise-polyfill': {
        src: '*.js',
        cwd: '<%= dirs.lib %>promise-polyfill/',
        dest: '<%= dirs.dist %>polyfill/promise-polyfill/',
        flatten: true,
        expand: true
      },
      'dist': {
        src: ['./*.js','./polyfill/**/*'],
        cwd: '<%= dirs.dist %>',
        dest: '<%= dirs.test %>emosvg',
        //flatten: true,
        expand: true
      },
      'bust': {
        src: '<%= dirs.dist %>*.js',
        //cwd: '<%= dirs.dist %>',
        dest: '<%= dirs.dist %>busted/',
        flatten: true,
        expand: true,
        rename: function(dest, src){
          return dest + src.replace('emosvg.','emosvg.<%= pkg.version %>.');
        }
      }
    },
    clean: {
      prebuild:["<%= dirs.dist %>busted"],
      postbuild:["<%= dirs.lib %>"]
    },
    connect: {
      build: {
        options: {
          port: parseInt(grunt.option('port')) || 9002,
          base: './test',
          open: false
        }
      },
      alive: {
        options: {
          port: parseInt(grunt.option('port')) || 9003,
          base: './test',
          keepalive: true,
          open: true
        }
      }
    },
    qunit: {
      test: {
        options: {
          urls: [
            `http://localhost:${(parseInt(grunt.option('port')) || 9002)}`
          ]
        }
      }
    },
    webpack:{
      options:webpackConfig,
      dist:{
      }
    },
    babel: {
        options: {
            sourceMap: false,
            presets: ['es2015']
        },
        dist: {
            files: {
                '<%= dirs.theme %><%= dirs.dist %>emosvg.js': '<%= dirs.build %><%= dirs.js %>emosvg.js'
            }
        }
    },
    uglify: {
      js: {
        options:{report:"gzip"},
        files: {
          '<%= dirs.theme %><%= dirs.dist %>emosvg.min.js': '<%= dirs.theme %><%= dirs.dist %>emosvg.js'
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
      },
      alive: {
          title: "grunt",
          message: "It's alived."
      }
    },
    watch: { /* trigger tasks on save */
      options: {
          livereload: true
      },
      js: {
          files: ['<%= dirs.build %><%= dirs.js %>**/*.js'],
          tasks: ['webpack','uglify','copy:dist', 'growl:uglify']
      }
    },
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['growl:watch', 'watch']);
  grunt.registerTask('test',['connect:build','qunit']);
  grunt.registerTask('alive',['connect:alive','growl:alive']);
  grunt.registerTask('build',['clean:prebuild','bower','copy','webpack','uglify','copy:dist','clean:postbuild','growl:build']);
};
