var router     = require('./lib/router'),
    registerHelpers = require('./lib/helpers'),

    // Dirty requires
    config = require('../../config'),
    labs = require('../../utils/labs');

module.exports = {
    activate: function activate(ghost) {
        // TODO, how to do all this only if the Subscribers flag is set?!
        registerHelpers(ghost);

        ghost.routeService.registerRouter('/' + config.get('routeKeywords').subscribe + '/', function labsEnabledRouter(req, res, next) {
            if (labs.isSet('subscribers') === true) {
                return router.apply(this, arguments);
            }

            next();
        });
    }
};
