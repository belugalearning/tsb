var util = require('util'),
  express = require('express'),
  liveReload = require('./node_modules/grunt-contrib-livereload/lib/utils'),
  request = require('request')

var localise = !!~process.argv.indexOf('--localise')
var dbURI = 'http://' + (localise ? '127.0.0.1' : 'pull.zubi.me') + ':5984/authoring'

var app = express()
app.use(express.bodyParser())
// add liveReload middleware to inject reload javascript
app.use(liveReload.livereloadSnippet)
app.use(express.static(__dirname + '/build'))

app.all(/^\/api\//, function(req,res,next) {
  console.log(req.method, req.url)
  next()
})

// GET /api/tasks
app.get(/^\/api\/tasks$/, function(req, res) {
  var tasksURI = util.format('%s/_design/gen/_view/by-type-created?include_docs=true&descending=true&startkey=%s&endkey=%s',
                             dbURI,
                             encodeURIComponent(JSON.stringify(['task',{}])),
                             encodeURIComponent(JSON.stringify(['task'])))

  request(tasksURI, function(e,r,b) {
    res.send(JSON.parse(b).rows.map(function(r) { return r.doc }))
  })
})

// GET /api/tasks/{task_id}
app.get(/^\/api\/tasks\/(\w+)/, function(req,res) {
  request(util.format('%s/%s', dbURI, req.params[0]), function(e,r,b) {
    return res.send(JSON.parse(b))
  })
})

// POST /api/tasks
app.post(/^\/api\/tasks$/, function(req, res) {
  var task = req.body
  if (task.type != 'task') return res.send(400)
  postCouchAndSendRes(task, res)
})

// PUT /api/tasks/{task_id}
app.put(/^\/api\/tasks\/(\w+)$/, function(req, res) {
  var _id = req.params[0]
  var task = req.body
  if (!task || task.type != 'task' || task._id != _id || typeof task._rev) {
    return res.send(400)
  }
  putCouchAndSendRes(task, res)
})

// GET /api/activities
app.get(/^\/api\/activities$/, function(req, res) {
  var activitiesURI = util.format('%s/_design/gen/_view/by-type-created?include_docs=true&descending=true&startkey=%s&endkey=%s',
                                  dbURI,
                                  encodeURIComponent(JSON.stringify(['activity'],{})),
                                  encodeURIComponent(JSON.stringify(['activity'])))

  request(activitiesURI, function(e,r,b) {
    res.send(JSON.parse(b).rows.map(function(r) { return r.doc }))
  })
})

// POST /api/activities
app.post(/^\/api\/activities$/, function(req, res) {
  var activity = req.body
  console.log(JSON.stringify(activity,null,2))
  if (typeof activity._id != 'undefined' || typeof activity._rev != 'undefined' || activity.type != 'activity') return res.send(400)
  if (!Array.isArray(activity.tasks) || activity.tasks.filter(function(t) { return typeof t != 'string' }).length) return res.send(400) // TODO: validate that ids are actually tasks rather than just strings
  postCouchAndSendRes(activity, res)
})

// PUT /api/activities/{activity_id}
app.put(/^\/api\/activities\/(\w+)$/, function(req, res) {
  var _id = req.params[0]
  var activity = req.body
  if (!activity || activity.type != 'activity' || activity._id != _id || typeof activity._rev) {
    return res.send(400)
  }
  putCouchAndSendRes(activity, res)
})

// GET API CATCH-ALL
app.get('/api/*', function(req,res) {
  console.log(req.url, (__dirname + '/app/api/' + req.url.split("/").slice(-1)[0].split("?")[0] + '.json'))
  res.sendfile(__dirname + '/app/api/' + req.url.split("/").slice(-1)[0].split("?")[0] + '.json')
})

app.get(/^\/(tasks|activities|analytics|account)(\/*)?/, function(req,res) { res.sendfile(__dirname + '/app/index.html') })


app.listen(3500)
console.log('Listening on port 3500')

function postCouchAndSendRes(doc, res) {
  doc.created = new Date().toString()
  doc.author = 'Demo Author'

  request({
    uri: dbURI,
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(doc)
  }, function(e,r,b) {
    var sc = r && r.statusCode
    //console.log('POST\nsc: %s\ne: %s\nb: %s', sc, e, b && b.trim())
    if (sc != 201) return res.send(sc || 500)
    var o = JSON.parse(b)
    return res.send(201, { _id: o.id, _rev: o.rev })
  })
}

function putCouchAndSendRes(doc, res) {
  var uri = util.format('%s/%s', dbURI, doc._id)

  request(uri, function(e,r,b) {
    var sc = r && r.statusCode
    if (sc != 200) return res.send(sc || 500)

    var oldVer = JSON.parse(b)
    if (oldVer.type != doc.type) return res.send(400)
    if (oldVer._rev != doc._rev) return res.send(409)

    var opts = {
      uri:      uri,
      method:   'PUT',
      headers:  { 'content-type': 'application/json' },
      body:     JSON.stringify(doc)
    }

    request(opts, function(e,r,b) {
      var sc = r && r.statusCode
      if (sc != 201) return res.send(sc || 500)
      return res.send(201, { _rev: JSON.parse(b).rev })
    })
  })
}
