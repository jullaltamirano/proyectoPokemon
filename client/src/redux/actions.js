import axios from 'axios'

export const getAllPokemon = () => {
    return async function(dispatch){
        const response = await fetch('http://localhost:3001/pokemons')
        const data = await response.json()
        return dispatch({type: 'GET_ALL_POKEMON', payload: data})
    }
}

export const getAllTypes = () => {
    return async function(dispatch){
        const response = await fetch('http://localhost:3001/types')
        const data = await response.json()
        return dispatch({type: 'GET_ALL_TYPES', payload:data})
    }
}

export const getPokemonDetail = (id) => {
    return async function(dispatch){
        const response = await fetch(`http://localhost:3001/pokemons/${id}`)
        const data = await response.json()
        return dispatch({type: 'GET_POKEMON_DETAIL', payload: data})
    }
}

export const getPokemonName = (name) => {
    return async function(dispatch){
        try {
            const response = await fetch(`http://localhost:3001/pokemons?name=${name}`)
            const data = await response.json()
            return dispatch({type: 'GET_POKEMON_NAME', payload: data})
        } catch (err) {
            console.log(err)
        }
        
    }
}

export const filterPokemonByCreated = (data) => {
    return {
        type: 'FILTER_POKEMON_CREATED',
        payload: data
    }
}

export const filterAscName = (data)=> {
    return {
        type: 'FILTER_ASC_NAME',
        payload: data
    }
}

export const filterByAttack = (data) => {
    return {
        type: 'FILTER_BY_ATTACK',
        payload: data
    }
}

// export const filterPokeByType = (data) => {
//     return {
//         type: 'FILTER_POKEMON_TYPE',
//         payload: data
//     }
// }

export const createPokemon = (data) => {
    return async function(dispatch){
        try {
            const response = await axios.post(`http://localhost:3001/pokemons`, data)
            console.log(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
    
}

export const emptyPokemon = (data) => {
    return {
        type: 'EMPTY_POKEMON',
        payload: data
    }
}

export const emptyPokemonDetail = (data) => {
    return {
        type: 'EMPTY_POKEMON_DETAIL',
        payload: data
    }
}

// export const filterByStatus = (data1, data2) => {
//     return {
//         type: 'FILTER_STATUS',
//         payload: data1,
//         payload2: data2,
//     }
// }