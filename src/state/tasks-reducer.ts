import {TasksType} from "../App";

type removeTaskAcType = {
    type: string,
    todolistId: string,
    taskId: string
}
type AddTaskAcType = {
    type: string,
    todolistId: string,
    taskId: string
}
type ActionsType = AddTaskAcType | removeTaskAcType

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            const copyState = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks
            return copyState
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAcType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
