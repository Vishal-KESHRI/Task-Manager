import React, {useRef, useState, useEffect} from 'react';
import { useMediaQuery } from '@mui/material';
import styles from './styles.module.css';
import HideShowIcon from './HideShowIcon';
import Switch from './Switch';
import {DisplayBoards} from '../ReusableComponents';
import {useDispatch, useSelector} from 'react-redux';
import icons from './icons';

function SideBar() {
    const dispatch = useDispatch();
    const [showSidebar, setShowSidebar] = useState(true);
    const mobile = useMediaQuery('(max-width: 780px)');
    const theme = useSelector(state => state.switchTheme);
    const hideShowIconRef = useRef();
    const displaySidebarButton = useRef();

    const handleEnter = () => {
        hideShowIconRef.current.style.fill = '#635FC7';
    }

    const handleLeave = () => {
        hideShowIconRef.current.style.fill = '';
    }

    const handleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const handleDialog = () => {
        dispatch({type: 'set add board dialog', open: true});
    }

    useEffect(() => {
        if(mobile)
            setShowSidebar(false);
    }, [mobile])


//this will make the sidebar move to the left and out of the screen
    useEffect(() => {
        const sidebar = document.querySelector('.' + styles.sidebar);

        if(showSidebar)
            sidebar.style.left = '';
        else
            sidebar.style.left = '-300px';        
    }, [showSidebar])

//this will dispatch an action to the reducer, telling all components that the sidebar is hidden or visible
    useEffect(() => {
        dispatch({type: 'set sidebar', show: showSidebar});
    }, [showSidebar])


    return(
        <>
            <aside className={styles.sidebar}>
                <section className={styles.sidebar_top}>
                    <img className={styles.sidebar_logo} src={theme ? icons['logoDark'] : icons['logoLight']}/>
                    <div className={styles.sidebar_boards}>
                        {mobile ? <></> : <DisplayBoards/>}
                        <button className={styles.sidebar_addBoardButton} onClick={handleDialog}>
                            <svg className={styles.iconContainer} width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                <path className={styles.icon} d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
                            </svg>        
                            +Create New Board
                        </button>
                    </div>                 
                </section>
                <section className={styles.sidebar_bottom}>
                    <Switch/>
                    <button 
                        className={styles.sidebar_hideShowButton} 
                        onMouseEnter={handleEnter} 
                        onMouseLeave={handleLeave} 
                        onClick={handleSidebar}> 
                            <HideShowIcon display={true} ref={hideShowIconRef}/>
                            Hide Sidebar
                    </button>
                </section>
            </aside>    
            {showSidebar ? 
                <></> : 
                <button className={styles.visibilityButton} onClick={handleSidebar} ref={displaySidebarButton} style={mobile ? {display: 'none'} : {}}>
                    <img src={icons['showIcon']} className={styles.visibilityButton_icon}/>
                </button>
            }
        </>

    )
}

export default SideBar;