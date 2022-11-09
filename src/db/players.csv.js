const fs = require("fs");
const { parse } = require("csv-parse");

const csvFileName = './src/db/players.csv';

let players = [];

/**
 * Loads the player list from an .csv file.
 */
const loadPlayerList = async () => {
    players = [];

    // Check whether the file exists
    if (!fs.existsSync(csvFileName)) {
        console.log(`'${csvFileName}' file not found`);
    } else {
        // Read the .csv file and fill the list of players
        fs.createReadStream(csvFileName)
            .pipe(parse({ delimiter: ", ", from_line: 2 }))
            .on("data", function (row) {
                // Every row describes a player
                if (Array.isArray(row) && row.length == 4) {
                    const player = {
                        mac: row[0],
                        id1: row[1],
                        id2: row[2],
                        id3: row[3]
                    }
                    players.push(player);
                } else {
                    console.log(`Bad data read from '${csvFileName}' file: '${row}'`);
                }
            })
            .on("error", function (error) {
                console.log(error.message);
            });
    }
};

/**
 * Check whether the provided client exist.
 * @param {string} clientId - client Id. 
 * @return {boolean} - 'true' - if it exists, 'false' - otherwise.
 */
const isPlayerExist = (clientId) => {
    // Treat the player's mac-address as the client Id
    return players.find(player => (player.mac === clientId)) != undefined;
}

module.exports = { loadPlayerList, isPlayerExist };