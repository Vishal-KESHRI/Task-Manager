import React, {useState, useEffect, useRef} from 'react';
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import traverseThroughBoard from './TraverseThroughBoard';
import removeTaskFromColumn from './RemoveTaskFromColumn';
import addTaskToColumn from './AddTaskToColumn';
import EditOrDeleteTask from './EditOrDeleteTask';
import CheckBox from './CheckBox';
import SelectBox from './SelectBox';
import styles from './styles.module.css';

function EditTaskDialog() {
    const task = useSelector(state => state.editTask);
    const open = task.open;
    const currentTask = task.task;    
    const currentColumn = task.column;
    const currentBoard = useSelector(state => state.board);
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(0);
    const allCheckboxes = useRef([]);
    const column = useRef();

    const handleCompleted = (complete) => {
        if(complete){
            setCompleted((prevState) => {
                return prevState + 1;
            })            
        }
        else{
            setCompleted((prevState) => {
                return prevState - 1;
            })
        }
    }

    //updating the local storage and dispatching an action with the updated board
    const handleDelete = () => {
        const boards = JSON.parse(localStorage.getItem('boards'));
        const updatedBoard = traverseThroughBoard(boards, currentBoard, currentColumn, currentTask, (task, i, allTasks) => {
            allTasks.splice(i, 1);
        })
        localStorage.setItem('boards', JSON.stringify(boards));

        const StorageEvent = new Event('UpdateStorage');
        document.dispatchEvent(StorageEvent);

        dispatch({type: 'set board', board: updatedBoard});
        dispatch({type: 'set edit task dialog', open: false, task: null, column: null})
    }

    //updating the local storage and dispatching an action with the updated board
    const handleEdit = () => {

        const completedSubTasks = allCheckboxes.current.map((checkbox) => {
            const subtaskDesc = JSON.parse(checkbox.getAttribute('data-task')).subtaskDesc; 
            return {subtaskDesc: subtaskDesc, completed: checkbox.checked}
        })

        const boards = JSON.parse(localStorage.getItem('boards'));
        removeTaskFromColumn(boards, currentBoard, currentColumn, currentTask);
        const updatedBoard = addTaskToColumn(boards, currentBoard, column.current.state, {taskTitle: currentTask.taskTitle, description: currentTask.description, subTasks: completedSubTasks} )
        localStorage.setItem('boards', JSON.stringify(boards));

        dispatch({type: 'set board', board: updatedBoard});
        dispatch({type: 'set edit task dialog', open: false, task: null, column: null})
    }

    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.MuiDialog-container'))
                dispatch({type: 'set edit task dialog', open: false, task: null, column: null});
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    })

    useEffect(() => {
        if(!currentTask) return;

        let completedTasks = 0;
        currentTask.subTasks.forEach((subtask) => {
            if(subtask.completed)
                completedTasks = completedTasks + 1;
        })

        setCompleted(completedTasks);
    }, [currentTask])


    return(            
        <Dialog open={open} PaperProps={{ sx: { overflow: 'initial'}, style: {
                backgroundColor: 'var(--dialog-bg-color)',
                }}}>
                <DialogTitle sx={{padding: '32px 32px 24px 32px'}}>
                    <div className={styles.dialogTitle}>
                        <h2 className={styles.dialogTitle_title}>
                            {currentTask ? currentTask.taskTitle : ''}                        
                        </h2>     
                        <EditOrDeleteTask handleDelete={handleDelete} handleEdit={handleEdit}/>                   
                    </div>
                </DialogTitle>
                <DialogContent className={styles.dialogContent} sx={{padding: '0px 32px 32px 32px', overflow: 'initial'}}>
                    <p className={styles.dialogContent_desc}>
                        {currentTask ? currentTask.description : ''}
                    </p>
                    <h5 className={styles.dialogContent_subtasksCompleted}>
                        {`Subtasks (${completed} of ${currentTask ? currentTask.subTasks.length : ''})`}
                    </h5>
                    <div className={styles.dialogContent_subtasks}>
                        {currentTask ? currentTask.subTasks.map((subtask, i) => {
                            return(
                            <CheckBox 
                                subtask={subtask} 
                                index={i} 
                                handleCompleted={handleCompleted} 
                                key={i} 
                                ref={allCheckboxes}/>
                            )
                        }) : ''}
                    </div>
                    <SelectBox currentColumn={currentColumn} ref={column}/>
                </DialogContent>
            </Dialog> 
    )
}

export default EditTaskDialog;