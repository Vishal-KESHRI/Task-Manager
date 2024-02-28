import React, {useEffect} from 'react';
import Task from './Tasks';
import styles from './styles.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

function DisplayColumns({columns}) {
    const dispatch = useDispatch();
    const selectedBoard = useSelector(state => state.board);

    const handleDialog = () => {
        dispatch({type: 'set add column dialog', open: true});
    }

    useEffect(() => {
        if(!selectedBoard) return;

        const addColumnButton = document.querySelector('.' + styles.addNewColumnButton)

        if(selectedBoard.columns.length >= 5)
            addColumnButton.style.display = 'none';
        else
            addColumnButton.style.display = '';

    }, [selectedBoard])

    return(
        <section className={styles.columns}>
            {columns.map((column) => {
                return(
                    <div className={styles.column} key={uuid()}>
                        <div className={styles.column_title}>
                            <div className={styles.dot}></div>
                            {`${column.columnTitle} (${column.tasks.length})`}
                        </div>
                        {column.tasks.length ? column.tasks.map((task) => {
                            return(
                                <Task currentTask={task} currentColumn={column.columnTitle} key={uuid()}/>
                            ) 
                        }) : <div className={styles.message}>
                                No tasks in this column
                            </div> }                
                    </div>
                )
            })}
            <button className={styles.addNewColumnButton} onClick={handleDialog}>
                + New Column
            </button>
        </section>
    )
}

export default DisplayColumns;