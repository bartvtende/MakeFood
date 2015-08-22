module.exports = {
    facebookClientSecret: process.env.facebookClientSecret || '...',
    tokenSecret: process.env.tokenSecret || '...',
    mongoConnection: process.env.mongoConnection || 'mongodb://localhost/recepten',

    'facebookAuth' : {
        'clientID'      : '...', // your App ID
        'clientSecret'  : '...', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : '...',
        'consumerSecret'    : '...',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    }
};