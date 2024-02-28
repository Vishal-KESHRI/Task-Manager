import React, {useEffect, useState} from 'react';
import { useMediaQuery} from '@mui/material';
import { DisplayBoards, useLocalStorage} from '../../ReusableComponents';
import Switch from './Switch';
import { useSelector, useDispatch } from 'react-redux';
import icons from './icons';
import styles from './styles.module.css';

function MobileMenu({isMobile}) {
    const [open, setOpen] = useState(false);
    const showSidebar = useSelector(state => state.showSidebar);
    const currentBoard = useSelector(state => state.board);
    const dispatch = useDispatch();
    const tablet = useMediaQuery('(max-width: 1000px)');
    const boards = useLocalStorage('boards');

    const handleMobileMenu = () => {
        setOpen(!open);
    }

    const handleAddBoardDialog = () => {
        dispatch({type: 'set add board dialog', open: true});
    }

    //this will move the platform launch title to the right when the sidebar is visible
    useEffect(() => {
        const platformLaunchTitle = document.querySelector('.' + styles.header_kanban_title);
    
        if(showSidebar){
            if(tablet)
                platformLaunchTitle.style.left = '40px';
            else
                platformLaunchTitle.style.left = '80px';
        }
        else
            platformLaunchTitle.style.left = '' 
    
    }, [showSidebar, tablet])

    //i need this useEffect to dispatch something to the reducer because initially the store doesnt have a board when the app is first viewed in mobile
    useEffect(() => {
        if(boards.length)
            dispatch({type: 'set board', board: boards[0]});
    }, [])

    //this will open and close the mobile menu
    useEffect(() => {
        const popup = document.querySelector('.' + styles.overlay);
        const arrow = document.querySelector('.' + styles.arrowDown);

        if(open){
            arrow.style.transform = 'rotate(180deg)';
            popup.style.display = 'block';
            setTimeout(() => {                              //im using setTimout because its async, this way the animation created by the transition property wont be cancelled
                popup.style.opacity = '1';
            }, 1)
        }
        else{
            arrow.style.transform = '';
            popup.style.opacity = '';
            setTimeout(() => {
                popup.style.display = '';
            }, 200)
        }
    }, [open])

    //this will prevent any scrolling when the mobile menu is open
    useEffect(() => {
        const handleScroll = () => {
            window.scrollTo(0,0);
        }
        if(open)
            document.addEventListener('scroll', handleScroll);
        else
            document.removeEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [open])

    //this will close the mobile popup menu everytime there is a change in the state in the store, 
    //remember that in the sidebar component, the <DisplayBoards/> component gets in and out from the dom, 
    //which causes multiple renders and changes in state
    useEffect(() => {
        setOpen(false);
    }, [currentBoard])

    return(
        <>
            <h1 className={styles.header_kanban_title} onClick={isMobile ? handleMobileMenu : () => {}}>
                Platform Launch
                <img src={icons['arrowDown']} className={styles.arrowDown} style={isMobile ? {display: 'block'} : {display: ''}}/> 
            </h1>
            <div className={styles.overlay}>
                <div className={styles.mobilePopup}>
                    <DisplayBoards/>
                    <button className={styles.addBoardButton} onClick={handleAddBoardDialog}>
                        <img className={styles.iconBoard} src={icons['iconBoard']} alt='board icon'/>
                        + Create New Board
                    </button>
                    <Switch/>
                </div>
            </div>
        </>
    )
}

export default MobileMenu;