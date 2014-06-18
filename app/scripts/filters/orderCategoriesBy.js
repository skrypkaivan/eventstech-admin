'use strict';

angular.module('itytApp').filter('orderCategoriesBy', function() {
  return function(items, field) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      if(a.slug === 'uncategorised') {
        return -1;
      }
      if(a[field] > b[field]) {
        return 1;
      }
      if(a[field] < b[field]) {
        return -1;
      }
      return 0;
    });

    return filtered;
  };
});