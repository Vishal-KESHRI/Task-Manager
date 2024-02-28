import React, {useState, useRef, useEffect, forwardRef, useImperativeHandle, memo} from 'react';
import styles from './styles.module.css';

const DescriptionInput = forwardRef((props, ref) => {
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
        const inputElement = document.querySelector('.' + styles.inputContainer_textarea);
        const emptyMessage = document.querySelector('.' + styles.emptyMessage);
        inputElement.setCustomValidity('');
        emptyMessage.style.display = '';
        inputElement.style.border = ''
    }, [text])

    useImperativeHandle(ref, () => ({
        get state() {
            return text;
        }
    }))

    return(                    
        <fieldset className={styles.inputContainer}>
            <label className={styles.inputContainer_label}>
                Description
            </label>
            <textarea 
                type='text' 
                value={text}
                onInvalid={handleInvalid}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.inputContainer_textarea} 
                placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
                ref={input}
                required
            />
            <div className={styles.emptyMessage} ref={emptyMessage}>
                Can't be empty
            </div>
        </fieldset>
    )
})

export default memo(DescriptionInput);