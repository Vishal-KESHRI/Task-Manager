import React, {useState, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import icons from './icons';

function EditOrDelete({handleDelete, handleEdit}) {
    const [open, setOpen] = useState(false);
    const popup = useRef();

    const handlePopup = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const popup = document.querySelector('.' + styles.popup);
        if(open)
            popup.style.display = 'flex';
        else
            popup.style.display = '';
            
    }, [open])

    useEffect(() => {
        const handleClick = (e) => {
            if(!e.target.matches('.' + styles.container) && !e.target.matches('.' + styles.threeDotsIcon) && 
                !e.target.matches('.' + styles.popup) && !e.target.matches('.' + styles.popup_option) && 
                !e.target.matches('.' + styles.clickArea))
                setOpen(false);
        }
        document.addEventListener('click', handleClick);
        
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.clickArea} onClick={handlePopup}>
                <img src={icons['threeDots']} className={styles.threeDotsIcon}/>                
            </div>

            <div className={styles.popup}>
                <button className={styles.popup_option} onClick={handleEdit}>
                    Edit Task
                </button>
                <button className={styles.popup_option} onClick={handleDelete} >
                    Delete Task
                </button>
            </div>
        </div>
    )
}

export default EditOrDelete;