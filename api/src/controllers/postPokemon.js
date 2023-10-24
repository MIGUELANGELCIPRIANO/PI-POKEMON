const { Pokemon } = require('../db');

const postPokemon = async(req, res) =>{
    try{
        const { id, name, image, life, attack, defense } = req.body;
        if( !id || !name || !image || !life || !attack || !defense){
            res.status(404).send("Faltan datos");
        }
        const newPokemon = await Pokemon.findOrCreate({
            where:{
                id: id,
                name: name,
                image: image,
                life: life,
                attack: attack,
                defense: defense,
            }
        });
        res.status(200).json(newPokemon);
    }catch{
        res.status(500).send(error.message);
    }
}

module.exports = {
    postPokemon,
}