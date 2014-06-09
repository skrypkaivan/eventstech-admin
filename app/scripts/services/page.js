'use strict';

angular.module('itytApp').factory('Page', [function () {
  var title = '', keywords = '', description = '',
      image = 'images/logo.jpg';

  return {
    getTitle: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; },
    getKeywords: function() { return keywords; },
    setKeywords: function(newKeywords) { keywords = newKeywords; },
    getDescription: function() { return description; },
    setDescription: function(newDescription) { description = newDescription; },
    getImage: function() { return image; },
    setImage: function(newImage) { image = newImage; }
  };

}]);
