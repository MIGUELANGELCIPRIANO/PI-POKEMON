const validations = (input) => {
    const errors = {};

    if (!/^[a-z]+$/.test(input.name) || input.name.length < 2 || input.name.length >= 12) { errors.name = "The Pokémon's name must contain only lowercase letters and be between 2 and 13 characters" }
    if (!(input.image.startsWith('http://') || input.image.startsWith('https://'))) { errors.image = "The image must be a URL" }
    if (input.hp === '' || isNaN(input.hp) || input.hp <= 0 || input.hp > 255) { errors.hp = "HP must be a number between 1 and 255" }
    if (input.attack === '' || isNaN(input.attack) || input.attack <= 4 || input.attack > 210) { errors.attack = "Attack must be a number between 5 and 210" }
    if (input.defense === '' || isNaN(input.defense) || input.defense <= 4 || input.defense > 230) { errors.defense = "Defense must be a number between 5 and 230" }
    if (input.types.length === 0 || input.types.length >= 2) { errors.types = "You must select between 1 and 2 types" }

    return errors;
}

export default validations;