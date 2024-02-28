import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import styles from './styles.module.css';

const ColumnNameInput = forwardRef((props, ref) => {
    const [text, setText] = useState('');
    const emptyMessage = useRef();
    const input = useRef()

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleClick = (e) => {
        e.target.setCustomValidity('')
        input.current.style.border = '';
        emptyMessage.current.style.display = '';
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();

        if(isValid){
            input.current.style.border = '';
            emptyMessage.current.style.display = '';
        }
        else{
            e.target.setCustomValidity(' ')
            input.current.style.border = '1px solid #EA5555';
            emptyMessage.current.style.display = 'block';
        }
    }

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ')
        input.current.style.border = '1px solid #EA5555';
        emptyMessage.current.style.display = 'block';
    }

    useImperativeHandle(ref, () => ({
        get state() {
            return {columnTitle: text, tasks: []}
        }
    }))


    return(
        <section className={styles.inputContainer}>
            <label className={styles.inputContainer_title} htmlFor={'newBoardName'}>
                Choose a name for the column
            </label>
            <fieldset className={styles.inputContainer_fieldset}>
                <input 
                    type='text' 
                    className={styles.inputContainer_input}
                    value={text}
                    onClick={handleClick}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInvalid={handleInvalid}
                    ref={input}
                    id='newBoardName'
                    required
                    />
                <div className={styles.inputContainer_emptyMessage} ref={emptyMessage}>
                    Can't be empty
                </div>                
            </fieldset>

        </section>

        )
})

export default ColumnNameInput;