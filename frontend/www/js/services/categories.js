angular.module('recepto')

    .service('Category', ['$http', 'urls', function($http, urls) {

        this.all = function () {
            return $http.get(urls.API + '/category');
        };

        this.get = function (name) {
            return $http.get(urls.API + '/category/' + name);
        };

        this.create = function (category) {
            return $http.post(urls.API + '/category', {
                category: category
            });
        };

        this.delete = function (id) {
            return $http.delete(urls.API + '/category/' + id);
        };

    }]);