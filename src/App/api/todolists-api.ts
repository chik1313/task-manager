import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd45af3fe-3be5-4464-9868-74aefd92e6fe'
    }
}

export type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D> = {
    resultCode:number,
    messages: Array<string>,
    item: D
}

type TaskType = {
    id: string,
    title: string,
    description: string | null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
    addedDate: string
}

type GetTaskResponse = {
    items: TaskType[],
    totalCount: number,
    error: string | null
}

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<Array<TodolistsType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise;
    },
    createTodolist(title: string) {
        const promise = axios.post<ResponseType<{ item: TodolistsType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise;
    }
}
