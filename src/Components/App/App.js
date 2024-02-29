import React from 'react';
import HeaderBar from './HeaderBar';
import SideBar from './SideBar';
import BoardColumns from './BoardColumns';
import {AddBoardDialog, AddNewColumn, EditTaskDialog} from './ReusableDialogs'
import {Provider} from 'react-redux';
import Store from './Store';
import styles from './styles.css';

function App() {
    return(
        <Provider store={Store} styles={styles}>
            <main>
                <HeaderBar/>
                <SideBar/>    
                <BoardColumns/>
            </main>      
            <AddBoardDialog/>
            <AddNewColumn/>
            <EditTaskDialog/>
        </Provider>
    )
}

export default App;