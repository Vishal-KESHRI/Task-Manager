import React, {useState, useRef, useEffect} from 'react';
import {Dialog, DialogTitle, DialogContent} from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import BoardNameInput from './BoardNameInput';
import EditColumns from './EditColumns';
import styles from './styles.module.css';


function EditBoardDialog(){
    const [open, setOpen] = useState(false);
    const board = useSelector(state => state.board);
    const dispatch = useDispatch();
    const newBoardName = useRef()
    const newColumns = useRef();
    const mobile = useMediaQuery('(max-width: 560px)');

    const handlePopup = () => {
        setOpen(!open);
    }

//this handler will update the local storage and will also update the store
    const handleSubmit = (e) => {
        e.preventDefault();
        let boardNameAlreadyExists = false
        const prevBoard = JSON.parse(localStorage.getItem('boards'));

        prevBoard.every((board) => {
            if(board.boardName == newBoardName.current.state){
                boardNameAlreadyExists = true;
                return false;
            }
            else 
                return true;
        })
        if(boardNameAlreadyExists && newBoardName.current.state != board.boardName) {
            alert('Board name already exists');
            return;
        }

        handlePopup();

        const allBoards = JSON.parse(localStorage.getItem('boards'));
        allBoards.forEach((currentBoard) => {                               
            if(currentBoard.boardName == board.boardName){
                currentBoard.boardName = newBoardName.current.state;
                currentBoard.columns = newColumns.current.state             //rememeber that newColumns is already an array of objects
            }   
        })
        localStorage.setItem('boards', JSON.stringify(allBoards)); 
        
        const StorageEvent = new Event('UpdateStorage');        
        document.dispatchEvent(StorageEvent);     

        dispatch({type: 'set board', board : {boardName: newBoardName.current.state, columns: newColumns.current.state}});
    }

    //this will close the dialog when the user clicks on the background
    useEffect(() => {
        const handleClick = (e) => {
            if(e.target.matches('.MuiDialog-container'))
                setOpen(false);
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])

//this will disable the button that triggers the dialog if there is no selected board in the store
    useEffect(() => {
        const button = document.querySelector('.' + styles.editBoard_button);

        if(board)
            button.disabled = false;
        else
            button.disabled = true;

    }, [board])

    return( 
        <>
            <button className={styles.editBoard_button} onClick={handlePopup}>
                Edit Board
            </button>
            <Dialog open={open} PaperProps={{ sx: { overflowY: 'initial'}, style: {
                            backgroundColor: 'var(--dialog-bg-color)',
                }}}>
                <DialogTitle sx={mobile ? {padding: '24px'} : {padding: '32px 32px 24px 32px'}}>
                    <span className={styles.dialogTitle_title}>
                        Edit Board
                    </span>
                </DialogTitle>
                <DialogContent className={styles.dialogContent} sx={mobile ? {padding: '0px 24px 32px 24px'} : {padding: '0px 32px 24px 32px'}}>
                    <form onSubmit={handleSubmit}>
                        <BoardNameInput ref={newBoardName}/>
                        {board ? <EditColumns ref={newColumns} columns={board.columns}/> : <></> }
                        <input type='submit' className={styles.dialogContent_submit} value='Save Changes'/>
                    </form>
                </DialogContent>
            </Dialog>    
        </>            
    )
}

export default EditBoardDialog;