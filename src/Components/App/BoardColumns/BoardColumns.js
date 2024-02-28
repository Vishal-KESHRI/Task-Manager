import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useMediaQuery } from '@mui/material';
import styles from './styles.module.css';
import MessageBox from './MessageBox';
import DisplayColumns from './DisplayColumns';

function BoardColumns() {
    const board = useSelector(state => state.board);
    const dispatch = useDispatch(state => state.addBoard);
    const sidebar = useSelector(state => state.showSidebar);
    const tablet = useMediaQuery('(max-width: 1000px)');

    const handleAddNewColumn = () => {
        dispatch({type: 'set add column dialog', open: true});
    }

    const handleNewBoard = () => {
        dispatch({type: 'set add board dialog', open: true})
    }

    useEffect(() => {
        const container = document.querySelector('.' + styles.container);

        if(sidebar){
            if(tablet)
                container.style.borderLeft = '261px solid transparent'          //i'm using border instead of padding/margin because if i used padding/margin, the scrollbar will be hidden behind the sidebar
            else
                container.style.borderLeft = '300px solid transparent';
        }
            
        else
            container.style.borderLeft = '0px solid transparent';

    }, [sidebar, tablet])

    return (
        <section className={styles.container}>
            {board ? board.columns.length ?
                    <DisplayColumns columns={board.columns}/>  
                    :
                    <MessageBox 
                        message='This board is empty. Create a new column to get started.'
                        buttonText='+ Add New Column'
                        handler={handleAddNewColumn}
                        /> 
                : 
                    <MessageBox 
                        message='You have no boards. Create a new board to get started.'
                        buttonText='Create Board'
                        handler={handleNewBoard}
                    />}  
        </section>
    )
}
export default BoardColumns;