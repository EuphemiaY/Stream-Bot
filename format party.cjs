const Euphpokelink = require('./Euphparty.json');
const Ivypokelink = require('./IvyParty.json')
// console.log(pokelink["party"][0]["pokemon"]["localizedNames"]["primary"]["speciesName"]);
// console.log(pokelink["party"][0]["pokemon"]["nickname"]);
// Technically speaking you don't need this and it changes on session, but keeping it here as a way to find ports if needed is nice for me. I think this would break if the file isn't found though
const session = require('C:\\Users\\beast\\Downloads\\Pokelink\\sessions\\bcc6e8ad-9eff-4ff6-bb6a-4d6ec6d91246\\pokelink\\session.json')
console.log("The port is", session["connection"]["port"])


function EuphPokemonFinder(PokemonName) {
    for (var i = 0; i < 6; i++) {
        try {
            pokemon = Euphpokelink["party"][i]["pokemon"]
            species_name = (pokemon["localizedNames"]["primary"]["speciesName"])
            nickname = (pokemon["nickname"])
            if (species_name.toLowerCase() == PokemonName.toLowerCase()) {
                return (species_name + " is called " + nickname + " (Euph)")
            }
        }
        catch {
        }
    }
    return "Not a real pokemon"

};

function IvyPokemonFinder(PokemonName) {
    for (var i = 0; i < 6; i++) {
        try {
            pokemon = Ivypokelink["party"][i]["pokemon"];
            species_name = (pokemon["localizedNames"]["primary"]["speciesName"])
            nickname = (pokemon["nickname"])
            if (species_name.toLowerCase() == PokemonName.toLowerCase()) {
                return (species_name + " is called " + nickname + " (Ivy)")
            }
        }
        catch {
        }
    }
    return "Not a real pokemon"

};

function NickNameFinder(PokemonNickName) {
    nickname = PokemonNickName.toLowerCase();
    for (var i = 0; i < 6; i++) {
        try {
            pokemonNickname = Euphpokelink["party"][i]["pokemon"]["nickname"];
            if (pokemonNickname.toLowerCase() == nickname) {
                for (var z = 0; z < 6; z++) {
                    try {
                        if (pokemonNickname == Ivypokelink["party"][z]["pokemon"]["nickname"]) {
                            return (nickname + " is a " + Ivypokelink["party"][z]["pokemon"]["localizedNames"]["primary"]["speciesName"] +
                                " for Ivy and a " + Euphpokelink["party"][i]["pokemon"]["localizedNames"]["primary"]["speciesName"] +
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

function ShowEuphMovesetPokemon(Pokemon) {
    moveset = "";
    for (var i = 0; i < 6; i++) {
        try {
            species_name = (Euphpokelink["party"][i]["pokemon"]["localizedNames"]["primary"]["speciesName"])
            if (species_name.toLowerCase() == Pokemon.toLowerCase()) {
                try {
                    for (var z = 0; z < 4; z++) {
                        moveset += Euphpokelink["party"][i]["pokemon"]["moves"][z]['info']['name'] + "\n";
                    }
                } catch { // A pokemon can have less than 4 moves and that will be an error

                }
                return (Pokemon + " (Euph) has the moveset \n" + moveset)
            }
        }
        catch {
        }
    }
    return "Not a real pokemon"
}

function ShowIvyMovesetPokemon(Pokemon) {
    moveset = "";
    for (var i = 0; i < 6; i++) {
        try {
            species_name = (Ivypokelink["party"][i]["pokemon"]["localizedNames"]["primary"]["speciesName"])
            if (species_name.toLowerCase() == Pokemon.toLowerCase()) {
                try {
                    for (var z = 0; z < 4; z++) {
                        moveset += Ivypokelink["party"][i]["pokemon"]["moves"][z]['info']['name'] + "\n";
                    }
                } catch { // A pokemon can have less than 4 moves and that will be an error

                }
                return (Pokemon + " (Ivy) has the moveset \n" + moveset)
            }
        }
        catch {
        }
    }
    return "Not a real pokemon"
}

function ShowEuphMovesetNickname(PokemonNickname) {
    moveset = "";
    nickname = PokemonNickname.toLowerCase();
    for (var i = 0; i < 6; i++) {
        try {
            pokemon_nickname = Euphpokelink["party"][i]["pokemon"]["nickname"];
            if (pokemon_nickname.toLowerCase() == nickname) {
                try {
                    for (var z = 0; z < 4; z++) {
                        moveset += Euphpokelink["party"][i]["pokemon"]["moves"][z]['info']['name'] + "\n";
                    }
                } catch { // A pokemon can have less than 4 moves and that will be an error

                }
                return (PokemonNickname + " (Euph) has the moveset \n" + moveset)
            }

        } catch {
            return "That's not a real nickname gamer"
        }
    }

}

function ShowIvyMovesetNickname(PokemonNickname) {
    moveset = "";
    nickname = PokemonNickname.toLowerCase();
    for (var i = 0; i < 6; i++) {
        try {
            pokemon_nickname = Ivypokelink["party"][i]["pokemon"]["nickname"];
            if (pokemon_nickname.toLowerCase() == nickname) {
                try {
                    for (var z = 0; z < 4; z++) {
                        moveset += Ivypokelink["party"][i]["pokemon"]["moves"][z]['info']['name'] + "\n";
                    }
                } catch { // A pokemon can have less than 4 moves and that will be an error
                    continue
                }
                return (PokemonNickname + " (Ivy) has the moveset \n" + moveset)
            }

        } catch {
            continue
        }

    }
    return "That's not a real nickname gamer"

}

function ShowPokemon(player) {
    // Depending on player we go to another JSON
    if (player == "Euph") {
        pokemon_list = ["For Euph: \n"];
        pokemon = Euphpokelink["party"];
    } if (player == "Ivy") {
        pokemon_list = ["For Ivy: \n"];
        pokemon = Ivypokelink["party"];
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
    ShowIvyMovesetNickname,
    ShowEuphMovesetNickname,
    ShowIvyMovesetPokemon,
    ShowEuphMovesetPokemon,
    NickNameFinder,
    IvyPokemonFinder,
    EuphPokemonFinder
};