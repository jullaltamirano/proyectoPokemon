import { Link } from 'react-router-dom';
import s from './landing_page.module.css';

export default function LandingPage(){

    return (
        <div className={s.background}>
            <Link to='/pokemon' className={s.button_link}>
                <button className={s.button}><span id='#button_text'>PRESS START</span></button>
            </Link>
        </div>
    )
}
