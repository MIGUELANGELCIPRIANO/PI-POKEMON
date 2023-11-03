const validations = (formData) => {
    const errors = {};

    if(formData.name === ''){errors.name = "The name of the Pokémon cannot be empty!"}
    if(formData.name.length < 2){errors.name = "The Pokémon's name cannot be less than 2 characters"}
    if(formData.name.length > 13){errors.name = "The Pokémon's name cannot be longer than 13 characters"}
    if(formData.image && formData.image.startsWith('http://') || formData.image.startsWith('https://')){errors.image = "The image must be a URL"}
    if (formData.hp === ''){errors.hp = "HP is required"}
    if (isNaN(formData.hp) || formData.hp < 1 || formData.hp > 255) {errors.hp = "HP must be a number between 1 and 255"}
    if (formData.attack === '') {errors.attack = "Attack is required"}
    if (isNaN(formData.attack) || formData.attack < 5 || formData.attack > 210){errors.attack = "Attack must be a number between 5 and 210"}
    if (formData.defense === '') {errors.defense = "Defense is required"}
    if (isNaN(formData.defense) || formData.defense < 5 || formData.defense > 230){errors.defense = "Defense must be a number between 5 and 230"}
    if (!formData.types) {errors.types = "At least one type is required"}

    return errors;
}

export default validations;