import React, {useRef} from 'react';
import ColumnNameInput from './ColumnNameInput';
import {useSelector, useDispatch} from 'react-redux';
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import styles from './styles.module.css';

function AddNewColumn() {
    const selectedBoard = useSelector(state => state.board);
    const open = useSelector(state => state.addColumn);
    const dispatch = useDispatch();
    const newColumn = useRef();

    const handleDialog = () => {
        dispatch({type: 'set add column dialog', open: false});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const boards = JSON.parse(localStorage.getItem('boards'));
        boards.forEach((board) => {
            if(board.boardName == selectedBoard.boardName)
                board.columns.push(newColumn.current.state);
        })
        localStorage.setItem('boards', JSON.stringify(boards));

        const StorageEvent = new Event('UpdateStorage');
        document.dispatchEvent(StorageEvent);

        dispatch({type: 'set board', board: {boardName: selectedBoard.boardName, columns: [...selectedBoard.columns, newColumn.current.state]}})
        dispatch({type: 'set add column dialog', open: false});
    }


    return(
        <>
            <Dialog open={open} 
                PaperProps={{style: {
                            backgroundColor: 'var(--dialog-bg-color)',
                        }}}>
                <DialogTitle sx={{padding: '32px 32px 20px 32px'}}>
                    <span className={styles.dialogTitle_title}>
                        Add New Column
                    </span>
                </DialogTitle>
                <DialogContent sx={{padding: '32px'}}>
                    <form onSubmit={handleSubmit}>
                        <ColumnNameInput ref={newColumn}/>
                        <div className={styles.dialogContent_buttons}>
                            <input type='submit' value='Add Column' className={styles.dialogContent_submitButton}/>  
                            <button type='button' className={styles.dialogContent_cancelButton} onClick={handleDialog}>
                                Cancel    
                            </button> 
                        </div>                     
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddNewColumn;