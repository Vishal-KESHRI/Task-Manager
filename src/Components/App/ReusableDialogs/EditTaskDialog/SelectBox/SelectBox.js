import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {useSelector} from 'react-redux';
import styles from './styles.module.css';
import icons from './icons';

const SelectBox = forwardRef(({currentColumn}, ref) => {
    const selectedBoard = useSelector(state => state.board);
    const [option, setOption] = useState(currentColumn);
    const [openPopup, setOpenPopup] = useState(false);

    const handlePopup = () => {
        setOpenPopup(!openPopup);
    }

    const handleOption = (e) => {
        const optionChoosen = e.target.getAttribute('data-option');
        setOption(optionChoosen);
        setOpenPopup(false);
    }

    useEffect(() => {
        const popup = document.querySelector('.' + styles.selectBox_popup);
        const arrowRef = document.querySelector('.' + styles.arrowDown);

        if(openPopup){
            popup.style.display = 'flex';
            arrowRef.style.transform = 'rotate(180deg)';
        }
        else{
            popup.style.display = '';
            arrowRef.style.transform = '';
        }
    }, [openPopup])


    useImperativeHandle(ref, () => ({
        get state() {
            return option;
        }
    }))  


    return(
        <section className={styles.selectBox}>
            <h4 className={styles.selectBox_label}>
                Current Status
            </h4>
            <div className={styles.selectBox_select} onClick={handlePopup}>
                {option}
                <img className={styles.arrowDown} src={icons['arrowDown']}/>
            </div>
            <div className={styles.selectBox_popup}>
                {selectedBoard ? selectedBoard.columns.map((column, i) => {
                    return(
                        <div className={styles.selectBox_option} key={i} onClick={handleOption} data-option={column.columnTitle}>
                            {column.columnTitle}
                        </div>
                    )
                }) : <></>}
            </div>
        </section>
    )
})

export default SelectBox;