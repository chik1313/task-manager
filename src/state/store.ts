import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk} from "redux-thunk";


const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export type AppRootState = ReturnTyxxxpe<typeof rootReducer>

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
// @ts-ignore
window.store = store;
