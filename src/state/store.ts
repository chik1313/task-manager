import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk} from "redux-thunk";


const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducersss
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk) )

// @ts-ignore
window.store = store;
