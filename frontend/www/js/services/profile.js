angular.module('recepto')
    .service('Profile', ['$http', 'urls', function($http, urls) {

        this.getRecipeCount = function() {
            return $http.get(urls.API + '/profile/recipe-count');
        };

    }]);