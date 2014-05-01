'use strict';

describe('Service: Positionservice', function () {

  // load the service's module
  beforeEach(module('knowitApp'));

  // instantiate service
  var Positionservice;
  beforeEach(inject(function (_Positionservice_) {
    Positionservice = _Positionservice_;
  }));

  it('should do something', function () {
    expect(!!Positionservice).toBe(true);
  });

});
