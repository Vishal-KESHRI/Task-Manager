export function SideBarReducer(state = true, action){
    switch(action.type){
        case 'set sidebar':
            return action.show;
        case 'get sidebar':
            return state;
        default:
            return state;
    }
}

export function BoardReducer(state = null, action){
    switch(action.type){
        case 'set board':
            return action.board;
        case 'get board':
            return state;
        default: 
            return state;
    }
}

export function SwitchThemeReducer (state = false, action) {
    switch(action.type){
        case 'set theme':
            return action.theme;
        case 'get theme':
            return state;
        default: 
            return state;
    }

}

export function OpenAddBoardDialog(state = false, action) {
    switch(action.type){
        case 'set add board dialog':
            return action.open;
        case 'get add board dialog':
            return state;
        default: 
            return state;
    }
}

export function OpenAddColumnDialog(state = false, action){
    switch(action.type){
        case 'set add column dialog':
            return action.open;
        case 'get add column dialog': 
            return state;
        default: 
            return state;
    }
}

export function OpenEditTaskDialog(state = {open: false, task: null, column: null}, action){
    switch(action.type){
        case 'set edit task dialog':
            return {open: action.open, task: action.task, column: action.column};
        case 'get edit task dialog': 
            return state;
        default: 
            return state;
    }
}