const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: {},
    types: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POKEMON':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'GET_ALL_TYPES':
            return {
                ...state,
                types: action.payload
            }

        case 'GET_POKEMON_DETAIL':
            return {
                ...state,
                pokemonDetail: action.payload
            }

        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemons: action.payload
            }

        case 'FILTER_POKEMON_CREATED':
            const allPokemons = state.allPokemons
            const filterPokemons = action.payload === 'created' ? allPokemons.filter(e => e.created) : allPokemons.filter(e => !e.created)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : filterPokemons
            }

        case 'FILTER_ASC_NAME':
            let arraySorted = action.payload === 'asc' ? state.pokemons.sort((a,b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : state.pokemons.sort((a,b) => {
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0})
            return {
                ...state,
                pokemons: arraySorted
            }

        case 'FILTER_BY_ATTACK':
            let arraySorted2 = action.payload === 'min' ? state.pokemons.sort((a,b) => {
                if(a.attack > b.attack) return 1
                if(a.attack < b.attack) return -1
                return 0
            }) : state.pokemons.sort((a,b) => {
                if(a.attack > b.attack) return -1
                if(a.attack < b.attack) return 1
                return 0
            })
            return {
                ...state,
                pokemons: arraySorted2
            }

        // case 'FILTER_STATUS':
        //     let arraySorted3 = action.payload === 'min' ? state.pokemons.sort((a,b) => {
        //         if(a[action.payload2] > b[action.payload2]) return 1
        //         if(a[action.payload2] < b[action.payload2]) return -1
        //         return 0
        //     }) : state.pokemons.sort((a,b) => {
        //         if(a[action.payload2] > b[action.payload2]) return -1
        //         if(a[action.payload2] < b[action.payload2]) return 1
        //         return 0
        //     })
        //     return {
        //         ...state,
        //         pokemons: arraySorted3
        //     }

        case 'EMPTY_POKEMON':
            return {
                ...state,
                pokemons: []
            }

        default: return state
    }
};

export default rootReducer;