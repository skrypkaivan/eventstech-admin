'use strict';

var path = require('path'),
    url = require('url');

var siteUrls = [
    {pattern:'^/login/?$', restricted: false}
  , {pattern:'^/partials/\\w+\\.html/?$', restricted: false}
  , {pattern:'^/$', restricted: true}
  , {pattern:'^/logout/?$', restricted: true}
  , {pattern:'^/\\w+/?$', restricted: true}
];

exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      res.render('404');
    } else {
      res.send(html);
    }
  });
};

exports.index = function(req, res) {
  res.render('index');
};

exports.auth = (function(urls) {
  function authorize(req, res, next) {

    var pattern, restricted, ui,
        requestedUrl = url.parse(req.url).pathname;

    for (ui in urls) {
      pattern = urls[ui].pattern;
      restricted = urls[ui].restricted;
      if (requestedUrl.match(pattern)) {
        if (restricted) {
          if (req.session.authorized) {
            next();
            return;
          }
          else{
            req.session.redirectedFrom = requestedUrl;
            res.writeHead(303, {'Location': '/login'});
            res.end();
            return;
          }
        }
        else {
          next();
          return;
        }
      }
    }

    res.status('404');
  }

  return authorize;

})(siteUrls);
