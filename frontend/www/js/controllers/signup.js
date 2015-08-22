angular.module('recepto')
    .controller('SignupCtrl', function($scope, $auth, $ionicPlatform, $cordovaCamera, $cordovaToast, localStorageService) {

        $scope.user = [];

        $scope.signup = function() {
            var user = {
                email: $scope.user.email,
                password: $scope.user.password,
                fullName: $scope.user.fullName,
                picture: $scope.user.picture
            };

            // First make sure they are logged out
            $auth.logout()
                .then(function() {
                    localStorageService.clearAll();
                    $cordovaToast.showShortBottom('You are now logged out!');
                });

            // Satellizer
            $auth.signup(user)
                .catch(function(response) {
                    $cordovaToast.showShortBottom('Error: ' + response.data.message);
                    console.log(response.data.message);
                });
        };

        $scope.takePicture = function() {
            $ionicPlatform.ready(function() {
                var options = {
                    quality : 75,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.user.picture = imageData;
                }, function(error) {
                    $cordovaToast.showShortBottom('Error while taking a picture');
                    console.error(error);
                });
            });
        }

    });