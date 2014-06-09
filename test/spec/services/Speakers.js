'use strict';

describe('Service: Speakers', function () {

  // load the service's module
  beforeEach(module('ItytApp'));

  // instantiate service
  var Speakers;
  beforeEach(inject(function (_Speakers_) {
    Speakers = _Speakers_;
  }));

  it('should do something', function () {
    expect(!!Speakers).toBe(true);
  });

});
