import React, {useState, useRef, useEffect, forwardRef, useImperativeHandle, memo} from 'react';
import {useSelector} from 'react-redux';
import styles from './styles.module.css';
import icons from './icons';

const StatusSelectBox = forwardRef((props, ref) => {
    const board = useSelector(state => state.board);    
    const [option, setOption] = useState(board ? board.columns[0].columnTitle : '');
    const [openPopup, setOpenPopup] = useState(false);
    const arrowRef = useRef();
    const popup = useRef();

    const handleClick = () => {
        setOpenPopup(!openPopup);
    }

    const handleOption = (e) => {
        const choosenOption = e.target.getAttribute('data-option');
        setOption(choosenOption);
    }

    useEffect(() => {
        const arrow = document.querySelector('.' + styles.select_box_arrow);
        if(openPopup)
            arrow.style.transform = 'rotate(180deg)';
        else    
            arrow.style.transform = '';
    }, [openPopup])

//this will make the popup appear when the user clicks on the select box
    useEffect(() => {
        const popup = document.querySelector('.' + styles.select_popup);
        if(openPopup)
            popup.style.display = 'flex';
        else
            popup.style.display = '';
    }, [openPopup])

//this will scroll down automatically when the popup appears
    useEffect(() => {
        const dialogContent = document.querySelector('.MuiDialogContent-root');

        if(openPopup)
            dialogContent.scrollTo(0, dialogContent.scrollHeight);

    }, [openPopup])

//adding an event listener that will close the popup when the user clicks on anything BUT the popup
    useEffect(() => {
        const handleClick = (e) => {
            if(!e.target.matches('.' + styles.select_popup) && 
               !e.target.matches('.' + styles.select_box))
                setOpenPopup(false);
        }

        if(openPopup)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [openPopup])

    useImperativeHandle(ref, () => ({
        get state(){
            return option;
        }
    }))

    return(
        <section className={styles.select}>
            <h5 className={styles.select_title}>
                Status
            </h5>
            <div className={styles.select_box} onClick={handleClick}>
                {option}
                <img src={icons['arrow']} className={styles.select_box_arrow} ref={arrowRef}/>
            </div>
            <div className={styles.select_popup} ref={popup}>
                {board ? board.columns.map((column, i) => {
                        return(
                            <button type='button' className={styles.select_popup_option} onClick={handleOption} data-option={column.columnTitle} key={i}>
                                {column.columnTitle}
                            </button>
                        )
                    })
                : <></>}
            </div>
        </section>
    )
})

export default memo(StatusSelectBox);