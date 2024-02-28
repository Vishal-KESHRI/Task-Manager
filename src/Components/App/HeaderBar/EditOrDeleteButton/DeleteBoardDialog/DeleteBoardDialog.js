import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery} from '@mui/material';
import styles from './styles.module.css';

function DeleteBoardDialog() {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const [deleteBoard, setDeleteBoard] = useState(false);
    const mobile = useMediaQuery('(max-width: 560px)');

    const handlePopup = () => {
        setOpenPopup(!openPopup);
    }

    const handleDelete = () => {
        setDeleteBoard(true);
        setOpenPopup(false)
    }

    //deleting the board from the local storage
    useEffect(() => {
        if(!deleteBoard) return;

        const boards = JSON.parse(localStorage.getItem('boards'));
        const filteredBoards = boards.filter((currentBoard) => {
            if(currentBoard.boardName == board.boardName)
                return false;
            else 
                return true;
        })
        localStorage.setItem('boards', JSON.stringify(filteredBoards));

    }, [deleteBoard])

    //dispatching an event to cause a re-render to the other components
    useEffect(() => {
        if(!deleteBoard) return;

        const storageEvent = new Event('UpdateStorage');        
        document.dispatchEvent(storageEvent);  

    }, [deleteBoard])

    //we dispatch an action to the reducer, the action will remove the current board
    useEffect(() => {
        if(!deleteBoard) return;

        dispatch({type: 'set board', board: null})
    }, [deleteBoard])

   //reseting the state to false because this component doesnt get removed from the DOM 
    useEffect(() => {
        if(deleteBoard)
            setDeleteBoard(false);
    }, [deleteBoard])


    //this will disable the delete button if there are no boards selected
    useEffect(() => {
        const button = document.querySelector('.' + styles.deleteBoardButton);
        
        if(board)
            button.disabled = false;
        else
            button.disabled = true;

    }, [board])

    return(
        <>
            <button className={styles.deleteBoardButton} onClick={handlePopup}>
                Delete Board
            </button>
            <Dialog open={openPopup} PaperProps={{
                            sx: {overflowY: 'initial'},
                            style: {
                            backgroundColor: 'var(--dialog-bg-color)',
                            },
                        }}>
                <DialogTitle sx={mobile ? {padding: '24px'} : {padding: '32px 32px 24px 32px'}}>
                    <span className={styles.dialogTitle_title}>
                        Delete this board?
                    </span>
                </DialogTitle>
                <DialogContent sx={mobile ? {padding: '0px 24px 24px 24px'} : {padding: '0px 32px 24px 32px'}}>
                    <p className={styles.dialogContent_desc}>
                        Are you sure you want to delete the {`‘${board ? board.boardName: ''}’`} board? 
                        This action will remove all columns and tasks and cannot be reversed.
                    </p>
                </DialogContent>
                <DialogActions sx={mobile ? {padding: '0px 24px 24px 24px'} : {padding: '0px 32px 40px 32px'}}>
                    <div className={styles.dialogActions_buttons}>
                        <button className={styles.dialogActions_buttons_delete} onClick={handleDelete}>
                            Delete
                        </button>
                        <button className={styles.dialogActions_buttons_cancel} onClick={handlePopup}>
                            Cancel
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
        )
}

export default DeleteBoardDialog;