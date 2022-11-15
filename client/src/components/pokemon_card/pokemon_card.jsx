import { Link } from 'react-router-dom'
import s from './pokemon_card.module.css'
import './types.css'

export default function PokemonCard({ id , img , name , types }) {
    return (
        <div className={s.card_container}>
            <Link to={`/pokemon/${id}`} className={s.h2}>
                <h2>{name}</h2>
            </Link>
            <img src={img} />
            <ul className={s.types}>
                {
                types?.map(e => {
                    return (
                        <div className={s.type_container}>
                            <div className={e.name}></div>
                            <li className={s.type_li}>{e.name}</li>
                        </div>
                    )
                })
                }
            </ul>
        </div>
    )
}