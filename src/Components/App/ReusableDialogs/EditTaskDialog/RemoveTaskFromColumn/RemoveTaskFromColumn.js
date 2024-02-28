//this function will remove a task from a column in a board

export default function removeTaskFromColumn(boards, currentBoard, currentColumn, currentTask) {

    boards.every((board) => {
        if(board.boardName == currentBoard.boardName){
            board.columns.every((column) => {
                if(column.columnTitle == currentColumn){
                    column.tasks.every((task, i, allTasks) => {
                        if(task.taskTitle == currentTask.taskTitle){
                            allTasks.splice(i, 1);
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
    
}