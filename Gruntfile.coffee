#TODO remove grunt-contrib-livereload 
#TODO install https://github.com/intesso/connect-livereload
module.exports = (grunt) ->

  #SETUP
  #loadtasks
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-symlink')
  grunt.loadNpmTasks('grunt-open')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-usemin')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-compass')

  targetDirectories = {
    app:    'app'
    test:   'test'
    build:    'build'
    dist:   'dist'
  }

  #CONFIG

  grunt.initConfig
    # set up our directory variables
    appDirs: targetDirectories
  
    # define our actions

    #compile coffee files
    coffee:
      main:
        expand: true
        cwd: 'app/scripts/'
        src: ['**/*.coffee']
        dest: '<%= appDirs.build %>/scripts'
        ext: '.js'
      tests:
        expand: true
        cwd: '<%= appDirs.test %>'
        src: ['**/*.coffee']
        dest: '<%= appDirs.build %>/test'
        ext: '.js'

    compass: {
        options: {
            sassDir: '<%= appDirs.app %>/styles'
            cssDir: '<%= appDirs.build %>/styles'
            imagesDir: '<%= appDirs.app %>/images'
            javascriptsDir: '<%= appDirs.app %>/scripts'
            fontsDir: '<%= appDirs.app %>/styles/fonts'
            importPath: '<%= appDirs.app %>/components'
            relativeAssets: true
            force: true
        },
        dist: {},
        server: {
            options: {
                debugInfo: true
            }
        }
    },

    # copy non-compiled files to build directory
    copy: 
      main:
        files: [
          expand: true
          dot: true
          cwd: '<%= appDirs.app %>'
          dest: '<%= appDirs.build %>'
          src: [
            './*.html',
            'scripts/**/*.{js,html}',
            'styles/**/*.css',
            'images/**/*.{png,gif,jpg}'
          ]
        ]
      tests:
        files: [
          expand: true
          dot: true
          cwd: '<%= appDirs.test %>'
          dest: '<%= appDirs.build %>/test'
          src: [
            '**/*.{js,html}',
          ]
        ]
      dist:
        files: [
          expand: true
          dot: true
          cwd: '<%= appDirs.build %>'
          dest: '<%= appDirs.dist %>'
          src: [
            './*.html'
            './styles/*.css'
          ]
        ]

    # symlink components into build folder
    symlink:
      components: 
        dest: '<%= appDirs.build %>/components'
        relativeSrc: '../app/components'
        options: 
          type: 'dir'
      tools: 
        dest: '<%= appDirs.build %>/tools'
        relativeSrc: '../app/tools'
        options: 
          type: 'dir'

    watch:
      coffee:
        files: ['<%= appDirs.app %>/scripts/**/{,*/}*.coffee']
        tasks: ['coffee:main']
        options: 
          livereload: true
      coffee_test: 
        files: ['<%= appDirs.test %>/**/{,*/}*.coffee']
        tasks: ['coffee:tests']
        options: 
          livereload: true
      compass: 
          files: ['<%= appDirs.app %>/styles/**/{,*/}*.{scss,sass}']
          tasks: ['compass']
          options: 
            livereload: true
      copy:
        files: [
          '<%= appDirs.app %>/*.html',
          '<%= appDirs.app %>/scripts/**/*.{js,html}',
          '<%= appDirs.app %>/styles/**/*.css',
          '<%= appDirs.app %>/images/**/*.{gif,jpg,png}',
        ]
        tasks: ['copy:main']
        options: 
          livereload: true
      copy_test:
        files: [
          '<%= appDirs.test %>/**/*.{js,html}'
        ]
        tasks: ['copy:tests']
        options:
          livereload: true

    open:
      server: {
          path: 'http://localhost:3500'
      }

    clean:
      build: '<%= appDirs.build %>/*'
      dist: '<%= appDirs.dist %>/*'

    useminPrepare:
      html: '<%= appDirs.build %>/index.html'
      options:
        dest: '<%= appDirs.dist %>'

    requirejs:
      compile:
        options:
          baseUrl: "<%= appDirs.build %>/scripts/",
          mainConfigFile: "<%= appDirs.build %>/scripts/main.js",
          out: "<%= appDirs.dist %>/scripts/main.js"

    usemin:
      html: ['<%= appDirs.dist %>/**/*.html']
      css: ['<%= appDirs.dist %>/**/*.css']
      options:
        dirs: ['<%= appDirs.dist %>']

  grunt.registerTask('dev', [
    'clean:build'
    'compass:server',
    'symlink:components'
    'symlink:tools'
    'coffee:main'
    'copy:main'
    'coffee:tests'
    'copy:tests'
    # 'bgShell:runServer'
    'watch'
  ])

  grunt.registerTask('dev', [
    'clean:build'
    'compass:server',
    'symlink:components'
    'symlink:tools'
    'coffee:main'
    'copy:main'
    'coffee:tests'
    'copy:tests'
  ])

  grunt.registerTask('dist', [
    'clean:build'
    'clean:dist'
    'symlink:components'
    'symlink:tools'
    'coffee:main'
    'copy:main'
    'coffee:tests'
    'copy:tests'
    'useminPrepare'
    'requirejs'
    'uglify'
    'copy:dist'
    'usemin'
  ])