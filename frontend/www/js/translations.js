angular.module('recepto')
    .config(['$translateProvider', function ($translateProvider) {

        var translationsEN = {
            'APP': {
                'NAME': 'MakeFood'
            },
            'TABS': {
                'RECIPES': 'Recipes',
                'PROFILE': 'Profile',
                'CATEGORIES': 'Categories',
                'CREATE_RECIPE': 'New recipe'
            },
            'RECIPE_OVERVIEW': {
                'PAGE_TITLE': 'Your recipes',
                'REFRESH_TEXT': 'Refresh..',
                'NO_RECIPES_AVAILABLE': 'You don\'t have recipes (yet)!',
                'REMOVE_BUTTON': 'Delete'
            },
            'CREATE_RECIPE': {
                'PAGE_TITLE': 'Create new recipe',
                'TAKE_A_PICTURE': 'Take a picture',
                'RECIPE_NAME': 'Recipe name',
                'RECIPE_NAME_PLACEHOLDER': 'Type your recipe name here..',
                'RECIPE_NAME_ERROR': 'Please enter a recipe name!',
                'RECIPE_DESCRIPTION': 'Description',
                'RECIPE_DESCRIPTION_PLACEHOLDER': 'Type your description here..',
                'CREATE_BUTTON': 'Create recipe!',
                'INGREDIENTS': 'Ingredients',
                'INGREDIENTS_PLACEHOLDER': 'Type your ingredients here..',
                'STEPS': 'Preparation steps',
                'STEPS_PLACEHOLDER': 'Type your steps here..',
                'CATEGORY': 'Category',
                'CATEGORY_PLACEHOLDER': 'Choose a category',
                'PERSONS': 'Amount of persons',
                'PERSONS_PLACEHOLDER': 'Type the amount of persons here..',
                'PERSONS_UNIT': 'persons',
                'OPTIONAL': 'Optional',
                'CALORIES': 'Calories',
                'CALORIES_PLACEHOLDER': 'Type the calories here..',
                'PREPARATION_TIME': 'Preparation time',
                'PREPARATION_TIME_PLACEHOLDER': 'Type the amount of time necessary..',
                'PREPARATION_TIME_MINUTE_UNIT': 'minutes',
                'PREPARATION_TIME_HOUR_UNIT': 'hours',
                'DIFFICULTY': 'Difficulty',
                'DIFFICULTY_PLACEHOLDER': 'Choose a level',
                'DIFFICULTY_1': 'Easy',
                'DIFFICULTY_2': 'Intermediate',
                'DIFFICULTY_3': 'Advanced',
                'SHARE_THIS_RECIPE': 'Share this recipe!',
                'MENU_UPDATE': 'Update'
            },
            'CATEGORIES_OVERVIEW': {
                'PAGE_TITLE': 'Categories',
                'NO_RECIPES': 'No recipes',
                'ONE_RECIPE': 'recipe',
                'MORE_RECIPES': 'recipes',
                'NO_CATEGORIES': 'There are no recipes in this category.',
                'CATEGORY_NAME': 'Category',
                'NO_RESULTS': 'You don\'t have any categories (yet)!'
            },
            'PROFILE_OVERVIEW': {
                'PAGE_TITLE': 'Profile',
                'MULTIPLE_RECIPES': 'recipes',
                'ONE_RECIPE': 'recipe',
                'NO_RECIPES': 'No recipes',
                'LOGOUT': 'Logout'
            },
            'CREATE_CATEGORY': {
                'PAGE_TITLE': 'New category',
                'SEARCH_BUTTON': 'Search..',
                'ADD_TEXT': 'This category doesn\'t exist, add it!',
                'ADD_BUTTON': 'Add'
            },
            'LOGIN': {
                'MENU_NAME': 'Login',
                'HEADER_NAME': 'Login',
                'EMAIL_INPUT': 'Email',
                'PASSWORD_INPUT': 'Password',
                'LOGIN_BUTTON': 'Log in',
                'NO_ACCOUNT_TEXT': 'Not registered yet? ',
                'SIGN_UP_TEXT': 'Sign up!'
            },
            'REGISTER': {
                'MENU_NAME': 'Create new account',
                'HEADER_NAME': 'Sign up!',
                'EMAIL_INPUT': 'Email',
                'PASSWORD_INPUT': 'Password',
                'NAME_INPUT': 'Name',
                'SIGNUP_BUTTON': 'Start cooking!',
                'ALREADY_ACCOUNT_TEXT': 'Already have an account? ',
                'LOGIN_TEXT': 'Login!'
            }
        };

        var translationsNL = {
            'APP': {
                'NAME': 'MakeFood'
            },
            'TABS': {
                'RECIPES': 'Recepten',
                'PROFILE': 'Profiel',
                'CATEGORIES': 'Categorieën',
                'CREATE_RECIPE': 'Nieuw recept'
            },
            'RECIPE_OVERVIEW': {
                'PAGE_TITLE': 'Alle recepten',
                'REFRESH_TEXT': 'Vernieuw..',
                'NO_RECIPES_AVAILABLE': 'Je hebt (nog) geen recepten!',
                'REMOVE_BUTTON': 'Verwijder'
            },
            'CREATE_RECIPE': {
                'PAGE_TITLE': 'Maak nieuw recept',
                'TAKE_A_PICTURE': 'Maak een foto',
                'RECIPE_NAME': 'Receptnaam',
                'RECIPE_NAME_PLACEHOLDER': 'Plaats hier het receptnaam..',
                'RECIPE_NAME_ERROR': '',
                'RECIPE_DESCRIPTION': 'Beschrijving',
                'RECIPE_DESCRIPTION_PLACEHOLDER': 'Plaats hier de beschrijving..',
                'CREATE_BUTTON': 'Maak recept!',
                'INGREDIENTS': 'Ingrediënten',
                'INGREDIENTS_PLACEHOLDER': 'Plaats hier de ingrediënten..',
                'STEPS': 'Bereidsstappen',
                'STEPS_PLACEHOLDER': 'Plaats hier de bereidsstappen..',
                'CATEGORY': 'Categorie',
                'CATEGORY_PLACEHOLDER': 'Kies een categorie',
                'PERSONS': 'Aantal personen',
                'PERSONS_PLACEHOLDER': 'Plaats hier het aantal personen..',
                'PERSONS_UNIT': 'personen',
                'OPTIONAL': 'Optioneel',
                'CALORIES': 'Calorieën',
                'CALORIES_PLACEHOLDER': 'Plaats hier het aantal calorieën..',
                'PREPARATION_TIME': 'Bereidingstijd',
                'PREPARATION_TIME_PLACEHOLDER': 'Plaats hier de bereidingstijd..',
                'PREPARATION_TIME_MINUTE_UNIT': 'minuten',
                'PREPARATION_TIME_HOUR_UNIT': 'uren',
                'DIFFICULTY': 'Moeilijkheidsgraad',
                'DIFFICULTY_PLACEHOLDER': 'Kies een moeilijkheidsgraad',
                'DIFFICULTY_1': 'Makkelijk',
                'DIFFICULTY_2': 'Normaal',
                'DIFFICULTY_3': 'Moeilijk',
                'SHARE_THIS_RECIPE': 'Deel dit recept!',
                'MENU_UPDATE': 'Bewerk'
            },
            'CATEGORIES_OVERVIEW': {
                'PAGE_TITLE': 'Categorieën',
                'NO_RECIPES': 'Geen recepten',
                'ONE_RECIPE': 'recept',
                'MORE_RECIPES': 'recepten',
                'NO_CATEGORIES': 'Er zijn geen recepten in deze categorie.',
                'CATEGORY_NAME': 'Categorie',
                'NO_RESULTS': 'Je hebt (nog) geen categorieën!'
            },
            'PROFILE_OVERVIEW': {
                'PAGE_TITLE': 'Profiel',
                'MULTIPLE_RECIPES': 'recepten',
                'ONE_RECIPE': 'recept',
                'NO_RECIPES': 'Geen recepten',
                'LOGOUT': 'Uitloggen'
            },
            'CREATE_CATEGORY': {
                'PAGE_TITLE': 'Maak categorie',
                'SEARCH_BUTTON': 'Zoeken..',
                'ADD_TEXT': 'Deze categorie bestaat niet, voeg het toe!',
                'ADD_BUTTON': 'Toevoegen'
            },
            'LOGIN': {
                'MENU_NAME': 'Login',
                'HEADER_NAME': 'Inloggen',
                'EMAIL_INPUT': 'Email',
                'PASSWORD_INPUT': 'Wachtwoord',
                'LOGIN_BUTTON': 'Log in',
                'NO_ACCOUNT_TEXT': 'Heb je nog geen account? ',
                'SIGN_UP_TEXT': 'Registreer!'
            },
            'REGISTER': {
                'MENU_NAME': 'Maak nieuw account',
                'HEADER_NAME': 'Registeer!',
                'EMAIL_INPUT': 'Email',
                'PASSWORD_INPUT': 'Wachtwoord',
                'NAME_INPUT': 'Naam',
                'SIGNUP_BUTTON': 'Begin met koken!',
                'ALREADY_ACCOUNT_TEXT': 'Heb je al een account? ',
                'LOGIN_TEXT': 'Log dan nu in!'
            }
        };

        var translationsDE = {
            'TABS': {
                'RECIPES': 'Rezepte',
                'PROFILE': '????',
                'CATEGORIES': '????',
                'CREATE_RECIPE': 'Neues Rezept'
            },
            'RECIPE_OVERVIEW': {
                'PAGE_TITLE': 'Ihre Rezepte',
                'REFRESH_TEXT': 'Erfrischen..',
                'NO_RECIPES_AVAILABLE': 'Sie haben (noch) keine Rezepte!',
                'REMOVE_BUTTON': 'Entfernen'
            },
            'CREATE_RECIPE': {
                'PAGE_TITLE': 'Neues Rezept',
                'TAKE_A_PICTURE': 'Foto nehmen',
                'RECIPE_NAME': 'Rezeptnamen ',
                'RECIPE_NAME_PLACEHOLDER': 'Legen sie eine Rezeptnamen..',
                'RECIPE_DESCRIPTION': 'Beschreibung',
                'RECIPE_DESCRIPTION_PLACEHOLDER': 'Legen sie eine Beschreibung..',
                'CREATE_BUTTON': 'Rezept machen!'
            },
            'CATEGORIES_OVERVIEW': {
                'PAGE_TITLE': '',
                'NO_RECIPES': '',
                'ONE_RECIPE': '',
                'MORE_RECIPES': ''
            },
            'PROFILE_OVERVIEW': {
                'PAGE_TITLE': ''
            },
            'CREATE_CATEGORY': {
                'PAGE_TITLE': '',
                'SEARCH_BUTTON': 'Suchen..',
                'ADD_TEXT': '',
                'ADD_BUTTON': ''
            }
        };

        $translateProvider.translations('en', translationsEN);
        $translateProvider.translations('nl', translationsNL);
        //$translateProvider.translations('de', translationsDE);

        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage('en');
    }])

    .run(function($ionicPlatform, $translate, $cordovaGlobalization) {
        $ionicPlatform.ready(function() {

            $cordovaGlobalization.getPreferredLanguage().then(
                function (result) {
                    $translate.use((result.value).split("-")[0]).then(function(data) {
                        console.log("Language set to: " + data);
                    }, function(error) {
                        console.log("Error setting the language: " + error);
                    });
                },
                function (error) {
                    console.log(error);
                });
        });
    });