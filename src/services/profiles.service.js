const { loadPlayerList, isPlayerExist } = require('../db/players.csv.js');

// Load player list
loadPlayerList();

/**
 * Check whether the provided authentification token is expired or not.
 * @param {string} clientId - client Id.
 * @param {string} authenticationToken - authentication token.
 * @return {boolean} - 'true' - if it is expired, 'false' - otherwise.
 */
const isAuthentificationTokenExpired = (clientId, token) => {
    // Not realised in this version
    // TODO realise the tocken verification
    return false;
}

/**
 * Check whether the provided client exist.
 * @param {string} clientId - client Id. 
 * @return {boolean} - 'true' - if it exists, 'false' - otherwise.
 */
const isClientExist = (clientId) => {
    return isPlayerExist(clientId);
}

module.exports = {isAuthentificationTokenExpired, isClientExist};