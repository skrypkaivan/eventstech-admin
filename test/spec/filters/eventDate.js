'use strict';

describe('Filter: eventDate', function () {

  // load the filter's module
  beforeEach(module('itytApp'));

  // initialize a new instance of the filter before each test
  var eventDate;
  beforeEach(inject(function ($filter) {
    eventDate = $filter('eventDate');
  }));

  it('should return the input prefixed with "eventDate filter:"', function () {
    var text = 'angularjs';
    expect(eventDate(text)).toBe('eventDate filter: ' + text);
  });

});
