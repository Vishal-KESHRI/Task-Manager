import React, {useState, useRef, forwardRef, useImperativeHandle, memo} from 'react';
import {useSelector} from 'react-redux';
import styles from './styles.module.css';

const BoardNameInput = forwardRef((props, ref) => {
    const board = useSelector(state => state.board);    
    const [text, setText] = useState(board ? board.boardName : '');             //in case board is null
    const input = useRef();
    const emptyMessage = useRef();

    const handleChange = (e) => {
        setText(e.target.value);
        input.current.setCustomValidity('');
        input.current.style.border = '';
        emptyMessage.current.style.display = '' ;
    }

    const handleBlur = () => {
        const isValid = input.current.checkValidity('');

        if(isValid){
            input.current.setCustomValidity('');
            input.current.style.border = '';
            emptyMessage.current.style.display = '' ;
        }
        else{
            input.current.setCustomValidity(' ');
            input.current.style.border = '1px solid #EA5555';
            emptyMessage.current.style.display = 'block' 
        }
    }

    const handleInvalid = () => {
        input.current.setCustomValidity(' ');
        input.current.style.border = '1px solid #EA5555';
        emptyMessage.current.style.display = 'block' 
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        }
    }))

    return(                        
        <fieldset className={styles.inputContainer}>
            <label className={styles.inputContainer_label}>
                Board Name
            </label>   
            <input 
                type='text' 
                className={styles.inputContainer_input}
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                ref={input}
                required
                />      
            <div className={styles.emptyMessage} ref={emptyMessage}>
                Can't be empty
            </div>                   
        </fieldset>
    )
})

export default memo(BoardNameInput);