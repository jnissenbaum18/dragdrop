app.controller('HomeController', function($scope, $timeout, $http) {
  
  $scope.msgFromScope = "...And I'm a message from the HomeController scope, just so you know that I work!";

  $scope.controllerdata = {
    test: 'test object from home controller'
  }

});

app.controller('secondController', function ($scope, $timeout, $http, $attrs) {

  $scope.logdata = function () {
    console.log('from the second controller', $attrs.fsagetdata)
  }
  var myReceivedData = $attrs.fsacontainer
  
})