const { UnauthorizedError, NotFoundError } = require('../errors');
const {isAuthentificationTokenExpired, isClientExist} = require('../../services/profiles.service');

/**
 * Returns a Profile by the provided client Id.
 * @param {string} clientId - client Id.
 * @param {string} authenticationToken - authentication token.
 * @return {object} - Found profile.
 * @throw UnauthorizedError or NotFoundError in case of an error.
 */
const getProfile = (clientId, authenticationToken) => {

    if (clientId === null || clientId === undefined || authenticationToken === null || authenticationToken === undefined) {
        throw new UnauthorizedError('Invalid clientId or authentification token supplied');
    } else if (isAuthentificationTokenExpired(clientId, authenticationToken)) {
        throw new UnauthorizedError('Provided authentification token is expired');
    } else if (!isClientExist(clientId)) {
        throw new NotFoundError(`There is no client with provided id: '${clientId}'`);
    }

    return {
        applications: [{
                applicationId: "music_app",
                version: "v1.4.10"
            },{
                applicationId: "diagnostic_app",
                version: "v1.2.6"
            },{
                applicationId: "settings_app",
                version: "v1.1.5"
            }
        ]
    }
}

module.exports = {
    getProfile
};