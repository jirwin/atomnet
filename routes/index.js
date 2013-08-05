var Quark = require('../lib/quark').Quark;

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {});
};

exports.create = function(req, res) {
  res.render('createQuark', {});
};

exports.buildQuark = function(req, res) {
  var name = req.body.name,
      path = req.body.path,
      qurl = req.body.url,
      q;

  q = new Quark(name, path, qurl);

  q.build();

  res.render('buildQuark', {});
};
