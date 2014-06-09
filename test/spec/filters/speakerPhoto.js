'use strict';

describe('Filter: speakerPhoto', function () {

  // load the filter's module
  beforeEach(module('itytApp'));

  // initialize a new instance of the filter before each test
  var speakerPhoto;
  beforeEach(inject(function ($filter) {
    speakerPhoto = $filter('speakerPhoto');
  }));

  it('should return the input prefixed with "speakerPhoto filter:"', function () {
    var text = 'angularjs';
    expect(speakerPhoto(text)).toBe('speakerPhoto filter: ' + text);
  });

});
