import React, {forwardRef, useImperativeHandle} from 'react';
import styles from './styles.module.css';

const ColumnInputs = forwardRef((props, ref) => {

    const handleDelete = (e) => {
        const columnContainer = e.target.parentElement;
        columnContainer.remove();
    }    

    const handleChange = (e) => {
        e.target.setCustomValidity('');
        const emptyMessage = e.target.nextElementSibling;
        const input = e.target;
        emptyMessage.style.display = '';
        input.style.border = '';
    }

    const handleBlur = (e) => {
        const isValid = e.target.checkValidity();
        const emptyMessage = e.target.nextElementSibling;
        const input = e.target;
        if(isValid){
            emptyMessage.style.display = '';
            input.style.border = ''
        }
        else {
            emptyMessage.style.display = 'block';
            input.style.border = '1px solid #EA5555';
        }
    }   

    const handleInvalid = (e) => {
        e.target.setCustomValidity(' ');
        const emptyMessage = e.target.nextElementSibling;
        const input = e.target;
        emptyMessage.style.display = 'block';
        input.style.border = '1px solid #EA5555';
    }

    const handleAddColumn = () => {
        const allColumns = document.querySelector('.' + styles.column_allColumns);
        if(allColumns.childNodes.length == 5)
            return;
        const newInputContainer = document.createElement('div');
        const newFieldset = document.createElement('fieldset');
        const newInput = document.createElement('input');
        const newCloseIcon = document.createElement('div');
        const emptyMessage = document.createElement('div');

        newInputContainer.setAttribute('class', styles.input_container);
        newFieldset.setAttribute('class', styles.input_fieldset);
        newInput.setAttribute('class', styles.input);
        newInput.setAttribute('required', '');
        newInput.setAttribute('type', 'text');
        newInput.addEventListener('blur', handleBlur);
        newInput.addEventListener('invalid', handleInvalid);     
        newInput.addEventListener('change', handleChange);
        newCloseIcon.setAttribute('class', styles.input_close);
        newCloseIcon.addEventListener('click', handleDelete);
        emptyMessage.setAttribute('class', styles.emptyMessage);
        emptyMessage.innerHTML = "Can't be empty";

        newFieldset.append(newInput);
        newFieldset.append(emptyMessage);
        newInputContainer.append(newFieldset);
        newInputContainer.append(newCloseIcon);
        allColumns.append(newInputContainer);
    }

    useImperativeHandle(ref, () => ({
        get state() {
            const allColumns = document.querySelectorAll('.' + styles.input);
            return Array.from(allColumns).map((columnTitle) => {
                return {columnTitle: columnTitle.value, tasks: []};
            })
        }
    }), [])


    return(             
            <fieldset className={styles.column_container}>
                <h3 className={styles.column_label}>
                    {'Columns (max: 5)'}
                </h3>        
                <div className={styles.column_allColumns}>
                    <div className={styles.input_container}>
                        <fieldset className={styles.input_fieldset}>
                            <input 
                                type='text' 
                                className={styles.input} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                onInvalid={handleInvalid}
                                required
                                placeholder='e.g Todo'/>
                            <div className={styles.emptyMessage}>
                                Can't be empty
                            </div>                            
                        </fieldset>
                        <div className={styles.input_close} onClick={handleDelete}></div>
                    </div>
                    <div className={styles.input_container}>
                        <fieldset className={styles.input_fieldset}>
                            <input 
                                type='text' 
                                className={styles.input} 
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                onInvalid={handleInvalid}
                                placeholder='e.g Doing'
                                required/>
                            <div className={styles.emptyMessage}>
                                Can't be empty
                            </div>                            
                        </fieldset>
                        <div className={styles.input_close} onClick={handleDelete}></div>
                    </div>
                </div>            
                <button type='button' className={styles.column_addButton} onClick={handleAddColumn}>
                    + Add New Column
                </button>
            </fieldset>        
    )
})

export default ColumnInputs;