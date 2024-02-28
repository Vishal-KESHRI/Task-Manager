import React, {useState, useEffect, useRef} from 'react';
import TitleInput from './TitleInput';
import DescriptionInput from './DescriptionInput';
import SubTasksInput from './SubTasksInput';
import StatusSelectBox from './StatusSelectBox';
import {useMediaQuery} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import styles from './styles.module.css';



function AddNewTaskDialog() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.board);
    const taskTitle = useRef();            //these refs all contain new data that will be used to replace old data from a specific board
    const taskDesc = useRef();
    const subtasks = useRef();
    const subtaskColumn = useRef();
    const mobile = useMediaQuery('(max-width: 780px)');

    const handleClick = () => {
        setOpen(!open);
    }   


//updating the local storage and dispatching an action to reducer
    const handleSubmit = (e) => {
        e.preventDefault();

        //updating the store's state with the new tasks
        const updatedColumns = currentBoard.columns.map((column) => {      
            if(column.columnTitle == subtaskColumn.current.state){
                return {columnTitle: column.columnTitle, 
                    tasks: [...column.tasks, {
                        taskTitle : taskTitle.current.state,
                        description :  taskDesc.current.state,
                        subTasks : subtasks.current.state,
                }]}
            }
            else 
                return column;
        })

        //updating local storage
        const allBoards = JSON.parse(localStorage.getItem('boards'));
        allBoards.forEach((oldBoard, i, origBoards) => {
            if(oldBoard.boardName == currentBoard.boardName)
                origBoards[i] = {boardName: currentBoard.boardName, columns: updatedColumns}
        })
        localStorage.setItem('boards', JSON.stringify(allBoards));

        //dispatching an event that will re-render components that rely on changes in local storage
        const StorageEvent = new Event('UpdateStorage');
        document.dispatchEvent(StorageEvent);

        //dispatching an action to the reducer
        dispatch({type: 'set board', board : {boardName: currentBoard.boardName, columns: updatedColumns}});
    
        setOpen(false);
    }

//this will disabled the button IF there is no board selected or if there are no columns available
    useEffect(() => {
        const button = document.querySelector('.' + styles.addNewTask_button);

        if(currentBoard && currentBoard.columns.length) 
            button.disabled = false;
        else
            button.disabled = true;

    }, [currentBoard])

    //this will close the dialog if the user clicks on the background
    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.MuiDialog-container'))
                setOpen(false);
        }
        if(open)
            document.addEventListener('click', handleClick);
        else
            document.removeEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [open])

    return (              
        <>
            <button className={styles.addNewTask_button} onClick={handleClick}>
                {mobile ? <span>+</span> : '+ Add New Task'}
            </button>         
            <Dialog open={open} PaperProps={{ sx: { overflowY: 'initial'}, style: {
                            backgroundColor: 'var(--dialog-bg-color)',
                            }}}>
                <DialogTitle sx={mobile ? {padding: '24px'} : {padding: '32px 32px 24px 32px'}}>
                    <span className={styles.dialogTitle_h1}>    {/* i had to use <span> instead of <h2> because <DialogTitle> gets transpiled into <h2>*/}
                        Add New Task
                    </span>
                </DialogTitle>
                <DialogContent className={styles.dialogContent} sx={mobile ? {padding: '0px 24px 24px 24px'} : {padding: '0px 32px 24px 32px'}}>
                    <form onSubmit={handleSubmit}>
                        <TitleInput ref={taskTitle}/>
                        <DescriptionInput ref={taskDesc}/>
                        <SubTasksInput ref={subtasks}/>
                        <StatusSelectBox ref={subtaskColumn}/>     
                        <input 
                            type='submit' 
                            className={styles.dialogContent_submit}
                            value='Create Task'
                        />                  
                    </form>
                </DialogContent>
            </Dialog>
        </>  

    )
}

export default AddNewTaskDialog;