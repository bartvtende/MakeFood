angular.module('recepto')
    .controller('ProfileCtrl', function($scope, localStorageService, Profile, $rootScope) {

        $scope.user = localStorageService.get('currentUser');
        $scope.recipeCount = localStorageService.get('recipeCount');

        $scope.changeAPI = function(API) {
            $rootScope.API = API;
        };

        Profile.getRecipeCount()
            .success(function(res) {
                $scope.recipeCount = res;
                localStorageService.set('recipeCount', res);
            })
            .error(function(err) {
                console.log('Something went wrong fetching the recipe counter, error: ' + err);
            });
    });