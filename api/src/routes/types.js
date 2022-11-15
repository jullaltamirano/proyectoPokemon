const { Router } = require('express');
const { Pokemon , Type , pokemon_type } = require('../db.js')
const fetch = require("node-fetch");
const router = Router();


router.get('/', async (req,res) => {

    try {        
    const response = await fetch('https://pokeapi.co/api/v2/type')
    const data = await response.json()

    for (e of data.results) {
        const findType = await Type.findOne({where: {name: e.name}})
        if(findType) return res.json(await Type.findAll())
        await Type.create({name: e.name})
    }
    res.status(200).json(await Type.findAll());
        
    } catch (err) {}
})


module.exports = router;