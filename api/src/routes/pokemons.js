const { Router } = require("express");
const { Pokemon, Type, pokemon_type } = require("../db.js");
const fetch = require("node-fetch");
const router = Router();

const getPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')    
    const data = await response.json()
    const response1 = await fetch(data.next)
    const data1 = await response1.json()

    let poke40 = [...data.results, ...data1.results]
    let dataPokemon = []

    for(let i = 0; i < poke40.length; i++){
            const pokemon = await fetch(poke40[i].url);
            const infoPokemon = await pokemon.json();

            dataPokemon.push({
                id: infoPokemon.id,
                types: infoPokemon.types.map(e => {
                    return {name: e.type.name}
                }),
                name: infoPokemon.name,
                sprite: infoPokemon.sprites.other['official-artwork'].front_default,               
                hp: infoPokemon.stats[0].base_stat,
                attack: infoPokemon.stats[1].base_stat,
                defense: infoPokemon.stats[2].base_stat,
                speed: infoPokemon.stats[5].base_stat,
                height: infoPokemon.height,
                weight: infoPokemon.weight
            })
    }                    
    return dataPokemon
}

const getDbPokemon = async() => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getPokemonByName = async (name) => {

    try {        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        const data = await response.json()

        let uniquePokemon = [{
            id: data.id,
            types: data.types.map(e => {
                return {name: e.type.name}
            }),
            name: data.name,
            sprite: data.sprites.other['official-artwork'].front_default,               
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight
        }]

        return uniquePokemon
    } catch (err) {
        return new TypeError('No se encontro el Pokemon')
    }
}

const getAll = async() => {
    const apiInfo = await getPokemon();
    const dbInfo = await getDbPokemon();
    const infoTotal = [...apiInfo, ...dbInfo]

    return infoTotal
}

const getPokemonByID = async (id) => {

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
    
        let findPoke = {
            id: data.id,
            types: data.types.map(e => {
                return {name: e.type.name}
            }),
            name: data.name,
            sprite: data.sprites.other['official-artwork'].front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight
        }

        return findPoke
        
    } catch (err) {
        return new TypeError(`No existe Pokemon con el id:${id}`)
    }        
}

router.get('/', async (req,res) => {

    const { name } = req.query
    
    if(name){
        let uniquePokemon = await getPokemonByName(name)
        Object.keys(uniquePokemon).length ? 
        res.status(200).json(uniquePokemon) :
        res.status(404).send('No se encontró el Pokemon')
    } else{
        let totalPokemon = await getAll()
        res.status(200).json(totalPokemon)
    }
})

router.get('/:id', async (req,res) => {

    const { id } = req.params
    try {        
        let allPokes = await getAll()
        let findPoke = await allPokes.find(e => e.id == id)
            
        Object.keys(findPoke).length ? 
        res.status(200).json(findPoke) :
        res.status(404).send(`No existe ningun Pokemon con el id:${id}`)
    } catch (err) {
        console.log(err)
    }
        
})

router.post('/', async (req,res) => {

    let {name,hp,attack,defense,speed,height,weight,sprite,types} = req.body

    let newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        sprite
    })

    let typesDb = await Type.findAll({
        where: {name: types}
    })

    newPokemon.addType(typesDb)
    res.send('Pokemon creado con exito')
})

module.exports = router;
