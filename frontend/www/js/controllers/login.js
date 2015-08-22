angular.module('recepto')
    .controller('LoginCtrl', function($scope, $auth, localStorageService, $rootScope, $cordovaToast) {

        $scope.user = [];
        $scope.showLoginForm = false;

        $scope.emailLogin = function() {
            $auth.login({ email: $scope.user.email, password: $scope.user.password })
                .then(function(response) {
                    localStorageService.set('currentUser', response.data.user);
                    $rootScope.currentUser = localStorageService.get('currentUser');
                    $cordovaToast.showShortBottom('You are now logged in!');
                    console.log($rootScope.currentUser);
                })
                .catch(function(response) {
                    $cordovaToast.showLongBottom('Error: ' + response.data.message);
                    console.log(response.data);
                });
        };

        $scope.makeFoodLogin = function() {
            $scope.showLoginForm = !$scope.showLoginForm;
        }

    });