import React, {useState, useEffect, useRef, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useLocalStorage from '../useLocalStorage';
import {v4 as uuid} from 'uuid';
import styles from './styles.module.css';

function DisplayBoards() {
    const dispatch = useDispatch();
    const selectedBoard = useSelector(state => state.board);
    const boards = useLocalStorage('boards');
    const [choosenBoard, setChoosenBoard] = useState('');
    const boardIconRefs = useRef([])

    const handleEnter = (e) => {
        const boardIconID = e.target.id;
        boardIconRefs.current[boardIconID].classList.add(styles.sidebar_board_icon_hover)
    }

    const handleLeave = (e) => {
        const boardIconID = e.target.id;
        boardIconRefs.current[boardIconID].classList.remove(styles.sidebar_board_icon_hover)
    }

    const handleClick = (e) => {
        const boardChoosen = e.target.getAttribute('data-board');
        setChoosenBoard(boardChoosen);
    }

//this function will automatically select a board everytime there is a change in the local storage
    useEffect(() => {
        if(selectedBoard)
            setChoosenBoard(selectedBoard.boardName);
        else if(boards.length)
            setChoosenBoard(boards[0].boardName);

    }, [boards, selectedBoard])


    //removing the purple background color from the previously selected board
    useEffect(() => {
        const allBoards = document.querySelectorAll('.' + styles.sidebar_board);
        allBoards.forEach((board) => {
            if(board.classList.contains(styles.sidebar_board_active)){
                board.classList.remove(styles.sidebar_board_active)
                boardIconRefs.current[board.id].style.fill = '';
            }
        })
    }, [choosenBoard, boards, selectedBoard])

    //adding a purple background color to the currently selected board
    useEffect(() => {
        const allBoards = document.querySelectorAll('.' + styles.sidebar_board);
        allBoards.forEach((board) => {
            const boardName = board.getAttribute('data-board');
            if(boardName == choosenBoard){
                board.classList.add(styles.sidebar_board_active);
                boardIconRefs.current[board.id].style.fill = 'white';
            }
        })
    }, [choosenBoard, boards, selectedBoard])

    //dispatching an action that contains the selected board to display to the reducer
    useEffect(() => {
        let boardToDispatch = null;
        boards.forEach((board) => {
            if(board.boardName == choosenBoard)
                boardToDispatch = board;
        })

        dispatch({type: 'set board', board: boardToDispatch})

    }, [choosenBoard])


    return(
        <>
            <h4 className={styles.sidebar_title}>
                {`ALL BOARDS (${boards.length})`}
            </h4>
            {boards.map((board, i) => {
                return(
                    <div 
                        className={styles.sidebar_board} 
                        key={uuid()} 
                        data-board={board.boardName}
                        id={i}
                        onMouseEnter={handleEnter} 
                        onMouseLeave={handleLeave} 
                        onClick={handleClick}>
                            <svg className={styles.iconContainer} width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                <path ref={(ref) => {boardIconRefs.current[i] = ref}} className={styles.icon} d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
                            </svg> 
                            {board.boardName}
                    </div>
                )
            })}        
        </>
    )
}

export default memo(DisplayBoards);
