angular.module('recepto', ['ionic', 'ngCordova', 'pascalprecht.translate', 'LocalStorageModule', 'satellizer'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .constant('urls', {
        API: 'https://recepto-app.herokuapp.com/api/v1'
    })

    .config(function ($authProvider, urls) {

        $authProvider.twitter({
            url: '/auth/twitter'
        });

        $authProvider.loginUrl = '/user/login';
        $authProvider.signupUrl = '/user/signup';
        $authProvider.baseUrl = urls.API;
        $authProvider.loginOnSignup = true;

        // Facebook
        $authProvider.facebook({
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
            clientId: '402453646604704',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
            scope: 'email',
            scopeDelimiter: ',',
            requiredUrlParams: ['display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 481, height: 269}
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position("bottom");

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('signup', {
                url: "/signup",
                templateUrl: "templates/signup.html",
                controller: "SignupCtrl"
            })

            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: "LoginCtrl"
            })

            .state('logout', {
                url: "/logout",
                template: null,
                controller: "LogoutCtrl"
            })

            // Setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                resolve: {
                    authenticated: function ($q, $location, $auth) {
                        var deferred = $q.defer();

                        if (!$auth.isAuthenticated()) {
                            $location.path('login');
                        } else {
                            deferred.resolve();
                        }

                        return deferred.promise;
                    }
                }
            })

            .state('tab.recipe', {
                url: '/recipe',
                views: {
                    'tab-recipe': {
                        templateUrl: 'templates/tab-recipe.html',
                        controller: 'RecipeCtrl'
                    }
                }
            })

            .state('tab.new-recipe', {
                url: '/recipe/new',
                views: {
                    'tab-recipe': {
                        templateUrl: 'templates/new-recipe.html',
                        controller: 'RecipeCreateCtrl'
                    }
                }
            })

            .state('tab.recipe-detail', {
                url: '/recipe/:recipeId',
                views: {
                    'tab-recipe': {
                        templateUrl: 'templates/recipe-detail.html',
                        controller: 'RecipeDetailCtrl'
                    }
                }
            })

            .state('tab.update-recipe', {
                url: '/recipe/update/:recipeId',
                views: {
                    'tab-recipe': {
                        templateUrl: 'templates/update-recipe.html',
                        controller: 'RecipeUpdateCtrl'
                    }
                }
            })

            .state('tab.new-category', {
                url: '/category/new',
                views: {
                    'tab-categories': {
                        templateUrl: 'templates/new-categories.html',
                        controller: 'CategoriesCreateCtrl'
                    }
                }
            })

            .state('tab.category', {
                url: '/category',
                views: {
                    'tab-categories': {
                        templateUrl: 'templates/tab-categories.html',
                        controller: 'CategoriesCtrl'
                    }
                }
            })

            .state('tab.category-detail', {
                url: '/category/:categoryId',
                views: {
                    'tab-categories': {
                        templateUrl: 'templates/category-detail.html',
                        controller: 'CategoriesDetailCtrl'
                    }
                }
            })

            .state('tab.category-recipe-detail', {
                url: '/category/:categoryId/:recipeId',
                views: {
                    'tab-categories': {
                        templateUrl: 'templates/recipe-detail.html',
                        controller: 'RecipeDetailCtrl'
                    }
                }
            })

            .state('tab.profile', {
                url: '/profile',
                views: {
                    'tab-profile': {
                        templateUrl: 'templates/tab-profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/recipe');

    });