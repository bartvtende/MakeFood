angular.module('recepto')

.controller('RecipeCtrl', function($scope, Recept, $cordovaToast) {

  Recept.all()
      .success(function(res) {
        $scope.recepten = res;
      })
      .error(function(res) {
        console.log(res);
      });

  $scope.remove = function(id) {

      Recept.deleteRecept(id)
          .success(function(res) {
              var index = $scope.recepten.indexOf(id);
              $scope.recepten.splice(index, 1);
              console.log(res);
              $cordovaToast.showShortBottom('Deleted recipe');
          })
          .error(function(res) {
              console.log(res);
              $cordovaToast.showShortBottom('Error: ' + (res.data.message) ? res.data.message : 'Something went wrong' );
          });

  };

    $scope.doRefresh = function() {
        $scope.recepten = [' '];

        Recept.all()
            .success(function(res) {
                $scope.recepten = [];
                $scope.recepten = res;
            })
            .error(function(res) {
                console.log(res);
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };
})

.controller('RecipeDetailCtrl', function($scope, $stateParams, Recept, $ionicPlatform, $cordovaSocialSharing) {

    $scope.selectedPhoto = 0;
    $scope.timeUnit = 1;

    Recept.getRecept($stateParams.recipeId)
      .success(function(res) {
        $scope.recept = res;
        if ($scope.recept.time > 120) {
            $scope.timeUnit = 2;
            $scope.recept.time = $scope.recept.time / 60;
        }
      })
      .error(function(res) {
        console.log(res);
      });

    $scope.update = function (id) {
        console.log(id);
    };

    $scope.selectPhoto = function(id) {
        $scope.selectedPhoto = id;
    };

    $scope.share = function(recept) {
        var shareText = 'Ik heb ' + recept.name + ' gemaakt met de MakeFood app!';

        $ionicPlatform.ready(function() {
            $cordovaSocialSharing
                .share(shareText, 'MakeFood', '', 'https://www.makefood.nl')
                .then(function (result) {
                        // Success!
                        console.log(result);
                    }, function (err) {
                        // An error occured. Show a message to the user
                        console.log(err);
                    });
        });
    }
})

.controller('RecipeCreateCtrl', function($scope, $state, $stateParams, Recept, $cordovaCamera, $ionicPlatform, localStorageService) {

    $scope.recept = [];
    $scope.recept.photos = [];
    $scope.selectedPhoto = 0;
    $scope.options = true;
    $scope.recept.ingredients = [{}];
    $scope.recept.steps = [{}];
    $scope.recept.time_unit = 1;

    $scope.categories = localStorageService.get('categories');

    $scope.showOptions = function() {
        $scope.options = !$scope.options;
    };

    $scope.addIngredient = function() {
        $scope.recept.ingredients.push({});
    };

    $scope.removeIngredient = function(index) {
        $scope.recept.ingredients.splice(index, 1);
    };

    $scope.addStep = function() {
        $scope.recept.steps.push({});
    };

    $scope.removeStep = function(index) {
        $scope.recept.steps.splice(index, 1);
    };

    $scope.create = function(recept) {
        if ($scope.recept.time_unit == 2) {
            $scope.recept.time = 60 * $scope.recept.time;
        }

        angular.forEach($scope.recept.ingredients, function(key, value) {
            if (value == '') {
                delete $scope.recept.ingredients[key];
            }
        });

        angular.forEach($scope.recept.steps, function(key, value) {
            if (value == '') {
                delete $scope.recept.steps[key];
            }
        });

        Recept.createRecept(recept)
            .success(function(res) {
                $state.go('tab.recipe', {}, {reload: true});
            })
            .error(function(res) {
              console.log(res);
            });

        $scope.recept = [];
        $scope.recept.photos = [];
        $scope.recept.ingredients = [{}];
        $scope.recept.steps = [{}];
    };

    $scope.selectPhoto = function(id) {
        $scope.selectedPhoto = id;
    };

    $scope.deletePhoto = function(id) {
        $scope.selectedPhoto = 0;
        var index = $scope.recept.photos.indexOf(id);
        $scope.recept.photos.splice(index, 1);
        console.log($scope.recept.photos);
    };

    $scope.takePicture = function() {
        if ($scope.recept.photos.length > 2) {
            alert('Can\'t upload more then 3 photos!');
        } else {
            $ionicPlatform.ready(function() {
                var options = {
                    quality : 75,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 200,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.recept.photos.push(imageData);
                }, function(error) {
                    console.error(error);
                });
            });
        }
    }
})

.controller('RecipeUpdateCtrl', function($scope, $state, $stateParams, Recept, $cordovaCamera, $ionicPlatform, localStorageService) {

        $scope.recept = [];
        $scope.recept.photos = [];
        $scope.selectedPhoto = 0;
        $scope.options = true;
        $scope.recept.ingredients = [];
        $scope.recept.steps = [];
        $scope.recept.time_unit = 1;
        $scope.receptId = $stateParams.recipeId;

        $scope.categories = localStorageService.get('categories');

        Recept.getRecept($scope.receptId)
            .success(function(res) {
                $scope.recept = res;

                // Transform steps
                if ($scope.recept.steps.length == 0) {
                    $scope.recept.steps.push('');
                } else {
                    var newSteps = [];
                    $scope.recept.steps.forEach(function (key, value) {
                        newSteps.push($scope.recept.steps[value].name);
                    });
                    $scope.recept.steps = newSteps;
                }
                $scope.recept.steps = newSteps;

                // Transform ingredients
                if ($scope.recept.ingredients.length == 0) {
                    $scope.recept.ingredients.push('');
                } else {
                    var newIngredients = [];
                    $scope.recept.ingredients.forEach(function (key, value) {
                        newIngredients.push($scope.recept.ingredients[value].name);
                    });
                    $scope.recept.ingredients = newIngredients;
                }

                // Transform time
                if ($scope.recept.time > 120) {
                    $scope.recept.time_unit = 2;
                    $scope.recept.time = $scope.recept.time / 60;
                }
            })
            .error(function(err) {
                console.log($scope.recept);
                console.log(err);
            });

        $scope.showOptions = function() {
            $scope.options = !$scope.options;
        };

        $scope.addIngredient = function() {
            $scope.recept.ingredients.push('');
        };

        $scope.removeIngredient = function(index) {
            $scope.recept.ingredients.splice(index, 1);
        };

        $scope.addStep = function() {
            $scope.recept.steps.push('');
        };

        $scope.removeStep = function(index) {
            $scope.recept.steps.splice(index, 1);
        };

        $scope.update = function(recept) {
            if ($scope.recept.time_unit == 2) {
                $scope.recept.time = 60 * $scope.recept.time;
            }

            Recept.updateRecept(recept, recept._id)
                .success(function(res) {
                    console.log(res);
                    $state.go('tab.recipe', {}, {reload: true});
                })
                .error(function(res) {
                    console.log(res);
                });

            $scope.recept = [];
            $scope.recept.photos = [];
            $scope.recept.ingredients = [''];
            $scope.recept.steps = [''];
        };

        $scope.selectPhoto = function(id) {
            $scope.selectedPhoto = id;
        };

        $scope.deletePhoto = function(id) {
            $scope.selectedPhoto = 0;
            var index = $scope.recept.photos[0].indexOf(id);
            $scope.recept.photos[0].splice(index, 1);
        };

        $scope.takePicture = function() {
            if ($scope.recept.photos[0].length > 2) {
                alert('Can\'t upload more then 3 photos!');
            } else {
                $ionicPlatform.ready(function() {
                    var options = {
                        quality : 75,
                        destinationType : Camera.DestinationType.DATA_URL,
                        sourceType : Camera.PictureSourceType.CAMERA,
                        allowEdit : true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 300,
                        targetHeight: 200,
                        saveToPhotoAlbum: false
                    };
                    $cordovaCamera.getPicture(options).then(function(imageData) {
                        $scope.recept.photos[0].push(imageData);
                    }, function(error) {
                        console.error(error);
                    });
                });
            }
        }
});