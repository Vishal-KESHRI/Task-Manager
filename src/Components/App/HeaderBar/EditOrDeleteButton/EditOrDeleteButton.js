import React, {useState, useEffect, useRef} from 'react';
import DeleteBoardDialog from './DeleteBoardDialog';
import EditBoardDialog from './EditBoardDialog';
import styles from './styles.module.css';
import icons from './icons';

function EditOrDeleteButton() {
    const [displayPopup, setDisplayPopup] = useState(false);
    const popup = useRef();

    const handlePopup = (e) => {
        setDisplayPopup(!displayPopup);
    }

    useEffect(() => {
        const popupElement = document.querySelector('.' + styles.selectBox_popup);
        if(displayPopup)
            popupElement.style.display = 'flex';
        else
            popupElement.style.display = '';

    }, [displayPopup])

    useEffect(() => {
        const handleClick = (e) => {
            if(!e.target.matches('.' + styles.selectBox) && !e.target.matches('.' + styles.selectBox_threeDots_button) && 
               !e.target.matches('.' + styles.selectBox_popup) && !e.target.matches('.' + styles.selectBox_popup_option) && 
               !e.target.matches('.' + styles.clickArea))
                    setDisplayPopup(false);
        }
        if(displayPopup)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [displayPopup])

    return(
        <section className={styles.selectBox}>
            <div className={styles.clickArea} onClick={handlePopup}>
                <img 
                    src={icons['threeDots']} 
                    className={styles.selectBox_threeDots_button} 
                    />                
            </div>

            <div className={styles.selectBox_popup} ref={popup}>
                <EditBoardDialog/>
                <DeleteBoardDialog />
            </div>
        </section>                

    )
}

export default EditOrDeleteButton;