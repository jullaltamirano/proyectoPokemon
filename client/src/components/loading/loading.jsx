import loading from '../../media/loading.mp4'
import s from './loading.module.css'

export default function Loading(){
    return (
        <div>
            <video autoPlay muted loop  className={s.video}>
                <source src={loading} type='video/mp4'/>
            </video>
        </div>
    )
}