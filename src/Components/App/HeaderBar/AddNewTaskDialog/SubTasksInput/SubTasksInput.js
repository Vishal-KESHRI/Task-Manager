import React, {forwardRef, useImperativeHandle, memo} from 'react';
import styles from './styles.module.css';


const SubTasksInput = forwardRef((props, ref) => {

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();
        const emptyMessage = e.target.nextElementSibling;
        const input = e.target;

        if(isValid){
            input.setCustomValidity('');
            emptyMessage.style.display = '';
            input.style.border = '';
        }
        else {
            input.setCustomValidity(' ');
            emptyMessage.style.display = 'block'
            input.style.border = '1px solid #EA5555';
        }   
    }

    const handleClick = (e) => {
        e.target.setCustomValidity('');
        const emptyMessage = e.target.nextElementSibling;
        const input = e.target;
        emptyMessage.style.display = '';
        input.style.border = '';
    }

    const handleInvalid = (e) => {
        const emptyMessage = e.target.nextElementSibling;
        const input = e.target;

        input.setCustomValidity(' ');
        emptyMessage.style.display = 'block'
        input.style.border = '1px solid #EA5555';
    }

    const handleDelete = (e) => {
        const subtask = e.target.parentElement;
        subtask.remove();
    }

    const handleAddSubtask = () => {
        const allSubtasks = document.querySelector('.' + styles.inputContainer_subtasks);
        const newInputContainer = document.createElement('div');
        const newFieldset = document.createElement('fieldset');
        const newInput = document.createElement('input');
        const newCloseIcon = document.createElement('div');
        const emptyMessage = document.createElement('div');

        newInputContainer.setAttribute('class', styles.inputContainer_subtask);
        newCloseIcon.setAttribute('class', styles.inputContainer_subtask_closeIcon)
        newCloseIcon.addEventListener('click', handleDelete);
        newFieldset.setAttribute('class', styles.fieldset)
        newInput.setAttribute('class', styles.inputContainer_subtask_input);
        newInput.setAttribute('required', '');
        newInput.setAttribute('type', 'text');
        newInput.addEventListener('blur', handleBlur);
        newInput.addEventListener('invalid', handleInvalid);     
        newInput.addEventListener('click', handleClick);
        emptyMessage.setAttribute('class', styles.emptyMessage);
        emptyMessage.innerHTML = "Can't be empty";

        newFieldset.append(newInput);
        newFieldset.append(emptyMessage);
        newInputContainer.append(newFieldset);
        newInputContainer.append(newCloseIcon);
        allSubtasks.append(newInputContainer);
    }


    useImperativeHandle(ref, () => ({
        get state(){
            const allInputs = document.querySelectorAll('.' + styles.inputContainer_subtask_input);
            return Array.from(allInputs).map((input) => {
                return {subtaskDesc: input.value, completed: false}
            })  
        }
    }))

    return(
        <section className={styles.inputContainer}>
            <h5 className={styles.inputContainer_title}>
                {'Subtasks (min: 1)'}
            </h5>
            <section className={styles.inputContainer_subtasks}>
                <div className={styles.inputContainer_subtask}>
                    <fieldset className={styles.fieldset}>
                        <input 
                            type='text' 
                            onClick={handleClick}
                            onBlur={handleBlur}
                            onInvalid={handleInvalid}
                            className={styles.inputContainer_subtask_input} 
                            placeholder='e.g Make Coffee'
                            required
                            /> 
                        <div className={styles.emptyMessage}>
                            Can't be empty
                        </div> 
                    </fieldset>
                </div>
                <div className={styles.inputContainer_subtask}>
                    <fieldset className={styles.fieldset}>
                        <input 
                                type='text' 
                                onClick={handleClick}
                                onBlur={handleBlur}
                                onInvalid={handleInvalid}
                                className={styles.inputContainer_subtask_input} 
                                placeholder='e.g Drink Coffee and Smile'
                                required
                                /> 
                            <div className={styles.emptyMessage}>
                                Can't be empty
                            </div>  
                            
                    </fieldset>   
                    <div className={styles.inputContainer_subtask_closeIcon} onClick={handleDelete}></div>                   
                </div>
            </section>

            <button 
                type='button'
                className={styles.inputContainer_addButton} 
                onClick={handleAddSubtask}>
                + Add New Subtask
            </button>
        </section>
    )
})

export default memo(SubTasksInput);