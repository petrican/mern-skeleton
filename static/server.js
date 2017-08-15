'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

var issues = [{
  id: 1, status: 'Open', owner: 'Ravan',
  created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
  title: 'Error in console when clicking Add'
}, {
  id: 2, status: 'Assigned', owner: 'Eddie',
  created: new Date('2016-08-16'), effort: 14, completionDate: new Date('2016-08-30'),
  title: 'Missing bottom border on panel'
}];

app.get('/api/issues', function (req, res) {
  var metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', function (req, res) {
  var newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';

  issues.push(newIssue);

  res.json(newIssue);
});

app.listen(3000, function () {
  console.log('App started on port 3000');
});