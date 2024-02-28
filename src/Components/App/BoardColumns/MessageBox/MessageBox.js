import React from 'react';
import styles from './styles.module.css';

function MessageBox({message, buttonText, handler}) {
    return(
        <div className={styles.messageBox}>
            <h2 className={styles.messageBox_message}>
                {message}
            </h2>
            <button className={styles.messageBox_addButton} onClick={handler}>
                {buttonText}
            </button>
        </div> 
    )
}

export default MessageBox;