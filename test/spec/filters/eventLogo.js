'use strict';

describe('Filter: eventLogo', function () {

  // load the filter's module
  beforeEach(module('itytApp'));

  // initialize a new instance of the filter before each test
  var eventLogo;
  beforeEach(inject(function ($filter) {
    eventLogo = $filter('eventLogo');
  }));

  it('should return the input prefixed with "eventLogo filter:"', function () {
    var text = 'angularjs';
    expect(eventLogo(text)).toBe('eventLogo filter: ' + text);
  });

});
