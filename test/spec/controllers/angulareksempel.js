'use strict';

describe('Controller: AngulareksempelCtrl', function () {

  // load the controller's module
  beforeEach(module('knowitApp'));

  var AngulareksempelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AngulareksempelCtrl = $controller('AngulareksempelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
