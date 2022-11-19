import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPokemonDetail , emptyPokemonDetail } from '../../redux/actions'
import Loading from '../loading/loading'

export default function PokemonDetail(){

    const { id } = useParams()
    const dispatch = useDispatch()    
    const pokemonDetail = useSelector((state) => state.pokemonDetail)    

    useEffect(() => {
        dispatch(emptyPokemonDetail())
        dispatch(getPokemonDetail(id))
    },[])

    if(Object.keys(pokemonDetail).length === 0){
        return (
            <div>
                <Loading />
            </div>
        )
    } else {
        return(
            <div>
            <div>
                <span>{`N°. ${pokemonDetail.id}`}</span>
                <img src={pokemonDetail.sprite}/>
                <h3>{pokemonDetail.name}</h3>
            </div>
            <div>
                <div>
                    <span>PROFILE</span>
                    <span>TYPE</span>
                    <ul>
                        {pokemonDetail.types?.map(e => {
                            return (
                                <li>{e.name}</li>
                                )
                            })}
                    </ul>
                </div>
                <div>
                    <span>STATS</span>
                    <ul>
                        <li>{`HP: ${pokemonDetail.hp}`}</li>
                        <li>{`ATTACK: ${pokemonDetail.attack}`}</li>
                        <li>{`DEFENSE: ${pokemonDetail.defense}`}</li>
                        <li>{`SPEED: ${pokemonDetail.speed}`}</li>
                        <li>{`HEIGHT: ${pokemonDetail.height}`}</li>
                        <li>{`WEIGHT: ${pokemonDetail.weight}`}</li>
                    </ul>
                </div>
            </div>            
        </div>
    )
}
}