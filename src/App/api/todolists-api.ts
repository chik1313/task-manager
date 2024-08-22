import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd45af3fe-3be5-4464-9868-74aefd92e6fe'
    }
}

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise;
    },
    createTodolist(title:string) {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', title ,settings)
        return promise;
    }
}
