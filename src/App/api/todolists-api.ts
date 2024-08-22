import axios from "axios";

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists')
        return promise;
    }
}
