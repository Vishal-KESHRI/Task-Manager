//this function will traverse though the boards from the local storage until it finds the board that the user has selected
//then it will traverse through the columns of the board and finally it will look for the current task we are trying to edit

export default function traverseThroughBoard(boards, currentBoard, currentColumn, currentTask, callback) {
    let updatedBoard = null;
    boards.every((board) => {
        if(board.boardName == currentBoard.boardName){
            updatedBoard = board;
            board.columns.every((column) => {
                if(column.columnTitle == currentColumn){
                    column.tasks.every((task, i, allTasks) => {
                        if(task.taskTitle == currentTask.taskTitle){
                            callback(task, i, allTasks)
                            return false;
                        }
                        else
                            return true;
                    }) 
                    return false;                   
                }
                else
                    return true;
            })
            return false;
        }
        else
            return true;
    })

    return updatedBoard;
}