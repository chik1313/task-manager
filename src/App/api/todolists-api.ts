import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd45af3fe-3be5-4464-9868-74aefd92e6fe'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {} > = {
    resultCode:number,
    messages: Array<string>,
    item: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order:number
    addedDate:string
}

type GetTaskResponse = {
    items: TaskType[],
    totalCount: number,
    error: string | null
}

export const todolistsApi = {
    getTodolists() {
        const promise = instance.get<Array<TodolistsType>>('todo-lists')
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistsType }>>('todo-lists', {title: title})
        return promise;
    },
    getTask(todolistId:string) {
        const promise = instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks` );
        return promise;
    }
}
