# Setting up a Frontend Javascript Development Environment

Frontend Javascript development has changed over the last few years - complexity and sheer size of modern projects has inspired new tooling, build processes and even new languages to streamline our processes. With all this change putting a dev environment together can be convoluted and, although projects like [Yeoman](http://yeoman.io/) are really promising there's plenty of ocassions when you'll have special project requirements that need a custom setup.

In this series of articles I'll go through building a dev environment from scratch, by the end we'll have an automated environment that:

* Manages our build process dependencies via [Node & NPM](http://nodejs.org/)
* Manages our Javascript library dependencies via [Bower](https://github.com/bower/bower)
* Run our build processes using [Grunt](http://gruntjs.com/)
* Automatically runs a local web server for development
* Allows us to develop in Test Driven Development Style using Mocha
* Compiles Coffeescript & SASS

* Watches our file system during development and automatically compiles changes
* Injects a LiveReload snippet into our pages so pages are automatically reloaded when we change them 
* Builds a distribution that's optimised for production

## Our Skeleton Setup
 
    /app

Our main app folder where we'll keep all out components (jQuery, Backbone, etc), images, scripts and styles

    /dist

We'll compile all our files into a release version in here

    /.bowerrc

The bower config file - we've used the _directory_ setting to tell bower where to install components

    /.gitattributes

Any Git settings - we've used text=auto to normalise line endings to LF in all text files

    /.gitignore

Tell Git to which files & directories to ignore e.g. not commit to the source code repository. It's definitely up to you to decide what your happy committing, lots of people tend to ignore the /app/components directory but I tend to leave it in.

    /component.json

A config file for Bower used to define our frontend js dependencies

    /Gruntfile.coffee

Our gruntfile is where we'll define the tasks we want to run on our project for example:  

* Running a development server,
* Watching our coffeescript/sass files and re-compiling them when the change
* Building a distribution version for production

    /package.json

A config file for Node to define our dev dependencies for the build process 

## Install some dependcies

### Node Dependencies

We're going to be using Grunt for our build proces and that's a Node app -  we use Node Package Manager (NPM) to install our node apps and we have two options to install it:

####Using the command line

To install a single dependency we can run the following command

    npm install grunt --save-dev

`npm install grunt` is prettyl self explantory but the `--save-dev` command line switch tells npm to add it to our `package.json` file. If we have a look at that file now can see it's added our dev dependency:

    "devDependencies": {
      "grunt": "~0.4.1"
    },

and the we have a new folder `node_modules` where `grunt` has been installed

####Using the package.json file

An alternative to typing into the terminal is to set up our depencies in the the package.json file and let NPM sort it out. If we add the following into our package.json file: 

    "devDependencies": {
      "grunt": "~0.4.1",
      "grunt-contrib-coffee": "~0.6.0"
    },

We can then go into the root of our project folder and just type 

    npm install 

and NPM will automatically install the grunt coffeescript compiler we need into node_modules

## Our first Grunt task

So we've installed some dependencies, lets write a grunt task to actually do something. We'll start with compiliing some coffeescript.

Let's open up our grunt file and write a task:

First line is a standar node module definition

    module.exports = (grunt) ->

This just says that we're making a module and it's name is grunt

Next lets set up some directories

    buildDirectories = {
      app:    'app'
      dist:   'dist'
      tmp:    'tmp'
    }

pretty straightforward, just defines paths relative to this file. Now we move to the grunt config itself

    grunt.initConfig

      appDirs: targetDirectories
    
      # we'll set up actions
      coffee:
        compile:
          expand: true
          cwd: 'app/scripts/'
          src: ['**/*.coffee']
          dest: '<%= appDirs.tmp %>/js'
          ext: '.js'        

There's quite a lot to this so lets take it a piece at a time

    grunt.initConfig

We're constructing an initConfig object to hold our configuration

    appDirs: targetDirectories

set appDirs to our targetDirectories object - we'll use that in our config below

Now we come to the actual action itself - as we're just going for a standard coffeescript compile we don't need to set any config for the plugin, but we do need to dynamically creat the files object that the action will run on. 

    coffee:
      compile:
        expand: true
        cwd: 'app/scripts/'
        src: ['**/*.coffee']
        dest: '<%= appDirs.tmp %>/js'
        ext: '.js'

the first `expand: true` key/value enables dynamic expanson so we can use the settings below it that allow us to build the files list

    cwd: 'app/scripts/'

change our working directory to `app/scripts`, all following paths will be relative to this root

    src: ['**/*.coffee']

the files we want to compile could be anywhere in this folder so we use a glob to pick up all the .coffee files, no matter how nested they are

    dest: '<%= appDirs.tmp %>/js'

the destination to write the compiled js files to

    ext: '.js'

this directive removes the current extenstion and replaces it with `.js`


lastly we'll create a `build` task that we use the action in:

    grunt.registerTask('build', [
      'coffee:compile'
    ])

now when we run `grunt build` we'll see our files being generated and written to the tmp folder

# Installing front end dependencies with Bower

By CLI

    bower install --save jquery

by configuring component.js

    {
      "name": "designsuperbuild-boilerplate",
      "version": "0.0.0",
      "dependencies": {
        "jquery": "~2.0.0",
        "lodash": "~1.2.1",
        "backbone": "~1.0.0"
      }
    }

## Setting up modular development with RequireJS

first we'll install our grunt task

    npm install --save-dev grunt-contrib-requirejs

## Setting up testing with Mocha

stuff 

## Compiling a Production build

stuff

