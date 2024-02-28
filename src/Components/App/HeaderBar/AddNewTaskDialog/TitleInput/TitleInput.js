import React, {useState, useEffect,forwardRef, useImperativeHandle, useRef, memo} from 'react';
import styles from './styles.module.css';

const TitleInput = forwardRef((props, ref) => {
    const [text, setText] = useState('');
    const emptyMessage = useRef();
    const input = useRef();

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(isValid){
            e.target.setCustomValidity('');
            emptyMessage.current.style.display = '';
            input.current.style.border = ''
        }
        else{
            e.target.setCustomValidity(' ');
            emptyMessage.current.style.display = 'block';
            input.current.style.border = '1px solid #EA5555'
        }
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        emptyMessage.current.style.display = 'block';
        input.current.style.border = '1px solid #EA5555'
    }

    useEffect(() => {
        const inputElement = document.querySelector('.' + styles.inputContainer_input);
        const emptyMessage = document.querySelector('.' + styles.emptyMessage);
        inputElement.setCustomValidity('');
        emptyMessage.style.display = '';
        inputElement.style.border = '';
    }, [text])


    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        }
    }))

    return(
        <fieldset className={styles.inputContainer}>
            <label className={styles.inputContainer_label}>
                Title
            </label>
            <input 
                type='text' 
                value={text}
                onBlur={handleBlur}
                onInvalid={handleInvalid}
                onChange={handleChange}
                className={styles.inputContainer_input} 
                placeholder='e.g Take coffee break'
                ref={input}
                required
            />
            <div className={styles.emptyMessage} ref={emptyMessage}>
                Can't be empty
            </div>
        </fieldset>)
})

export default memo(TitleInput);