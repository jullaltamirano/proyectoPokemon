import s from './pagination.module.css'

export default function Paginado({ pokesPerPage , allPokemons , pagination }) {
    let pageButtons = []

    for(let i = 1; i <= Math.ceil(allPokemons.length/pokesPerPage); i++){
        pageButtons.push(i)
    }

    return(
        <div className={s.pagination_container}>
            {pageButtons?.map(e => {
                return (
                    <a key={e} className={s.page_button} onClick={() => pagination(e)}>{e}</a>
                    )
                })}
        </div>
    )
}