angular.module('recepto')

    .service('Recept', ['$http', 'urls', function($http, urls) {
        this.all = function () {
            return $http.get(urls.API + '/recipe');
        };

        this.getRecept = function (id) {
            return $http.get(urls.API + '/recipe/' + id);
        };

        this.createRecept = function (recept) {
            return $http.post(urls.API + '/recipe', {
                name: recept.name,
                description: recept.description,
                photos: recept.photos,
                ingredients: recept.ingredients,
                steps: recept.steps,
                category: recept.category,
                amountOfPersons: recept.amountOfPersons,
                calories: recept.calories,
                time: recept.time,
                difficulty: recept.difficulty
            });
        };

        /**
         *
         DELETED STEPS AND INGREDIENTS:
         steps: recept.steps,
         category: recept.category,
         */
        this.updateRecept = function (recept, id) {
            return $http.put(urls.API + '/recipe/' + id, {
                name: recept.name,
                description: recept.description,
                photos: recept.photos,
                ingredients: recept.ingredients,
                amountOfPersons: recept.amountOfPersons,
                calories: recept.calories,
                time: recept.time,
                difficulty: recept.difficulty
            });
        };

        this.deleteRecept = function (id) {
            return $http.delete(urls.API + '/recipe/' + id);
        };
    }]);