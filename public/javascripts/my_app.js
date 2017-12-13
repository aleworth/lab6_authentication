var myApp = angular.module('myApp', ["firebase"]);
 myApp.controller('myController', ['$scope', '$http',
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);

myApp.controller('memeController', ['$scope', "$firebaseArray", function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("memes");
 $scope.memes = $firebaseArray(ref);
    $scope.upload = function(meme) {
        var newMeme = 
        {
            from:meme.name || "anonymous", body:meme.picture
        };
        console.log(newMeme);
        $scope.memes.$add(newMeme);
	meme.name = "";
        meme.picture = "";
    }
}]);