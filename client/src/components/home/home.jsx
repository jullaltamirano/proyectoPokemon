import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../pokemon_card/pokemon_card";
import { getAllPokemon , filterPokemonByCreated , filterAscName , filterByAttack , emptyPokemon , filterByStatus , getAllTypes } from "../../redux/actions";
import s from './home.module.css'
import Loading from "../loading/loading";
import Paginado from "../pagination/pagination";
import { Link } from "react-router-dom";

export default function Home() {

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const types = useSelector(state => state.types)

    const [ sort , setSort ] = useState('')  // Estado local creado para renderizar cuando se ordene.
 
    useEffect(() => {
        dispatch(getAllTypes())
        dispatch(getAllPokemon())        
    },[dispatch])

    //! Paginado


    let [currentPage, setCurrentPage] = useState(1)
    let pokesPerPage = 12
    let lastIndex = currentPage*pokesPerPage
    let firstIndex = lastIndex-pokesPerPage
    let currentPokes = allPokemons?.slice(firstIndex,lastIndex)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //!

    const handleClick = (e) => {        
        e.preventDefault();
        dispatch(emptyPokemon())
        dispatch(getAllPokemon())
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterPokemonByCreated(e.target.value))
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(filterAscName(e.target.value))
        setCurrentPage(1);
        setSort(`${e.target.value}`)
    }

    const handleSortAttack = (e) => {
        e.preventDefault();
        dispatch(filterByAttack(e.target.value))
        setCurrentPage(1);
        setSort(`${e.target.value}`)
    }

    // const [value1 , setValue1 ] = useState('') 

    const handleSortAll = (e) => {
        e.preventDefault();
        dispatch(filterByAttack(e.target.value))
        setCurrentPage(1);
        setSort(`${e.target.value}`)
    }

    if(!allPokemons.length){
        return (
            <div className={s.loading_container}>
                <Loading />
            </div>
        )
    } else {
        return (
            <div className={s.home_container}>
                <div className={s.button_load_container}>
                    <button onClick={(e) => handleClick(e)}>Load all Pokemon</button>
                    <Link to='/create'>
                        <button  className={s.create}>Create a Pokemon</button>
                    </Link>
                </div>
                <div className={s.select_container}>
                    <div className={s.select}>
                        <span>By Alphabetical Order</span>
                        <select  onChange={(e) => handleSort(e)}>
                            <option disabled selected defaultValue>Choose an option</option>
                            <option value='asc'>Ascendent</option>
                            <option value='desc'>Descendent</option>
                        </select>
                    </div>
                    <div className={s.select}>
                        <span>By Exists or Created</span>
                        <select onChange={(e) => handleFilterCreated(e)}>
                            <option value='all'>All</option>
                            <option value='exists'>Exists</option>
                            <option value='created'>Created</option>
                        </select>
                    </div>
                    {/* <select onChange={(e) => setValue1(e.target.value)}>
                        <option value='hp'>HP</option>
                        <option value='attack'>Attack</option>
                        <option value='defense'>Defense</option>
                        <option value='speed'>Speed</option>
                        <option value='height'>Height</option>
                        <option value='weight'>Weight</option>
                    </select> */}
                    <div className={s.select}>
                        <span>By Attack</span>
                        <select onChange={(e) => handleSortAll(e)}>
                            <option disabled selected defaultValue>Choose an option</option>
                            <option value='min'>Min to Max</option>
                            <option value='max'>Max to Min</option>
                        </select>
                    </div>
                </div>               
                <Paginado pokesPerPage={pokesPerPage} allPokemons={allPokemons} pagination={pagination}/>
                <div className={s.pokemoncard_container}>
                    {currentPokes?.map(e => {
                        return(
                            <PokemonCard 
                                key={e.id} 
                                id={e.id} 
                                img={e.sprite} 
                                name={e.name} 
                                types={e.types} 
                            />
                            )
                        })}
                </div>
            </div>
        )
    }

    
}