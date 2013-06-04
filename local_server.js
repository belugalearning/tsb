var express     = require('express'),
    liveReload  = require('./node_modules/grunt-contrib-livereload/lib/utils');

var app = express();
// add liveReload middleware to inject reload javascript
app.use(liveReload.livereloadSnippet);

app.use(express.static(__dirname + '/build'));

app.get('/api/bundle/*', function(req,res) {
  res.sendfile(__dirname + '/app/api/bundle.json')
});

app.get('/api/*', function(req,res) {
  console.log(req.url);
    res.sendfile(__dirname + '/app/api/' + req.url.split("/").slice(-1)[0].split("?")[0] + '.json');
});

app.get('*', function(req,res) { res.sendfile(__dirname + '/app/index.html'); });

app.listen(3500);
console.log('Listening on port 3500');