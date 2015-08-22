angular.module('recepto')
    .controller('LogoutCtrl', function($auth, localStorageService, $cordovaToast) {
        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function() {
                localStorageService.clearAll();
                $cordovaToast.showShortBottom('You are now logged out!');
            });
    });