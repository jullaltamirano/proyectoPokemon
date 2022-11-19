import { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { getAllTypes , createPokemon } from '../../redux/actions'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import s from './pokemon_create.module.css'
import profesor from '../../media/profesor_oak.png'

export default function PokemonCreate() {

    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    const history = useHistory()

    useEffect(() =>  {
        dispatch(getAllTypes())
    }, [])

    const [ errors , setErrors ] = useState({})

    const [ values , setValues ] = useState({
        name: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        sprite: '',
        types: []
    })

    const validate = (values) => {
        let error = {}
        if(!values.name) error.name = 'Name is required';
        if(values.hp < 0 || !typeof values.hp === 'number' ) error.hp = 'Must be equal to or greather than 0'
        if(values.attack < 0) error.attack = 'Must be equal to or greather than 0'
        if(values.defense < 0) error.defense = 'Must be equal to or greather than 0'
        if(values.speed < 0) error.speed = 'Must be equal to or greather than 0'
        if(values.height < 0) error.height = 'Must be equal to or greather than 0'
        if(values.weight < 0) error.weight = 'Must be equal to or greather than 0'
        // if(values.types.length > 1) error.types = 'Choose only 2 types'

        return error
    } //  Funcion de validación del input

    const handleInputChange = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...values,
            [e.target.name]: e.target.value
        }))        
        if(errors.name){
            setEnable(true)
        } else {
            setEnable(false)
        }
    } //  Funcion que actualiza el estado local según la data que se ingresa

    const handleCheck = (e) => {
        if(values.types.includes(e.target.value)){
        let typesFilter = values.types.filter(t => t !== e.target.value)
        setValues({
            ...values,
            types: typesFilter
        })
        } else {            
            setValues({
                ...values,
                types: [...values.types, e.target.name]
            })
        }
    } //  Funcion que va añadiendo los types que se van seleccionando y retira los que se les quita el checked

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        dispatch(createPokemon(values))
        setValues({
            name: '',
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            sprite: '',
            types: []
        })
        alert('Pokemon creado con exito')
        history.push('/pokemon')
    } //  Funcion que envia los values por POST

    const [ enable , setEnable ] = useState(true)

    return (
        <div className={s.container}>
            <img className={s.background} src='https://pm1.narvii.com/6885/f08feb15fa40fa239f5632e92c64c894c932470dr4-521-261_00.jpg' alt=''/>
            <Link to='/pokemon'>
                <button>Back to Home</button>
            </Link>
            <div className={s.form_container}>
                <img src={profesor} alt=''/>
                <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.title}>
                        <span>CREATE A POKEMON</span>
                    </div>
                    <div className={s.stats}>
                        <div className={s.types_stats}>
                            <div className={s.input_container}>
                                <label htmlFor='name'>Name:*</label>
                                <input type='text' value={values.name} name='name' onChange={e => handleInputChange(e)} placeholder='Insert a name...'></input>
                                {errors.name && (<p className={s.error}>{errors.name}*</p>)}
                            </div>
                            <div className={s.input_container}>
                                <label htmlFor='hp'>HP:</label>
                                <input type='number' value={values.hp} name='hp' onChange={e => handleInputChange(e)}></input>
                                {errors.hp && (<p className={s.error}>{errors.hp}</p>)}
                            </div>
                            <div className={s.input_container}>
                                <label htmlFor='attack'>Attack:</label>
                                <input type='number' value={values.attack} name='attack' onChange={e => handleInputChange(e)}></input>
                                {errors.attack && (<p className={s.error}>{errors.attack}</p>)}
                            </div>
                            <div className={s.input_container}>
                                <label htmlFor='defense'>Defense:</label>
                                <input type='number' value={values.defense} name='defense' onChange={e => handleInputChange(e)}></input>
                                {errors.defense && (<p className={s.error}>{errors.defense}</p>)}
                            </div>
                        </div>
                        <div className={s.types_stats}>
                            <div className={s.input_container}>
                                <label htmlFor='speed'>Speed:</label>
                                <input type='number' value={values.speed} name='speed' onChange={e => handleInputChange(e)}></input>
                                {errors.speed && (<p className={s.error}>{errors.speed}</p>)}
                            </div>
                            <div className={s.input_container}>
                                <label htmlFor='height'>Height:</label>
                                <input type='number' value={values.height} name='height' onChange={e => handleInputChange(e)}></input>
                                {errors.height && (<p className={s.error}>{errors.height}</p>)}
                            </div>
                            <div className={s.input_container}>
                                <label htmlFor='weight'>Weight:</label>
                                <input type='number' value={values.weight} name='weight' onChange={e => handleInputChange(e)}></input>
                                {errors.weight && (<p className={s.error}>{errors.weight}</p>)}
                            </div>
                            <div className={s.input_container}>
                                <label htmlFor='sprite'>Image:</label>
                                <input type='text' value={values.image} name='sprite' onChange={e => handleInputChange(e)} placeholder='Insert an url...'></input>
                            </div>
                        </div>
                    </div>
                    <div className={s.types_container}>
                        <div className={s.types_list}>
                        {types?.slice(0,Math.floor(types.length / 3)+1).map(e => {
                            return (
                                <label className={s.type}>                                    
                                    <input type='checkbox' name={e.name} value={e.name} onChange={(e) => handleCheck(e)} />
                                    <div className={e.name}></div>
                                    {e.name}
                                </label>
                            )
                        })}
                        </div>
                        <div className={s.types_list}>
                        {types?.slice(Math.floor(types.length / 3)+1, Math.ceil(types.length / 3)*2).map(e => {
                            return (
                                <label className={s.type}>                                    
                                    <input type='checkbox' name={e.name} value={e.name} onChange={(e) => handleCheck(e)} />
                                    <div className={e.name}></div>
                                    {e.name}
                                </label>
                            )
                        })}
                        </div>
                        <div className={s.types_list}>
                        {types?.slice(Math.ceil(types.length / 3)*2).map(e => {
                            return (
                                <label className={s.type}>                                    
                                    <input type='checkbox' name={e.name} value={e.name} onChange={(e) => handleCheck(e)} />
                                    <div className={e.name}></div>
                                    {e.name}
                                </label>
                            )
                        })}
                        </div>
                    </div>
                    <br></br>
                    <div className={s.submit}>
                        <button disabled={enable} type='submit' >SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}