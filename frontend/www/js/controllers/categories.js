angular.module('recepto')
    .controller('CategoriesCtrl', function($scope, Category, localStorageService) {

        $scope.categories = [];

        Category.all()
            .success(function(res) {
                $scope.categories = res;
                console.log('test');
                localStorageService.set('categories', res);
            })
            .error(function() {
                console.log('Er is een error');
            });

        $scope.doRefresh = function() {

            Category.all()
                .success(function(res) {
                    $scope.categories = [];
                    $scope.categories = res;
                    localStorageService.set('categories', res);
                })
                .error(function(res) {
                    console.log(res);
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        $scope.remove = function(categoryId) {
            Category.delete(categoryId)
                .success(function(res) {
                    $scope.categories.splice($scope.categories.indexOf(categoryId), 1);
                    localStorageService.set('categories', res.categories);
                    console.log('Deleted category: ' + categoryId);
                })
                .error(function(err) {
                    console.log(err);
                })
        }
    })

    .controller('CategoriesDetailCtrl', function($scope, Category, $stateParams, $state) {

        $scope.recipes = [];

        Category.get($stateParams.categoryId)
            .success(function(res) {
                $scope.recipes = res;
            })
            .error(function(err) {
                console.log(err)
            });

        $scope.goToRecipeDetails = function(id) {
            $state.go("tab.category-recipe-detail", { "recipeId": id});
        }

    })

    .controller('CategoriesCreateCtrl', function($scope, Category) {

        $scope.availableCategories = [
            { name: 'Pasta' },
            { name: 'Pizza' },
            { name: 'Salade' },
            { name: 'Smoothies' },
            { name: 'Koffie' },
            { name: 'Desert' },
            { name: 'Taarten' },
            { name: 'Aardappelen' },
            { name: 'Snacks' }
        ];

        $scope.getCategories = function(amount) {
            return $scope.availableCategories.slice(0, amount);
        };

        $scope.addCategory = function(name) {
            Category.create(name)
                .success(function(res) {
                    console.log(res[0].message);
                })
                .error(function(res) {
                    console.log(res);
                });
        };

    });