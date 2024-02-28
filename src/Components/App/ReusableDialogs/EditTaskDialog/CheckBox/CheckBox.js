import React, {useState, useEffect, useRef, forwardRef, memo} from 'react';
import styles from './styles.module.css';

const CheckBox = forwardRef(({subtask, handleCompleted, index}, ref) =>  {
    const [checked, setChecked] = useState(subtask.completed);
    const labelText = useRef();

    const handleChange = () => {
        handleCompleted(!checked);
        setChecked(!checked);
    }

    useEffect(() => {
        if(checked){
            labelText.current.style.textDecoration = 'line-through';
            labelText.current.style.opacity = '0.5';
        }
        else {
            labelText.current.style.textDecoration = '';
            labelText.current.style.opacity = '';
        }
    }, [checked])

    return(
        <fieldset className={styles.inputContainer}>
            <input 
                type='checkbox' 
                className={styles.inputContainer_checkBoxes} 
                onChange={handleChange}
                checked={checked}
                ref={refInput => ref.current[index] = refInput}
                data-task={JSON.stringify(subtask)}
                />
            <label className={styles.inputContainer_label} ref={labelText}>
                {subtask.subtaskDesc}
            </label>
        </fieldset>
    )
})

export default memo(CheckBox);