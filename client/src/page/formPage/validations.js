const validations = (input) => {
    const errors = {};

    if (input.name === '') { errors.name = "The name of the Pokémon cannot be empty!" }
    if (input.name.length < 2) { errors.name = "The Pokémon's name cannot be less than 2 characters" }
    if (input.name.length > 13) { errors.name = "The Pokémon's name cannot be longer than 13 characters" }
    if (input.image && !input.image.startsWith('http://') || !input.image.startsWith('https://')) { errors.image = "The image must be a URL" }
    if (input.hp === '') { errors.hp = "HP is required" }
    if (isNaN(input.hp) || input.hp < 1 || input.hp > 255) { errors.hp = "HP must be a number between 1 and 255" }
    if (input.attack === '') { errors.attack = "Attack is required" }
    if (isNaN(input.attack) || input.attack < 5 || input.attack > 210) { errors.attack = "Attack must be a number between 5 and 210" }
    if (input.defense === '') { errors.defense = "Defense is required" }
    if (isNaN(input.defense) || input.defense < 5 || input.defense > 230) { errors.defense = "Defense must be a number between 5 and 230" }
    if (!input.types || input.types.length < 1) { errors.types = "At least one type is required" }
    if (input.types.length > 2) { errors.types = "Select no more than two types" }

    return errors;
}

export default validations;