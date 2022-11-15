import logo from '../../media/pokemon.png'
import lupa from '../../media/lupa.png'
import s from './nav.module.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getPokemonName } from '../../redux/actions'
import { Link } from 'react-router-dom'

export default function Nav(){

    const [ search , setSearch ] = useState('')
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)

    const onSearch = async (value) => {
        dispatch(getPokemonName(value))
        setSearch('')
    }

    return (
        <div className={s.searchBar}>
            <Link to='/pokemon'>
                <img src={logo} className={s.logo}/>
            </Link>
            <form onSubmit={e => {
                e.preventDefault()
                onSearch(search)
            }
            }>
                <input type='text' placeholder='Busca un pokemon...' value={search} onChange={e => setSearch(e.target.value)}/>
                <button type='submit' className={s.lupa}><img src={lupa}/></button>
            </form>
        </div>
    )
}