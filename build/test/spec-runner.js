(function () {
   "use strict";

  require.config({
      baseUrl: "/scripts",
      //cache busting
      urlArgs: "v="+(new Date()).getTime(),
      paths: {
          jquery: '../components/jquery/jquery',
          squire: '../components/squire/src/Squire'
      }
  });


  require([], function(){

    require([
      'model/test2.js'
    ], function() {
      mocha.run();
    });
  });

}());