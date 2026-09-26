var EUPH_POKELINK = require('./Euphparty.json');
var IVY_POKELINK = require('./IvyParty.json');
// Import the filesystem module
const fs = require('fs');
// console.log(pokelink["party"][0]["pokemon"]["localizedNames"]["primary"]["speciesName"]);
// console.log(pokelink["party"][0]["pokemon"]["nickname"]);
// Technically speaking you don't need this and it changes on session, but keeping it here as a way to find ports if needed is nice for me. I think this would break if the file isn't found though

const fs = require('fs')
const session = require('C:\\Users\\beast\\Downloads\\Pokelink\\sessions\\bcc6e8ad-9eff-4ff6-bb6a-4d6ec6d91246\\pokelink\\session.json')
console.log("The port is", session["connection"]["port"])

// Watching the Euph party file for changes to then update the file
const watcherEuph = fs.watch("./Euphparty.json", (eventType) => {
    if (eventType == "change"){
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
        EUPH_POKELINK = JSON.parse(fs.readFileSync('./Euphparty.json', 'utf8'))
    }
})

const watcherIvy = fs.watch("./IvyRollsParty.json", (eventType) => {
    if (eventType == "change"){
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
        IVY_POKELINK = JSON.parse(fs.readFileSync('./IvyRollsParty.json', 'utf8'))
    }
})

watcherEuph.on("error", (err) => {
  console.error("Watcher error:", err.message);
});

watcherIvy.on("error", (err) => {
  console.error("Watcher error:", err.message);
});


function PokemonFinder(pokemonName, playerName) {
    EUPH_POKELINK =JSON.parse(fs.readFileSync('./Euphparty.json', 'utf8'))
    for (var i = 0; i < 6; i++) {
        try {
            if (playerName == "Euph") {
                pokemon = EUPH_POKELINK["party"][i]["pokemon"]
            } else if (playerName == "Ivy") {
                pokemon = IVY_POKELINK["party"][i]["pokemon"]
            }
            species_name = (pokemon["localizedNames"]["primary"]["speciesName"])
            nickname = (pokemon["nickname"])
            if (species_name.toLowerCase() == pokemonName.toLowerCase() && playerName == "Euph") {
                return (species_name + " is called " + nickname + " (Euph)")
            } else if (species_name.toLowerCase() == pokemonName.toLowerCase() && playerName == "Ivy") {
                return (species_name + " is called " + nickname + " (Ivy)")
            }
        }
        catch {
        }
    }
    return "Not a valid pokemon"
}

function NickNameFinder(pokemonNickname) {
    for (var i = 0; i < 6; i++) {
        try {
            if (pokemonNickname.toLowerCase() == EUPH_POKELINK["party"][i]["pokemon"]["nickname"].toLowerCase()) {
                for (var z = 0; z < 6; z++) {
                    try {
                        if (pokemonNickname.toLowerCase() == IVY_POKELINK["party"][z]["pokemon"]["nickname"].toLowerCase()) {
                            return (pokemonNickname + " is a " + IVY_POKELINK["party"][z]["pokemon"]["localizedNames"]["primary"]["speciesName"] +
                                " for Ivy and a " + EUPH_POKELINK["party"][i]["pokemon"]["localizedNames"]["primary"]["speciesName"] +
                                " for Euph"
                            )
                        }
                    } catch {
                        return "Ivy didn't spell a pokemon name right"
                    }
                }
            }
        } catch {

        }

    }
    return "That's not a real nickname gamer"

}

function ShowMovesetPokemon(pokemonName, playerName) {
    moveset = "";
    for (var i = 0; i < 6; i++) {
        try {
            if (playerName == "Euph"){
                pokemon = EUPH_POKELINK["party"][i]["pokemon"]
            } else if (playerName == "Ivy"){
                pokemon = IVY_POKELINK["party"][i]["pokemon"]
            }
            species_name = (pokemon["localizedNames"]["primary"]["speciesName"])
            if (species_name.toLowerCase() == pokemonName.toLowerCase()) {
                try {
                    for (var z = 0; z < 4; z++) {
                        moveset += pokemon["moves"][z]['info']['name'] + "\n";
                    }
                } catch { // A pokemon can have less than 4 moves and that will be an error

                }
                return (pokemonName+ " (" + playerName+ ") has the moveset \n" + moveset)
            }
        }
        catch {
        }
    }
    return "Not a valid pokemon"
}

function ShowMovesetNickname(pokemonNickname, playerName) {
    moveset = "";
    for (var i = 0; i < 6; i++) {
        try {
            if (playerName == "Euph") {
                pokemon = EUPH_POKELINK["party"][i]["pokemon"]
            } else if (playerName == "Ivy") {
                pokemon = IVY_POKELINK["party"][i]["pokemon"]
            }
            pokemon_nickname = pokemon["nickname"];
            if (pokemon_nickname.toLowerCase() == pokemonNickname.toLowerCase()) {
                try {
                    for (var z = 0; z < 4; z++) {
                        moveset += pokemon["moves"][z]['info']['name'] + "\n";
                    }
                } catch { // A pokemon can have less than 4 moves and that will be an error

                }
                return (pokemon_nickname + " (" + playerName+ ") has the moveset \n" + moveset)
            }
        } catch {
            return "That's not a real nickname gamer"
        }
    }
}

function ShowPokemon(player) {
    // Depending on player we go to another JSON
    if (player == "Euph") {
        pokemon_list = ["For Euph: \n"];
        pokemon = EUPH_POKELINK["party"];
    } if (player == "Ivy") {
        pokemon_list = ["For Ivy: \n"];
        pokemon = IVY_POKELINK["party"];
    }
    // This will need a try since the party length can be less than 6.
    for (var i = 0; i < 6; i++) {
        try {
            species_name = (pokemon[i]["pokemon"]["localizedNames"]["primary"]["speciesName"])
            nickname = (pokemon[i]["pokemon"]["nickname"])
            pokemon_list += (nickname + " is a " + species_name + " \n")
        }
        catch {
            continue
        }
    }
    return pokemon_list;
}

module.exports = {
    ShowPokemon,
    ShowMovesetNickname,
    ShowMovesetPokemon,
    NickNameFinder,
    PokemonFinder
};