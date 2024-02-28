import React, {useState, useEffect, useRef, memo} from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.module.css';

function Tasks({currentTask, currentColumn}) {
    const dispatch = useDispatch();
    const [completedSubTasks, setCompletedSubTasks] = useState(0);

    const handleTask = () => {
        dispatch({type: 'set edit task dialog', open: true, task: currentTask, column: currentColumn})
    }

    useEffect(() => {
        let completedSub = 0;

        currentTask.subTasks.forEach((subtask) => {
            if(subtask.completed)
                completedSub++;
        })

        setCompletedSubTasks(completedSub);

    })

    return(      
        <>
            <div className={styles.column_task} onClick={handleTask}>
                <h3 className={styles.column_task_title}>
                    {currentTask.taskTitle}
                </h3>
                <p className={styles.column_task_subtasks}>
                    {`${completedSubTasks} of ${currentTask.subTasks.length} subtasks`}
                </p>
            </div>       
        </>                          

    )
}

export default memo(Tasks);