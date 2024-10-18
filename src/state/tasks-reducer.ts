import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../App/api/todolists-api";
import {TasksType} from "../AppWithRedux";

type removeTaskAcType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
type changeTasksStatusAcType = {
    type: "CHANGE-TASK-STATUS",
    isDone: boolean,
    taskId: string,
    todolistId: string
}

type changeTasksTitleAcType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

type AddTaskAcType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string,
}
type SetTasksType = {
    type: 'SET-TASKS',
    tasks:TaskType[],
    todolistId:string
}
type ActionsType =
    AddTaskAcType
    | removeTaskAcType
    | changeTasksStatusAcType
    | changeTasksTitleAcType
    | addTodolistActionType
    | removeTodolistActionType
    | setTodolistsActionType
| SetTasksType

const initialState: TasksType = {

}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            const copyState = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks;
            return copyState;
        }
        case "ADD-TASK" : {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const newTask = {
                id: v1(),
                description: '',
                title: action.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order:0,
                addedDate:''
            }
            const newTasks = [newTask, ...tasks]
            copyState[action.todolistId] = newTasks
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            console.log(action)
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            copyState[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            console.log(copyState)
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            let currentTask = state[action.todolistId]
            state[action.todolistId] = currentTask.map((t) => t.id === action.taskId ? {...t, title: action.title} : t)
            return {...state}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskAcType => {
    return {type: "REMOVE-TASK", todolistId, taskId}
}
export conввввst addTaskAC = (title: string, todolistId: string): AddTaskAcType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTasksStatusAcType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTasksTitleAcType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}
export const setTasksAC = (tasks:TaskType[] , todolistId:string): SetTasksType => {
    return { type: "SET-TASKS" , tasks , todolistId}
}
