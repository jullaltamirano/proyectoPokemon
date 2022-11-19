import logo from '../../media/pokemon.png'
import lupa from '../../media/lupa.png'
import s from './nav.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonName } from '../../redux/actions'
import { Link } from 'react-router-dom'

export default function Nav(){

    const [ search , setSearch ] = useState('')
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)

    const handleInputChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPokemonName(search))
        setSearch('')
    }

    return (
        <div className={s.searchBar}>
            <Link to='/pokemon'>
                <img src={logo} className={s.logo}/>
            </Link>
            <form onSubmit={e => {handleSubmit(e)}}
            className={s.form}>
                <input className={s.input_search} type='text' placeholder='Busca un pokemon...' value={search} onChange={e => handleInputChange(e)}/>
                <button type='submit' className={s.lupa}><img src={lupa}/></button>
            </form>
        </div>
    )
}