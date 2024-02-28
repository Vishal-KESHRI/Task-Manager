//this function will traverse through the selected board and add a new task to a specific column

export default function addTaskToColumn(boards, currentBoard, columnToAddTask, newTask) {
    let updatedBoard = null;

    boards.every((board) => {
        if(board.boardName == currentBoard.boardName){
            updatedBoard = board;
            board.columns.every((column) => {
                if(column.columnTitle == columnToAddTask){
                    column.tasks.push(newTask);
                    return false
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