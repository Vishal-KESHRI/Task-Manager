import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import styles from './styles.module.css';

const BoardNameInput = forwardRef((props, ref) => {
    const [boardName, setBoardName] = useState('');
    const emptyMessage = useRef();
    const input = useRef();

    const handleBoardName = (e) => {
        setBoardName(e.target.value);
        input.current.setCustomValidity('');             //removing the invalid state of the input element
        emptyMessage.current.style.display = '';
        input.current.style.border = '';
    }


    const handleInvalid = () => {
        input.current.setCustomValidity(" ");            //removing the default popup for invalid inputs            //trying to ficure out why the default popup is not being removed
        emptyMessage.current.style.display = 'block';
        input.current.style.border = '1px solid #EA5555';
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(isValid){
            emptyMessage.current.style.display = '';
            input.current.style.border = '';
            input.current.setCustomValidity('');
        }
        else {
            emptyMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EA5555';
            input.current.setCustomValidity(' ');
        }
    }

    useImperativeHandle(ref, () => ({
        get state(){
            return boardName;
        }
    }))

    return (                    
        <fieldset className={styles.input_container}>
            <label className={styles.input_label} htmlFor='boardName'>
                Board Name
            </label>
            <input 
                type='text'
                className={styles.input} 
                placeholder='e.g Web Design'
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                value={boardName}
                onChange={handleBoardName}
                id='boardName'
                ref={input}
                required
                />
                <div className={styles.emptyMessage} ref={emptyMessage}>
                    Can't be empty
                </div>
        </fieldset>
    )
})

export default BoardNameInput;