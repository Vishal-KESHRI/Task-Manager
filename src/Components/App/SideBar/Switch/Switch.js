import React, {useState, useEffect} from 'react';
import {SwitchTheme} from '../../ReusableComponents';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.module.css';
import icons from './icons';

function Switch(){
    const lastTheme = JSON.parse(localStorage.getItem('theme'))
    const [turnSwitch, setTurnSwitch] = useState(lastTheme ? lastTheme : false);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.switchTheme);

    const handleSwitch = () => {
        setTurnSwitch(!turnSwitch);
    }

    useEffect(() => {
        setTurnSwitch(theme);
    }, [theme])


    useEffect(() => {
        const switchHandle = document.querySelector('.' + styles.handle)
        if(turnSwitch){
            switchHandle.style.left = '23px';
            SwitchTheme(true);
            dispatch({type: 'set theme', theme: true});
            localStorage.setItem('theme', true)
        }
        else{
            switchHandle.style.left = '';
            SwitchTheme(false);
            dispatch({type: 'set theme', theme: false});
            localStorage.setItem('theme', false);
        }
            
    }, [turnSwitch])


    return(
        <div className={styles.switchBox} >
            <img className={styles.themeIcon} src={icons['dayThemeIcon']}/>
            <div className={styles.switch} onClick={handleSwitch}>
                <div className={styles.handle}></div>
            </div>
            <img className={styles.themeIcon} src={icons['nightThemeIcon']}/> 
        </div>
    )
}

export default Switch;