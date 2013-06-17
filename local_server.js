var util = require('util'),
  express = require('express'),
  liveReload = require('./node_modules/grunt-contrib-livereload/lib/utils'),
  request = require('request')

var localise = !!~process.argv.indexOf('--localise')
var dbURI = 'http://' + (localise ? '127.0.0.1' : 'pull.zubi.me') + ':5984/tsb-demo'

var app = express();
app.use(express.bodyParser())
// add liveReload middleware to inject reload javascript
app.use(liveReload.livereloadSnippet);

app.use(express.static(__dirname + '/build'));

app.get(/\/api\/bundles/, function(req, res) {
  var bundlesURI = dbURI + '/_design/gen/_view/bundles?include_docs=true&descending=true'
  request(bundlesURI, function(e,r,b) {
    res.send(JSON.parse(b).rows.map(function(r) { return r.doc }))
  })
})

app.get('/api/bundle/:id', function(req,res) {
  request(util.format('%s/%s', dbURI, req.params.id), function(e,r,b) {
    return res.send(JSON.parse(b))
  })
});

app.post(/^\/api\/bundle$/, function(req, res) {
  var bundle = req.body
  bundle.type = 'bundle'
  bundle.title = bundle.title || 'Split x into equal groups (Distribution Tool)'
  bundle.created = new Date().toString()
  bundle.author = 'Demo User'

  request({
    uri: dbURI,
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(bundle)
  }, function(e,r,b) {
    console.log('here', r && r.statusCode, e, b)
    res.send(r && r.statusCode || 500)
  })
})

app.get('/api/*', function(req,res) {
  console.log(req.url, (__dirname + '/app/api/' + req.url.split("/").slice(-1)[0].split("?")[0] + '.json'));

  res.sendfile(__dirname + '/app/api/' + req.url.split("/").slice(-1)[0].split("?")[0] + '.json');
});

app.get(/^\/(task|activity|analytics|account)(\/*)?/, function(req,res) { res.sendfile(__dirname + '/app/index.html'); });

app.listen(3500);
console.log('Listening on port 3500');
